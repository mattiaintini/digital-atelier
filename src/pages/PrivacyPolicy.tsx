import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-16 py-12">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase mb-10 transition-colors" style={{ color: 'rgba(217,119,87,0.6)' }}>
        <ArrowLeft size={14} /> Torna alla Home
      </Link>

      <h1 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>
        Informativa sulla Privacy
      </h1>
      <p className="text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Ultimo aggiornamento: 14 aprile 2026
      </p>

      <div className="space-y-8 text-sm leading-[1.8]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>

        <p>
          Intini Web Atelier (di seguito "noi" o "il Titolare") gestisce il sito web intiniwebatelier.com. La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito, ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.
        </p>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Titolare del trattamento</h2>
          <p>
            Intini Web Atelier<br />
            Sito web: <a href="https://intiniwebatelier.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D97757' }}>intiniwebatelier.com</a><br />
            Email: <a href="mailto:info@intiniwebatelier.com" className="underline" style={{ color: '#D97757' }}>info@intiniwebatelier.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Dati raccolti</h2>
          <p>
            <strong>Dati di navigazione:</strong> durante la consultazione del sito vengono acquisiti automaticamente alcuni dati tecnici, tra cui indirizzo IP, tipo di browser, sistema operativo, pagine visitate e orari di accesso. Questi dati vengono utilizzati esclusivamente per finalità statistiche anonime e per garantire il corretto funzionamento del sito.
          </p>
          <p className="mt-3">
            <strong>Dati forniti volontariamente:</strong> se l'utente compila un modulo di contatto o invia un'email, vengono raccolti il nome, l'indirizzo email e il contenuto del messaggio.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Finalità e base giuridica del trattamento</h2>
          <p>I dati sono trattati per le seguenti finalità:</p>
          <ul className="list-none mt-2 space-y-1">
            <li>— Funzionamento tecnico del sito (base giuridica: legittimo interesse)</li>
            <li>— Analisi anonima del traffico tramite cookie analitici (base giuridica: consenso dell'utente)</li>
            <li>— Risposta a richieste di contatto (base giuridica: esecuzione di misure precontrattuali)</li>
            <li>— Adempimento di obblighi di legge</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Condivisione dei dati</h2>
          <p>
            I dati personali non vengono venduti a terzi. Potrebbero essere condivisi con fornitori di servizi tecnici (hosting, strumenti di analisi come Google Analytics) che trattano i dati in qualità di responsabili del trattamento, nel rispetto del GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Trasferimento dei dati extra-UE</h2>
          <p>
            Alcuni servizi di terze parti (es. Google Analytics) potrebbero comportare il trasferimento dei dati verso paesi al di fuori dell'Unione Europea. In tali casi, il trasferimento avviene sulla base di garanzie adeguate previste dal GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Periodo di conservazione</h2>
          <p>
            I dati di navigazione vengono conservati per il tempo strettamente necessario alle finalità per cui sono raccolti. I dati forniti tramite moduli di contatto sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 24 mesi.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Diritti dell'utente</h2>
          <p>
            L'utente ha il diritto di accedere ai propri dati, richiederne la rettifica o la cancellazione, limitare il trattamento, opporsi al trattamento e richiedere la portabilità dei dati. Per esercitare questi diritti è possibile scrivere a <a href="mailto:info@intiniwebatelier.com" className="underline" style={{ color: '#D97757' }}>info@intiniwebatelier.com</a>. L'utente ha inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#D97757' }}>www.garanteprivacy.it</a>).
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>Modifiche a questa informativa</h2>
          <p>
            Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento. La data dell'ultimo aggiornamento è indicata in alto.
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
