import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'IT';

export const translations = {
  EN: {
    // Navigation
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    
    // Hero
    'hero.title.frame': 'FRAME',
    'hero.title.everything': 'EVERYTHING',
    'hero.subtitle': 'Visual Narrative • Editorial Archive • MMXXVI',
    
    // Archive
    'archive.title': 'Editorial\nArchive.',
    'archive.filter.all': 'ALL',
    'archive.filter.weddings': 'WEDDINGS',
    'archive.filter.festivals': 'FESTIVALS',
    'archive.filter.culture': 'CULTURE',
    'archive.filter.wildlife': 'WILDLIFE',
    'archive.filter.events': 'EVENTS',
    'archive.view_archive': 'VIEW ARCHIVE',
    
    // Stats labels
    'stats.shoots': 'Shoots',
    'stats.countries': 'Countries',
    'stats.delivery': '48hr Delivery',
    'stats.rating': 'Rating',
    
    // Process Section
    'process.title': 'Process',
    'process.subtitle': 'Key Deliverable',
    'process.deliverable': 'Bespoke Editorial Gallery',
    // Steps - Title
    'process.step.1.title': 'Book',
    'process.step.2.title': 'Shoot',
    'process.step.3.title': 'Develop',
    'process.step.4.title': 'Deliver',
    // Steps - Short
    'process.step.1.short': 'A deep dive into your vision. We align aesthetics.',
    'process.step.2.short': 'Minimal intervention. Maximum presence. Natural shadows.',
    'process.step.3.short': 'Artisan digital darkroom grading & calibration.',
    'process.step.4.short': 'Bespoke high-fidelity digital frame gallery.',
    // Steps - Long
    'process.step.1.long': "The journey begins with an intimate dialogue. We don't just ask about the schedule; we explore the emotional geography of your event. Through shared moodboards and cinematic references, we define a visual language that honors your story. This phase is about trust and technical preparation—scouting for light patterns and understanding the rhythm of the day.",
    'process.step.2.long': "On-site, we cultivate a quiet presence. We do not manufacture moments; we witness them. Operating at the intersection of natural light and raw environment, we document the unspoken connections, the fleeting glances, and the cinematic architecture of the day, ensuring the atmosphere is preserved exactly as it felt.",
    'process.step.3.long': "Raw frames are brought into our custom digital darkroom. Each selected frame undergoes meticulous tone adjustment, grain rendering, and color grading. We draw from the timeless qualities of classic film stocks, applying rich density, subtle contrasts, and poetic shadows that turn moments into archival art.",
    'process.step.4.long': "Your completed narrative is delivered in an exquisite, modern online gallery. Designed for high-fidelity viewing, it is more than a folder of files—it is an interactive editorial retrospective. Complete with high-resolution archive downloads and web-optimized sharing versions, ready for print or digital preservation.",

    // About section / Ethos
    'about.ethos': 'Our Ethos',
    'about.heading': 'The Romantic Subject.\nThe Mechanical Observer.',
    'about.description': 'Operating between Milano and global destinations, we compose visual poetry through a rigorous editorial lens. Our cameras do not merely document; they perceive. Every frame is a study in quiet poise, stark contrasts, and absolute architectural clarity.',
    'about.eye.title': 'The Eye',
    'about.eye.subtitle': 'Visual Direction',
    'about.lab.title': 'The Lab',
    'about.lab.subtitle': 'Cinematic Grading',
    'about.reveal.bg': 'Portrait Reveal Background',
    'about.reveal.fg': 'Portrait Reveal Foreground',
    'about.interactive.reveal': 'Hold and Drag to Reveal Color Tone',
    'about.expand_btn.more': 'Expand for More',
    'about.expand_btn.less': 'Show Less',
    'about.extended_bio.title': 'Archival Philosophy & Heritage',
    'about.extended_bio.p1': 'Founded with a devotion to the interplay between human presence and spatial geometry, our practice captures the rare, unscripted poetry of moments. Each assignment is approached not as a simple recording, but as a deliberate dialogue with ambient light and quiet architecture.',
    'about.extended_bio.p2': 'Our approach draws deep inspiration from mid-century film noir, European avant-garde fashion editorials, and minimalist spatial design. We work with specialized digital reproduction methods that preserve the tactile grain, high-contrast values, and evocative deep shadows characteristic of classical silver halide emulsions.',
    'about.extended_bio.p3': 'By marrying digital versatility with the rigorous discipline of medium-format analogue framing, we offer a truly singular creative direction. Whether framing silent, untamed landscapes or the haute-couture energy of modern runways, we distill chaos into balanced, quiet, archival frames.',
    
    // Testimonials
    'testimonials.title': 'Reviews',
    
    // Contact
    'contact.inquiries': 'Inquiries',
    'contact.heading': 'Start the\nDialogue.',
    'contact.description': 'Whether planning an editorial campaign, private ceremony, or conceptual project. Fill the matrix to initiate creative calibration.',
    'contact.email': 'Electronic Mail',
    'contact.location': 'Studio Location',
    'contact.received': 'Received.',
    'contact.received.desc': 'We will respond within 24 hours to begin the dialogue.',
    // Form placeholder/labels
    'form.name': 'Your Identity Name',
    'form.email': 'Electronic Mail Address',
    'form.genre': 'NARRATIVE GENRE',
    'form.vision': 'YOUR CREATIVE VISION DESCRIPTION',
    'form.submit': 'Send Request',
    'form.submitting': 'Sending...',
    
    // DrkRoom
    'darkroom.on': 'DARKROOM ACTIVE',
    'darkroom.off': 'SAFELIGHT MODE',

    // FullWorkPage / Project detail
    'project.location': 'Location',
    'project.location.val': 'International Archive',
    'project.format': 'Format',
    'project.format.val': '35mm Digital',
    'project.close': 'Close Archive',
    'project.related': 'Related Narratives',
    'project.category': 'Category',
    'project.back': 'Back to Narrative',
    
    // AI Frame Studio
    'ai.studio.title': 'AI Frame Studio',
    'ai.studio.subtitle': 'Bespoke AI Film Slate Simulator',
    'ai.studio.help': 'Synthesize simulated frames for this narrative genre using Gemini Neural Imaging presets.',
    'ai.studio.recommendations': 'Dynamic Recommendations',
    'ai.studio.input_label': 'Prompt Description',
    'ai.studio.placeholder': 'Describe your subject scene or click a recommendation above...',
    'ai.studio.mood': 'Aesthetic Mood',
    'ai.studio.mood.default': 'Default (Neutral Preset)',
    'ai.studio.composition': 'Composition',
    'ai.studio.composition.default': 'Default (Neutral Preset)',
    'ai.studio.preset': 'Visual Rendering Preset',
    'ai.studio.formula': 'Formula Preview:',
    'ai.studio.empty_subject': '[Empty subject description]',
    'ai.studio.btn_generate': 'Capture & Add Frame',
    
    // Project Names
    'project.amalfi': 'The Amalfi Coast',
    'project.vogue': 'Vogue September',
    'project.paris': 'Paris Fashion Week',
    'project.artist': 'The Artist',
    'project.wilderness': 'Symphony of the Wild',
    'project.untamed': 'Untamed Landscapes',
    'project.apex': 'Apex Majesty',
    'project.avian': 'Avian Elegance',
    'project.savannah': 'Savannah Whispers',
    'project.silent_majesty': 'Silent Majesty',
    'project.golden_hours': 'Golden Hours',
    'project.whispering_canopy': 'Whispering Canopy',
    'project.alpine_serenade': 'Alpine Serenade',
    'project.shadow_chaser': 'Shadow Chaser',
    'project.ethereal_crest': 'Ethereal Crest',
    'project.wild_haven': 'Wild Haven',
    'project.savannah_guardian': 'Savannah Guardian',
    'project.noble_stare': 'Noble Stare',
    'project.primal_grace': 'Primal Grace',
    'project.mountain_monarch': 'Mountain Monarch',
    'project.dusk_patrol': 'Dusk Patrol',
    'project.soaring_nomad': 'Soaring Nomad',
    'project.feathered_grace': 'Feathered Grace',
    'project.wind_glider': 'Wind Glider',
    'project.skyward_calling': 'Skyward Calling',
    'project.sacred_plains': 'Sacred Plains',
    'project.golden_mirage': 'Golden Mirage',
    'project.horizon_gaze': 'Horizon Gaze',
    'project.zion_majesty': 'Zion Majesty',
    'project.silence': 'Silence',
    'project.lakecomo': 'Lake Como Villa',
    'project.milan': 'Milan Runway',
    'project.soul': 'Soul',
    'project.venice': 'Venice Art Biennale',
    'project.designweek': 'Milan Design Week',
    'project.scala': 'Teatro alla Scala Gala'
  },
  IT: {
    // Navigation
    'nav.about': 'Chi Siamo',
    'nav.work': 'Lavori',
    'nav.process': 'Processo',
    'nav.contact': 'Contatti',
    'nav.book': 'Prenota Ora',
    
    // Hero
    'hero.title.frame': 'INQUADRA',
    'hero.title.everything': 'TUTTO',
    'hero.subtitle': 'Narrativa Visiva • Archivio Editoriale • MMXXVI',
    
    // Archive
    'archive.title': 'Archivio\nEditoriale.',
    'archive.filter.all': 'TUTTI',
    'archive.filter.weddings': 'MATRIMONI',
    'archive.filter.festivals': 'FESTIVAL',
    'archive.filter.culture': 'CULTURA',
    'archive.filter.wildlife': 'NATURA',
    'archive.filter.events': 'EVENTI',
    'archive.view_archive': 'VEDI ARCHIVIO',
    
    // Stats labels
    'stats.shoots': 'Servizi',
    'stats.countries': 'Paesi',
    'stats.delivery': 'Consegna 48h',
    'stats.rating': 'Valutazione',
    
    // Process Section
    'process.title': 'Processo',
    'process.subtitle': 'Contenuto Chiave',
    'process.deliverable': 'Galleria Editoriale su Misura',
    // Steps - Title
    'process.step.1.title': 'Prenotazione',
    'process.step.2.title': 'Servizio',
    'process.step.3.title': 'Sviluppo',
    'process.step.4.title': 'Consegna',
    // Steps - Short
    'process.step.1.short': 'Una conversazione profonda sul tuo progetto per allineare l\'estetica.',
    'process.step.2.short': 'Intervento minimo. Massima presenza. Ombre naturali.',
    'process.step.3.short': 'Sviluppo artigianale e calibrazione in camera oscura digitale.',
    'process.step.4.short': 'Galleria editoriale digitale ad alta fedeltà.',
    // Steps - Long
    'process.step.1.long': "Il viaggio ha inizio con un dialogo intimo. Non domandiamo semplicemente l'orario; esploriamo la geografia emotiva del vostro evento. Attraverso moodboard condivise e riferimenti cinematografici, definiamo un linguaggio visivo che onora la vostra storia. Questa fase è dedicata alla fiducia e alla preparazione tecnica: studiamo la luce e comprendiamo il ritmo della giornata.",
    'process.step.2.long': "Sul set coltiviamo una presenza silenziosa. Non fabbrichiamo momenti; ne siamo testimoni. Operiamo all'intersezione tra luce naturale e ambiente puro, documentando legami invisibili, sguardi fugaci e la struttura cinematografica del giorno, affinché l'atmosfera sia preservata esattamente come l'avete vissuta.",
    'process.step.3.long': "I fotogrammi grezzi vengono elaborati nella nostra camera oscura digitale personalizzata. Ogni scatto selezionato viene sottoposto a una meticolosa regolazione dei toni, resa della grana e gradazione dei colori. Ci ispiriamo alle qualità senza tempo delle pellicole classiche, applicando contrasti calibrati e ombre ombreggiate che trasformano i momenti in pura arte d'archivio.",
    'process.step.4.long': "Il racconto completo viene consegnato in una raffinata ed elegante galleria online. Progettata per una visione ad alta fedeltà, rappresenta una vera e propria retrospettiva editoriale interattiva, completa di download in alta risoluzione ottimizzati per la stampa e per la condivisione digitale.",

    // About section / Ethos
    'about.ethos': 'Il Nostro Ethos',
    'about.heading': 'Il Soggetto Romantico.\nL\'Osservatore Meccanico.',
    'about.description': 'Operando tra Milano e destinazioni globali, componiamo poesie visive attraverso un rigoroso obiettivo editoriale. Le nostre fotocamere non si limitano a documentare; percepiscono. Ogni scatto è uno studio sulla quiete, sui contrasti netti e sull\'assoluta chiarezza architettonica.',
    'about.eye.title': 'L\'Occhio',
    'about.eye.subtitle': 'Direzione Visiva',
    'about.lab.title': 'Il Lab',
    'about.lab.subtitle': 'Gradazione Cinematografica',
    'about.reveal.bg': 'Sfondo Rivelazione Ritratto',
    'about.reveal.fg': 'Primo Piano Rivelazione Ritratto',
    'about.interactive.reveal': 'Tieni Premuto e Trascina per Rivelare i Colori',
    'about.expand_btn.more': 'Espandi per Maggiori Dettagli',
    'about.expand_btn.less': 'Mostra Meno',
    'about.extended_bio.title': 'Filosofia d\'Archivio e Patrimonio',
    'about.extended_bio.p1': 'Fondata con una profonda devozione all\'interazione tra presenza umana e geometria spaziale, la nostra pratica cattura la rara poesia spontanea dei momenti. Ogni incarico viene affrontato non come una semplice registrazione, ma come un dialogo deliberato con la luce d\'ambiente e l\'architettura silenziosa.',
    'about.extended_bio.p2': 'Il nostro approccio trae profonda ispirazione dal cinema noir di metà secolo, dagli editoriali di moda d\'avanguardia europei e dal design spaziale minimalista. Lavoriamo con metodi di riproduzione digitale specializzati che preservano la grana tattile, i valori ad alto contrasto e le ombre profonde evocative tipiche delle classiche emulsioni all\'alogenuro d\'argento.',
    'about.extended_bio.p3': 'Sposando la versatilità digitale con la rigorosa disciplina dell\'inquadratura analogica di medio formato, offriamo una direzione creativa davvero singolare. Sia che inquadriamo paesaggi silenziosi e selvaggi o l\'energia haute-couture delle passerelle moderne, distilliamo il caos in fotogrammi d\'archivio equilibrati, calmi e senza tempo.',
    
    // Testimonials
    'testimonials.title': 'Recensioni',
    
    // Contact
    'contact.inquiries': 'Informazioni',
    'contact.heading': 'Inizia il\nDialogo.',
    'contact.description': 'Che si tratti di una campagna editoriale, di una cerimonia privata o di un progetto concettuale, compila il modulo per avviare la calibrazione creativa.',
    'contact.email': 'Posta Elettronica',
    'contact.location': 'Sede dello Studio',
    'contact.received': 'Ricevuto.',
    'contact.received.desc': 'Risponderemo entro 24 ore per iniziare il dialogo.',
    // Form placeholder/labels
    'form.name': 'Nome e Identità',
    'form.email': 'Indirizzo Email',
    'form.genre': 'GENERE NARRATIVO',
    'form.vision': 'DESCRIZIONE DELLA VISIONE CREATIVA',
    'form.submit': 'Invia Richiesta',
    'form.submitting': 'Invio...',
    
    // DrkRoom
    'darkroom.on': 'CAMERA OSCURA ATTIVA',
    'darkroom.off': 'MODALITÀ LUCE ROSSA',

    // FullWorkPage / Project detail
    'project.location': 'Posizione',
    'project.location.val': 'Archivio Internazionale',
    'project.format': 'Formato',
    'project.format.val': '35mm Digitale',
    'project.close': 'Chiudi Archivio',
    'project.related': 'Storie Correlate',
    'project.category': 'Categoria',
    'project.back': 'Torna alla Galleria',
    
    // AI Frame Studio
    'ai.studio.title': 'AI Frame Studio',
    'ai.studio.subtitle': 'Simulatore Pellicola AI su Misura',
    'ai.studio.help': 'Sintetizza fotogrammi simulati per questo genere narrativo usando i filtri neurali Gemini.',
    'ai.studio.recommendations': 'Suggerimenti Dinamici',
    'ai.studio.input_label': 'Descrizione Immagine',
    'ai.studio.placeholder': 'Descrivi la scena o seleziona un suggerimento qui sopra...',
    'ai.studio.mood': 'Atmosfera Estetica',
    'ai.studio.mood.default': 'Predefinito (Neutro)',
    'ai.studio.composition': 'Composizione o Inquadratura',
    'ai.studio.composition.default': 'Predefinito (Neutro)',
    'ai.studio.preset': 'Preset di Rendering Visivo',
    'ai.studio.formula': 'Anteprima Formula:',
    'ai.studio.empty_subject': '[Descrizione vuota]',
    'ai.studio.btn_generate': 'Cattura e Incolla Cornice',
    
    // Project Names
    'project.amalfi': 'La Costa d\'Amalfi',
    'project.vogue': 'Vogue Settembre',
    'project.paris': 'Settimana della Moda di Parigi',
    'project.artist': 'L\'Artista',
    'project.wilderness': 'Sinfonia della Natura',
    'project.untamed': 'Paesaggi Incontaminati',
    'project.apex': 'Maestà Suprema',
    'project.avian': 'Eleganza Alata',
    'project.savannah': 'Sussurri della Savana',
    'project.silent_majesty': 'Maestà Silenziosa',
    'project.golden_hours': 'Ore Dorate',
    'project.whispering_canopy': 'Chioma Sussurrante',
    'project.alpine_serenade': 'Serenata Alpina',
    'project.shadow_chaser': 'Inseguitore d\'Ombre',
    'project.ethereal_crest': 'Cresta Eterea',
    'project.wild_haven': 'Rifugio Selvaggio',
    'project.savannah_guardian': 'Guardiano della Savana',
    'project.noble_stare': 'Sguardo Nobile',
    'project.primal_grace': 'Grazia Primordiale',
    'project.mountain_monarch': 'Monarca delle Montagne',
    'project.dusk_patrol': 'Pattuglia del Crepuscolo',
    'project.soaring_nomad': 'Nomade Volante',
    'project.feathered_grace': 'Grazia Piumata',
    'project.wind_glider': 'Aliante del Vento',
    'project.skyward_calling': 'Richiamo del Cielo',
    'project.sacred_plains': 'Pianure Sacre',
    'project.golden_mirage': 'Miraggio Dorato',
    'project.horizon_gaze': 'Sguardo all\'Orizzonte',
    'project.zion_majesty': 'Maestà di Zion',
    'project.silence': 'Silenzio',
    'project.lakecomo': 'Villa sul Lago di Como',
    'project.milan': 'Passerella di Milano',
    'project.soul': 'Anima',
    'project.venice': 'Biennale d\'Arte di Venezia',
    'project.designweek': 'Settimana del Design di Milano',
    'project.scala': 'Gran Galà della Scala'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['EN']) => string;
  getProjectTitle: (title: string) => string;
  getGenreLabel: (genre: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('site_language');
    if (saved === 'EN' || saved === 'IT') {
      return saved;
    }
    return 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'IT' : 'EN');
  };

  const t = (key: keyof typeof translations['EN']): string => {
    const translationSet = translations[language];
    return translationSet[key] || translations['EN'][key] || String(key);
  };

  const getProjectTitle = (title: string): string => {
    switch(title) {
      case 'The Amalfi Coast': return t('project.amalfi');
      case 'Vogue September': return t('project.vogue');
      case 'Paris Fashion Week': return t('project.paris');
      case 'The Artist': return t('project.artist');
      case 'Symphony of the Wild': return t('project.wilderness');
      case 'Untamed Landscapes': return t('project.untamed');
      case 'Apex Majesty': return t('project.apex');
      case 'Avian Elegance': return t('project.avian');
      case 'Savannah Whispers': return t('project.savannah');
      case 'Silent Majesty': return t('project.silent_majesty');
      case 'Golden Hours': return t('project.golden_hours');
      case 'Whispering Canopy': return t('project.whispering_canopy');
      case 'Alpine Serenade': return t('project.alpine_serenade');
      case 'Shadow Chaser': return t('project.shadow_chaser');
      case 'Ethereal Crest': return t('project.ethereal_crest');
      case 'Wild Haven': return t('project.wild_haven');
      case 'Savannah Guardian': return t('project.savannah_guardian');
      case 'Noble Stare': return t('project.noble_stare');
      case 'Primal Grace': return t('project.primal_grace');
      case 'Mountain Monarch': return t('project.mountain_monarch');
      case 'Dusk Patrol': return t('project.dusk_patrol');
      case 'Soaring Nomad': return t('project.soaring_nomad');
      case 'Feathered Grace': return t('project.feathered_grace');
      case 'Wind Glider': return t('project.wind_glider');
      case 'Skyward Calling': return t('project.skyward_calling');
      case 'Sacred Plains': return t('project.sacred_plains');
      case 'Golden Mirage': return t('project.golden_mirage');
      case 'Horizon Gaze': return t('project.horizon_gaze');
      case 'Zion Majesty': return t('project.zion_majesty');
      case 'Silence': return t('project.silence');
      case 'Lake Como Villa': return t('project.lakecomo');
      case 'Milan Runway': return t('project.milan');
      case 'Soul': return t('project.soul');
      case 'Venice Art Biennale': return t('project.venice');
      case 'Milan Design Week': return t('project.designweek');
      case 'Teatro alla Scala Gala': return t('project.scala');
      default: return title;
    }
  };

  const getGenreLabel = (genre: string): string => {
    switch(genre) {
      case 'ALL': return t('archive.filter.all');
      case 'WEDDINGS': return t('archive.filter.weddings');
      case 'FESTIVALS': return t('archive.filter.festivals');
      case 'CULTURE': return t('archive.filter.culture');
      case 'WILDLIFE': return t('archive.filter.wildlife');
      case 'EVENTS': return t('archive.filter.events');
      default: return genre;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, getProjectTitle, getGenreLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
