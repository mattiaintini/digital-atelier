import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-16 py-12">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase mb-10 transition-colors" style={{ color: 'rgba(217,119,87,0.6)' }}>
        <ArrowLeft size={14} /> Torna alla Home
      </Link>

      <h1 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>
        Cookie Policy
      </h1>
      <p className="text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Ai sensi dell'art. 13 del Regolamento UE 2016/679 e delle Linee Guida del Garante Privacy
      </p>

      <div className="space-y-8 text-sm leading-[1.8]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>1. Cosa sono i Cookie</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web visitati inviano al browser dell'utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie permettono di migliorare la navigazione e di personalizzare i contenuti.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>2. Tipologie di Cookie Utilizzati</h2>

          <h3 className="text-[11px] tracking-[0.15em] uppercase mt-4 mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Cookie Tecnici (necessari)</h3>
          <p>
            Sono essenziali per il corretto funzionamento del sito. Includono cookie di sessione e cookie per la memorizzazione delle preferenze dell'utente (es. consenso cookie, lingua). Non richiedono il consenso dell'utente.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>cookie-consent:</strong> memorizza la scelta dell'utente riguardo all'accettazione dei cookie. Durata: persistente.</li>
            <li><strong>language:</strong> memorizza la preferenza linguistica dell'utente. Durata: persistente.</li>
          </ul>

          <h3 className="text-[11px] tracking-[0.15em] uppercase mt-4 mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Cookie Analitici (previo consenso)</h3>
          <p>
            Attualmente questo sito non utilizza cookie analitici di terze parti. Qualora venissero introdotti in futuro, sarà richiesto il consenso esplicito dell'utente prima della loro installazione.
          </p>

          <h3 className="text-[11px] tracking-[0.15em] uppercase mt-4 mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Cookie di Profilazione (previo consenso)</h3>
          <p>
            Attualmente questo sito non utilizza cookie di profilazione. Qualora venissero introdotti, l'utente sarà informato e dovrà esprimere un consenso esplicito e attivo.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>3. Gestione dei Cookie</h2>
          <p>
            L'utente può gestire le preferenze sui cookie direttamente dal banner presente sul sito alla prima visita. È inoltre possibile disabilitare i cookie attraverso le impostazioni del proprio browser:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D97757' }}>Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D97757' }}>Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D97757' }}>Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D97757' }}>Microsoft Edge</a></li>
          </ul>
          <p className="mt-2">
            La disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento del sito.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>4. Titolare del Trattamento</h2>
          <p>
            Mattia Intini – Libero Professionista<br />
            Email: <a href="mailto:intiniwebatelier@gmail.com" className="underline" style={{ color: '#D97757' }}>intiniwebatelier@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>5. Diritti dell'Utente</h2>
          <p>
            Per maggiori informazioni sui diritti dell'utente in materia di protezione dei dati personali, si rimanda alla nostra <Link to="/privacy-policy" className="underline" style={{ color: '#D97757' }}>Informativa sulla Privacy</Link>.
          </p>
          <p className="mt-2">Ultimo aggiornamento: Aprile 2026</p>
        </section>
      </div>
    </div>
  </div>
);

export default CookiePolicy;
