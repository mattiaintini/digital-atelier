import { motion } from 'framer-motion';
import { useEditorStore, ElementType } from '@/stores/editorStore';
import { Type, Image, Square, MousePointer, Navigation, Box } from 'lucide-react';

const typeIcons: Record<ElementType, typeof Type> = {
  text: Type,
  button: MousePointer,
  section: Square,
  image: Image,
  nav: Navigation,
  container: Box,
};

const LayerTree = () => {
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedElementId);
  const hoveredId = useEditorStore((s) => s.hoveredElementId);
  const setSelected = useEditorStore((s) => s.setSelectedElement);
  const setHovered = useEditorStore((s) => s.setHoveredElement);

  // Build tree: root elements first, then children
  const roots = elements.filter((e) => !e.parentId);
  const getChildren = (parentId: string) => elements.filter((e) => e.parentId === parentId);

  const renderElement = (el: typeof elements[0], depth: number = 0) => {
    const Icon = typeIcons[el.type] || Box;
    const isSelected = selectedId === el.id;
    const isHovered = hoveredId === el.id;
    const children = getChildren(el.id);

    return (
      <div key={el.id}>
        <motion.button
          className="w-full flex items-center gap-2 py-1.5 px-2 rounded text-left transition-all"
          style={{
            paddingLeft: 8 + depth * 12,
            background: isSelected ? 'rgba(217,119,87,0.12)' : isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
            borderLeft: isSelected ? '2px solid #D97757' : '2px solid transparent',
          }}
          onClick={() => setSelected(el.id)}
          onMouseEnter={() => setHovered(el.id)}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon size={10} style={{ color: isSelected ? '#D97757' : 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
          <span
            className="text-[7px] tracking-[0.1em] truncate"
            style={{ color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.35)' }}
          >
            {el.label}
          </span>
          <span className="text-[6px] ml-auto shrink-0" style={{ color: 'rgba(255,255,255,0.15)' }}>
            {el.type}
          </span>
        </motion.button>
        {children.map((child) => renderElement(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="space-y-0.5">
      <p className="text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
        STRUTTURA LIVELLI
      </p>
      {elements.length === 0 ? (
        <p className="text-[7px]" style={{ color: 'rgba(255,255,255,0.15)' }}>Seleziona un template per vedere i livelli</p>
      ) : (
        roots.map((el) => renderElement(el))
      )}
    </div>
  );
};

export default LayerTree;
