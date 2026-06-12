import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Move, Copy, Trash2, Pencil } from 'lucide-react';
import { useEditorStore, SiteElement, ElementType, ElementOverrides } from '@/stores/editorStore';

interface EditableElementProps {
  id: string;
  type: ElementType;
  label: string;
  parentId: string | null;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const EMPTY_OVERRIDES = Object.freeze({}) as ElementOverrides;

// Register element on mount
function useRegisterElement(el: Omit<SiteElement, 'children'>) {
  useEffect(() => {
    useEditorStore.setState((state) => {
      const exists = state.elements.some((element) => element.id === el.id);
      if (exists) return state;

      return {
        elements: [...state.elements, { ...el }],
      };
    });
  }, [el.id, el.label, el.parentId, el.type]);
}

export function EditableElement({ id, type, label, parentId, children, className = '', style = {} }: EditableElementProps) {
  const selectedId = useEditorStore((s) => s.selectedElementId);
  const hoveredId = useEditorStore((s) => s.hoveredElementId);
  const setSelected = useEditorStore((s) => s.setSelectedElement);
  const setHovered = useEditorStore((s) => s.setHoveredElement);
  const overrides = useEditorStore((s) => s.overrides[id] ?? EMPTY_OVERRIDES);
  const ref = useRef<HTMLDivElement>(null);

  useRegisterElement({ id, type, label, parentId });

  const isSelected = selectedId === id;
  const isHovered = hoveredId === id && !isSelected;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(id);
  }, [id, setSelected]);

  const appliedStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    ...(overrides.fontSize && { fontSize: overrides.fontSize }),
    ...(overrides.fontWeight && { fontWeight: overrides.fontWeight }),
    ...(overrides.letterSpacing !== undefined && { letterSpacing: overrides.letterSpacing }),
    ...(overrides.backgroundColor && { backgroundColor: overrides.backgroundColor }),
    ...(overrides.textColor && { color: overrides.textColor }),
    ...(overrides.borderRadius !== undefined && { borderRadius: overrides.borderRadius }),
    ...(overrides.padding !== undefined && { padding: overrides.padding }),
    ...(overrides.opacity !== undefined && { opacity: overrides.opacity }),
  };

  return (
    <div
      ref={ref}
      data-element-id={id}
      className={`${className} transition-all duration-150`}
      style={{
        ...appliedStyle,
        outline: isSelected ? '2px solid #D97757' : isHovered ? '1px dashed rgba(217,119,87,0.4)' : 'none',
        outlineOffset: isSelected ? 1 : 0,
        cursor: 'pointer',
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {children}

      {/* Element label on hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            className="absolute -top-5 left-0 z-50 flex items-center gap-1 pointer-events-none"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span
              className="text-[6px] tracking-[0.15em] uppercase px-1.5 py-0.5 rounded"
              style={{
                background: isSelected ? '#D97757' : 'rgba(217,119,87,0.7)',
                color: '#000',
              }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toolbar on selection */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute -top-9 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 rounded-lg px-1 py-0.5"
            style={{
              background: 'rgba(20,20,20,0.95)',
              border: '1px solid rgba(217,119,87,0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {[
              { icon: Pencil, tip: 'Modifica' },
              { icon: Move, tip: 'Sposta' },
              { icon: Copy, tip: 'Duplica' },
              { icon: Trash2, tip: 'Elimina' },
            ].map(({ icon: Icon, tip }) => (
              <button
                key={tip}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title={tip}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon size={10} style={{ color: '#D97757' }} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EditableElement;
