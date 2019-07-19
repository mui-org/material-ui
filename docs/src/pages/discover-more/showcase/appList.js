/**
 * The app structure:
 *
 * {
 *   title: string;
 *   description: string;
 *   image?: string;
 *   link: string;
 *   source?: string;
 *   similarWebVisits?: number;
 *   dateAdded: string; // ISO 8601 format: YYYY-MM-DD
 * }
 */
const appList = [
  {
    title: 'Cervezapedia',
    description:
      'Cervezapedia helps you to explore the world of beer. ' +
      'Learn about styles, find thousands of beers ratings, track your personal beer list, ' +
      'create your restaurant or bar menu online.',
    image: 'cervezapedia.png',
    link: 'https://cervezapedia.com/beer-tracker',
    similarWebVisits: 2800,
    dateAdded: '2019-07-19',
  },
  {
    title: 'QuintoAndar',
    description:
      'QuintoAndar is a company that uses technology and ' +
      'design to simplify the rental of residential real estate.',
    image: 'quintoandar.png',
    link: 'https://www.quintoandar.com.br/',
    similarWebVisits: 3000,
    dateAdded: '2019-05-08',
  },
  {
    title: 'Bethesda.net',
    description:
      'The official site for Bethesda, publisher of Fallout, DOOM, Dishonored, ' +
      'Skyrim, Wolfenstein, The Elder Scrolls, more. Your source for news, features & community.',
    image: 'bethesda.jpg',
    link: 'https://bethesda.net/',
    similarWebVisits: 18600,
    dateAdded: '2019-01-01',
  },
  {
    title: 'Better Business Bureau',
    description:
      'Better Business Bureau helps United States consumers find businesses and charities they ' +
      'can trust.',
    image: 'bbb.jpg',
    link: 'https://www.bbb.org/',
    similarWebVisits: 11000,
    dateAdded: '2019-01-01',
  },
  {
    title: 'OpenClassrooms',
    description:
      'OpenClassrooms is an online platform offering top quality, ' +
      'education-to-employment programs and career coaching services for students worldwide. ',
    image: 'openclassrooms.jpg',
    link: 'https://openclassrooms.com/en/',
    similarWebVisits: 10190,
    dateAdded: '2000-01-34',
  },
  {
    title: 'Leroy Merlin',
    description:
      'Per i vostri progetti di bricolage, giardinaggio e miglioramento della casa, ' +
      'Leroy Merlin propone una grande scelta di marche al prezzo migliore. ' +
      'Tanti prodotti per tutta la casa: bagno, cucina, giardino, riscaldamento, elettricità, ' +
      'idraulica… Ritira in negozio o ricevi comodamente a casa. 🇮🇹',
    image: 'leroymerlin.jpg',
    link: 'https://www.leroymerlin.it/',
    similarWebVisits: 4400,
    dateAdded: '2019-01-01',
  },
  {
    title: 'Codementor',
    description:
      'Codementor is the largest community for developer mentorship and an on-demand marketplace ' +
      'for software developers. Get instant coding help, build projects faster, ' +
      'and read programming tutorials from our community of developers.',
    image: 'codementor.jpg',
    link: 'https://www.codementor.io/',
    similarWebVisits: 2980,
    dateAdded: '2000-01-34',
  },
  {
    title: 'BARKS',
    description: 'Japan Music Network. 🇯🇵',
    image: 'barks.jpg',
    link: 'https://www.barks.jp/',
    similarWebVisits: 2700,
    dateAdded: '2019-01-01',
  },
  {
    title: 'GovX',
    description:
      'Current & former uniformed professionals get exclusive access to deals ' +
      'on gear, apparel, tickets, travel and more.',
    image: 'govx.jpg',
    link: 'https://www.govx.com/',
    similarWebVisits: 1200,
    dateAdded: '2000-01-31',
  },
  {
    title: 'SFR Presse',
    description:
      'SFR Presse provides the best access to french newspapers, ' +
      'magazines and real time streams, personalized for you. 🇫🇷',
    image: 'sfrpresse.jpg',
    link: 'https://sfrpresse.sfr.fr/',
    similarWebVisits: 710,
    dateAdded: '2000-01-25',
  },
  {
    title: 'AospExtended Download center',
    description:
      'A download center that hosts all the official builds of AospExtended ROM, ' +
      'for supported devices for different android versions.',
    image: 'aexdownloadcenter.jpg',
    link: 'https://downloads.aospextended.com/',
    similarWebVisits: 730,
    dateAdded: '2000-01-28',
  },
  {
    title: 'Sweek',
    description:
      'Read thousands of free books, stories and serials on Sweek. ' +
      'Challenge yourself in writing. Turn your stories into books via Sweek Publishing. ' +
      'Join the global community of readers and writers!',
    image: 'sweek.jpg',
    link: 'https://sweek.com/',
    similarWebVisits: 383,
    dateAdded: '2019-01-01',
  },
  {
    title: 'Hijup',
    description: 'A pioneering Muslim Fashion e-commerce site.',
    image: 'hijup.jpg',
    link: 'https://www.hijup.com/',
    similarWebVisits: 328,
    dateAdded: '2000-01-18',
  },
  {
    title: 'iFit',
    description:
      'Get the best personal training, right at home. Access hundreds of training programs, ' +
      'unique health tips, and expert advice that will lead you to a healthier lifestyle.',
    image: 'ifit.jpg',
    link: 'https://www.ifit.com/',
    similarWebVisits: 304,
    dateAdded: '2019-01-01',
  },
  {
    title: 'NEO Tracker',
    description: 'NEO blockchain explorer and wallet.',
    image: 'neotracker.jpg',
    link: 'https://neotracker.io/',
    similarWebVisits: 350,
    dateAdded: '2019-01-01',
  },
  {
    title: 'EQ3',
    description: 'Modern Furniture & Accessories, designed in Canada, for everyday living.',
    image: 'eq3.jpg',
    link: 'https://www.eq3.com/ca/en/',
    similarWebVisits: 256,
    dateAdded: '2000-01-34',
  },
  {
    title: 'Housecall Pro',
    description:
      'The #1 rated mobile software to run your home service business. ' +
      'Schedule, dispatch, GPS track employees, invoice, accept credit cards and get booked ' +
      'online. The marketing website is also built with Material-UI: https://www.housecallpro.com/',
    image: 'housecall.jpg',
    link: 'https://pro.housecall.io/pro/log_in',
    similarWebVisits: 214,
    dateAdded: '2019-01-01',
  },
  {
    title: 'BitCambio',
    description:
      'A BitCambio oferece a facilidade de comprar e vender a moeda virtual bitcoin ' +
      'de forma direta e segura no Brasil. 🇧🇷',
    image: 'bitcambio.jpg',
    link: 'https://bitcambio.com.br/',
    similarWebVisits: 148,
    dateAdded: '2019-01-01',
  },
  {
    title: 'VMware CloudHealth',
    description:
      'The most trusted cloud management platform that enables users to analyze and manage cloud ' +
      'cost, usage and performance in one place. ' +
      '(Used for the business application, but not the marketing website.)',
    image: 'cloudhealth.jpg',
    link: 'https://www.cloudhealthtech.com/',
    similarWebVisits: 132,
    dateAdded: '2000-01-37',
  },
  {
    title: 'CityAds',
    description:
      'CityAds Media: global technology platform for online performance marketing ' +
      'powered by big data',
    image: 'cityads.jpg',
    link: 'https://cityads.com/main',
    similarWebVisits: 132,
    dateAdded: '2019-01-01',
  },
  {
    title: 'EOS Toolkit',
    description:
      'EOSToolkit is the premier free, open source interface for managing EOS ' +
      'accounts. Create, transfer, stake, vote and more with Scatter!',
    image: 'eostoolkit.jpg',
    link: 'https://www.eostoolkit.io/',
    source: 'https://github.com/generEOS/eostoolkit',
    stars: 43,
    similarWebVisits: 123,
    dateAdded: '2019-01-01',
  },
  {
    title: 'The Media Ant',
    description:
      "India's Largest online marketing service provider, " +
      'with more than 200K advertising options, and more than 1M satisfied customers.',
    image: 'themediaant.jpg',
    link: 'https://www.themediaant.com/',
    similarWebVisits: 112,
    dateAdded: '2019-01-01',
  },
  {
    title: 'Forex Bank',
    description:
      'Vi kan tilby kjapp og enkel valutaveksling, pengeoverføringer, samt kjøp av norsk veksel. ' +
      '🇳🇴',
    image: 'forex.jpg',
    link: 'https://www.forex.no/',
    similarWebVisits: 95,
    dateAdded: '2000-01-34',
  },
  {
    title: 'Numerai',
    description: ' Earn cryptocurrency in weekly data science competitions.',
    image: 'numerai.jpg',
    link: 'https://numer.ai/homepage',
    similarWebVisits: 65,
    dateAdded: '2019-01-01',
  },
  {
    title: 'LocalMonero',
    description:
      'A safe and easy-to-use person-to-person platform to allow anyone ' +
      'to trade their local currency for Monero, anywhere.',
    image: 'localmonero.jpg',
    link: 'https://localmonero.co/?rc=ogps',
    dateAdded: '2000-01-04',
  },
  {
    title: 'LessWrong',
    description: 'LessWrong is a community blog devoted to the art of human rationality.',
    image: 'lesswrong.jpg',
    link: 'https://www.lesswrong.com/',
    similarWebVisits: 774,
    dateAdded: '2000-01-38',
  },
  {
    title: 'Fizix',
    description: 'Coaching sportif à domicile. 🇫🇷',
    image: 'fizix.jpg',
    link: 'https://www.fizix.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Venuemob',
    description:
      'A platform for individuals and businesses to find and book the perfect venue for any event.',
    image: 'venuemob.jpg',
    link: 'https://venuemob.com.au/',
    dateAdded: '2000-01-02',
  },
  {
    title: 'ODIGEO Connect',
    description:
      'Connect your hotel, B&B and apartment with Europe’s #1 flight OTA ' +
      'and distribute it to millions of travellers.',
    image: 'odigeo.jpg',
    link: 'https://www.odigeoconnect.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'comet',
    description:
      'Comet lets you track code, experiments, and results on ML projects. ' +
      'It’s fast, simple, and free for open source projects.',
    image: 'comet.jpg',
    link: 'https://www.comet.ml/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Pointer',
    description:
      'Revestimentos cerâmicos para pisos e paredes com qualidade e design acessível. ' +
      'A Pointer faz parte da Portobello e atua no Nordeste do Brasil. 🇧🇷',
    image: 'pointer.jpg',
    link: 'https://www.pointer.com.br/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Oneplanetcrowd',
    description:
      'Oneplanetcrowd is Europe’s leading sustainable crowdfunding platform for People & Planet.',
    image: 'oneplanetcrowd.jpg',
    link: 'https://www.oneplanetcrowd.com/en',
    dateAdded: '2019-01-01',
  },
  {
    title: 'CollegeAI',
    description:
      'Get a college recommendation and your chances using the best college predictor. ' +
      "Answer some questions and we'll calculate where you fit in best with our college finder " +
      'and college matching tools. CollegeAI is an admissions and college counselor, college ' +
      'planner, and college chance calculator.',
    image: 'collegeai.jpg',
    link: 'https://collegeai.com',
    dateAdded: '2019-01-01',
  },
  {
    title: 'react-admin',
    description:
      'The admin of an imaginary poster shop, used as a demo for the react-admin framework. ' +
      'Uses many material-ui components, including tables, forms, snackbars, buttons, and ' +
      'theming. The UI is responsive. The code is open-source!',
    image: 'posters-galore.jpg',
    link: 'https://marmelab.com/react-admin-demo/',
    source: 'https://github.com/marmelab/react-admin',
    dateAdded: '2000-01-21',
    stars: 6786,
  },
  {
    title: 'Builder Book',
    description:
      'An open source web app to write and host documentation or sell books. ' +
      'Built with React, Material-UI, Next, Express, Mongoose, MongoDB.',
    image: 'builderbook.jpg',
    link: 'https://builderbook.org/',
    source: 'https://github.com/builderbook/builderbook',
    stars: 1042,
    dateAdded: '2000-01-05',
  },
  {
    title: 'Commit Swimming',
    description: 'The #1 workout journal for coaches and swimmers.',
    image: 'commitswimming.jpg',
    link: 'https://www.commitswimming.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'EventHi',
    description:
      'Cannabis event platform to create and coordinate Cannabis events for the Cannabis ' +
      'community. Use our easy ticketing system, sponsor, and sell merchandise.',
    image: 'eventhi.jpg',
    link: 'https://eventhi.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Cryptoverview: A friendly Dashboard for your cryptocurrency portfolio',
    description:
      "Cryptoverview is a responsive webapp that displays a user's Bittrex portfolio, " +
      'trending currencies and market caps. It provides some fancy charts, ' +
      'news related to cryptocurrencies, and more. (demo:demo)',
    image: 'cryptoverview.jpg',
    link: 'https://cryptoverview.com/',
    dateAdded: '2000-01-09',
  },
  {
    title: 'TuDiscovery',
    description: 'Discovery Channel Latin America. 🇪🇸',
    image: 'tudiscovery.jpg',
    link: 'https://www.tudiscovery.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Iceberg Finder',
    description:
      'Whether spotting them from outer space, or standing on our coastline, ' +
      'IcebergFinder.com is your premier place for finding bergs in Newfoundland and Labrador.',
    image: 'icebergfinder.jpg',
    link: 'https://icebergfinder.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Rare Bits',
    description: 'Rare Bits is a marketplace where users can buy, sell and discover crypto assets.',
    image: 'rarebits.jpg',
    link: 'https://rarebits.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Roast',
    description: 'Roast.io makes web hosting HTML and JS single-page apps fast, secure, and easy.',
    image: 'roast.jpg',
    link: 'https://www.roast.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Melbourne Mint',
    description:
      'The Melbourne Mint has been synonymous with precious metals and currency ' +
      'for over 100 years.',
    image: 'melbournemint.jpg',
    link: 'https://melbournemint.com.au/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Pilcro',
    description: 'A free brand management software for the Google Suite.',
    image: 'pilcro.jpg',
    link: 'https://www.pilcro.com/',
    dateAdded: '2000-01-17',
  },
  {
    title: 'Rung - Exceptionality Management',
    description:
      'Rung alerts you about the exceptionalities of your personal and professional life.',
    image: 'rung.jpg',
    link: 'https://app.rung.com.br/',
    dateAdded: '2000-01-12',
  },
  {
    title: 'MetaFact',
    description:
      'Metafact is a place to verify knowledge via the world’s top experts. ' +
      'It’s a platform to ask questions, learn the facts and share the truth.',
    image: 'metafact.jpg',
    link: 'https://metafact.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Arkopharma',
    description: 'Arkopharma Laboritories customer loyalty site. 🇫🇷',
    image: 'arkoclub.jpg',
    link: 'https://www.arkoclub.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Modole Language Exchange',
    description:
      "Web app that allows users to write in the language they're learning " +
      'and have it corrected by native speakers.',
    image: 'modole.jpg',
    link: 'https://en.modole.io/',
    dateAdded: '2000-01-06',
  },
  {
    title: 'Manty Vision',
    description:
      'An Open Data tool showing financial and demographic data for all the towns in France.',
    image: 'manty.jpg',
    link: 'https://app.manty.eu/',
    dateAdded: '2000-01-01',
  },
  {
    title: 'Johnny Metrics',
    description: 'Upload your trades, and analyze your crypto portfolio.',
    link: 'https://app.johnnymetrics.com/demo',
    image: 'johnnymetrics.jpg',
    dateAdded: '2000-01-14',
  },
  {
    title: 'AudioNodes',
    description:
      'Modular audio production suite with multi-track audio mixing, audio effects, ' +
      'parameter automation, MIDI editing, synthesis, cloud production, and more.',
    image: 'audionodes.jpg',
    link: 'https://audionodes.com/',
    dateAdded: '2000-01-07',
  },
  {
    title: 'SlidesUp',
    description: 'SlidesUp is a platform to help conference organizers plan their events.',
    image: 'slidesup.jpg',
    link: 'https://slidesup.com/',
    dateAdded: '2000-01-03',
  },
  {
    title: 'Trafikito',
    description:
      'Free servers monitoring solution which can track any output of any command and do ' +
      'automated action. By default it tracks average load, CPU, HDD, RAM and sends email when ' +
      'something is going wrong.',
    image: 'trafikito-monitoring.jpg',
    link: 'https://trafikito.com/',
    dateAdded: '2000-01-20',
  },
  {
    title: 'Hokan',
    description:
      'Customer management and contract management we service for the insurance industry. 🇯🇵',
    image: 'hkn.jpg',
    link: 'https://hkn.jp/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'One Shot Move',
    description: 'An LA based moving company.',
    image: 'oneshotmove.jpg',
    link: 'https://www.oneshotmove.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Fluxguard',
    description:
      'Fluxguard monitors Web site changes for defacement & tamper protection, visual ' +
      'regression testing, synthetic transaction monitoring, and more.',
    image: 'fluxguard.jpg',
    link: 'https://fluxguard.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Magic Mondayz',
    description:
      'A company that focuses on providing an honest and efficient recruitment service, ' +
      'the human way.',
    image: 'magicmondayz.jpg',
    link: 'https://magicmondayz.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Typekev',
    description:
      'The personal website of a React and Blockchain developer. The code is open-source.',
    image: 'typekev.jpg',
    link: 'https://typekev.com/',
    source: 'https://github.com/typekev/typekev-site',
    stars: 8,
    dateAdded: '2000-01-23',
  },
  {
    title: 'Flink',
    description:
      'We revolutionized the insurance contract and developed new products that are ' +
      'ahead of their time: MyThings and MyDamages. With only half a page of text and simple ' +
      'illustrations, we have developed the shortest insurance contracts worldwide. ' +
      'And the simplest.',
    image: 'flink.jpg',
    link: 'https://www.goflink.ch/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'DropDesk',
    description:
      'DropDesk creates unique workspaces & experiences by converting unused space into vibrant ' +
      'coworking spaces. Meet, work and gain a sense of community.',
    image: 'dropdesk.jpg',
    link: 'https://drop-desk.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Tentu',
    description:
      'A web app built with Material-UI v1 and Firebase that offers the user news and events ' +
      'of interest. 🇪🇸',
    link: 'https://tentu.eus/',
    image: 'tentu.jpg',
    dateAdded: '2000-01-22',
  },
  {
    title: 'Swimmy',
    description: 'An open source forum PWA. 🇯🇵 (Github docs are in English)',
    image: 'swimmy.jpg',
    link: 'https://swimmy.io/',
    source: 'https://github.com/swimmy/swimmy.io',
    stars: 4,
    dateAdded: '2000-01-27',
  },
  {
    title: 'Planalyze',
    description:
      'Planalyze is a real-time daily planning & task tracking tool that keeps teams connected ' +
      "& ahead of each day's workload.",
    image: 'planalyze.jpg',
    link: 'https://www.planalyze.io/',
    dateAdded: '2000-01-10',
  },
  {
    title: 'PhotoUtils',
    description: 'Online photo editor. 6 simple and free image editing tools.',
    image: 'photoutils.jpg',
    link: 'https://photoutils.com/',
    dateAdded: '2000-01-32',
  },
  {
    title: 'Local Insights',
    description:
      'A real estate data provider that aggregates and analyzes property records, ' +
      'permits, and tax documents.',
    image: 'localinsights.jpg',
    link: 'https://localinsights.io/',
    dateAdded: '2000-01-16',
  },
  {
    title: 'Code Typing Tutor',
    description: 'Keyboard simulator that helps to write code quickly and without errors.',
    image: 'code-typing-tutor.png',
    link: 'https://code-typing-tutor.com/',
    dateAdded: '2000-01-29',
  },
  {
    title: 'npm registry browser',
    description:
      'An open source web app that lets you search the npm registry ' +
      'and browse packages details.',
    image: 'npm-registry-browser.jpg',
    link: 'https://topheman.github.io/npm-registry-browser/',
    source: 'https://github.com/topheman/npm-registry-browser',
    stars: 78,
    dateAdded: '2000-01-15',
  },
  {
    title: 'Snippets Chrome Extension',
    description:
      'An open source Chrome extension allowing you to import and execute JavaScript code ' +
      'snippets from GitHub.',
    image: 'snippets.jpg',
    link: 'https://chrome.google.com/webstore/detail/snippets/dcibnkkafifbanoclgjbkmkbogijndin',
    source: 'https://github.com/richardscarrott/snippets',
    stars: 38,
    dateAdded: '2000-01-19',
  },
  {
    title: 'Material Blog',
    description:
      'An open source blog with a UI built entirely using material-ui v1. ' +
      'Check out the theming page, which leverages `ThemeProvider` ' +
      'to allow for live theme changes.',
    link: 'https://jdupont.github.io/',
    source: 'https://github.com/jdupont/jdupont.github.io',
    stars: 14,
    dateAdded: '2000-01-11',
  },
  {
    title: 'Tree',
    description:
      'An open source top 100 documentaries (personal opinion) app ' +
      'with React Hooks and Material-UI.',
    link: 'https://tree.valleyease.me/',
    image: 'tree.jpg',
    source: 'https://github.com/ValleyZw/tree',
    stars: 9,
    dateAdded: '2000-01-35',
  },
  {
    title: 'Componofy: Spotify Playlist Combination',
    description:
      'An open source web app that allows a Spotify user to combine private and public playlists ' +
      'and either create a new one or merge with existing playlist. ' +
      'You can also reorder your playlist tracks and upload new playlist cover images.',
    link: 'https://componofy.herokuapp.com/',
    source: 'https://github.com/DalerAsrorov/componofy',
    stars: 6,
    dateAdded: '2000-01-08',
  },
  {
    title: 'Persona',
    description: 'Zero knowledge digital identity management system built on blockchain.',
    link: 'https://persona.im/',
    image: 'persona.jpg',
    dateAdded: '2019-01-27',
  },
  {
    title: 'MQTT Explorer',
    description:
      'A comprehensive MQTT Client which visualizes broker traffic in a hierarchical view. ' +
      'The protocol is used in many IoT and home automation scenarios, ' +
      'making integrating new services dead easy.',
    link: 'https://mqtt-explorer.com/',
    source: 'https://github.com/thomasnordquist/MQTT-Explorer',
    image: 'mqtt-explorer.png',
    stars: 121,
    dateAdded: '2019-03-25',
  },
  {
    title: 'Learnseeker',
    description:
      'A data driven 1-1 tuition matching platform. ' +
      'Incubated at the National University of Singapore. ' +
      "It's based on one of our premium theme.",
    link: 'https://learnseeker.sg/',
    image: 'learnseeker.jpg',
    dateAdded: '2019-03-26',
  },
];

export default appList;
