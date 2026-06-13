import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-16 py-12">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase mb-10 transition-colors" style={{ color: 'rgba(217,119,87,0.6)' }}>
        <ArrowLeft size={14} /> Torna alla Home
      </Link>

      <h1 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#D97757' }}>
        Termini e Condizioni
      </h1>
      <p className="text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Ultimo aggiornamento: 14 aprile 2026
      </p>

      <div className="space-y-8 text-sm leading-[1.8]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>

        <p>
          I presenti Termini e Condizioni regolano l'utilizzo del sito web intiniwebatelier.com, gestito da Intini Web Atelier.
        </p>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>1. Accettazione dei termini</h2>
          <p>
            Accedendo e utilizzando questo sito web, l'utente accetta integralmente i presenti Termini e Condizioni. Se non si accettano tali termini, si prega di non utilizzare il sito.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>2. Descrizione del servizio</h2>
          <p>
            Intini Web Atelier offre servizi di progettazione e sviluppo di siti web su misura. Il sito intiniwebatelier.com ha lo scopo di presentare i servizi offerti, mostrare il portfolio dei lavori realizzati e consentire agli utenti di richiedere informazioni o preventivi.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>3. Proprietà intellettuale</h2>
          <p>
            Tutti i contenuti presenti sul sito — inclusi testi, immagini, loghi, grafiche, video, layout e codice — sono di proprietà di Intini Web Atelier o dei rispettivi titolari e sono protetti dalla normativa italiana e internazionale in materia di diritto d'autore e proprietà intellettuale. È vietata la riproduzione, distribuzione, modifica o utilizzo di qualsiasi contenuto senza autorizzazione scritta.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>4. Utilizzo del sito</h2>
          <p>
            L'utente si impegna a utilizzare il sito in modo lecito e conforme alla legge. È vietato utilizzare il sito per scopi illegali, diffondere contenuti dannosi o tentare di compromettere la sicurezza del sito.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>5. Limitazione di responsabilità</h2>
          <p>
            Intini Web Atelier si impegna a mantenere le informazioni sul sito accurate e aggiornate, ma non garantisce la completezza o l'esattezza dei contenuti. Il sito viene fornito "così com'è" e Intini Web Atelier non sarà responsabile per eventuali danni diretti o indiretti derivanti dall'utilizzo del sito o dall'impossibilità di utilizzarlo.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>6. Link a siti esterni</h2>
          <p>
            Il sito potrebbe contenere link a siti web di terze parti. Intini Web Atelier non è responsabile dei contenuti, delle politiche sulla privacy o delle pratiche di tali siti esterni.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>7. Modifiche ai termini</h2>
          <p>
            Intini Web Atelier si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche saranno effettive dal momento della loro pubblicazione sul sito. L'uso continuato del sito dopo la pubblicazione delle modifiche costituisce accettazione delle stesse.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>8. Legge applicabile e foro competente</h2>
          <p>
            I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall'utilizzo del sito sarà competente il Foro del luogo di residenza del Titolare.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(217,119,87,0.7)' }}>9. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa ai presenti Termini e Condizioni, è possibile contattarci all'indirizzo <a href="mailto:info@intiniwebatelier.com" className="underline" style={{ color: '#D97757' }}>info@intiniwebatelier.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default TermsAndConditions;
