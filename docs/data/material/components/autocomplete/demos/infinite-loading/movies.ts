export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
}

// Roughly the top 1000 movies from TMDB
// GET https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=title.asc&vote_average.gte=7.5&vote_count.gte=150&with_original_language=en
const movies: Movie[] = [
  {
    id: 19913,
    title: '(500) Days of Summer',
    releaseDate: '2009-07-17',
  },
  {
    id: 17443,
    title: '...And Justice for All',
    releaseDate: '1979-10-19',
  },
  {
    id: 567811,
    title: '10 Lives',
    releaseDate: '2024-04-18',
  },
  {
    id: 26234,
    title: '10 Rillington Place',
    releaseDate: '1971-02-10',
  },
  {
    id: 4951,
    title: '10 Things I Hate About You',
    releaseDate: '1999-03-30',
  },
  {
    id: 12219,
    title: '12 Angry Men',
    releaseDate: '1997-08-17',
  },
  {
    id: 389,
    title: '12 Angry Men',
    releaseDate: '1957-04-10',
  },
  {
    id: 625169,
    title: '12 Mighty Orphans',
    releaseDate: '2021-06-18',
  },
  {
    id: 76203,
    title: '12 Years a Slave',
    releaseDate: '2013-10-18',
  },
  {
    id: 44115,
    title: '127 Hours',
    releaseDate: '2010-11-12',
  },
  {
    id: 300671,
    title: '13 Hours: The Secret Soldiers of Benghazi',
    releaseDate: '2016-01-14',
  },
  {
    id: 407806,
    title: '13th',
    releaseDate: '2016-10-07',
  },
  {
    id: 890825,
    title: '14 Peaks: Nothing Is Impossible',
    releaseDate: '2021-11-12',
  },
  {
    id: 530915,
    title: '1917',
    releaseDate: '2019-12-25',
  },
  {
    id: 710356,
    title: '2 Hearts',
    releaseDate: '2020-10-16',
  },
  {
    id: 1058616,
    title: '20 Days in Mariupol',
    releaseDate: '2023-07-14',
  },
  {
    id: 159014,
    title: '20 Feet from Stardom',
    releaseDate: '2013-06-14',
  },
  {
    id: 246400,
    title: '20,000 Days on Earth',
    releaseDate: '2014-07-05',
  },
  {
    id: 173,
    title: '20,000 Leagues Under the Sea',
    releaseDate: '1954-12-23',
  },
  {
    id: 62,
    title: '2001: A Space Odyssey',
    releaseDate: '1968-04-02',
  },
  {
    id: 342737,
    title: '20th Century Women',
    releaseDate: '2016-12-28',
  },
  {
    id: 470,
    title: '21 Grams',
    releaseDate: '2003-09-06',
  },
  {
    id: 474354,
    title: '22 July',
    releaseDate: '2018-10-04',
  },
  {
    id: 1429,
    title: '25th Hour',
    releaseDate: '2002-12-19',
  },
  {
    id: 170,
    title: '28 Days Later',
    releaseDate: '2002-10-31',
  },
  {
    id: 1272837,
    title: '28 Years Later: The Bone Temple',
    releaseDate: '2026-01-14',
  },
  {
    id: 41662,
    title: '3 Women',
    releaseDate: '1977-04-29',
  },
  {
    id: 1271,
    title: '300',
    releaseDate: '2007-03-07',
  },
  {
    id: 14168,
    title: '3:10 to Yuma',
    releaseDate: '1957-08-07',
  },
  {
    id: 5176,
    title: '3:10 to Yuma',
    releaseDate: '2007-09-06',
  },
  {
    id: 109410,
    title: '42',
    releaseDate: '2013-04-12',
  },
  {
    id: 259954,
    title: '5 to 7',
    releaseDate: '2014-04-19',
  },
  {
    id: 40807,
    title: '50/50',
    releaseDate: '2011-09-30',
  },
  {
    id: 65,
    title: '8 Mile',
    releaseDate: '2002-11-08',
  },
  {
    id: 15677,
    title: '84 Charing Cross Road',
    releaseDate: '1987-02-13',
  },
  {
    id: 98622,
    title: '9',
    releaseDate: '2005-04-21',
  },
  {
    id: 453,
    title: 'A Beautiful Mind',
    releaseDate: '2001-12-14',
  },
  {
    id: 55720,
    title: 'A Better Life',
    releaseDate: '2011-06-24',
  },
  {
    id: 615666,
    title: 'A Boy Called Christmas',
    releaseDate: '2021-11-24',
  },
  {
    id: 5902,
    title: 'A Bridge Too Far',
    releaseDate: '1977-06-15',
  },
  {
    id: 1607,
    title: 'A Bronx Tale',
    releaseDate: '1993-10-01',
  },
  {
    id: 13187,
    title: 'A Charlie Brown Christmas',
    releaseDate: '1965-12-09',
  },
  {
    id: 13479,
    title: 'A Charlie Brown Thanksgiving',
    releaseDate: '1973-11-20',
  },
  {
    id: 13189,
    title: 'A Christmas Carol',
    releaseDate: '1984-10-09',
  },
  {
    id: 850,
    title: 'A Christmas Story',
    releaseDate: '1983-11-18',
  },
  {
    id: 407655,
    title: 'A Cinderella Story: If the Shoe Fits',
    releaseDate: '2016-08-02',
  },
  {
    id: 185,
    title: 'A Clockwork Orange',
    releaseDate: '1971-10-28',
  },
  {
    id: 532,
    title: 'A Close Shave',
    releaseDate: '1996-03-07',
  },
  {
    id: 661539,
    title: 'A Complete Unknown',
    releaseDate: '2024-12-25',
  },
  {
    id: 11939,
    title: 'A Day at the Races',
    releaseDate: '1937-06-11',
  },
  {
    id: 427045,
    title: 'A December Bride',
    releaseDate: '2016-11-20',
  },
  {
    id: 24660,
    title: 'A Detective Story',
    releaseDate: '2003-04-04',
  },
  {
    id: 522518,
    title: "A Dog's Journey",
    releaseDate: '2019-05-03',
  },
  {
    id: 36208,
    title: "A Dog's Life",
    releaseDate: '1918-04-14',
  },
  {
    id: 381289,
    title: "A Dog's Purpose",
    releaseDate: '2017-01-19',
  },
  {
    id: 508763,
    title: "A Dog's Way Home",
    releaseDate: '2019-01-10',
  },
  {
    id: 21849,
    title: 'A Face in the Crowd',
    releaseDate: '1957-05-29',
  },
  {
    id: 881,
    title: 'A Few Good Men',
    releaseDate: '1992-12-11',
  },
  {
    id: 623,
    title: 'A Fish Called Wanda',
    releaseDate: '1988-07-15',
  },
  {
    id: 61650,
    title: 'A Foreign Affair',
    releaseDate: '1948-08-20',
  },
  {
    id: 428449,
    title: 'A Ghost Story',
    releaseDate: '2017-04-24',
  },
  {
    id: 325113,
    title: 'A Girl Like Her',
    releaseDate: '2015-03-27',
  },
  {
    id: 800787,
    title: 'A Good Person',
    releaseDate: '2023-03-23',
  },
  {
    id: 15789,
    title: 'A Goofy Movie',
    releaseDate: '1995-04-05',
  },
  {
    id: 530,
    title: 'A Grand Day Out',
    releaseDate: '1990-05-18',
  },
  {
    id: 704,
    title: "A Hard Day's Night",
    releaseDate: '1964-07-07',
  },
  {
    id: 403300,
    title: 'A Hidden Life',
    releaseDate: '2019-08-27',
  },
  {
    id: 59,
    title: 'A History of Violence',
    releaseDate: '2005-09-23',
  },
  {
    id: 11287,
    title: 'A League of Their Own',
    releaseDate: '1992-07-01',
  },
  {
    id: 45578,
    title: 'A Letter to Three Wives',
    releaseDate: '1948-12-01',
  },
  {
    id: 19101,
    title: 'A Little Princess',
    releaseDate: '1995-05-10',
  },
  {
    id: 674610,
    title: 'A Loud House Christmas',
    releaseDate: '2021-11-26',
  },
  {
    id: 937278,
    title: 'A Man Called Otto',
    releaseDate: '2022-12-28',
  },
  {
    id: 874,
    title: 'A Man for All Seasons',
    releaseDate: '1966-12-13',
  },
  {
    id: 28162,
    title: 'A Matter of Life and Death',
    releaseDate: '1946-12-15',
  },
  {
    id: 14447,
    title: 'A Matter of Loaf and Death',
    releaseDate: '2008-12-26',
  },
  {
    id: 1002185,
    title: 'A Million Miles Away',
    releaseDate: '2023-09-08',
  },
  {
    id: 258230,
    title: 'A Monster Calls',
    releaseDate: '2016-10-07',
  },
  {
    id: 36850,
    title: 'A New Leaf',
    releaseDate: '1971-03-11',
  },
  {
    id: 37719,
    title: 'A Night at the Opera',
    releaseDate: '1935-11-15',
  },
  {
    id: 10971,
    title: 'A Night to Remember',
    releaseDate: '1958-07-03',
  },
  {
    id: 377,
    title: 'A Nightmare on Elm Street',
    releaseDate: '1984-11-09',
  },
  {
    id: 9559,
    title: 'A Perfect World',
    releaseDate: '1993-11-24',
  },
  {
    id: 25673,
    title: 'A Place in the Sun',
    releaseDate: '1951-06-12',
  },
  {
    id: 79113,
    title: 'A Princess for Christmas',
    releaseDate: '2011-12-03',
  },
  {
    id: 447332,
    title: 'A Quiet Place',
    releaseDate: '2018-04-03',
  },
  {
    id: 520763,
    title: 'A Quiet Place Part II',
    releaseDate: '2021-05-21',
  },
  {
    id: 293,
    title: 'A River Runs Through It',
    releaseDate: '1992-10-09',
  },
  {
    id: 435107,
    title: 'A Royal Winter',
    releaseDate: '2017-01-14',
  },
  {
    id: 1594,
    title: 'A Shot in the Dark',
    releaseDate: '1964-06-23',
  },
  {
    id: 10223,
    title: 'A Simple Plan',
    releaseDate: '1998-12-11',
  },
  {
    id: 34653,
    title: 'A Single Man',
    releaseDate: '2009-12-11',
  },
  {
    id: 332562,
    title: 'A Star Is Born',
    releaseDate: '2018-10-03',
  },
  {
    id: 22692,
    title: 'A Star Is Born',
    releaseDate: '1937-04-20',
  },
  {
    id: 3111,
    title: 'A Star Is Born',
    releaseDate: '1954-10-01',
  },
  {
    id: 404378,
    title: 'A Street Cat Named Bob',
    releaseDate: '2016-11-04',
  },
  {
    id: 702,
    title: 'A Streetcar Named Desire',
    releaseDate: '1951-09-18',
  },
  {
    id: 1645,
    title: 'A Time to Kill',
    releaseDate: '1996-07-24',
  },
  {
    id: 9560,
    title: 'A Walk in the Clouds',
    releaseDate: '1995-05-27',
  },
  {
    id: 10229,
    title: 'A Walk to Remember',
    releaseDate: '2002-01-25',
  },
  {
    id: 29845,
    title: 'A Woman Under the Influence',
    releaseDate: '1974-11-18',
  },
  {
    id: 644,
    title: 'A.I. Artificial Intelligence',
    releaseDate: '2001-06-29',
  },
  {
    id: 431580,
    title: 'Abominable',
    releaseDate: '2019-09-19',
  },
  {
    id: 828613,
    title: 'About Fate',
    releaseDate: '2022-09-08',
  },
  {
    id: 122906,
    title: 'About Time',
    releaseDate: '2013-09-04',
  },
  {
    id: 297610,
    title: 'Abraham Lincoln Vampire Hunter: The Great Calamity',
    releaseDate: '2012-10-23',
  },
  {
    id: 25364,
    title: 'Ace in the Hole',
    releaseDate: '1951-06-29',
  },
  {
    id: 4688,
    title: 'Across the Universe',
    releaseDate: '2007-09-14',
  },
  {
    id: 25431,
    title: "Adam's Rib",
    releaseDate: '1949-11-18',
  },
  {
    id: 2757,
    title: 'Adaptation.',
    releaseDate: '2002-12-06',
  },
  {
    id: 360606,
    title: 'Adventures in Babysitting',
    releaseDate: '2016-06-24',
  },
  {
    id: 57586,
    title: 'African Cats',
    releaseDate: '2011-04-21',
  },
  {
    id: 537915,
    title: 'After',
    releaseDate: '2019-04-11',
  },
  {
    id: 10843,
    title: 'After Hours',
    releaseDate: '1985-09-13',
  },
  {
    id: 14588,
    title: 'After the Thin Man',
    releaseDate: '1936-12-25',
  },
  {
    id: 613504,
    title: 'After We Collided',
    releaseDate: '2020-09-02',
  },
  {
    id: 744275,
    title: 'After We Fell',
    releaseDate: '2021-09-01',
  },
  {
    id: 965150,
    title: 'Aftersun',
    releaseDate: '2022-10-21',
  },
  {
    id: 588921,
    title: 'Ainbo: Spirit of the Amazon',
    releaseDate: '2021-02-09',
  },
  {
    id: 964980,
    title: 'Air',
    releaseDate: '2023-04-05',
  },
  {
    id: 813,
    title: 'Airplane!',
    releaseDate: '1980-06-27',
  },
  {
    id: 13751,
    title: 'Akeelah and the Bee',
    releaseDate: '2006-04-28',
  },
  {
    id: 361018,
    title: 'Akron',
    releaseDate: '2015-10-06',
  },
  {
    id: 420817,
    title: 'Aladdin',
    releaseDate: '2019-05-22',
  },
  {
    id: 812,
    title: 'Aladdin',
    releaseDate: '1992-11-25',
  },
  {
    id: 396292,
    title: 'Ali Wong: Baby Cobra',
    releaseDate: '2016-05-06',
  },
  {
    id: 12092,
    title: 'Alice in Wonderland',
    releaseDate: '1951-07-28',
  },
  {
    id: 348,
    title: 'Alien',
    releaseDate: '1979-05-25',
  },
  {
    id: 20182,
    title: 'Alien Abduction: Incident in Lake County',
    releaseDate: '1998-01-20',
  },
  {
    id: 945961,
    title: 'Alien: Romulus',
    releaseDate: '2024-08-13',
  },
  {
    id: 679,
    title: 'Aliens',
    releaseDate: '1986-07-18',
  },
  {
    id: 399579,
    title: 'Alita: Battle Angel',
    releaseDate: '2019-01-31',
  },
  {
    id: 705,
    title: 'All About Eve',
    releaseDate: '1950-11-09',
  },
  {
    id: 632322,
    title: 'All My Life',
    releaseDate: '2020-10-23',
  },
  {
    id: 994108,
    title: 'All of Us Strangers',
    releaseDate: '2023-12-22',
  },
  {
    id: 12454,
    title: 'All or Nothing',
    releaseDate: '2002-10-18',
  },
  {
    id: 143,
    title: 'All Quiet on the Western Front',
    releaseDate: '1930-04-29',
  },
  {
    id: 43316,
    title: 'All That Heaven Allows',
    releaseDate: '1955-08-25',
  },
  {
    id: 16858,
    title: 'All That Jazz',
    releaseDate: '1979-12-16',
  },
  {
    id: 1004663,
    title: 'All the Beauty and the Bloodshed',
    releaseDate: '2022-11-23',
  },
  {
    id: 342470,
    title: 'All the Bright Places',
    releaseDate: '2020-02-28',
  },
  {
    id: 891,
    title: "All the President's Men",
    releaseDate: '1976-04-09',
  },
  {
    id: 897429,
    title: 'All Too Well: The Short Film',
    releaseDate: '2021-11-12',
  },
  {
    id: 786,
    title: 'Almost Famous',
    releaseDate: '2000-09-15',
  },
  {
    id: 24615,
    title: 'Aloha Scooby-Doo!',
    releaseDate: '2005-02-08',
  },
  {
    id: 455008,
    title: 'AlphaGo',
    releaseDate: '2017-09-29',
  },
  {
    id: 279,
    title: 'Amadeus',
    releaseDate: '1984-09-19',
  },
  {
    id: 1248753,
    title: 'Amber Alert',
    releaseDate: '2024-09-27',
  },
  {
    id: 14,
    title: 'American Beauty',
    releaseDate: '1999-09-15',
  },
  {
    id: 565716,
    title: 'American Factory',
    releaseDate: '2019-08-21',
  },
  {
    id: 1056360,
    title: 'American Fiction',
    releaseDate: '2023-11-10',
  },
  {
    id: 4982,
    title: 'American Gangster',
    releaseDate: '2007-11-02',
  },
  {
    id: 838,
    title: 'American Graffiti',
    releaseDate: '1973-08-11',
  },
  {
    id: 73,
    title: 'American History X',
    releaseDate: '1998-07-01',
  },
  {
    id: 13199,
    title: 'American Me',
    releaseDate: '1992-03-13',
  },
  {
    id: 14242,
    title: 'American Movie',
    releaseDate: '1999-11-05',
  },
  {
    id: 743601,
    title: 'American Murder: The Family Next Door',
    releaseDate: '2020-09-29',
  },
  {
    id: 1359,
    title: 'American Psycho',
    releaseDate: '2000-01-21',
  },
  {
    id: 451751,
    title: 'American Satan',
    releaseDate: '2017-10-13',
  },
  {
    id: 190859,
    title: 'American Sniper',
    releaseDate: '2014-12-25',
  },
  {
    id: 2771,
    title: 'American Splendor',
    releaseDate: '2003-08-15',
  },
  {
    id: 673309,
    title: 'American Underdog',
    releaseDate: '2021-12-25',
  },
  {
    id: 11831,
    title: 'Amistad',
    releaseDate: '1997-12-10',
  },
  {
    id: 331781,
    title: 'Amy',
    releaseDate: '2015-07-02',
  },
  {
    id: 210024,
    title: 'An Adventure in Space and Time',
    releaseDate: '2013-11-21',
  },
  {
    id: 8356,
    title: 'An Affair to Remember',
    releaseDate: '1957-07-11',
  },
  {
    id: 13008,
    title: 'An American Crime',
    releaseDate: '2007-07-27',
  },
  {
    id: 2769,
    title: 'An American in Paris',
    releaseDate: '1951-09-26',
  },
  {
    id: 814,
    title: 'An American Werewolf in London',
    releaseDate: '1981-08-21',
  },
  {
    id: 810223,
    title: 'An Autumn Romance',
    releaseDate: '2021-05-07',
  },
  {
    id: 262481,
    title: 'An Honest Liar',
    releaseDate: '2014-04-18',
  },
  {
    id: 359305,
    title: 'An Inspector Calls',
    releaseDate: '2015-09-13',
  },
  {
    id: 534338,
    title: 'An Interview with God',
    releaseDate: '2018-08-20',
  },
  {
    id: 2623,
    title: 'An Officer and a Gentleman',
    releaseDate: '1982-07-28',
  },
  {
    id: 9444,
    title: 'Anastasia',
    releaseDate: '1997-11-20',
  },
  {
    id: 93,
    title: 'Anatomy of a Murder',
    releaseDate: '1959-07-01',
  },
  {
    id: 9267,
    title: 'And Now for Something Completely Different',
    releaseDate: '1971-09-28',
  },
  {
    id: 4886,
    title: 'And Then There Were None',
    releaseDate: '1945-10-31',
  },
  {
    id: 446663,
    title: 'Andre the Giant',
    releaseDate: '2018-04-10',
  },
  {
    id: 1938,
    title: 'Angel Face',
    releaseDate: '1953-01-02',
  },
  {
    id: 635,
    title: 'Angel Heart',
    releaseDate: '1987-03-06',
  },
  {
    id: 10397,
    title: "Angela's Ashes",
    releaseDate: '1999-12-25',
  },
  {
    id: 13696,
    title: 'Angels with Dirty Faces',
    releaseDate: '1938-11-26',
  },
  {
    id: 610120,
    title: 'Anima',
    releaseDate: '2019-06-26',
  },
  {
    id: 11848,
    title: 'Animal Farm',
    releaseDate: '1954-12-28',
  },
  {
    id: 17663,
    title: 'Anne of Green Gables',
    releaseDate: '1985-12-01',
  },
  {
    id: 703,
    title: 'Annie Hall',
    releaseDate: '1977-04-19',
  },
  {
    id: 291270,
    title: 'Anomalisa',
    releaseDate: '2015-12-30',
  },
  {
    id: 1064213,
    title: 'Anora',
    releaseDate: '2024-10-14',
  },
  {
    id: 15157,
    title: 'Another Cinderella Story',
    releaseDate: '2008-09-16',
  },
  {
    id: 44009,
    title: 'Another Year',
    releaseDate: '2010-11-05',
  },
  {
    id: 102899,
    title: 'Ant-Man',
    releaseDate: '2015-07-14',
  },
  {
    id: 351339,
    title: 'Anthropoid',
    releaseDate: '2016-08-12',
  },
  {
    id: 18094,
    title: 'Anvil! The Story of Anvil',
    releaseDate: '2008-01-14',
  },
  {
    id: 28,
    title: 'Apocalypse Now',
    releaseDate: '1979-05-19',
  },
  {
    id: 1579,
    title: 'Apocalypto',
    releaseDate: '2006-12-07',
  },
  {
    id: 664996,
    title: 'Apollo 10½: A Space Age Childhood',
    releaseDate: '2022-03-24',
  },
  {
    id: 549559,
    title: 'Apollo 11',
    releaseDate: '2019-03-01',
  },
  {
    id: 568,
    title: 'Apollo 13',
    releaseDate: '1995-06-30',
  },
  {
    id: 555285,
    title: "Are You There God? It's Me, Margaret.",
    releaseDate: '2023-03-29',
  },
  {
    id: 68734,
    title: 'Argo',
    releaseDate: '2012-10-11',
  },
  {
    id: 774372,
    title: 'ariana grande: excuse me, i love you',
    releaseDate: '2020-12-21',
  },
  {
    id: 11044,
    title: 'Arizona Dream',
    releaseDate: '1993-01-06',
  },
  {
    id: 1073,
    title: 'Arlington Road',
    releaseDate: '1999-03-19',
  },
  {
    id: 766,
    title: 'Army of Darkness',
    releaseDate: '1992-10-31',
  },
  {
    id: 329865,
    title: 'Arrival',
    releaseDate: '2016-11-10',
  },
  {
    id: 212,
    title: 'Arsenic and Old Lace',
    releaseDate: '1944-09-01',
  },
  {
    id: 618588,
    title: 'Arthur the King',
    releaseDate: '2024-02-22',
  },
  {
    id: 1140817,
    title: 'As',
    releaseDate: '2023-01-01',
  },
  {
    id: 2898,
    title: 'As Good as It Gets',
    releaseDate: '1997-12-19',
  },
  {
    id: 17814,
    title: 'Assault on Precinct 13',
    releaseDate: '1976-10-08',
  },
  {
    id: 684700,
    title: 'Athlete A',
    releaseDate: '2020-06-23',
  },
  {
    id: 10865,
    title: 'Atlantis: The Lost Empire',
    releaseDate: '2001-06-02',
  },
  {
    id: 4347,
    title: 'Atonement',
    releaseDate: '2007-02-27',
  },
  {
    id: 376228,
    title: 'Audrie & Daisy',
    releaseDate: '2016-09-23',
  },
  {
    id: 5123,
    title: 'August Rush',
    releaseDate: '2007-11-21',
  },
  {
    id: 546728,
    title: 'Auntie Edna',
    releaseDate: '2018-10-23',
  },
  {
    id: 19995,
    title: 'Avatar',
    releaseDate: '2009-12-16',
  },
  {
    id: 83533,
    title: 'Avatar: Fire and Ash',
    releaseDate: '2025-12-17',
  },
  {
    id: 76600,
    title: 'Avatar: The Way of Water',
    releaseDate: '2022-12-14',
  },
  {
    id: 99861,
    title: 'Avengers: Age of Ultron',
    releaseDate: '2015-04-22',
  },
  {
    id: 299534,
    title: 'Avengers: Endgame',
    releaseDate: '2019-04-24',
  },
  {
    id: 299536,
    title: 'Avengers: Infinity War',
    releaseDate: '2018-04-25',
  },
  {
    id: 479626,
    title: 'Avicii: True Stories',
    releaseDate: '2017-10-26',
  },
  {
    id: 11005,
    title: 'Awakenings',
    releaseDate: '1990-12-04',
  },
  {
    id: 1919,
    title: 'Away from Her',
    releaseDate: '2007-05-04',
  },
  {
    id: 1164,
    title: 'Babel',
    releaseDate: '2006-10-26',
  },
  {
    id: 16161,
    title: 'Baby Boy',
    releaseDate: '2001-06-27',
  },
  {
    id: 339403,
    title: 'Baby Driver',
    releaseDate: '2017-06-28',
  },
  {
    id: 615777,
    title: 'Babylon',
    releaseDate: '2022-12-22',
  },
  {
    id: 10940,
    title: 'Babylon 5: In the Beginning',
    releaseDate: '1998-01-04',
  },
  {
    id: 105,
    title: 'Back to the Future',
    releaseDate: '1985-07-03',
  },
  {
    id: 165,
    title: 'Back to the Future Part II',
    releaseDate: '1989-11-22',
  },
  {
    id: 196,
    title: 'Back to the Future Part III',
    releaseDate: '1990-05-25',
  },
  {
    id: 770254,
    title: 'Back to the Outback',
    releaseDate: '2021-12-03',
  },
  {
    id: 38700,
    title: 'Bad Boys for Life',
    releaseDate: '2020-01-15',
  },
  {
    id: 573435,
    title: 'Bad Boys: Ride or Die',
    releaseDate: '2024-06-05',
  },
  {
    id: 14554,
    title: 'Bad Day at Black Rock',
    releaseDate: '1955-01-13',
  },
  {
    id: 12143,
    title: 'Bad Lieutenant',
    releaseDate: '1992-11-20',
  },
  {
    id: 3133,
    title: 'Badlands',
    releaseDate: '1974-01-05',
  },
  {
    id: 29884,
    title: 'Ball of Fire',
    releaseDate: '1941-12-02',
  },
  {
    id: 541671,
    title: 'Ballerina',
    releaseDate: '2025-06-04',
  },
  {
    id: 342473,
    title: 'Ballerina',
    releaseDate: '2016-12-14',
  },
  {
    id: 21032,
    title: 'Balto',
    releaseDate: '1995-12-22',
  },
  {
    id: 3170,
    title: 'Bambi',
    releaseDate: '1942-08-14',
  },
  {
    id: 54551,
    title: 'Banana',
    releaseDate: '2010-12-13',
  },
  {
    id: 16876,
    title: "Bang Bang You're Dead",
    releaseDate: '2003-06-11',
  },
  {
    id: 514754,
    title: 'Bao',
    releaseDate: '2018-06-15',
  },
  {
    id: 14002,
    title: 'Baraka',
    releaseDate: '1992-09-15',
  },
  {
    id: 361380,
    title: 'Barbie & Her Sisters in the Great Puppy Adventure',
    releaseDate: '2015-10-07',
  },
  {
    id: 13004,
    title: 'Barbie and the Diamond Castle',
    releaseDate: '2008-09-03',
  },
  {
    id: 15906,
    title: 'Barbie and the Magic of Pegasus',
    releaseDate: '2005-10-04',
  },
  {
    id: 285733,
    title: 'Barbie and the Secret Door',
    releaseDate: '2014-08-30',
  },
  {
    id: 23566,
    title: 'Barbie and the Three Musketeers',
    releaseDate: '2009-09-15',
  },
  {
    id: 15015,
    title: 'Barbie as Rapunzel',
    releaseDate: '2002-10-01',
  },
  {
    id: 13283,
    title: 'Barbie as the Island Princess',
    releaseDate: '2007-09-17',
  },
  {
    id: 15165,
    title: 'Barbie as The Princess & the Pauper',
    releaseDate: '2004-09-28',
  },
  {
    id: 13459,
    title: "Barbie in 'A Christmas Carol'",
    releaseDate: '2008-11-03',
  },
  {
    id: 34134,
    title: 'Barbie in A Mermaid Tale',
    releaseDate: '2010-01-25',
  },
  {
    id: 91342,
    title: 'Barbie in A Mermaid Tale 2',
    releaseDate: '2012-02-22',
  },
  {
    id: 13002,
    title: 'Barbie in the 12 Dancing Princesses',
    releaseDate: '2006-09-19',
  },
  {
    id: 15016,
    title: 'Barbie of Swan Lake',
    releaseDate: '2003-09-27',
  },
  {
    id: 44874,
    title: 'Barbie: A Fashion Fairytale',
    releaseDate: '2010-09-14',
  },
  {
    id: 73456,
    title: 'Barbie: Princess Charm School',
    releaseDate: '2011-08-11',
  },
  {
    id: 129533,
    title: 'Barbie: The Princess & the Popstar',
    releaseDate: '2012-09-13',
  },
  {
    id: 17887,
    title: 'Barefoot in the Park',
    releaseDate: '1967-05-25',
  },
  {
    id: 3175,
    title: 'Barry Lyndon',
    releaseDate: '1975-12-18',
  },
  {
    id: 290,
    title: 'Barton Fink',
    releaseDate: '1991-08-01',
  },
  {
    id: 268,
    title: 'Batman',
    releaseDate: '1989-06-21',
  },
  {
    id: 886396,
    title: 'Batman and Superman: Battle of the Super Sons',
    releaseDate: '2022-10-17',
  },
  {
    id: 272,
    title: 'Batman Begins',
    releaseDate: '2005-06-10',
  },
  {
    id: 16234,
    title: 'Batman Beyond: Return of the Joker',
    releaseDate: '2000-12-12',
  },
  {
    id: 64202,
    title: 'Batman Beyond: The Movie',
    releaseDate: '1999-01-10',
  },
  {
    id: 581997,
    title: 'Batman vs Teenage Mutant Ninja Turtles',
    releaseDate: '2019-03-31',
  },
  {
    id: 321528,
    title: 'Batman vs. Robin',
    releaseDate: '2015-04-03',
  },
  {
    id: 242643,
    title: 'Batman: Assault on Arkham',
    releaseDate: '2014-08-12',
  },
  {
    id: 366924,
    title: 'Batman: Bad Blood',
    releaseDate: '2016-01-19',
  },
  {
    id: 537056,
    title: 'Batman: Hush',
    releaseDate: '2019-07-19',
  },
  {
    id: 14919,
    title: 'Batman: Mask of the Phantasm',
    releaseDate: '1993-12-25',
  },
  {
    id: 123025,
    title: 'Batman: The Dark Knight Returns, Part 1',
    releaseDate: '2012-09-25',
  },
  {
    id: 142061,
    title: 'Batman: The Dark Knight Returns, Part 2',
    releaseDate: '2013-01-03',
  },
  {
    id: 736073,
    title: 'Batman: The Long Halloween, Part One',
    releaseDate: '2021-06-21',
  },
  {
    id: 736074,
    title: 'Batman: The Long Halloween, Part Two',
    releaseDate: '2021-07-26',
  },
  {
    id: 40662,
    title: 'Batman: Under the Red Hood',
    releaseDate: '2010-07-27',
  },
  {
    id: 69735,
    title: 'Batman: Year One',
    releaseDate: '2011-09-27',
  },
  {
    id: 69315,
    title: 'Battlestar Galactica: Razor',
    releaseDate: '2007-11-12',
  },
  {
    id: 214314,
    title: 'Bears',
    releaseDate: '2014-04-17',
  },
  {
    id: 664416,
    title: 'Beastie Boys Story',
    releaseDate: '2020-04-24',
  },
  {
    id: 283587,
    title: 'Beasts of No Nation',
    releaseDate: '2015-09-11',
  },
  {
    id: 451915,
    title: 'Beautiful Boy',
    releaseDate: '2018-10-12',
  },
  {
    id: 10938,
    title: 'Beautiful Thing',
    releaseDate: '1996-06-21',
  },
  {
    id: 10020,
    title: 'Beauty and the Beast',
    releaseDate: '1991-10-22',
  },
  {
    id: 15421,
    title: 'Becket',
    releaseDate: '1964-03-11',
  },
  {
    id: 699280,
    title: 'Becoming',
    releaseDate: '2020-05-06',
  },
  {
    id: 2977,
    title: 'Becoming Jane',
    releaseDate: '2007-03-02',
  },
  {
    id: 12335,
    title: 'Bedknobs and Broomsticks',
    releaseDate: '1971-10-07',
  },
  {
    id: 4011,
    title: 'Beetlejuice',
    releaseDate: '1988-03-30',
  },
  {
    id: 132344,
    title: 'Before Midnight',
    releaseDate: '2013-04-05',
  },
  {
    id: 76,
    title: 'Before Sunrise',
    releaseDate: '1995-01-27',
  },
  {
    id: 80,
    title: 'Before Sunset',
    releaseDate: '2004-06-16',
  },
  {
    id: 7972,
    title: "Before the Devil Knows You're Dead",
    releaseDate: '2007-09-26',
  },
  {
    id: 410718,
    title: 'Before the Flood',
    releaseDate: '2016-10-21',
  },
  {
    id: 198277,
    title: 'Begin Again',
    releaseDate: '2014-06-27',
  },
  {
    id: 492,
    title: 'Being John Malkovich',
    releaseDate: '1999-10-29',
  },
  {
    id: 10322,
    title: 'Being There',
    releaseDate: '1979-12-19',
  },
  {
    id: 777270,
    title: 'Belfast',
    releaseDate: '2021-11-12',
  },
  {
    id: 550776,
    title: 'Believe Me: The Abduction of Lisa McVey',
    releaseDate: '2018-09-30',
  },
  {
    id: 205601,
    title: 'Belle',
    releaseDate: '2013-05-01',
  },
  {
    id: 15403,
    title: 'Ben 10: Secret of the Omnitrix',
    releaseDate: '2007-08-10',
  },
  {
    id: 665,
    title: 'Ben-Hur',
    releaseDate: '1959-11-18',
  },
  {
    id: 4104,
    title: 'Benny & Joon',
    releaseDate: '1993-04-16',
  },
  {
    id: 40819,
    title: 'Best Worst Movie',
    releaseDate: '2009-03-14',
  },
  {
    id: 799766,
    title: 'Better Man',
    releaseDate: '2024-12-06',
  },
  {
    id: 90,
    title: 'Beverly Hills Cop',
    releaseDate: '1984-12-05',
  },
  {
    id: 979163,
    title: 'Beyond Infinity: Buzz and the Journey to Lightyear',
    releaseDate: '2022-06-10',
  },
  {
    id: 2277,
    title: 'Bicentennial Man',
    releaseDate: '1999-12-17',
  },
  {
    id: 2280,
    title: 'Big',
    releaseDate: '1988-06-03',
  },
  {
    id: 587,
    title: 'Big Fish',
    releaseDate: '2003-12-04',
  },
  {
    id: 878361,
    title: 'Big George Foreman',
    releaseDate: '2023-04-27',
  },
  {
    id: 177572,
    title: 'Big Hero 6',
    releaseDate: '2014-10-24',
  },
  {
    id: 539617,
    title: 'Big Time Adolescence',
    releaseDate: '2020-03-13',
  },
  {
    id: 95754,
    title: 'Big Time Movie',
    releaseDate: '2012-03-10',
  },
  {
    id: 119321,
    title: 'Big Top Scooby-Doo!',
    releaseDate: '2012-10-09',
  },
  {
    id: 6978,
    title: 'Big Trouble in Little China',
    releaseDate: '1986-05-30',
  },
  {
    id: 702525,
    title: 'Bigfoot Family',
    releaseDate: '2020-07-23',
  },
  {
    id: 26036,
    title: 'Bigger Than Life',
    releaseDate: '1956-11-20',
  },
  {
    id: 528644,
    title: 'Bilby',
    releaseDate: '2018-06-06',
  },
  {
    id: 308571,
    title: "Bill Burr: I'm Sorry You Feel That Way",
    releaseDate: '2014-12-05',
  },
  {
    id: 625128,
    title: 'Bill Burr: Paper Tiger',
    releaseDate: '2019-09-10',
  },
  {
    id: 191489,
    title: 'Bill Burr: You People Are All The Same',
    releaseDate: '2012-08-16',
  },
  {
    id: 654754,
    title: "Billie Eilish: The World's a Little Blurry",
    releaseDate: '2021-02-26',
  },
  {
    id: 17305,
    title: "Billy & Mandy's Big Boogey Adventure",
    releaseDate: '2007-02-14',
  },
  {
    id: 71,
    title: 'Billy Elliot',
    releaseDate: '2000-09-28',
  },
  {
    id: 1128752,
    title: 'Bird',
    releaseDate: '2024-11-08',
  },
  {
    id: 898,
    title: 'Birdman of Alcatraz',
    releaseDate: '1962-07-04',
  },
  {
    id: 194662,
    title: 'Birdman or (The Unexpected Virtue of Ignorance)',
    releaseDate: '2014-10-17',
  },
  {
    id: 11296,
    title: 'Birdy',
    releaseDate: '1984-12-14',
  },
  {
    id: 10497,
    title: 'Bitter Moon',
    releaseDate: '1992-09-02',
  },
  {
    id: 1040330,
    title: 'Black Adam: Saviour or Destroyer?',
    releaseDate: '2022-10-15',
  },
  {
    id: 526702,
    title: 'Black Beauty',
    releaseDate: '2020-11-27',
  },
  {
    id: 24804,
    title: 'Black Dynamite',
    releaseDate: '2009-10-16',
  },
  {
    id: 855,
    title: 'Black Hawk Down',
    releaseDate: '2001-12-28',
  },
  {
    id: 16391,
    title: 'Black Narcissus',
    releaseDate: '1947-05-26',
  },
  {
    id: 284054,
    title: 'Black Panther',
    releaseDate: '2018-02-13',
  },
  {
    id: 505642,
    title: 'Black Panther: Wakanda Forever',
    releaseDate: '2022-11-09',
  },
  {
    id: 44214,
    title: 'Black Swan',
    releaseDate: '2010-12-03',
  },
  {
    id: 497698,
    title: 'Black Widow',
    releaseDate: '2021-07-07',
  },
  {
    id: 1016084,
    title: 'BlackBerry',
    releaseDate: '2023-02-13',
  },
  {
    id: 158999,
    title: 'Blackfish',
    releaseDate: '2013-06-07',
  },
  {
    id: 487558,
    title: 'BlacKkKlansman',
    releaseDate: '2018-08-09',
  },
  {
    id: 78,
    title: 'Blade Runner',
    releaseDate: '1982-06-25',
  },
  {
    id: 335984,
    title: 'Blade Runner 2049',
    releaseDate: '2017-10-04',
  },
  {
    id: 11072,
    title: 'Blazing Saddles',
    releaseDate: '1974-02-07',
  },
  {
    id: 489930,
    title: 'Blindspotting',
    releaseDate: '2018-07-20',
  },
  {
    id: 22164,
    title: 'Blood and Bone',
    releaseDate: '2009-02-07',
  },
  {
    id: 1372,
    title: 'Blood Diamond',
    releaseDate: '2006-12-08',
  },
  {
    id: 11368,
    title: 'Blood Simple',
    releaseDate: '1985-01-18',
  },
  {
    id: 11690,
    title: 'Bloodsport',
    releaseDate: '1988-02-26',
  },
  {
    id: 4107,
    title: 'Bloody Sunday',
    releaseDate: '2002-01-25',
  },
  {
    id: 4133,
    title: 'Blow',
    releaseDate: '2001-04-04',
  },
  {
    id: 11644,
    title: 'Blow Out',
    releaseDate: '1981-07-24',
  },
  {
    id: 1052,
    title: 'Blow-Up',
    releaseDate: '1966-12-18',
  },
  {
    id: 644089,
    title: 'Blue Bayou',
    releaseDate: '2021-09-10',
  },
  {
    id: 14839,
    title: 'Blue Collar',
    releaseDate: '1978-02-10',
  },
  {
    id: 408508,
    title: 'Blue Jay',
    releaseDate: '2016-10-07',
  },
  {
    id: 671295,
    title: 'Blue Miracle',
    releaseDate: '2021-05-27',
  },
  {
    id: 621191,
    title: 'Blue Story',
    releaseDate: '2019-11-22',
  },
  {
    id: 793,
    title: 'Blue Velvet',
    releaseDate: '1986-09-19',
  },
  {
    id: 818350,
    title: 'Blush',
    releaseDate: '2021-06-13',
  },
  {
    id: 823754,
    title: 'Bo Burnham: Inside',
    releaseDate: '2021-07-22',
  },
  {
    id: 400608,
    title: 'Bo Burnham: Make Happy',
    releaseDate: '2016-06-03',
  },
  {
    id: 244001,
    title: 'Bo Burnham: What.',
    releaseDate: '2013-12-17',
  },
  {
    id: 424694,
    title: 'Bohemian Rhapsody',
    releaseDate: '2018-10-24',
  },
  {
    id: 807196,
    title: 'Boiling Point',
    releaseDate: '2021-07-05',
  },
  {
    id: 396774,
    title: 'Bomb City',
    releaseDate: '2017-03-31',
  },
  {
    id: 791177,
    title: 'Bones and All',
    releaseDate: '2022-11-18',
  },
  {
    id: 475,
    title: 'Bonnie and Clyde',
    releaseDate: '1967-08-13',
  },
  {
    id: 4995,
    title: 'Boogie Nights',
    releaseDate: '1997-10-10',
  },
  {
    id: 505600,
    title: 'Booksmart',
    releaseDate: '2019-05-24',
  },
  {
    id: 2604,
    title: 'Born on the Fourth of July',
    releaseDate: '1989-12-20',
  },
  {
    id: 24481,
    title: 'Born Yesterday',
    releaseDate: '1950-12-26',
  },
  {
    id: 421281,
    title: 'Borrowed Time',
    releaseDate: '2015-10-31',
  },
  {
    id: 9303,
    title: 'Bound',
    releaseDate: '1996-09-13',
  },
  {
    id: 9702,
    title: 'Bound by Honor',
    releaseDate: '1993-02-05',
  },
  {
    id: 1430,
    title: 'Bowling for Columbine',
    releaseDate: '2002-10-09',
  },
  {
    id: 39356,
    title: 'Boy',
    releaseDate: '2010-03-25',
  },
  {
    id: 14748,
    title: 'Boy A',
    releaseDate: '2008-07-23',
  },
  {
    id: 472451,
    title: 'Boy Erased',
    releaseDate: '2018-09-24',
  },
  {
    id: 85350,
    title: 'Boyhood',
    releaseDate: '2014-06-05',
  },
  {
    id: 348893,
    title: 'Boyka: Undisputed IV',
    releaseDate: '2016-08-01',
  },
  {
    id: 226,
    title: "Boys Don't Cry",
    releaseDate: '1999-09-02',
  },
  {
    id: 650,
    title: 'Boyz n the Hood',
    releaseDate: '1991-07-12',
  },
  {
    id: 340027,
    title: 'Brain on Fire',
    releaseDate: '2017-02-22',
  },
  {
    id: 763,
    title: 'Braindead',
    releaseDate: '1992-08-13',
  },
  {
    id: 6114,
    title: "Bram Stoker's Dracula",
    releaseDate: '1992-11-13',
  },
  {
    id: 62177,
    title: 'Brave',
    releaseDate: '2012-06-21',
  },
  {
    id: 197,
    title: 'Braveheart',
    releaseDate: '1995-05-24',
  },
  {
    id: 68,
    title: 'Brazil',
    releaseDate: '1985-02-20',
  },
  {
    id: 13783,
    title: 'Breaker Morant',
    releaseDate: '1980-06-11',
  },
  {
    id: 164,
    title: "Breakfast at Tiffany's",
    releaseDate: '1961-10-06',
  },
  {
    id: 1420,
    title: 'Breakfast on Pluto',
    releaseDate: '2005-11-16',
  },
  {
    id: 20283,
    title: 'Breaking Away',
    releaseDate: '1979-05-24',
  },
  {
    id: 514439,
    title: 'Breakthrough',
    releaseDate: '2019-04-10',
  },
  {
    id: 407445,
    title: 'Breathe',
    releaseDate: '2017-10-13',
  },
  {
    id: 535845,
    title: 'Brian Banks',
    releaseDate: '2019-08-09',
  },
  {
    id: 229,
    title: 'Bride of Frankenstein',
    releaseDate: '1935-04-20',
  },
  {
    id: 296098,
    title: 'Bridge of Spies',
    releaseDate: '2015-10-15',
  },
  {
    id: 1265,
    title: 'Bridge to Terabithia',
    releaseDate: '2007-02-15',
  },
  {
    id: 851,
    title: 'Brief Encounter',
    releaseDate: '1945-11-24',
  },
  {
    id: 403431,
    title: 'Brigsby Bear',
    releaseDate: '2017-07-27',
  },
  {
    id: 324560,
    title: 'Brimstone',
    releaseDate: '2016-03-12',
  },
  {
    id: 1151031,
    title: 'Bring Her Back',
    releaseDate: '2025-05-28',
  },
  {
    id: 11942,
    title: 'Bring Me the Head of Alfredo Garcia',
    releaseDate: '1974-08-01',
  },
  {
    id: 900,
    title: 'Bringing Up Baby',
    releaseDate: '1938-02-18',
  },
  {
    id: 797594,
    title: 'Britney vs. Spears',
    releaseDate: '2021-09-27',
  },
  {
    id: 12762,
    title: 'Broadway Danny Rose',
    releaseDate: '1984-01-27',
  },
  {
    id: 142,
    title: 'Brokeback Mountain',
    releaseDate: '2005-10-22',
  },
  {
    id: 167073,
    title: 'Brooklyn',
    releaseDate: '2015-10-20',
  },
  {
    id: 10009,
    title: 'Brother Bear',
    releaseDate: '2003-10-23',
  },
  {
    id: 7445,
    title: 'Brothers',
    releaseDate: '2009-12-02',
  },
  {
    id: 378373,
    title: 'Brothers of the Wind',
    releaseDate: '2015-12-24',
  },
  {
    id: 1623,
    title: 'Brubaker',
    releaseDate: '1980-06-20',
  },
  {
    id: 28297,
    title: 'Brute Force',
    releaseDate: '1947-07-16',
  },
  {
    id: 3073,
    title: 'Bud Abbott and Lou Costello Meet Frankenstein',
    releaseDate: '1948-06-01',
  },
  {
    id: 11779,
    title: 'Buena Vista Social Club',
    releaseDate: '1999-06-04',
  },
  {
    id: 9464,
    title: "Buffalo '66",
    releaseDate: '1998-01-20',
  },
  {
    id: 701387,
    title: 'Bugonia',
    releaseDate: '2025-10-23',
  },
  {
    id: 26730,
    title: "Bugs Bunny's 3rd Movie: 1001 Rabbit Tales",
    releaseDate: '1982-11-19',
  },
  {
    id: 718930,
    title: 'Bullet Train',
    releaseDate: '2022-08-03',
  },
  {
    id: 11382,
    title: 'Bullets Over Broadway',
    releaseDate: '1994-10-14',
  },
  {
    id: 916,
    title: 'Bullitt',
    releaseDate: '1968-10-17',
  },
  {
    id: 84404,
    title: 'Bully',
    releaseDate: '2011-04-23',
  },
  {
    id: 1942,
    title: 'Bunny Lake Is Missing',
    releaseDate: '1965-10-03',
  },
  {
    id: 42297,
    title: 'Burlesque',
    releaseDate: '2010-11-23',
  },
  {
    id: 13413,
    title: 'BURN·E',
    releaseDate: '2008-11-17',
  },
  {
    id: 747059,
    title: 'Burrow',
    releaseDate: '2020-12-25',
  },
  {
    id: 20770,
    title: "But I'm a Cheerleader",
    releaseDate: '2000-07-07',
  },
  {
    id: 642,
    title: 'Butch Cassidy and the Sundance Kid',
    releaseDate: '1969-09-23',
  },
  {
    id: 632617,
    title: "C'mon C'mon",
    releaseDate: '2021-11-19',
  },
  {
    id: 10784,
    title: 'Cabaret',
    releaseDate: '1972-02-13',
  },
  {
    id: 28289,
    title: 'Cactus Flower',
    releaseDate: '1969-12-16',
  },
  {
    id: 863873,
    title: 'Caddo Lake',
    releaseDate: '2024-11-28',
  },
  {
    id: 14299,
    title: 'Cadillac Records',
    releaseDate: '2008-12-05',
  },
  {
    id: 14117,
    title: 'Calamity Jane',
    releaseDate: '1953-11-04',
  },
  {
    id: 398818,
    title: 'Call Me by Your Name',
    releaseDate: '2017-10-01',
  },
  {
    id: 157832,
    title: 'Calvary',
    releaseDate: '2014-04-11',
  },
  {
    id: 986,
    title: 'Chimes at Midnight',
    releaseDate: '1965-12-22',
  },
  {
    id: 4441,
    title: 'Candy',
    releaseDate: '2006-05-25',
  },
  {
    id: 11349,
    title: 'Cape Fear',
    releaseDate: '1962-04-12',
  },
  {
    id: 1598,
    title: 'Cape Fear',
    releaseDate: '1991-11-13',
  },
  {
    id: 22074,
    title: 'Capitalism: A Love Story',
    releaseDate: '2009-09-06',
  },
  {
    id: 271110,
    title: 'Captain America: Civil War',
    releaseDate: '2016-04-27',
  },
  {
    id: 1771,
    title: 'Captain America: The First Avenger',
    releaseDate: '2011-07-22',
  },
  {
    id: 100402,
    title: 'Captain America: The Winter Soldier',
    releaseDate: '2014-03-20',
  },
  {
    id: 16905,
    title: 'Captain Blood',
    releaseDate: '1935-12-26',
  },
  {
    id: 334533,
    title: 'Captain Fantastic',
    releaseDate: '2016-07-08',
  },
  {
    id: 109424,
    title: 'Captain Phillips',
    releaseDate: '2013-10-10',
  },
  {
    id: 16515,
    title: 'Captains Courageous',
    releaseDate: '1937-06-25',
  },
  {
    id: 2260,
    title: 'Capturing the Friedmans',
    releaseDate: '2003-05-30',
  },
  {
    id: 1076364,
    title: "Carl's Date",
    releaseDate: '2023-06-15',
  },
  {
    id: 6075,
    title: "Carlito's Way",
    releaseDate: '1993-11-10',
  },
  {
    id: 72113,
    title: 'Carnage',
    releaseDate: '2011-09-16',
  },
  {
    id: 258480,
    title: 'Carol',
    releaseDate: '2015-11-20',
  },
  {
    id: 7340,
    title: 'Carrie',
    releaseDate: '1976-11-03',
  },
  {
    id: 920,
    title: 'Cars',
    releaseDate: '2006-06-08',
  },
  {
    id: 317952,
    title: 'Cartel Land',
    releaseDate: '2015-07-03',
  },
  {
    id: 289,
    title: 'Casablanca',
    releaseDate: '1943-01-15',
  },
  {
    id: 444308,
    title: 'Cashback',
    releaseDate: '2004-10-10',
  },
  {
    id: 524,
    title: 'Casino',
    releaseDate: '1995-11-22',
  },
  {
    id: 36557,
    title: 'Casino Royale',
    releaseDate: '2006-11-14',
  },
  {
    id: 8358,
    title: 'Cast Away',
    releaseDate: '2000-12-22',
  },
  {
    id: 236028,
    title: 'Castello Cavalcanti',
    releaseDate: '2013-11-12',
  },
  {
    id: 10142,
    title: 'Casualties of War',
    releaseDate: '1989-08-18',
  },
  {
    id: 261,
    title: 'Cat on a Hot Tin Roof',
    releaseDate: '1958-08-29',
  },
  {
    id: 640,
    title: 'Catch Me If You Can',
    releaseDate: '2002-12-16',
  },
  {
    id: 26598,
    title: 'Cats',
    releaseDate: '1998-10-05',
  },
  {
    id: 24662,
    title: "Cats Don't Dance",
    releaseDate: '1997-03-26',
  },
  {
    id: 59490,
    title: 'Cave of Forgotten Dreams',
    releaseDate: '2010-11-03',
  },
  {
    id: 814340,
    title: 'Cha Cha Real Smooth',
    releaseDate: '2022-06-17',
  },
  {
    id: 3580,
    title: 'Changeling',
    releaseDate: '2008-10-24',
  },
  {
    id: 10435,
    title: 'Chaplin',
    releaseDate: '1992-12-17',
  },
  {
    id: 4808,
    title: 'Charade',
    releaseDate: '1963-12-01',
  },
  {
    id: 27331,
    title: 'Charley Varrick',
    releaseDate: '1973-09-19',
  },
  {
    id: 118,
    title: 'Charlie and the Chocolate Factory',
    releaseDate: '2005-07-13',
  },
  {
    id: 552532,
    title: 'Charm City Kings',
    releaseDate: '2020-01-27',
  },
  {
    id: 84185,
    title: 'Chasing Ice',
    releaseDate: '2012-10-01',
  },
  {
    id: 82684,
    title: 'Chasing Mavericks',
    releaseDate: '2012-10-25',
  },
  {
    id: 212778,
    title: 'Chef',
    releaseDate: '2014-05-08',
  },
  {
    id: 621013,
    title: 'Chemical Hearts',
    releaseDate: '2020-08-21',
  },
  {
    id: 544401,
    title: 'Cherry',
    releaseDate: '2021-02-26',
  },
  {
    id: 34672,
    title: 'Chestnut: Hero of Central Park',
    releaseDate: '2004-10-21',
  },
  {
    id: 1574,
    title: 'Chicago',
    releaseDate: '2002-12-10',
  },
  {
    id: 778855,
    title: 'Chickenhare and the Hamster of Darkness',
    releaseDate: '2022-02-16',
  },
  {
    id: 9693,
    title: 'Children of Men',
    releaseDate: '2006-09-22',
  },
  {
    id: 13354,
    title: 'Chill Out, Scooby-Doo!',
    releaseDate: '2007-08-31',
  },
  {
    id: 829,
    title: 'Chinatown',
    releaseDate: '1974-06-20',
  },
  {
    id: 420814,
    title: 'Christopher Robin',
    releaseDate: '2018-08-01',
  },
  {
    id: 876716,
    title: 'Ciao Alberto',
    releaseDate: '2021-11-11',
  },
  {
    id: 11224,
    title: 'Cinderella',
    releaseDate: '1950-02-22',
  },
  {
    id: 921,
    title: 'Cinderella Man',
    releaseDate: '2005-06-02',
  },
  {
    id: 94352,
    title: 'Cirque du Soleil: Worlds Away',
    releaseDate: '2012-11-09',
  },
  {
    id: 15,
    title: 'Citizen Kane',
    releaseDate: '1941-04-17',
  },
  {
    id: 12554,
    title: 'Citizen X',
    releaseDate: '1995-02-25',
  },
  {
    id: 293310,
    title: 'Citizenfour',
    releaseDate: '2014-10-10',
  },
  {
    id: 901,
    title: 'City Lights',
    releaseDate: '1931-02-06',
  },
  {
    id: 466532,
    title: 'Clara',
    releaseDate: '2018-11-30',
  },
  {
    id: 8095,
    title: 'Cleopatra',
    releaseDate: '1963-06-12',
  },
  {
    id: 2292,
    title: 'Clerks',
    releaseDate: '1994-10-19',
  },
  {
    id: 336845,
    title: 'Cleveland Abduction',
    releaseDate: '2015-05-02',
  },
  {
    id: 585245,
    title: 'Clifford the Big Red Dog',
    releaseDate: '2021-11-10',
  },
  {
    id: 66834,
    title: 'Clock Cleaners',
    releaseDate: '1937-10-15',
  },
  {
    id: 840,
    title: 'Close Encounters of the Third Kind',
    releaseDate: '1977-12-14',
  },
  {
    id: 353728,
    title: 'Closet Monster',
    releaseDate: '2016-07-15',
  },
  {
    id: 630566,
    title: 'Clouds',
    releaseDate: '2020-10-09',
  },
  {
    id: 15196,
    title: 'Clue',
    releaseDate: '1985-12-13',
  },
  {
    id: 9603,
    title: 'Clueless',
    releaseDate: '1995-07-19',
  },
  {
    id: 7214,
    title: 'Coach Carter',
    releaseDate: '2005-01-14',
  },
  {
    id: 16769,
    title: "Coal Miner's Daughter",
    releaseDate: '1980-03-07',
  },
  {
    id: 319075,
    title: 'Cobain: Montage of Heck',
    releaseDate: '2015-03-23',
  },
  {
    id: 14761,
    title: 'Cocaine Cowboys',
    releaseDate: '2006-11-03',
  },
  {
    id: 354912,
    title: 'Coco',
    releaseDate: '2017-10-27',
  },
  {
    id: 776503,
    title: 'CODA',
    releaseDate: '2021-08-13',
  },
  {
    id: 205081,
    title: 'Codename: Kids Next Door: Operation Z.E.R.O.',
    releaseDate: '2006-08-11',
  },
  {
    id: 220289,
    title: 'Coherence',
    releaseDate: '2014-04-06',
  },
  {
    id: 1538,
    title: 'Collateral',
    releaseDate: '2004-08-04',
  },
  {
    id: 345920,
    title: 'Collateral Beauty',
    releaseDate: '2016-12-15',
  },
  {
    id: 318781,
    title: 'Colonia',
    releaseDate: '2015-06-24',
  },
  {
    id: 414453,
    title: 'Columbus',
    releaseDate: '2017-08-04',
  },
  {
    id: 31657,
    title: 'Coming Home',
    releaseDate: '1978-02-15',
  },
  {
    id: 1084199,
    title: 'Companion',
    releaseDate: '2025-01-22',
  },
  {
    id: 35921,
    title: 'Compulsion',
    releaseDate: '1959-04-01',
  },
  {
    id: 974576,
    title: 'Conclave',
    releaseDate: '2024-10-25',
  },
  {
    id: 321741,
    title: 'Concussion',
    releaseDate: '2015-11-12',
  },
  {
    id: 12900,
    title: 'Conspiracy',
    releaseDate: '2001-05-19',
  },
  {
    id: 561,
    title: 'Constantine',
    releaseDate: '2005-02-08',
  },
  {
    id: 539517,
    title: 'Constantine: City of Demons - The Movie',
    releaseDate: '2018-10-04',
  },
  {
    id: 686,
    title: 'Contact',
    releaseDate: '1997-07-11',
  },
  {
    id: 5708,
    title: 'Control',
    releaseDate: '2007-09-12',
  },
  {
    id: 45094,
    title: 'Conviction',
    releaseDate: '2010-10-15',
  },
  {
    id: 903,
    title: 'Cool Hand Luke',
    releaseDate: '1967-11-01',
  },
  {
    id: 864,
    title: 'Cool Runnings',
    releaseDate: '1993-10-01',
  },
  {
    id: 38742,
    title: 'Cops',
    releaseDate: '1922-03-11',
  },
  {
    id: 14836,
    title: 'Coraline',
    releaseDate: '2009-02-05',
  },
  {
    id: 3933,
    title: 'Corpse Bride',
    releaseDate: '2005-09-12',
  },
  {
    id: 72213,
    title: 'Courageous',
    releaseDate: '2011-09-30',
  },
  {
    id: 282297,
    title: 'Cowspiracy: The Sustainability Secret',
    releaseDate: '2014-07-01',
  },
  {
    id: 1640,
    title: 'Crash',
    releaseDate: '2005-05-06',
  },
  {
    id: 455207,
    title: 'Crazy Rich Asians',
    releaseDate: '2018-08-15',
  },
  {
    id: 50646,
    title: 'Crazy, Stupid, Love.',
    releaseDate: '2011-07-29',
  },
  {
    id: 312221,
    title: 'Creed',
    releaseDate: '2015-11-25',
  },
  {
    id: 480530,
    title: 'Creed II',
    releaseDate: '2018-11-21',
  },
  {
    id: 677179,
    title: 'Creed III',
    releaseDate: '2023-03-01',
  },
  {
    id: 11562,
    title: 'Crimes and Misdemeanors',
    releaseDate: '1989-10-13',
  },
  {
    id: 8963,
    title: 'Crimson Tide',
    releaseDate: '1995-05-12',
  },
  {
    id: 653725,
    title: 'Crip Camp: A Disability Revolution',
    releaseDate: '2020-03-25',
  },
  {
    id: 22112,
    title: 'Criss Cross',
    releaseDate: '1949-02-04',
  },
  {
    id: 366141,
    title: 'Cro Minion',
    releaseDate: '2015-11-04',
  },
  {
    id: 10839,
    title: 'Cross of Iron',
    releaseDate: '1977-01-29',
  },
  {
    id: 15392,
    title: 'Crossroads',
    releaseDate: '1986-03-14',
  },
  {
    id: 337404,
    title: 'Cruella',
    releaseDate: '2021-05-26',
  },
  {
    id: 26564,
    title: 'Crumb',
    releaseDate: '1994-09-10',
  },
  {
    id: 860159,
    title: 'Crush',
    releaseDate: '2022-04-29',
  },
  {
    id: 346401,
    title: 'Daft Punk Unchained',
    releaseDate: '2015-06-24',
  },
  {
    id: 152532,
    title: 'Dallas Buyers Club',
    releaseDate: '2013-11-01',
  },
  {
    id: 16,
    title: 'Dancer in the Dark',
    releaseDate: '2000-09-01',
  },
  {
    id: 581,
    title: 'Dances with Wolves',
    releaseDate: '1990-03-30',
  },
  {
    id: 8583,
    title: 'Dangerous Beauty',
    releaseDate: '1998-02-20',
  },
  {
    id: 859,
    title: 'Dangerous Liaisons',
    releaseDate: '1988-12-21',
  },
  {
    id: 2666,
    title: 'Dark City',
    releaseDate: '1998-02-27',
  },
  {
    id: 16227,
    title: 'Dark Passage',
    releaseDate: '1947-09-05',
  },
  {
    id: 552178,
    title: 'Dark Waters',
    releaseDate: '2019-11-22',
  },
  {
    id: 399404,
    title: 'Darkest Hour',
    releaseDate: '2017-11-22',
  },
  {
    id: 635918,
    title: 'Dating Amber',
    releaseDate: '2020-07-03',
  },
  {
    id: 444706,
    title: 'Dave Chappelle: Deep in the Heart of Texas',
    releaseDate: '2017-03-21',
  },
  {
    id: 488223,
    title: 'Dave Chappelle: Equanimity',
    releaseDate: '2017-12-31',
  },
  {
    id: 20147,
    title: "Dave Chappelle: For What It's Worth",
    releaseDate: '2004-09-04',
  },
  {
    id: 16275,
    title: "Dave Chappelle: Killin' Them Softly",
    releaseDate: '2000-07-26',
  },
  {
    id: 624932,
    title: 'Dave Chappelle: Sticks & Stones',
    releaseDate: '2019-08-26',
  },
  {
    id: 444705,
    title: 'Dave Chappelle: The Age of Spin',
    releaseDate: '2017-03-21',
  },
  {
    id: 494368,
    title: 'Dave Chappelle: The Bird Revelation',
    releaseDate: '2017-12-31',
  },
  {
    id: 879540,
    title: 'Dave Chappelle: The Closer',
    releaseDate: '2021-10-05',
  },
  {
    id: 664280,
    title: 'David Attenborough: A Life on Our Planet',
    releaseDate: '2020-09-28',
  },
  {
    id: 924,
    title: 'Dawn of the Dead',
    releaseDate: '2004-03-19',
  },
  {
    id: 923,
    title: 'Dawn of the Dead',
    releaseDate: '1978-09-02',
  },
  {
    id: 119450,
    title: 'Dawn of the Planet of the Apes',
    releaseDate: '2014-07-08',
  },
  {
    id: 40619,
    title: 'Day & Night',
    releaseDate: '2010-06-17',
  },
  {
    id: 8408,
    title: 'Day of the Dead',
    releaseDate: '1985-07-03',
  },
  {
    id: 16642,
    title: 'Days of Heaven',
    releaseDate: '1978-09-13',
  },
  {
    id: 32488,
    title: 'Days of Wine and Roses',
    releaseDate: '1963-02-04',
  },
  {
    id: 9571,
    title: 'Dazed and Confused',
    releaseDate: '1993-09-24',
  },
  {
    id: 539681,
    title: 'DC League of Super-Pets',
    releaseDate: '2022-07-27',
  },
  {
    id: 618353,
    title: 'DC Showcase - Batman: Death in the Family',
    releaseDate: '2020-10-13',
  },
  {
    id: 46718,
    title: 'DC Showcase: Green Arrow',
    releaseDate: '2010-09-28',
  },
  {
    id: 41988,
    title: 'DC Showcase: Jonah Hex',
    releaseDate: '2010-07-27',
  },
  {
    id: 355254,
    title: 'De Palma',
    releaseDate: '2016-06-10',
  },
  {
    id: 922,
    title: 'Dead Man',
    releaseDate: '1995-12-23',
  },
  {
    id: 687,
    title: 'Dead Man Walking',
    releaseDate: '1995-12-29',
  },
  {
    id: 12877,
    title: "Dead Man's Shoes",
    releaseDate: '2004-09-29',
  },
  {
    id: 13581,
    title: 'Dead of Night',
    releaseDate: '1945-09-09',
  },
  {
    id: 207,
    title: 'Dead Poets Society',
    releaseDate: '1989-06-02',
  },
  {
    id: 9540,
    title: 'Dead Ringers',
    releaseDate: '1988-09-23',
  },
  {
    id: 293660,
    title: 'Deadpool',
    releaseDate: '2016-02-09',
  },
  {
    id: 533535,
    title: 'Deadpool & Wolverine',
    releaseDate: '2024-07-24',
  },
  {
    id: 383498,
    title: 'Deadpool 2',
    releaseDate: '2018-05-15',
  },
  {
    id: 558144,
    title: 'Deadpool: No Good Deed',
    releaseDate: '2017-03-03',
  },
  {
    id: 483306,
    title: 'Dear Basketball',
    releaseDate: '2017-04-23',
  },
  {
    id: 8981,
    title: 'Dear Frankie',
    releaseDate: '2004-05-18',
  },
  {
    id: 15584,
    title: 'Dear Zachary: A Letter to a Son About His Father',
    releaseDate: '2008-10-31',
  },
  {
    id: 10531,
    title: 'Death and the Maiden',
    releaseDate: '1994-05-04',
  },
  {
    id: 4192,
    title: 'Death on the Nile',
    releaseDate: '1978-09-29',
  },
  {
    id: 2639,
    title: 'Deconstructing Harry',
    releaseDate: '1997-12-12',
  },
  {
    id: 13364,
    title: 'Deliver Us from Evil',
    releaseDate: '2006-06-24',
  },
  {
    id: 10669,
    title: 'Deliverance',
    releaseDate: '1972-08-18',
  },
  {
    id: 277217,
    title: 'Descendants',
    releaseDate: '2015-07-31',
  },
  {
    id: 417320,
    title: 'Descendants 2',
    releaseDate: '2017-07-21',
  },
  {
    id: 506574,
    title: 'Descendants 3',
    releaseDate: '2019-08-02',
  },
  {
    id: 33997,
    title: 'Desert Flower',
    releaseDate: '2009-09-24',
  },
  {
    id: 294,
    title: 'Desert Hearts',
    releaseDate: '1985-10-01',
  },
  {
    id: 77210,
    title: 'Design for Living',
    releaseDate: '1933-12-29',
  },
  {
    id: 20352,
    title: 'Despicable Me',
    releaseDate: '2010-07-08',
  },
  {
    id: 35114,
    title: 'Destino',
    releaseDate: '2003-08-05',
  },
  {
    id: 43828,
    title: 'Destry Rides Again',
    releaseDate: '1939-11-30',
  },
  {
    id: 74308,
    title: 'Detachment',
    releaseDate: '2011-04-24',
  },
  {
    id: 20853,
    title: 'Detective Story',
    releaseDate: '1951-10-24',
  },
  {
    id: 20367,
    title: 'Detour',
    releaseDate: '1945-11-30',
  },
  {
    id: 407448,
    title: 'Detroit',
    releaseDate: '2017-07-28',
  },
  {
    id: 1997,
    title: 'Two Brothers',
    releaseDate: '2004-04-07',
  },
  {
    id: 653851,
    title: 'Devotion',
    releaseDate: '2022-11-23',
  },
  {
    id: 1127110,
    title: 'Diablo',
    releaseDate: '2025-06-13',
  },
  {
    id: 521,
    title: 'Dial M for Murder',
    releaseDate: '1954-05-29',
  },
  {
    id: 562,
    title: 'Die Hard',
    releaseDate: '1988-07-15',
  },
  {
    id: 1572,
    title: 'Die Hard: With a Vengeance',
    releaseDate: '1995-05-19',
  },
  {
    id: 6166,
    title: 'Dinner for One',
    releaseDate: '1963-06-08',
  },
  {
    id: 653664,
    title: 'Dinner in America',
    releaseDate: '2020-05-27',
  },
  {
    id: 88,
    title: 'Dirty Dancing',
    releaseDate: '1987-08-21',
  },
  {
    id: 984,
    title: 'Dirty Harry',
    releaseDate: '1971-12-23',
  },
  {
    id: 10141,
    title: 'Dirty Rotten Scoundrels',
    releaseDate: '1988-12-14',
  },
  {
    id: 159004,
    title: 'Dirty Wars',
    releaseDate: '2013-01-18',
  },
  {
    id: 127517,
    title: 'Disconnect',
    releaseDate: '2013-04-12',
  },
  {
    id: 17654,
    title: 'District 9',
    releaseDate: '2009-08-05',
  },
  {
    id: 68718,
    title: 'Django Unchained',
    releaseDate: '2012-12-25',
  },
  {
    id: 925,
    title: 'Do the Right Thing',
    releaseDate: '1989-06-14',
  },
  {
    id: 501170,
    title: 'Doctor Sleep',
    releaseDate: '2019-10-30',
  },
  {
    id: 284052,
    title: 'Doctor Strange',
    releaseDate: '2016-10-25',
  },
  {
    id: 453395,
    title: 'Doctor Strange in the Multiverse of Madness',
    releaseDate: '2022-05-04',
  },
  {
    id: 315620,
    title: 'Doctor Who: A Christmas Carol',
    releaseDate: '2010-12-25',
  },
  {
    id: 317182,
    title: 'Doctor Who: Last Christmas',
    releaseDate: '2014-12-25',
  },
  {
    id: 282963,
    title: 'Doctor Who: Planet of the Dead',
    releaseDate: '2009-04-11',
  },
  {
    id: 313106,
    title: 'Doctor Who: The Day of the Doctor',
    releaseDate: '2013-11-23',
  },
  {
    id: 371759,
    title: 'Doctor Who: The Husbands of River Song',
    releaseDate: '2015-12-25',
  },
  {
    id: 317190,
    title: 'Doctor Who: The Next Doctor',
    releaseDate: '2008-12-25',
  },
  {
    id: 282758,
    title: 'Doctor Who: The Runaway Bride',
    releaseDate: '2006-12-25',
  },
  {
    id: 369145,
    title: 'Doctor Who: The Snowmen',
    releaseDate: '2012-12-25',
  },
  {
    id: 282848,
    title: 'Doctor Who: The Time of the Doctor',
    releaseDate: '2013-12-25',
  },
  {
    id: 281979,
    title: 'Doctor Who: The Waters of Mars',
    releaseDate: '2009-11-15',
  },
  {
    id: 335209,
    title: 'Doctor Who: Voyage of the Damned',
    releaseDate: '2007-12-25',
  },
  {
    id: 907,
    title: 'Doctor Zhivago',
    releaseDate: '1965-12-22',
  },
  {
    id: 626735,
    title: 'Dog',
    releaseDate: '2022-02-17',
  },
  {
    id: 968,
    title: 'Dog Day Afternoon',
    releaseDate: '1975-09-21',
  },
  {
    id: 774370,
    title: 'Dog Man',
    releaseDate: '2025-01-24',
  },
  {
    id: 43920,
    title: 'Dog Pound',
    releaseDate: '2010-04-24',
  },
  {
    id: 1282,
    title: 'Dogtown and Z-Boys',
    releaseDate: '2002-05-10',
  },
  {
    id: 553,
    title: 'Dogville',
    releaseDate: '2003-05-21',
  },
  {
    id: 11929,
    title: 'Dolores Claiborne',
    releaseDate: '1995-03-24',
  },
  {
    id: 10607,
    title: "Don't Be a Menace to South Central While Drinking Your Juice in the Hood",
    releaseDate: '1996-01-12',
  },
  {
    id: 300669,
    title: "Don't Breathe",
    releaseDate: '2016-06-08',
  },
  {
    id: 482373,
    title: "Don't Breathe 2",
    releaseDate: '2021-08-12',
  },
  {
    id: 127144,
    title: "Don't Hug Me I'm Scared",
    releaseDate: '2012-10-24',
  },
  {
    id: 646380,
    title: "Don't Look Up",
    releaseDate: '2021-12-08',
  },
  {
    id: 9366,
    title: 'Donnie Brasco',
    releaseDate: '1997-02-27',
  },
  {
    id: 141,
    title: 'Donnie Darko',
    releaseDate: '2001-01-19',
  },
  {
    id: 135,
    title: 'Dont Look Back',
    releaseDate: '1967-05-17',
  },
  {
    id: 308639,
    title: 'Dope',
    releaseDate: '2015-06-19',
  },
  {
    id: 996,
    title: 'Double Indemnity',
    releaseDate: '1944-07-06',
  },
  {
    id: 14359,
    title: 'Doubt',
    releaseDate: '2008-12-12',
  },
  {
    id: 1554,
    title: 'Down by Law',
    releaseDate: '1986-09-20',
  },
  {
    id: 913862,
    title: 'Downfall: The Case Against Boeing',
    releaseDate: '2022-02-09',
  },
  {
    id: 535544,
    title: 'Downton Abbey',
    releaseDate: '2019-09-12',
  },
  {
    id: 820446,
    title: 'Downton Abbey: A New Era',
    releaseDate: '2022-04-27',
  },
  {
    id: 1289936,
    title: 'Downton Abbey: The Grand Finale',
    releaseDate: '2025-09-10',
  },
  {
    id: 3019,
    title: 'Dr. Jekyll and Mr. Hyde',
    releaseDate: '1931-12-24',
  },
  {
    id: 935,
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    releaseDate: '1964-01-29',
  },
  {
    id: 11868,
    title: 'Dracula',
    releaseDate: '1958-04-21',
  },
  {
    id: 138,
    title: 'Dracula',
    releaseDate: '1931-02-12',
  },
  {
    id: 523366,
    title: 'Dragon Rider',
    releaseDate: '2020-10-13',
  },
  {
    id: 298115,
    title: 'Dragons: Dawn of the Dragon Racers',
    releaseDate: '2014-11-01',
  },
  {
    id: 91417,
    title: 'Dragons: Gift of the Night Fury',
    releaseDate: '2011-11-15',
  },
  {
    id: 43960,
    title: 'Drake & Josh Go Hollywood',
    releaseDate: '2006-01-06',
  },
  {
    id: 12920,
    title: 'Dreamer: Inspired By a True Story',
    releaseDate: '2005-09-10',
  },
  {
    id: 64690,
    title: 'Drive',
    releaseDate: '2011-09-15',
  },
  {
    id: 403,
    title: 'Driving Miss Daisy',
    releaseDate: '1989-12-13',
  },
  {
    id: 27362,
    title: 'Drowning by Numbers',
    releaseDate: '1988-09-10',
  },
  {
    id: 476,
    title: 'Drugstore Cowboy',
    releaseDate: '1989-10-20',
  },
  {
    id: 53210,
    title: 'Duck Amuck',
    releaseDate: '1953-02-28',
  },
  {
    id: 67409,
    title: 'Duck Dodgers in the 24½th Century',
    releaseDate: '1953-07-25',
  },
  {
    id: 3063,
    title: 'Duck Soup',
    releaseDate: '1933-11-12',
  },
  {
    id: 839,
    title: 'Duel',
    releaseDate: '1971-11-13',
  },
  {
    id: 15907,
    title: 'Duma',
    releaseDate: '2005-04-22',
  },
  {
    id: 438631,
    title: 'Dune',
    releaseDate: '2021-09-15',
  },
  {
    id: 693134,
    title: 'Dune: Part Two',
    releaseDate: '2024-02-27',
  },
  {
    id: 493529,
    title: 'Dungeons & Dragons: Honor Among Thieves',
    releaseDate: '2023-03-23',
  },
  {
    id: 374720,
    title: 'Dunkirk',
    releaseDate: '2017-07-19',
  },
  {
    id: 1158915,
    title: 'Dìdi (弟弟)',
    releaseDate: '2024-07-26',
  },
  {
    id: 601,
    title: 'E.T. the Extra-Terrestrial',
    releaseDate: '1982-06-11',
  },
  {
    id: 10946,
    title: 'Earth',
    releaseDate: '2007-10-10',
  },
  {
    id: 464593,
    title: 'Earth: One Amazing Day',
    releaseDate: '2017-08-04',
  },
  {
    id: 30238,
    title: 'Earthlings',
    releaseDate: '2005-09-24',
  },
  {
    id: 220,
    title: 'East of Eden',
    releaseDate: '1955-04-10',
  },
  {
    id: 2252,
    title: 'Eastern Promises',
    releaseDate: '2007-09-14',
  },
  {
    id: 624,
    title: 'Easy Rider',
    releaseDate: '1969-06-26',
  },
  {
    id: 47650,
    title: 'Easy Street',
    releaseDate: '1917-01-22',
  },
  {
    id: 522,
    title: 'Ed Wood',
    releaseDate: '1994-09-28',
  },
  {
    id: 17159,
    title: 'Eddie Murphy Raw',
    releaseDate: '1987-11-25',
  },
  {
    id: 15251,
    title: 'Eddie Murphy: Delirious',
    releaseDate: '1983-10-15',
  },
  {
    id: 319888,
    title: 'Eddie the Eagle',
    releaseDate: '2016-02-25',
  },
  {
    id: 137113,
    title: 'Edge of Tomorrow',
    releaseDate: '2014-05-27',
  },
  {
    id: 162,
    title: 'Edward Scissorhands',
    releaseDate: '1990-12-07',
  },
  {
    id: 9036,
    title: 'Eight Below',
    releaseDate: '2006-02-17',
  },
  {
    id: 489925,
    title: 'Eighth Grade',
    releaseDate: '2018-01-19',
  },
  {
    id: 559969,
    title: 'El Camino: A Breaking Bad Movie',
    releaseDate: '2019-10-11',
  },
  {
    id: 6644,
    title: 'El Dorado',
    releaseDate: '1966-12-17',
  },
  {
    id: 282041,
    title: 'Electric Boogaloo: The Wild, Untold Story of Cannon Films',
    releaseDate: '2014-10-06',
  },
  {
    id: 976573,
    title: 'Elemental',
    releaseDate: '2023-06-14',
  },
  {
    id: 1807,
    title: 'Elephant',
    releaseDate: '2003-09-20',
  },
  {
    id: 4518,
    title: 'Elizabeth',
    releaseDate: '1998-09-13',
  },
  {
    id: 22013,
    title: 'Elmer Gantry',
    releaseDate: '1960-07-07',
  },
  {
    id: 614934,
    title: 'Elvis',
    releaseDate: '2022-06-22',
  },
  {
    id: 715931,
    title: 'Emancipation',
    releaseDate: '2022-12-02',
  },
  {
    id: 556678,
    title: 'Emma.',
    releaseDate: '2020-02-13',
  },
  {
    id: 76180,
    title: 'Empire of Dreams: The Story of the Star Wars Trilogy',
    releaseDate: '2004-09-20',
  },
  {
    id: 10110,
    title: 'Empire of the Sun',
    releaseDate: '1987-12-09',
  },
  {
    id: 568124,
    title: 'Encanto',
    releaseDate: '2021-10-13',
  },
  {
    id: 1041513,
    title: 'Encanto at the Hollywood Bowl',
    releaseDate: '2022-12-27',
  },
  {
    id: 12172,
    title: 'Encounters at the End of the World',
    releaseDate: '2007-09-01',
  },
  {
    id: 77016,
    title: 'End of Watch',
    releaseDate: '2012-09-20',
  },
  {
    id: 853,
    title: 'Enemy at the Gates',
    releaseDate: '2001-02-28',
  },
  {
    id: 9798,
    title: 'Enemy of the State',
    releaseDate: '1998-11-20',
  },
  {
    id: 497582,
    title: 'Enola Holmes',
    releaseDate: '2020-09-23',
  },
  {
    id: 829280,
    title: 'Enola Holmes 2',
    releaseDate: '2022-11-30',
  },
  {
    id: 13020,
    title: 'Enron: The Smartest Guys in the Room',
    releaseDate: '2005-04-22',
  },
  {
    id: 9461,
    title: 'Enter the Dragon',
    releaseDate: '1973-08-17',
  },
  {
    id: 34647,
    title: 'Enter the Void',
    releaseDate: '2010-05-05',
  },
  {
    id: 1027014,
    title: 'Entergalactic',
    releaseDate: '2022-09-28',
  },
  {
    id: 7299,
    title: 'Equilibrium',
    releaseDate: '2002-12-06',
  },
  {
    id: 985,
    title: 'Eraserhead',
    releaseDate: '1977-09-28',
  },
  {
    id: 462,
    title: 'Erin Brockovich',
    releaseDate: '2000-03-17',
  },
  {
    id: 10734,
    title: 'Escape from Alcatraz',
    releaseDate: '1979-06-22',
  },
  {
    id: 1103,
    title: 'Escape from New York',
    releaseDate: '1981-05-23',
  },
  {
    id: 502425,
    title: 'Escape from Pretoria',
    releaseDate: '2020-03-06',
  },
  {
    id: 25318,
    title: 'Escape from Sobibor',
    releaseDate: '1987-04-12',
  },
  {
    id: 38,
    title: 'Eternal Sunshine of the Spotless Mind',
    releaseDate: '2004-03-19',
  },
  {
    id: 1259102,
    title: 'Eternity',
    releaseDate: '2025-11-26',
  },
  {
    id: 9454,
    title: 'EverAfter',
    releaseDate: '1998-07-31',
  },
  {
    id: 465136,
    title: 'Every Day',
    releaseDate: '2018-02-22',
  },
  {
    id: 576712,
    title: "Everybody's Everything",
    releaseDate: '2019-11-12',
  },
  {
    id: 545611,
    title: 'Everything Everywhere All at Once',
    releaseDate: '2022-03-24',
  },
  {
    id: 340,
    title: 'Everything Is Illuminated',
    releaseDate: '2005-09-05',
  },
  {
    id: 417678,
    title: 'Everything, Everything',
    releaseDate: '2017-05-18',
  },
  {
    id: 765,
    title: 'Evil Dead II',
    releaseDate: '1987-03-13',
  },
  {
    id: 264660,
    title: 'Ex Machina',
    releaseDate: '2015-01-21',
  },
  {
    id: 39452,
    title: 'Exit Through the Gift Shop',
    releaseDate: '2010-03-05',
  },
  {
    id: 545609,
    title: 'Extraction',
    releaseDate: '2020-04-23',
  },
  {
    id: 697843,
    title: 'Extraction 2',
    releaseDate: '2023-06-09',
  },
  {
    id: 333352,
    title: 'Eye in the Sky',
    releaseDate: '2015-09-07',
  },
  {
    id: 345,
    title: 'Eyes Wide Shut',
    releaseDate: '1999-07-16',
  },
  {
    id: 911430,
    title: 'F1',
    releaseDate: '2025-06-25',
  },
  {
    id: 385128,
    title: 'F9',
    releaseDate: '2021-05-19',
  },
  {
    id: 754,
    title: 'Face/Off',
    releaseDate: '1997-06-27',
  },
  {
    id: 753,
    title: 'Faces',
    releaseDate: '1968-11-24',
  },
  {
    id: 18925,
    title: 'Facing the Giants',
    releaseDate: '2006-09-29',
  },
  {
    id: 532908,
    title: 'Fahrenheit 11/9',
    releaseDate: '2018-09-10',
  },
  {
    id: 1714,
    title: 'Fahrenheit 451',
    releaseDate: '1966-09-07',
  },
  {
    id: 1777,
    title: 'Fahrenheit 9/11',
    releaseDate: '2004-06-25',
  },
  {
    id: 502,
    title: 'Fail Safe',
    releaseDate: '1964-10-07',
  },
  {
    id: 985939,
    title: 'Fall',
    releaseDate: '2022-08-11',
  },
  {
    id: 37094,
    title: 'Falling Down',
    releaseDate: '1993-02-26',
  },
  {
    id: 625651,
    title: 'Family Guy Presents: Something, Something, Something, Dark Side',
    releaseDate: '2009-12-22',
  },
  {
    id: 756,
    title: 'Fantasia',
    releaseDate: '1940-11-13',
  },
  {
    id: 259316,
    title: 'Fantastic Beasts and Where to Find Them',
    releaseDate: '2016-11-16',
  },
  {
    id: 612654,
    title: 'Fantastic Fungi',
    releaseDate: '2019-08-30',
  },
  {
    id: 10315,
    title: 'Fantastic Mr. Fox',
    releaseDate: '2009-10-14',
  },
  {
    id: 10712,
    title: 'Far from Heaven',
    releaseDate: '2002-11-08',
  },
  {
    id: 250734,
    title: 'Far from the Madding Crowd',
    releaseDate: '2015-04-23',
  },
  {
    id: 831827,
    title: 'Far from the Tree',
    releaseDate: '2021-11-24',
  },
  {
    id: 275,
    title: 'Fargo',
    releaseDate: '1996-03-08',
  },
  {
    id: 51497,
    title: 'Fast Five',
    releaseDate: '2011-04-20',
  },
  {
    id: 385687,
    title: 'Fast X',
    releaseDate: '2023-05-17',
  },
  {
    id: 16993,
    title: 'Fat City',
    releaseDate: '1972-07-26',
  },
  {
    id: 30295,
    title: 'Father Goose',
    releaseDate: '1964-12-10',
  },
  {
    id: 809140,
    title: 'Father Stu',
    releaseDate: '2022-04-13',
  },
  {
    id: 607259,
    title: 'Fatherhood',
    releaseDate: '2021-06-18',
  },
  {
    id: 254172,
    title: 'Fathers and Daughters',
    releaseDate: '2015-10-01',
  },
  {
    id: 520318,
    title: 'Fatima',
    releaseDate: '2020-08-13',
  },
  {
    id: 1878,
    title: 'Fear and Loathing in Las Vegas',
    releaseDate: '1998-05-22',
  },
  {
    id: 591275,
    title: 'Fear Street: 1666',
    releaseDate: '2021-07-14',
  },
  {
    id: 591274,
    title: 'Fear Street: 1978',
    releaseDate: '2021-07-08',
  },
  {
    id: 293299,
    title: 'Feast',
    releaseDate: '2014-10-25',
  },
  {
    id: 250657,
    title: 'Fed Up',
    releaseDate: '2014-05-09',
  },
  {
    id: 707886,
    title: 'Feel the Beat',
    releaseDate: '2020-06-19',
  },
  {
    id: 13012,
    title: 'Felon',
    releaseDate: '2008-07-17',
  },
  {
    id: 364689,
    title: 'Ferdinand',
    releaseDate: '2017-12-09',
  },
  {
    id: 9377,
    title: "Ferris Bueller's Day Off",
    releaseDate: '1986-06-11',
  },
  {
    id: 14811,
    title: 'Fiddler on the Roof',
    releaseDate: '1971-11-03',
  },
  {
    id: 2323,
    title: 'Field of Dreams',
    releaseDate: '1989-04-21',
  },
  {
    id: 550,
    title: 'Fight Club',
    releaseDate: '1999-10-15',
  },
  {
    id: 574475,
    title: 'Final Destination Bloodlines',
    releaseDate: '2025-05-14',
  },
  {
    id: 522402,
    title: 'Finch',
    releaseDate: '2021-11-04',
  },
  {
    id: 127380,
    title: 'Finding Dory',
    releaseDate: '2016-06-16',
  },
  {
    id: 711,
    title: 'Finding Forrester',
    releaseDate: '2000-12-21',
  },
  {
    id: 12,
    title: 'Finding Nemo',
    releaseDate: '2003-05-30',
  },
  {
    id: 866,
    title: 'Finding Neverland',
    releaseDate: '2004-10-29',
  },
  {
    id: 169607,
    title: 'Finding Vivian Maier',
    releaseDate: '2014-03-21',
  },
  {
    id: 426030,
    title: 'Finding Your Feet',
    releaseDate: '2017-12-26',
  },
  {
    id: 913823,
    title: 'Fire of Love',
    releaseDate: '2022-07-06',
  },
  {
    id: 797838,
    title: 'Firebird',
    releaseDate: '2021-10-29',
  },
  {
    id: 50337,
    title: 'Firebreather',
    releaseDate: '2010-11-24',
  },
  {
    id: 778810,
    title: 'Fireheart',
    releaseDate: '2022-01-16',
  },
  {
    id: 14438,
    title: 'Fireproof',
    releaseDate: '2008-09-26',
  },
  {
    id: 1368,
    title: 'First Blood',
    releaseDate: '1982-10-22',
  },
  {
    id: 558582,
    title: 'First Cow',
    releaseDate: '2020-03-06',
  },
  {
    id: 369972,
    title: 'First Man',
    releaseDate: '2018-10-10',
  },
  {
    id: 433247,
    title: 'First They Killed My Father',
    releaseDate: '2017-02-18',
  },
  {
    id: 26617,
    title: 'Five Easy Pieces',
    releaseDate: '1970-09-12',
  },
  {
    id: 527641,
    title: 'Five Feet Apart',
    releaseDate: '2019-03-14',
  },
  {
    id: 507089,
    title: "Five Nights at Freddy's",
    releaseDate: '2023-10-25',
  },
  {
    id: 626332,
    title: "Flamin' Hot",
    releaseDate: '2023-03-11',
  },
  {
    id: 43949,
    title: 'Flipped',
    releaseDate: '2010-08-06',
  },
  {
    id: 574093,
    title: 'Float',
    releaseDate: '2019-11-12',
  },
  {
    id: 21183,
    title: 'Fluke',
    releaseDate: '1995-06-02',
  },
  {
    id: 768141,
    title: 'Folklore: The Long Pond Studio Sessions',
    releaseDate: '2020-11-25',
  },
  {
    id: 11660,
    title: 'Following',
    releaseDate: '1999-05-06',
  },
  {
    id: 18570,
    title: 'Food, Inc.',
    releaseDate: '2008-09-07',
  },
  {
    id: 20423,
    title: 'For All Mankind',
    releaseDate: '1989-11-01',
  },
  {
    id: 576017,
    title: 'For Sama',
    releaseDate: '2019-07-26',
  },
  {
    id: 13930,
    title: 'For the Birds',
    releaseDate: '2000-11-02',
  },
  {
    id: 338544,
    title: 'For the Love of Spock',
    releaseDate: '2016-09-09',
  },
  {
    id: 830,
    title: 'Forbidden Planet',
    releaseDate: '1956-03-02',
  },
  {
    id: 359724,
    title: 'Ford v Ferrari',
    releaseDate: '2019-11-13',
  },
  {
    id: 417261,
    title: 'Forever My Girl',
    releaseDate: '2018-01-26',
  },
  {
    id: 31451,
    title: 'Forever Strong',
    releaseDate: '2008-09-26',
  },
  {
    id: 64288,
    title: 'Forks Over Knives',
    releaseDate: '2011-05-06',
  },
  {
    id: 13,
    title: 'Forrest Gump',
    releaseDate: '1994-06-23',
  },
  {
    id: 37347,
    title: 'Fort Apache',
    releaseDate: '1948-05-21',
  },
  {
    id: 6145,
    title: 'Fracture',
    releaseDate: '2007-04-19',
  },
  {
    id: 121986,
    title: 'Frances Ha',
    releaseDate: '2013-05-17',
  },
  {
    id: 1062722,
    title: 'Frankenstein',
    releaseDate: '2025-10-17',
  },
  {
    id: 3035,
    title: 'Frankenstein',
    releaseDate: '1931-11-21',
  },
  {
    id: 136,
    title: 'Freaks',
    releaseDate: '1932-01-01',
  },
  {
    id: 550988,
    title: 'Free Guy',
    releaseDate: '2021-08-11',
  },
  {
    id: 515042,
    title: 'Free Solo',
    releaseDate: '2018-09-28',
  },
  {
    id: 1646,
    title: 'Freedom Writers',
    releaseDate: '2007-01-05',
  },
  {
    id: 306745,
    title: 'Freeheld',
    releaseDate: '2015-10-02',
  },
  {
    id: 573,
    title: 'Frenzy',
    releaseDate: '1972-05-25',
  },
  {
    id: 10559,
    title: 'Frequency',
    releaseDate: '2000-04-28',
  },
  {
    id: 13815,
    title: 'Fresh',
    releaseDate: '1994-06-15',
  },
  {
    id: 1360,
    title: 'Frida',
    releaseDate: '2002-08-29',
  },
  {
    id: 10634,
    title: 'Friday',
    releaseDate: '1995-04-26',
  },
  {
    id: 1633,
    title: 'Fried Green Tomatoes',
    releaseDate: '1991-12-27',
  },
  {
    id: 691179,
    title: 'Friends: The Reunion',
    releaseDate: '2021-05-27',
  },
  {
    id: 11797,
    title: 'Fright Night',
    releaseDate: '1985-08-02',
  },
  {
    id: 755,
    title: 'From Dusk Till Dawn',
    releaseDate: '1996-01-19',
  },
  {
    id: 11426,
    title: 'From Here to Eternity',
    releaseDate: '1953-08-28',
  },
  {
    id: 657,
    title: 'From Russia with Love',
    releaseDate: '1963-10-10',
  },
  {
    id: 63193,
    title: 'Front of the Class',
    releaseDate: '2008-12-07',
  },
  {
    id: 11499,
    title: 'Frost/Nixon',
    releaseDate: '2008-10-15',
  },
  {
    id: 109445,
    title: 'Frozen',
    releaseDate: '2013-11-20',
  },
  {
    id: 330457,
    title: 'Frozen II',
    releaseDate: '2019-11-20',
  },
  {
    id: 157354,
    title: 'Fruitvale Station',
    releaseDate: '2013-07-26',
  },
  {
    id: 600,
    title: 'Full Metal Jacket',
    releaseDate: '1987-06-26',
  },
  {
    id: 298582,
    title: 'Full Out',
    releaseDate: '2015-09-11',
  },
  {
    id: 16085,
    title: 'Funny Girl',
    releaseDate: '1968-09-19',
  },
  {
    id: 786892,
    title: 'Furiosa: A Mad Max Saga',
    releaseDate: '2024-05-22',
  },
  {
    id: 168259,
    title: 'Furious 7',
    releaseDate: '2015-04-01',
  },
  {
    id: 228150,
    title: 'Fury',
    releaseDate: '2014-10-15',
  },
  {
    id: 14615,
    title: 'Fury',
    releaseDate: '1936-06-05',
  },
  {
    id: 7249,
    title: "Futurama: Bender's Big Score",
    releaseDate: '2007-11-27',
  },
  {
    id: 15060,
    title: 'Futurama: Into the Wild Green Yonder',
    releaseDate: '2009-02-06',
  },
  {
    id: 656968,
    title: "FX's A Christmas Carol",
    releaseDate: '2019-12-19',
  },
  {
    id: 696374,
    title: "Gabriel's Inferno",
    releaseDate: '2020-05-29',
  },
  {
    id: 724089,
    title: "Gabriel's Inferno: Part II",
    releaseDate: '2020-07-31',
  },
  {
    id: 761053,
    title: "Gabriel's Inferno: Part III",
    releaseDate: '2020-11-19',
  },
  {
    id: 850356,
    title: "Gabriel's Rapture: Part I",
    releaseDate: '2021-11-24',
  },
  {
    id: 472424,
    title: 'Gaga: Five Foot Two',
    releaseDate: '2017-09-21',
  },
  {
    id: 926,
    title: 'Galaxy Quest',
    releaseDate: '1999-12-25',
  },
  {
    id: 11646,
    title: 'Gallipoli',
    releaseDate: '1981-08-13',
  },
  {
    id: 591278,
    title: 'Game of Thrones: The Last Watch',
    releaseDate: '2019-05-26',
  },
  {
    id: 783,
    title: 'Gandhi',
    releaseDate: '1982-12-01',
  },
  {
    id: 3131,
    title: 'Gangs of New York',
    releaseDate: '2002-12-14',
  },
  {
    id: 401,
    title: 'Garden State',
    releaseDate: '2004-07-28',
  },
  {
    id: 40663,
    title: 'Gasland',
    releaseDate: '2010-01-24',
  },
  {
    id: 13528,
    title: 'Gaslight',
    releaseDate: '1944-05-04',
  },
  {
    id: 782,
    title: 'Gattaca',
    releaseDate: '1997-09-07',
  },
  {
    id: 759,
    title: 'Gentlemen Prefer Blondes',
    releaseDate: '1953-07-14',
  },
  {
    id: 13929,
    title: "Geri's Game",
    releaseDate: '1997-11-24',
  },
  {
    id: 234567,
    title: 'Get a Horse!',
    releaseDate: '2013-11-27',
  },
  {
    id: 419430,
    title: 'Get Out',
    releaseDate: '2017-02-24',
  },
  {
    id: 24584,
    title: 'Get Real',
    releaseDate: '1998-08-16',
  },
  {
    id: 251,
    title: 'Ghost',
    releaseDate: '1990-07-13',
  },
  {
    id: 4816,
    title: 'Ghost Dog: The Way of the Samurai',
    releaseDate: '1999-10-06',
  },
  {
    id: 1548,
    title: 'Ghost World',
    releaseDate: '2001-07-20',
  },
  {
    id: 620,
    title: 'Ghostbusters',
    releaseDate: '1984-06-08',
  },
  {
    id: 425909,
    title: 'Ghostbusters: Afterlife',
    releaseDate: '2021-11-18',
  },
  {
    id: 476299,
    title: 'Ghostland',
    releaseDate: '2018-03-14',
  },
  {
    id: 37793,
    title: 'Ghosts',
    releaseDate: '1997-09-04',
  },
  {
    id: 14533,
    title: 'Gia',
    releaseDate: '1998-01-31',
  },
  {
    id: 1712,
    title: 'Giant',
    releaseDate: '1956-11-08',
  },
  {
    id: 537681,
    title: 'Giant Little Ones',
    releaseDate: '2019-01-03',
  },
  {
    id: 400928,
    title: 'Gifted',
    releaseDate: '2017-04-07',
  },
  {
    id: 22683,
    title: 'Gifted Hands: The Ben Carson Story',
    releaseDate: '2009-02-07',
  },
  {
    id: 3767,
    title: 'Gilda',
    releaseDate: '1946-04-25',
  },
  {
    id: 132,
    title: 'Gimme Shelter',
    releaseDate: '1970-12-13',
  },
  {
    id: 801335,
    title: 'Girl in the Basement',
    releaseDate: '2021-02-27',
  },
  {
    id: 988046,
    title: 'Girl in the Picture',
    releaseDate: '2022-07-06',
  },
  {
    id: 3558,
    title: 'Girl, Interrupted',
    releaseDate: '1999-12-21',
  },
  {
    id: 16219,
    title: 'Gladiator',
    releaseDate: '1992-03-06',
  },
  {
    id: 98,
    title: 'Gladiator',
    releaseDate: '2000-05-04',
  },
  {
    id: 661374,
    title: 'Glass Onion: A Knives Out Mystery',
    releaseDate: '2022-11-23',
  },
  {
    id: 67675,
    title: 'Glee: The Concert Movie',
    releaseDate: '2011-08-11',
  },
  {
    id: 9504,
    title: 'Glengarry Glen Ross',
    releaseDate: '1992-09-10',
  },
  {
    id: 9665,
    title: 'Glory',
    releaseDate: '1989-12-15',
  },
  {
    id: 9918,
    title: 'Glory Road',
    releaseDate: '2006-01-13',
  },
  {
    id: 428493,
    title: "God's Own Country",
    releaseDate: '2017-08-31',
  },
  {
    id: 399566,
    title: 'Godzilla vs. Kong',
    releaseDate: '2021-03-24',
  },
  {
    id: 823464,
    title: 'Godzilla x Kong: The New Empire',
    releaseDate: '2024-03-27',
  },
  {
    id: 318224,
    title: 'Going Clear: Scientology and the Prison of Belief',
    releaseDate: '2015-01-25',
  },
  {
    id: 31511,
    title: 'Gold Diggers of 1933',
    releaseDate: '1933-05-27',
  },
  {
    id: 658,
    title: 'Goldfinger',
    releaseDate: '1964-09-20',
  },
  {
    id: 4771,
    title: 'Gone Baby Gone',
    releaseDate: '2007-09-18',
  },
  {
    id: 210577,
    title: 'Gone Girl',
    releaseDate: '2014-10-01',
  },
  {
    id: 831223,
    title: 'Gone Mom: The Disappearance of Jennifer Dulos',
    releaseDate: '2021-06-05',
  },
  {
    id: 770,
    title: 'Gone with the Wind',
    releaseDate: '1939-12-15',
  },
  {
    id: 1114967,
    title: 'Good Fortune',
    releaseDate: '2025-10-14',
  },
  {
    id: 801,
    title: 'Good Morning, Vietnam',
    releaseDate: '1987-12-23',
  },
  {
    id: 3291,
    title: 'Good Night, and Good Luck.',
    releaseDate: '2005-09-16',
  },
  {
    id: 429200,
    title: 'Good Time',
    releaseDate: '2017-08-11',
  },
  {
    id: 489,
    title: 'Good Will Hunting',
    releaseDate: '1997-12-05',
  },
  {
    id: 418680,
    title: 'Goodbye Christopher Robin',
    releaseDate: '2017-09-29',
  },
  {
    id: 769,
    title: 'GoodFellas',
    releaseDate: '1990-09-12',
  },
  {
    id: 10130,
    title: 'Gorillas in the Mist',
    releaseDate: '1988-09-23',
  },
  {
    id: 13223,
    title: 'Gran Torino',
    releaseDate: '2008-12-12',
  },
  {
    id: 980489,
    title: 'Gran Turismo',
    releaseDate: '2023-08-09',
  },
  {
    id: 20379,
    title: 'Grand Prix',
    releaseDate: '1966-12-21',
  },
  {
    id: 49047,
    title: 'Gravity',
    releaseDate: '2013-10-03',
  },
  {
    id: 621,
    title: 'Grease',
    releaseDate: '1978-06-16',
  },
  {
    id: 348089,
    title: 'Grease Live',
    releaseDate: '2016-01-31',
  },
  {
    id: 14320,
    title: 'Great Expectations',
    releaseDate: '1946-12-26',
  },
  {
    id: 1405,
    title: 'Greed',
    releaseDate: '1924-12-04',
  },
  {
    id: 490132,
    title: 'Green Book',
    releaseDate: '2018-11-16',
  },
  {
    id: 8923,
    title: 'Green Street Hooligans',
    releaseDate: '2005-09-09',
  },
  {
    id: 524047,
    title: 'Greenland',
    releaseDate: '2020-07-29',
  },
  {
    id: 927,
    title: 'Gremlins',
    releaseDate: '1984-06-08',
  },
  {
    id: 17346,
    title: 'Grey Gardens',
    releaseDate: '1976-02-19',
  },
  {
    id: 516486,
    title: 'Greyhound',
    releaseDate: '2020-07-09',
  },
  {
    id: 9766,
    title: 'Gridiron Gang',
    releaseDate: '2006-09-15',
  },
  {
    id: 15534,
    title: 'Griffin & Phoenix',
    releaseDate: '2006-09-12',
  },
  {
    id: 501,
    title: 'Grizzly Man',
    releaseDate: '2005-08-12',
  },
  {
    id: 1010821,
    title: 'Groot Takes a Bath',
    releaseDate: '2022-08-10',
  },
  {
    id: 1010818,
    title: "Groot's First Steps",
    releaseDate: '2022-08-10',
  },
  {
    id: 1010820,
    title: "Groot's Pursuit",
    releaseDate: '2022-08-10',
  },
  {
    id: 137,
    title: 'Groundhog Day',
    releaseDate: '1993-02-11',
  },
  {
    id: 118340,
    title: 'Guardians of the Galaxy',
    releaseDate: '2014-07-30',
  },
  {
    id: 283995,
    title: 'Guardians of the Galaxy Vol. 2',
    releaseDate: '2017-04-19',
  },
  {
    id: 447365,
    title: 'Guardians of the Galaxy Vol. 3',
    releaseDate: '2023-05-03',
  },
  {
    id: 1879,
    title: "Guess Who's Coming to Dinner",
    releaseDate: '1967-12-11',
  },
  {
    id: 555604,
    title: "Guillermo del Toro's Pinocchio",
    releaseDate: '2022-11-09',
  },
  {
    id: 18671,
    title: 'Gun Crazy',
    releaseDate: '1950-01-20',
  },
  {
    id: 22201,
    title: 'Gunfight at the O.K. Corral',
    releaseDate: '1957-05-30',
  },
  {
    id: 242575,
    title: 'Good Day, Ramon',
    releaseDate: '2013-10-21',
  },
  {
    id: 882569,
    title: "Guy Ritchie's The Covenant",
    releaseDate: '2023-04-19',
  },
  {
    id: 28178,
    title: "Hachi: A Dog's Tale",
    releaseDate: '2009-06-08',
  },
  {
    id: 324786,
    title: 'Hacksaw Ridge',
    releaseDate: '2016-10-07',
  },
  {
    id: 10654,
    title: 'Hair',
    releaseDate: '1979-03-15',
  },
  {
    id: 589739,
    title: 'Hair Love',
    releaseDate: '2019-08-14',
  },
  {
    id: 409447,
    title: 'Hairspray Live!',
    releaseDate: '2016-12-07',
  },
  {
    id: 652962,
    title: 'Half Brothers',
    releaseDate: '2020-12-04',
  },
  {
    id: 948,
    title: 'Halloween',
    releaseDate: '1978-10-24',
  },
  {
    id: 573531,
    title: 'Halo Legends',
    releaseDate: '2010-02-16',
  },
  {
    id: 23383,
    title: 'Hamlet',
    releaseDate: '1948-12-10',
  },
  {
    id: 10549,
    title: 'Hamlet',
    releaseDate: '1996-12-25',
  },
  {
    id: 412202,
    title: 'Handsome Devil',
    releaseDate: '2017-02-15',
  },
  {
    id: 5143,
    title: 'Hannah and Her Sisters',
    releaseDate: '1986-02-07',
  },
  {
    id: 529531,
    title: 'Hannah Gadsby: Nanette',
    releaseDate: '2018-06-19',
  },
  {
    id: 520172,
    title: 'Happiest Season',
    releaseDate: '2020-11-26',
  },
  {
    id: 10683,
    title: 'Happiness',
    releaseDate: '1998-10-11',
  },
  {
    id: 721656,
    title: 'Happy Halloween, Scooby-Doo!',
    releaseDate: '2020-10-06',
  },
  {
    id: 343,
    title: 'Harold and Maude',
    releaseDate: '1971-12-20',
  },
  {
    id: 506528,
    title: 'Harriet',
    releaseDate: '2019-11-01',
  },
  {
    id: 899082,
    title: 'Harry Potter 20th Anniversary: Return to Hogwarts',
    releaseDate: '2022-01-01',
  },
  {
    id: 672,
    title: 'Harry Potter and the Chamber of Secrets',
    releaseDate: '2002-11-13',
  },
  {
    id: 12444,
    title: 'Harry Potter and the Deathly Hallows: Part 1',
    releaseDate: '2010-11-17',
  },
  {
    id: 12445,
    title: 'Harry Potter and the Deathly Hallows: Part 2',
    releaseDate: '2011-07-12',
  },
  {
    id: 674,
    title: 'Harry Potter and the Goblet of Fire',
    releaseDate: '2005-11-16',
  },
  {
    id: 767,
    title: 'Harry Potter and the Half-Blood Prince',
    releaseDate: '2009-07-15',
  },
  {
    id: 675,
    title: 'Harry Potter and the Order of the Phoenix',
    releaseDate: '2007-07-08',
  },
  {
    id: 671,
    title: "Harry Potter and the Philosopher's Stone",
    releaseDate: '2001-11-16',
  },
  {
    id: 673,
    title: 'Harry Potter and the Prisoner of Azkaban',
    releaseDate: '2004-05-31',
  },
  {
    id: 11787,
    title: 'Harvey',
    releaseDate: '1950-12-04',
  },
  {
    id: 21131,
    title: 'Harvie Krumpet',
    releaseDate: '2003-10-23',
  },
  {
    id: 34843,
    title: 'Hawking',
    releaseDate: '2004-12-10',
  },
  {
    id: 4539,
    title: "Hearts of Darkness: A Filmmaker's Apocalypse",
    releaseDate: '1991-11-27',
  },
  {
    id: 949,
    title: 'Heat',
    releaseDate: '1995-12-15',
  },
  {
    id: 2640,
    title: 'Heathers',
    releaseDate: '1989-03-31',
  },
  {
    id: 13403,
    title: 'Hedwig and the Angry Inch',
    releaseDate: '2001-07-20',
  },
  {
    id: 338766,
    title: 'Hell or High Water',
    releaseDate: '2016-08-11',
  },
  {
    id: 13348,
    title: 'Helvetica',
    releaseDate: '2007-09-12',
  },
  {
    id: 926670,
    title: 'Henry Danger: The Movie',
    releaseDate: '2025-01-17',
  },
  {
    id: 10705,
    title: 'Henry V',
    releaseDate: '1989-10-05',
  },
  {
    id: 152601,
    title: 'Her',
    releaseDate: '2013-12-18',
  },
  {
    id: 11970,
    title: 'Hercules',
    releaseDate: '1997-06-13',
  },
  {
    id: 493922,
    title: 'Hereditary',
    releaseDate: '2018-06-07',
  },
  {
    id: 439058,
    title: 'Hey Arnold! The Jungle Movie',
    releaseDate: '2018-04-26',
  },
  {
    id: 381284,
    title: 'Hidden Figures',
    releaseDate: '2016-12-10',
  },
  {
    id: 243,
    title: 'High Fidelity',
    releaseDate: '2000-03-17',
  },
  {
    id: 288,
    title: 'High Noon',
    releaseDate: '1952-06-09',
  },
  {
    id: 11901,
    title: 'High Plains Drifter',
    releaseDate: '1973-04-19',
  },
  {
    id: 27725,
    title: 'High Sierra',
    releaseDate: '1941-01-23',
  },
  {
    id: 382399,
    title: 'High Strung',
    releaseDate: '2016-04-08',
  },
  {
    id: 540158,
    title: 'High Strung Free Dance',
    releaseDate: '2018-09-13',
  },
  {
    id: 789708,
    title: 'Hilda and the Mountain King',
    releaseDate: '2021-12-30',
  },
  {
    id: 3085,
    title: 'His Girl Friday',
    releaseDate: '1940-01-18',
  },
  {
    id: 339751,
    title: 'Hitchcock/Truffaut',
    releaseDate: '2015-09-05',
  },
  {
    id: 16410,
    title: "Hobson's Choice",
    releaseDate: '1954-04-19',
  },
  {
    id: 10439,
    title: 'Hocus Pocus',
    releaseDate: '1993-07-16',
  },
  {
    id: 642885,
    title: 'Hocus Pocus 2',
    releaseDate: '2022-09-27',
  },
  {
    id: 337960,
    title: 'Holding the Man',
    releaseDate: '2015-08-27',
  },
  {
    id: 16274,
    title: 'Holiday',
    releaseDate: '1938-05-26',
  },
  {
    id: 13485,
    title: 'Holiday Inn',
    releaseDate: '1942-07-10',
  },
  {
    id: 27945,
    title: 'Hombre',
    releaseDate: '1967-03-21',
  },
  {
    id: 771,
    title: 'Home Alone',
    releaseDate: '1990-11-16',
  },
  {
    id: 593691,
    title: 'HOMECOMING: A film by Beyoncé',
    releaseDate: '2019-04-16',
  },
  {
    id: 512263,
    title: 'Honey Boy',
    releaseDate: '2019-09-28',
  },
  {
    id: 929170,
    title: 'Honor Society',
    releaseDate: '2022-07-23',
  },
  {
    id: 14275,
    title: 'Hoop Dreams',
    releaseDate: '1994-09-12',
  },
  {
    id: 5693,
    title: 'Hoosiers',
    releaseDate: '1986-11-14',
  },
  {
    id: 4638,
    title: 'Hot Fuzz',
    releaseDate: '2007-02-14',
  },
  {
    id: 416144,
    title: 'Hotel Mumbai',
    releaseDate: '2019-03-14',
  },
  {
    id: 205,
    title: 'Hotel Rwanda',
    releaseDate: '2004-12-22',
  },
  {
    id: 585083,
    title: 'Hotel Transylvania: Transformania',
    releaseDate: '2022-01-31',
  },
  {
    id: 11093,
    title: 'House of Sand and Fog',
    releaseDate: '2003-12-19',
  },
  {
    id: 43266,
    title: 'How Green Was My Valley',
    releaseDate: '1941-10-28',
  },
  {
    id: 13377,
    title: 'How the Grinch Stole Christmas!',
    releaseDate: '1966-12-18',
  },
  {
    id: 3001,
    title: 'How to Steal a Million',
    releaseDate: '1966-07-13',
  },
  {
    id: 1087192,
    title: 'How to Train Your Dragon',
    releaseDate: '2025-06-06',
  },
  {
    id: 10191,
    title: 'How to Train Your Dragon',
    releaseDate: '2010-03-18',
  },
  {
    id: 82702,
    title: 'How to Train Your Dragon 2',
    releaseDate: '2014-06-05',
  },
  {
    id: 638507,
    title: 'How to Train Your Dragon: Homecoming',
    releaseDate: '2019-12-03',
  },
  {
    id: 166428,
    title: 'How to Train Your Dragon: The Hidden World',
    releaseDate: '2019-01-03',
  },
  {
    id: 24748,
    title: 'Hud',
    releaseDate: '1963-05-28',
  },
  {
    id: 44826,
    title: 'Hugo',
    releaseDate: '2011-11-22',
  },
  {
    id: 15257,
    title: 'Hulk vs. Wolverine',
    releaseDate: '2009-01-27',
  },
  {
    id: 1019939,
    title: 'Hundreds of Beavers',
    releaseDate: '2024-01-26',
  },
  {
    id: 10360,
    title: 'Hunger',
    releaseDate: '2008-05-15',
  },
  {
    id: 371645,
    title: 'Hunt for the Wilderpeople',
    releaseDate: '2016-01-22',
  },
  {
    id: 10299,
    title: 'Hush... Hush, Sweet Charlotte',
    releaseDate: '1964-12-16',
  },
  {
    id: 705861,
    title: 'Hustle',
    releaseDate: '2022-06-03',
  },
  {
    id: 10476,
    title: 'Hustle & Flow',
    releaseDate: '2005-07-22',
  },
  {
    id: 419546,
    title: 'HyperNormalisation',
    releaseDate: '2016-10-25',
  },
  {
    id: 29740,
    title: 'I Am a Fugitive from a Chain Gang',
    releaseDate: '1932-11-09',
  },
  {
    id: 84383,
    title: 'I Am Bruce Lee',
    releaseDate: '2012-02-09',
  },
  {
    id: 450945,
    title: 'I Am Heath Ledger',
    releaseDate: '2017-04-23',
  },
  {
    id: 6479,
    title: 'I Am Legend',
    releaseDate: '2007-12-12',
  },
  {
    id: 411019,
    title: 'I Am Not Your Negro',
    releaseDate: '2017-02-03',
  },
  {
    id: 10950,
    title: 'I Am Sam',
    releaseDate: '2001-12-28',
  },
  {
    id: 879805,
    title: 'I Am: Celine Dion',
    releaseDate: '2024-06-18',
  },
  {
    id: 470878,
    title: 'I Can Only Imagine',
    releaseDate: '2018-02-14',
  },
  {
    id: 31216,
    title: "I Can't Think Straight",
    releaseDate: '2008-06-01',
  },
  {
    id: 30159,
    title: 'I Confess',
    releaseDate: '1953-02-12',
  },
  {
    id: 56137,
    title: "I Know Where I'm Going!",
    releaseDate: '1945-11-16',
  },
  {
    id: 244267,
    title: 'I Origins',
    releaseDate: '2014-07-18',
  },
  {
    id: 585244,
    title: 'I Still Believe',
    releaseDate: '2020-03-12',
  },
  {
    id: 37058,
    title: "I'm Here",
    releaseDate: '2010-03-01',
  },
  {
    id: 409502,
    title: "I'm Not Ashamed",
    releaseDate: '2016-10-21',
  },
  {
    id: 374473,
    title: 'I, Daniel Blake',
    releaseDate: '2016-10-21',
  },
  {
    id: 389015,
    title: 'I, Tonya',
    releaseDate: '2017-12-07',
  },
  {
    id: 432976,
    title: 'Icarus',
    releaseDate: '2017-06-03',
  },
  {
    id: 425,
    title: 'Ice Age',
    releaseDate: '2002-03-14',
  },
  {
    id: 2832,
    title: 'Identity',
    releaseDate: '2003-04-25',
  },
  {
    id: 713776,
    title: 'If Anything Happens I Love You',
    releaseDate: '2020-03-07',
  },
  {
    id: 249164,
    title: 'If I Stay',
    releaseDate: '2014-08-21',
  },
  {
    id: 15775,
    title: 'If Only',
    releaseDate: '2004-01-23',
  },
  {
    id: 14794,
    title: 'if....',
    releaseDate: '1968-12-19',
  },
  {
    id: 1544,
    title: 'Imagine Me & You',
    releaseDate: '2006-01-27',
  },
  {
    id: 34148,
    title: 'Imitation of Life',
    releaseDate: '1959-04-09',
  },
  {
    id: 13701,
    title: 'Immortal Beloved',
    releaseDate: '1994-12-16',
  },
  {
    id: 455661,
    title: 'In a Heartbeat',
    releaseDate: '2017-06-01',
  },
  {
    id: 17057,
    title: 'In a Lonely Place',
    releaseDate: '1950-05-17',
  },
  {
    id: 10511,
    title: 'In America',
    releaseDate: '2003-09-22',
  },
  {
    id: 8321,
    title: 'In Bruges',
    releaseDate: '2008-02-08',
  },
  {
    id: 18900,
    title: 'In Cold Blood',
    releaseDate: '1967-12-15',
  },
  {
    id: 10633,
    title: 'In the Heat of the Night',
    releaseDate: '1967-08-02',
  },
  {
    id: 467909,
    title: 'In the Heights',
    releaseDate: '2021-06-10',
  },
  {
    id: 19833,
    title: 'In the Loop',
    releaseDate: '2009-01-22',
  },
  {
    id: 2654,
    title: 'In the Mouth of Madness',
    releaseDate: '1995-02-03',
  },
  {
    id: 7984,
    title: 'In the Name of the Father',
    releaseDate: '1993-12-12',
  },
  {
    id: 226448,
    title: 'In Your Eyes',
    releaseDate: '2014-04-20',
  },
  {
    id: 27205,
    title: 'Inception',
    releaseDate: '2010-07-15',
  },
  {
    id: 64956,
    title: 'Inception: The Cobol Job',
    releaseDate: '2010-12-07',
  },
  {
    id: 260513,
    title: 'Incredibles 2',
    releaseDate: '2018-06-14',
  },
  {
    id: 89,
    title: 'Indiana Jones and the Last Crusade',
    releaseDate: '1989-05-24',
  },
  {
    id: 87,
    title: 'Indiana Jones and the Temple of Doom',
    releaseDate: '1984-05-23',
  },
  {
    id: 80215,
    title: 'Indie Game: The Movie',
    releaseDate: '2012-05-18',
  },
  {
    id: 16869,
    title: 'Inglourious Basterds',
    releaseDate: '2009-08-02',
  },
  {
    id: 1908,
    title: 'Inherit the Wind',
    releaseDate: '1960-07-07',
  },
  {
    id: 831405,
    title: 'Injustice',
    releaseDate: '2021-10-09',
  },
  {
    id: 1730,
    title: 'Inland Empire',
    releaseDate: '2006-12-06',
  },
  {
    id: 406785,
    title: 'Inner Workings',
    releaseDate: '2016-11-23',
  },
  {
    id: 31165,
    title: "Inside I'm Dancing",
    releaseDate: '2004-10-15',
  },
  {
    id: 44639,
    title: 'Inside Job',
    releaseDate: '2010-10-08',
  },
  {
    id: 86829,
    title: 'Inside Llewyn Davis',
    releaseDate: '2013-10-18',
  },
  {
    id: 388,
    title: 'Inside Man',
    releaseDate: '2006-03-17',
  },
  {
    id: 150540,
    title: 'Inside Out',
    releaseDate: '2015-06-17',
  },
  {
    id: 1022789,
    title: 'Inside Out 2',
    releaseDate: '2024-06-11',
  },
  {
    id: 1003180,
    title: 'Inside the Mind of a Cat',
    releaseDate: '2022-08-18',
  },
  {
    id: 491418,
    title: 'Instant Family',
    releaseDate: '2018-11-13',
  },
  {
    id: 20312,
    title: 'Interstate 60',
    releaseDate: '2002-04-13',
  },
  {
    id: 11049,
    title: 'Interstella 5555: The 5tory of the 5ecret 5tar 5ystem',
    releaseDate: '2003-05-28',
  },
  {
    id: 157336,
    title: 'Interstellar',
    releaseDate: '2014-11-05',
  },
  {
    id: 301959,
    title: "Interstellar: Nolan's Odyssey",
    releaseDate: '2014-11-05',
  },
  {
    id: 628,
    title: 'Interview with the Vampire',
    releaseDate: '1994-11-11',
  },
  {
    id: 5915,
    title: 'Into the Wild',
    releaseDate: '2007-09-21',
  },
  {
    id: 3059,
    title: "Intolerance: Love's Struggle Throughout the Ages",
    releaseDate: '1916-09-04',
  },
  {
    id: 472983,
    title: 'Invader Zim: Enter the Florpus',
    releaseDate: '2019-08-16',
  },
  {
    id: 11850,
    title: 'Invasion of the Body Snatchers',
    releaseDate: '1978-12-20',
  },
  {
    id: 11549,
    title: 'Invasion of the Body Snatchers',
    releaseDate: '1956-02-05',
  },
  {
    id: 22954,
    title: 'Invictus',
    releaseDate: '2009-12-11',
  },
  {
    id: 11652,
    title: 'Invincible',
    releaseDate: '2006-08-25',
  },
  {
    id: 2690,
    title: 'Irma la Douce',
    releaseDate: '1963-06-05',
  },
  {
    id: 1726,
    title: 'Iron Man',
    releaseDate: '2008-04-30',
  },
  {
    id: 399174,
    title: 'Isle of Dogs',
    releaseDate: '2018-03-23',
  },
  {
    id: 346364,
    title: 'It',
    releaseDate: '2017-09-06',
  },
  {
    id: 3078,
    title: 'It Happened One Night',
    releaseDate: '1934-02-22',
  },
  {
    id: 22492,
    title: 'It Might Get Loud',
    releaseDate: '2008-09-05',
  },
  {
    id: 298016,
    title: "It's a SpongeBob Christmas!",
    releaseDate: '2012-09-19',
  },
  {
    id: 1585,
    title: "It's a Wonderful Life",
    releaseDate: '1946-12-20',
  },
  {
    id: 489412,
    title: "It's Such a Beautiful Day",
    releaseDate: '2012-08-24',
  },
  {
    id: 13353,
    title: "It's the Great Pumpkin, Charlie Brown",
    releaseDate: '1966-10-27',
  },
  {
    id: 13932,
    title: 'Jack-Jack Attack',
    releaseDate: '2005-03-15',
  },
  {
    id: 184,
    title: 'Jackie Brown',
    releaseDate: '1997-12-25',
  },
  {
    id: 2291,
    title: "Jacob's Ladder",
    releaseDate: '1990-11-02',
  },
  {
    id: 38684,
    title: 'Jane Eyre',
    releaseDate: '2011-03-11',
  },
  {
    id: 321974,
    title: 'Janis: Little Girl Blue',
    releaseDate: '2015-09-09',
  },
  {
    id: 11533,
    title: 'Jason and the Argonauts',
    releaseDate: '1963-06-13',
  },
  {
    id: 578,
    title: 'Jaws',
    releaseDate: '1975-06-20',
  },
  {
    id: 11943,
    title: 'Jeremiah Johnson',
    releaseDate: '1972-09-10',
  },
  {
    id: 843847,
    title: 'Jerry & Marge Go Large',
    releaseDate: '2022-10-20',
  },
  {
    id: 45139,
    title: 'Jesus',
    releaseDate: '1979-10-19',
  },
  {
    id: 12545,
    title: 'Jesus Christ Superstar',
    releaseDate: '1973-08-15',
  },
  {
    id: 820,
    title: 'JFK',
    releaseDate: '1991-12-20',
  },
  {
    id: 469019,
    title: 'Jim & Andy: The Great Beyond',
    releaseDate: '2017-09-05',
  },
  {
    id: 289333,
    title: 'Jim Jefferies: Bare',
    releaseDate: '2014-08-29',
  },
  {
    id: 404022,
    title: 'Jim Jefferies: Freedumb',
    releaseDate: '2016-07-01',
  },
  {
    id: 80767,
    title: 'Jiro Dreams of Sushi',
    releaseDate: '2011-06-11',
  },
  {
    id: 191720,
    title: "Jodorowsky's Dune",
    releaseDate: '2013-08-30',
  },
  {
    id: 520594,
    title: 'John Mulaney: Kid Gorgeous at Radio City',
    releaseDate: '2018-05-01',
  },
  {
    id: 86705,
    title: 'John Mulaney: New in Town',
    releaseDate: '2012-01-31',
  },
  {
    id: 367735,
    title: 'John Mulaney: The Comeback Kid',
    releaseDate: '2015-11-13',
  },
  {
    id: 8470,
    title: 'John Q',
    releaseDate: '2002-02-15',
  },
  {
    id: 245891,
    title: 'John Wick',
    releaseDate: '2014-10-22',
  },
  {
    id: 324552,
    title: 'John Wick: Chapter 2',
    releaseDate: '2017-02-08',
  },
  {
    id: 458156,
    title: 'John Wick: Chapter 3 - Parabellum',
    releaseDate: '2019-05-15',
  },
  {
    id: 603692,
    title: 'John Wick: Chapter 4',
    releaseDate: '2023-03-22',
  },
  {
    id: 16328,
    title: 'Johnny Got His Gun',
    releaseDate: '1971-08-04',
  },
  {
    id: 26596,
    title: 'Johnny Guitar',
    releaseDate: '1954-05-26',
  },
  {
    id: 515001,
    title: 'Jojo Rabbit',
    releaseDate: '2019-10-18',
  },
  {
    id: 475557,
    title: 'Joker',
    releaseDate: '2019-10-01',
  },
  {
    id: 2405,
    title: 'Joseph',
    releaseDate: '1995-04-10',
  },
  {
    id: 583406,
    title: 'Judas and the Black Messiah',
    releaseDate: '2021-02-12',
  },
  {
    id: 821,
    title: 'Judgment at Nuremberg',
    releaseDate: '1961-12-18',
  },
  {
    id: 16136,
    title: 'Juice',
    releaseDate: '1992-01-17',
  },
  {
    id: 1072371,
    title: 'Jules',
    releaseDate: '2023-08-10',
  },
  {
    id: 18019,
    title: 'Julius Caesar',
    releaseDate: '1953-06-04',
  },
  {
    id: 8844,
    title: 'Jumanji',
    releaseDate: '1995-12-15',
  },
  {
    id: 451048,
    title: 'Jungle Cruise',
    releaseDate: '2021-07-28',
  },
  {
    id: 7326,
    title: 'Juno',
    releaseDate: '2007-12-05',
  },
  {
    id: 329,
    title: 'Jurassic Park',
    releaseDate: '1993-06-11',
  },
  {
    id: 522212,
    title: 'Just Mercy',
    releaseDate: '2019-12-25',
  },
  {
    id: 408220,
    title: 'Justice League Dark',
    releaseDate: '2017-01-24',
  },
  {
    id: 618344,
    title: 'Justice League Dark: Apokolips War',
    releaseDate: '2020-05-05',
  },
  {
    id: 379291,
    title: 'Justice League vs. Teen Titans',
    releaseDate: '2016-03-26',
  },
  {
    id: 1155089,
    title: 'Justice League: Crisis on Infinite Earths Part One',
    releaseDate: '2024-01-08',
  },
  {
    id: 1209290,
    title: 'Justice League: Crisis on Infinite Earths Part Three',
    releaseDate: '2024-07-15',
  },
  {
    id: 30061,
    title: 'Justice League: Crisis on Two Earths',
    releaseDate: '2010-02-23',
  },
  {
    id: 76589,
    title: 'Justice League: Doom',
    releaseDate: '2012-02-28',
  },
  {
    id: 323027,
    title: 'Justice League: Gods and Monsters',
    releaseDate: '2015-06-18',
  },
  {
    id: 183011,
    title: 'Justice League: The Flashpoint Paradox',
    releaseDate: '2013-07-30',
  },
  {
    id: 217993,
    title: 'Justice League: War',
    releaseDate: '2014-01-21',
  },
  {
    id: 736069,
    title: 'Justice Society: World War II',
    releaseDate: '2021-04-27',
  },
  {
    id: 229296,
    title: "Justin Bieber's Believe",
    releaseDate: '2013-12-19',
  },
  {
    id: 616584,
    title: 'K-12',
    releaseDate: '2019-09-05',
  },
  {
    id: 167,
    title: 'K-PAX',
    releaseDate: '2001-10-26',
  },
  {
    id: 1011477,
    title: 'Karate Kid: Legends',
    releaseDate: '2025-05-08',
  },
  {
    id: 101267,
    title: 'Katy Perry: Part of Me',
    releaseDate: '2012-06-28',
  },
  {
    id: 14859,
    title: 'Keith',
    releaseDate: '2008-09-13',
  },
  {
    id: 11589,
    title: "Kelly's Heroes",
    releaseDate: '1970-06-22',
  },
  {
    id: 13384,
    title: 'Kes',
    releaseDate: '1970-04-03',
  },
  {
    id: 27866,
    title: "Kevin Hart: I'm a Grown Little Man",
    releaseDate: '2009-02-03',
  },
  {
    id: 42189,
    title: 'Kevin Hart: Seriously Funny',
    releaseDate: '2010-07-20',
  },
  {
    id: 11016,
    title: 'Key Largo',
    releaseDate: '1948-07-16',
  },
  {
    id: 23483,
    title: 'Kick-Ass',
    releaseDate: '2010-03-26',
  },
  {
    id: 24914,
    title: "Kid's Story",
    releaseDate: '2003-06-03',
  },
  {
    id: 414419,
    title: 'Kill Bill: The Whole Bloody Affair',
    releaseDate: '2011-03-27',
  },
  {
    id: 24,
    title: 'Kill Bill: Vol. 1',
    releaseDate: '2003-10-10',
  },
  {
    id: 393,
    title: 'Kill Bill: Vol. 2',
    releaseDate: '2004-04-16',
  },
  {
    id: 1134055,
    title: 'Kill Shot',
    releaseDate: '2023-08-15',
  },
  {
    id: 157370,
    title: 'Kill Your Darlings',
    releaseDate: '2013-10-16',
  },
  {
    id: 24528,
    title: 'Killer Bean Forever',
    releaseDate: '2008-09-05',
  },
  {
    id: 466420,
    title: 'Killers of the Flower Moon',
    releaseDate: '2023-10-18',
  },
  {
    id: 11898,
    title: 'Kind Hearts and Coronets',
    releaseDate: '1949-06-21',
  },
  {
    id: 244,
    title: 'King Kong',
    releaseDate: '1933-03-15',
  },
  {
    id: 36362,
    title: 'King of Kings',
    releaseDate: '1961-10-11',
  },
  {
    id: 614917,
    title: 'King Richard',
    releaseDate: '2021-11-18',
  },
  {
    id: 1495,
    title: 'Kingdom of Heaven',
    releaseDate: '2005-05-03',
  },
  {
    id: 653346,
    title: 'Kingdom of the Planet of the Apes',
    releaseDate: '2024-05-08',
  },
  {
    id: 207703,
    title: 'Kingsman: The Secret Service',
    releaseDate: '2015-01-24',
  },
  {
    id: 440596,
    title: 'Kiss and Cry',
    releaseDate: '2017-02-10',
  },
  {
    id: 5236,
    title: 'Kiss Kiss Bang Bang',
    releaseDate: '2005-09-14',
  },
  {
    id: 18030,
    title: 'Kiss Me Deadly',
    releaseDate: '1955-04-28',
  },
  {
    id: 53021,
    title: 'Kiss Me, Stupid',
    releaseDate: '1964-12-22',
  },
  {
    id: 21454,
    title: 'Kiss of Death',
    releaseDate: '1947-08-27',
  },
  {
    id: 11703,
    title: 'Kiss of the Spider Woman',
    releaseDate: '1985-07-26',
  },
  {
    id: 574074,
    title: 'Kitbull',
    releaseDate: '2019-01-18',
  },
  {
    id: 508965,
    title: 'Klaus',
    releaseDate: '2019-11-08',
  },
  {
    id: 13928,
    title: 'Knick Knack',
    releaseDate: '1989-11-23',
  },
  {
    id: 546554,
    title: 'Knives Out',
    releaseDate: '2019-11-27',
  },
  {
    id: 565312,
    title: 'Knock Down the House',
    releaseDate: '2019-01-27',
  },
  {
    id: 11314,
    title: 'Koyaanisqatsi',
    releaseDate: '1983-04-27',
  },
  {
    id: 803796,
    title: 'KPop Demon Hunters',
    releaseDate: '2025-06-20',
  },
  {
    id: 12102,
    title: 'Kramer vs. Kramer',
    releaseDate: '1979-12-07',
  },
  {
    id: 313297,
    title: 'Kubo and the Two Strings',
    releaseDate: '2016-08-18',
  },
  {
    id: 9502,
    title: 'Kung Fu Panda',
    releaseDate: '2008-06-04',
  },
  {
    id: 49444,
    title: 'Kung Fu Panda 2',
    releaseDate: '2011-05-25',
  },
  {
    id: 1011985,
    title: 'Kung Fu Panda 4',
    releaseDate: '2024-03-02',
  },
  {
    id: 251516,
    title: 'Kung Fury',
    releaseDate: '2015-05-22',
  },
  {
    id: 2118,
    title: 'L.A. Confidential',
    releaseDate: '1997-09-19',
  },
  {
    id: 16620,
    title: 'La Bamba',
    releaseDate: '1987-07-24',
  },
  {
    id: 313369,
    title: 'La La Land',
    releaseDate: '2016-12-01',
  },
  {
    id: 83564,
    title: 'La luna',
    releaseDate: '2012-02-10',
  },
  {
    id: 989596,
    title: 'The Braid',
    releaseDate: '2023-11-29',
  },
  {
    id: 130150,
    title: 'Labor Day',
    releaseDate: '2013-12-27',
  },
  {
    id: 13597,
    title: 'Labyrinth',
    releaseDate: '1986-06-27',
  },
  {
    id: 512895,
    title: 'Lady and the Tramp',
    releaseDate: '2019-11-12',
  },
  {
    id: 10340,
    title: 'Lady and the Tramp',
    releaseDate: '1955-06-22',
  },
  {
    id: 391713,
    title: 'Lady Bird',
    releaseDate: '2017-09-01',
  },
  {
    id: 594530,
    title: 'Lamp Life',
    releaseDate: '2020-01-31',
  },
  {
    id: 38884,
    title: 'Land and Freedom',
    releaseDate: '1995-04-07',
  },
  {
    id: 969492,
    title: 'Land of Bad',
    releaseDate: '2024-02-09',
  },
  {
    id: 6615,
    title: 'Lars and the Real Girl',
    releaseDate: '2007-10-12',
  },
  {
    id: 549053,
    title: 'Last Christmas',
    releaseDate: '2019-11-07',
  },
  {
    id: 17379,
    title: 'Last Holiday',
    releaseDate: '2006-01-13',
  },
  {
    id: 576845,
    title: 'Last Night in Soho',
    releaseDate: '2021-10-21',
  },
  {
    id: 14677,
    title: 'Last Train from Gun Hill',
    releaseDate: '1959-07-29',
  },
  {
    id: 938614,
    title: 'Late Night with the Devil',
    releaseDate: '2024-03-19',
  },
  {
    id: 1939,
    title: 'Laura',
    releaseDate: '1944-10-11',
  },
  {
    id: 286192,
    title: 'Lava',
    releaseDate: '2014-10-10',
  },
  {
    id: 22803,
    title: 'Law Abiding Citizen',
    releaseDate: '2009-10-15',
  },
  {
    id: 82633,
    title: 'Lawless',
    releaseDate: '2012-08-29',
  },
  {
    id: 947,
    title: 'Lawrence of Arabia',
    releaseDate: '1962-12-11',
  },
  {
    id: 780382,
    title: 'The Wolf and the Lion',
    releaseDate: '2021-10-13',
  },
  {
    id: 3009,
    title: 'The Trial',
    releaseDate: '1962-08-25',
  },
  {
    id: 14621,
    title: 'Lean On Me',
    releaseDate: '1989-03-03',
  },
  {
    id: 17645,
    title: 'Leave Her to Heaven',
    releaseDate: '1945-12-25',
  },
  {
    id: 451,
    title: 'Leaving Las Vegas',
    releaseDate: '1995-10-27',
  },
  {
    id: 832964,
    title: 'Lee',
    releaseDate: '2024-09-12',
  },
  {
    id: 276907,
    title: 'Legend',
    releaseDate: '2015-09-09',
  },
  {
    id: 47626,
    title: 'Legend of the BoneKnapper Dragon',
    releaseDate: '2010-10-14',
  },
  {
    id: 4476,
    title: 'Legends of the Fall',
    releaseDate: '1994-12-23',
  },
  {
    id: 690369,
    title: 'LEGO DC: Shazam! Magic and Monsters',
    releaseDate: '2020-04-28',
  },
  {
    id: 461054,
    title: 'LEGO Scooby-Doo! Blowout Beach Bash',
    releaseDate: '2017-07-11',
  },
  {
    id: 392536,
    title: 'LEGO Scooby-Doo! Haunted Hollywood',
    releaseDate: '2016-01-28',
  },
  {
    id: 394269,
    title: 'Lemonade',
    releaseDate: '2016-04-23',
  },
  {
    id: 65218,
    title: 'Lemonade Mouth',
    releaseDate: '2011-04-15',
  },
  {
    id: 27094,
    title: 'Lenny',
    releaseDate: '1974-11-10',
  },
  {
    id: 1075794,
    title: 'Leo',
    releaseDate: '2023-11-17',
  },
  {
    id: 82695,
    title: 'Les Misérables',
    releaseDate: '2012-12-18',
  },
  {
    id: 4415,
    title: 'Les Misérables',
    releaseDate: '1998-05-01',
  },
  {
    id: 20556,
    title: 'Let It Be',
    releaseDate: '1970-02-13',
  },
  {
    id: 941,
    title: 'Lethal Weapon',
    releaseDate: '1987-03-06',
  },
  {
    id: 942,
    title: 'Lethal Weapon 2',
    releaseDate: '1989-07-07',
  },
  {
    id: 946,
    title: 'Letter from an Unknown Woman',
    releaseDate: '1948-04-28',
  },
  {
    id: 1251,
    title: 'Letters from Iwo Jima',
    releaseDate: '2006-12-09',
  },
  {
    id: 37056,
    title: 'Letters to Juliet',
    releaseDate: '2010-05-13',
  },
  {
    id: 11457,
    title: 'Life as a House',
    releaseDate: '2001-10-25',
  },
  {
    id: 66150,
    title: 'Life in a Day',
    releaseDate: '2011-01-27',
  },
  {
    id: 447362,
    title: 'Life in a Year',
    releaseDate: '2020-11-27',
  },
  {
    id: 446696,
    title: 'Life Itself',
    releaseDate: '2018-09-21',
  },
  {
    id: 250766,
    title: 'Life Itself',
    releaseDate: '2014-07-04',
  },
  {
    id: 201550,
    title: 'Life of a King',
    releaseDate: '2013-06-22',
  },
  {
    id: 583,
    title: 'Life of Brian',
    releaseDate: '1979-08-17',
  },
  {
    id: 87827,
    title: 'Life of Pi',
    releaseDate: '2012-11-20',
  },
  {
    id: 13321,
    title: 'Lifeboat',
    releaseDate: '1944-01-28',
  },
  {
    id: 13060,
    title: 'Lifted',
    releaseDate: '2006-12-28',
  },
  {
    id: 38805,
    title: 'Lilies of the Field',
    releaseDate: '1963-06-04',
  },
  {
    id: 552524,
    title: 'Lilo & Stitch',
    releaseDate: '2025-05-17',
  },
  {
    id: 11544,
    title: 'Lilo & Stitch',
    releaseDate: '2002-06-21',
  },
  {
    id: 28971,
    title: 'Limelight',
    releaseDate: '1952-10-16',
  },
  {
    id: 51876,
    title: 'Limitless',
    releaseDate: '2011-03-17',
  },
  {
    id: 334543,
    title: 'Lion',
    releaseDate: '2016-11-24',
  },
  {
    id: 26843,
    title: 'Lion of the Desert',
    releaseDate: '1981-04-17',
  },
  {
    id: 319076,
    title: 'Listen to Me Marlon',
    releaseDate: '2015-07-29',
  },
  {
    id: 11040,
    title: 'Little Big Man',
    releaseDate: '1970-12-23',
  },
  {
    id: 256962,
    title: 'Little Boy',
    releaseDate: '2015-04-23',
  },
  {
    id: 1440,
    title: 'Little Children',
    releaseDate: '2006-10-06',
  },
  {
    id: 586791,
    title: 'Little Fish',
    releaseDate: '2021-02-05',
  },
  {
    id: 38602,
    title: 'Little Lord Fauntleroy',
    releaseDate: '1980-12-01',
  },
  {
    id: 16553,
    title: 'Little Manhattan',
    releaseDate: '2005-09-26',
  },
  {
    id: 773,
    title: 'Little Miss Sunshine',
    releaseDate: '2006-07-26',
  },
  {
    id: 331482,
    title: 'Little Women',
    releaseDate: '2019-12-25',
  },
  {
    id: 43436,
    title: 'Little Women',
    releaseDate: '1949-03-10',
  },
  {
    id: 9587,
    title: 'Little Women',
    releaseDate: '1994-12-21',
  },
  {
    id: 9071,
    title: 'Living in Oblivion',
    releaseDate: '1995-07-21',
  },
  {
    id: 100,
    title: 'Lock, Stock and Two Smoking Barrels',
    releaseDate: '1998-08-28',
  },
  {
    id: 263115,
    title: 'Logan',
    releaseDate: '2017-02-28',
  },
  {
    id: 32389,
    title: 'Logorama',
    releaseDate: '2009-05-16',
  },
  {
    id: 9769,
    title: 'Lolita',
    releaseDate: '1997-09-27',
  },
  {
    id: 802,
    title: 'Lolita',
    releaseDate: '1962-06-13',
  },
  {
    id: 193756,
    title: 'Lone Survivor',
    releaseDate: '2013-12-24',
  },
  {
    id: 43002,
    title: 'Lonely are the Brave',
    releaseDate: '1962-04-26',
  },
  {
    id: 477331,
    title: 'Long Shot',
    releaseDate: '2017-09-03',
  },
  {
    id: 371738,
    title: 'Looking: The Movie',
    releaseDate: '2016-07-24',
  },
  {
    id: 1830,
    title: 'Lord of War',
    releaseDate: '2005-09-16',
  },
  {
    id: 9787,
    title: 'Lords of Dogtown',
    releaseDate: '2005-06-03',
  },
  {
    id: 2007,
    title: "Lorenzo's Oil",
    releaseDate: '1992-12-30',
  },
  {
    id: 638,
    title: 'Lost Highway',
    releaseDate: '1997-01-15',
  },
  {
    id: 21189,
    title: 'Lost in La Mancha',
    releaseDate: '2002-02-11',
  },
  {
    id: 153,
    title: 'Lost in Translation',
    releaseDate: '2003-09-18',
  },
  {
    id: 433471,
    title: 'Lou',
    releaseDate: '2017-06-16',
  },
  {
    id: 449674,
    title: 'Louis C.K. 2017',
    releaseDate: '2017-04-04',
  },
  {
    id: 30969,
    title: 'Louis C.K.: Chewed Up',
    releaseDate: '2008-10-01',
  },
  {
    id: 45523,
    title: 'Louis C.K.: Hilarious',
    releaseDate: '2010-01-26',
  },
  {
    id: 80379,
    title: 'Louis C.K.: Live at the Beacon Theater',
    releaseDate: '2011-12-10',
  },
  {
    id: 321594,
    title: 'Louis C.K.: Live at The Comedy Store',
    releaseDate: '2015-01-27',
  },
  {
    id: 185574,
    title: 'Louis C.K.: Oh My God',
    releaseDate: '2013-04-13',
  },
  {
    id: 24447,
    title: 'Louis C.K.: Shameless',
    releaseDate: '2007-01-13',
  },
  {
    id: 14736,
    title: 'Love & Basketball',
    releaseDate: '2000-04-21',
  },
  {
    id: 271714,
    title: 'Love & Mercy',
    releaseDate: '2015-05-29',
  },
  {
    id: 43347,
    title: 'Love & Other Drugs',
    releaseDate: '2010-11-22',
  },
  {
    id: 508,
    title: 'Love Actually',
    releaseDate: '2003-09-07',
  },
  {
    id: 11686,
    title: 'Love and Death',
    releaseDate: '1975-06-10',
  },
  {
    id: 590223,
    title: 'Love and Monsters',
    releaseDate: '2020-10-16',
  },
  {
    id: 353577,
    title: 'Love at First Sight',
    releaseDate: '2023-09-15',
  },
  {
    id: 21542,
    title: "Love Don't Co$t a Thing",
    releaseDate: '2003-12-12',
  },
  {
    id: 426203,
    title: 'Love Everlasting',
    releaseDate: '2016-11-14',
  },
  {
    id: 18299,
    title: 'Love in the Afternoon',
    releaseDate: '1957-05-29',
  },
  {
    id: 200727,
    title: 'Love, Rosie',
    releaseDate: '2014-10-16',
  },
  {
    id: 449176,
    title: 'Love, Simon',
    releaseDate: '2018-02-16',
  },
  {
    id: 339877,
    title: 'Loving Vincent',
    releaseDate: '2017-06-22',
  },
  {
    id: 508943,
    title: 'Luca',
    releaseDate: '2021-06-17',
  },
  {
    id: 585511,
    title: 'Luck',
    releaseDate: '2022-08-05',
  },
  {
    id: 407449,
    title: 'Lucky',
    releaseDate: '2017-09-29',
  },
  {
    id: 186,
    title: 'Lucky Number Slevin',
    releaseDate: '2006-02-24',
  },
  {
    id: 770156,
    title: 'Lucy Shimmers and the Prince of Peace',
    releaseDate: '2020-10-19',
  },
  {
    id: 3478,
    title: 'Ludwig',
    releaseDate: '1973-03-07',
  },
  {
    id: 29592,
    title: 'Lust for Life',
    releaseDate: '1956-09-15',
  },
  {
    id: 13925,
    title: 'Luxo Jr.',
    releaseDate: '1986-08-17',
  },
  {
    id: 536554,
    title: 'M3GAN',
    releaseDate: '2022-12-28',
  },
  {
    id: 1071585,
    title: 'M3GAN 2.0',
    releaseDate: '2025-06-25',
  },
  {
    id: 27883,
    title: 'Macbeth',
    releaseDate: '1948-10-01',
  },
  {
    id: 11316,
    title: 'Macbeth',
    releaseDate: '1971-12-20',
  },
  {
    id: 8810,
    title: 'Mad Max 2',
    releaseDate: '1981-12-24',
  },
  {
    id: 76341,
    title: 'Mad Max: Fury Road',
    releaseDate: '2015-05-13',
  },
  {
    id: 673595,
    title: 'Maggie Simpson in "Playdate with Destiny"',
    releaseDate: '2020-02-29',
  },
  {
    id: 334,
    title: 'Magnolia',
    releaseDate: '1999-12-17',
  },
  {
    id: 10648,
    title: 'Magnum Force',
    releaseDate: '1973-12-13',
  },
  {
    id: 1010823,
    title: 'Magnum Opus',
    releaseDate: '2022-07-18',
  },
  {
    id: 41059,
    title: 'Make Way for Tomorrow',
    releaseDate: '1937-05-09',
  },
  {
    id: 1214667,
    title: 'Making Squid Game: The Challenge',
    releaseDate: '2023-12-06',
  },
  {
    id: 722913,
    title: 'Malcolm & Marie',
    releaseDate: '2021-01-29',
  },
  {
    id: 1883,
    title: 'Malcolm X',
    releaseDate: '1992-11-18',
  },
  {
    id: 102651,
    title: 'Maleficent',
    releaseDate: '2014-05-28',
  },
  {
    id: 420809,
    title: 'Maleficent: Mistress of Evil',
    releaseDate: '2019-10-16',
  },
  {
    id: 458423,
    title: 'Mamma Mia! Here We Go Again',
    releaseDate: '2018-07-18',
  },
  {
    id: 9509,
    title: 'Man on Fire',
    releaseDate: '2004-04-23',
  },
  {
    id: 1850,
    title: 'Man on the Moon',
    releaseDate: '1999-12-22',
  },
  {
    id: 14048,
    title: 'Man on Wire',
    releaseDate: '2008-08-01',
  },
  {
    id: 334541,
    title: 'Manchester by the Sea',
    releaseDate: '2016-11-17',
  },
  {
    id: 696,
    title: 'Manhattan',
    releaseDate: '1979-04-25',
  },
  {
    id: 10440,
    title: 'Manhattan Murder Mystery',
    releaseDate: '1993-05-02',
  },
  {
    id: 11454,
    title: 'Manhunter',
    releaseDate: '1986-08-14',
  },
  {
    id: 10518,
    title: 'Marathon Man',
    releaseDate: '1976-10-08',
  },
  {
    id: 869626,
    title: 'Marcel the Shell with Shoes On',
    releaseDate: '2022-06-24',
  },
  {
    id: 90125,
    title: 'Marley',
    releaseDate: '2012-04-20',
  },
  {
    id: 14306,
    title: 'Marley & Me',
    releaseDate: '2008-12-25',
  },
  {
    id: 506,
    title: 'Marnie',
    releaseDate: '1964-07-17',
  },
  {
    id: 492188,
    title: 'Marriage Story',
    releaseDate: '2019-09-28',
  },
  {
    id: 392982,
    title: 'Marshall',
    releaseDate: '2017-10-13',
  },
  {
    id: 15919,
    title: 'Marty',
    releaseDate: '1955-04-11',
  },
  {
    id: 1317288,
    title: 'Marty Supreme',
    releaseDate: '2025-12-19',
  },
  {
    id: 211387,
    title: 'Marvel One-Shot: Agent Carter',
    releaseDate: '2013-10-04',
  },
  {
    id: 24238,
    title: 'Mary and Max',
    releaseDate: '2009-04-09',
  },
  {
    id: 433,
    title: 'Mary Poppins',
    releaseDate: '1964-12-17',
  },
  {
    id: 332283,
    title: 'Mary Shelley',
    releaseDate: '2017-08-06',
  },
  {
    id: 11177,
    title: 'Mask',
    releaseDate: '1985-03-08',
  },
  {
    id: 423333,
    title: 'Mass',
    releaseDate: '2021-10-08',
  },
  {
    id: 8619,
    title: 'Master and Commander: The Far Side of the World',
    releaseDate: '2003-11-14',
  },
  {
    id: 116,
    title: 'Match Point',
    releaseDate: '2005-10-26',
  },
  {
    id: 7270,
    title: 'Matchstick Men',
    releaseDate: '2003-09-12',
  },
  {
    id: 10830,
    title: 'Matilda',
    releaseDate: '1996-08-02',
  },
  {
    id: 359784,
    title: 'Maudie',
    releaseDate: '2016-06-16',
  },
  {
    id: 26371,
    title: 'Maurice',
    releaseDate: '1987-09-18',
  },
  {
    id: 272878,
    title: 'Max',
    releaseDate: '2015-06-25',
  },
  {
    id: 336843,
    title: 'Maze Runner: The Death Cure',
    releaseDate: '2018-01-10',
  },
  {
    id: 29005,
    title: 'McCabe & Mrs. Miller',
    releaseDate: '1971-06-24',
  },
  {
    id: 228203,
    title: 'McFarland, USA',
    releaseDate: '2015-02-20',
  },
  {
    id: 308369,
    title: 'Me and Earl and the Dying Girl',
    releaseDate: '2015-06-12',
  },
  {
    id: 1382,
    title: 'Me and You and Everyone We Know',
    releaseDate: '2005-06-17',
  },
  {
    id: 296096,
    title: 'Me Before You',
    releaseDate: '2016-06-01',
  },
  {
    id: 10625,
    title: 'Mean Girls',
    releaseDate: '2004-04-30',
  },
  {
    id: 203,
    title: 'Mean Streets',
    releaseDate: '1973-10-14',
  },
  {
    id: 297,
    title: 'Meet Joe Black',
    releaseDate: '1998-11-12',
  },
  {
    id: 32574,
    title: 'Meet John Doe',
    releaseDate: '1941-03-14',
  },
  {
    id: 38055,
    title: 'Megamind',
    releaseDate: '2010-10-28',
  },
  {
    id: 424488,
    title: 'Megan Leavey',
    releaseDate: '2017-06-09',
  },
  {
    id: 62215,
    title: 'Melancholia',
    releaseDate: '2011-05-26',
  },
  {
    id: 77,
    title: 'Memento',
    releaseDate: '2000-10-11',
  },
  {
    id: 1064486,
    title: 'Memoir of a Snail',
    releaseDate: '2024-10-17',
  },
  {
    id: 1904,
    title: 'Memoirs of a Geisha',
    releaseDate: '2005-12-06',
  },
  {
    id: 979097,
    title: 'Memory',
    releaseDate: '2023-12-22',
  },
  {
    id: 607,
    title: 'Men in Black',
    releaseDate: '1997-07-02',
  },
  {
    id: 11978,
    title: 'Men of Honor',
    releaseDate: '2000-09-13',
  },
  {
    id: 9516,
    title: 'Menace II Society',
    releaseDate: '1993-05-26',
  },
  {
    id: 33871,
    title: 'Merry Christmas, Drake & Josh',
    releaseDate: '2008-12-05',
  },
  {
    id: 318279,
    title: 'Meru',
    releaseDate: '2015-01-25',
  },
  {
    id: 27040,
    title: 'Meshes of the Afternoon',
    releaseDate: '1943-01-01',
  },
  {
    id: 20604,
    title: "Metal: A Headbanger's Journey",
    releaseDate: '2005-09-14',
  },
  {
    id: 11401,
    title: 'Metallica: Some Kind of Monster',
    releaseDate: '2004-06-10',
  },
  {
    id: 92060,
    title: "Michael Jackson's Thriller",
    releaseDate: '1983-11-14',
  },
  {
    id: 14813,
    title: "Mickey's Christmas Carol",
    releaseDate: '1983-10-19',
  },
  {
    id: 15400,
    title: "Mickey's Once Upon a Christmas",
    releaseDate: '1999-10-31',
  },
  {
    id: 53219,
    title: "Mickey's Trailer",
    releaseDate: '1938-05-06',
  },
  {
    id: 437586,
    title: 'mid90s',
    releaseDate: '2018-10-19',
  },
  {
    id: 3116,
    title: 'Midnight Cowboy',
    releaseDate: '1969-05-25',
  },
  {
    id: 11327,
    title: 'Midnight Express',
    releaseDate: '1978-08-31',
  },
  {
    id: 59436,
    title: 'Midnight in Paris',
    releaseDate: '2011-05-11',
  },
  {
    id: 9013,
    title: 'Midnight Run',
    releaseDate: '1988-07-20',
  },
  {
    id: 419478,
    title: 'Midnight Sun',
    releaseDate: '2018-03-22',
  },
  {
    id: 530385,
    title: 'Midsommar',
    releaseDate: '2019-07-03',
  },
  {
    id: 522162,
    title: 'Midway',
    releaseDate: '2019-11-06',
  },
  {
    id: 940551,
    title: 'Migration',
    releaseDate: '2023-12-06',
  },
  {
    id: 3309,
    title: 'Mildred Pierce',
    releaseDate: '1945-10-20',
  },
  {
    id: 10139,
    title: 'Milk',
    releaseDate: '2008-11-05',
  },
  {
    id: 379,
    title: "Miller's Crossing",
    releaseDate: '1990-09-21',
  },
  {
    id: 70,
    title: 'Million Dollar Baby',
    releaseDate: '2004-12-05',
  },
  {
    id: 615643,
    title: 'Minari',
    releaseDate: '2021-02-12',
  },
  {
    id: 489985,
    title: 'Minding the Gap',
    releaseDate: '2018-08-17',
  },
  {
    id: 550022,
    title: 'Mingle All the Way',
    releaseDate: '2018-12-01',
  },
  {
    id: 438148,
    title: 'Minions: The Rise of Gru',
    releaseDate: '2022-06-29',
  },
  {
    id: 180,
    title: 'Minority Report',
    releaseDate: '2002-06-20',
  },
  {
    id: 14292,
    title: 'Miracle',
    releaseDate: '2004-02-06',
  },
  {
    id: 11881,
    title: 'Miracle on 34th Street',
    releaseDate: '1947-06-04',
  },
  {
    id: 339984,
    title: 'Miracles from Heaven',
    releaseDate: '2016-03-17',
  },
  {
    id: 1700,
    title: 'Misery',
    releaseDate: '1990-11-30',
  },
  {
    id: 653567,
    title: 'Miss Americana',
    releaseDate: '2020-01-31',
  },
  {
    id: 376290,
    title: 'Miss Sloane',
    releaseDate: '2016-11-25',
  },
  {
    id: 290762,
    title: 'Miss You Already',
    releaseDate: '2015-09-12',
  },
  {
    id: 768362,
    title: 'Missing',
    releaseDate: '2023-01-19',
  },
  {
    id: 15600,
    title: 'Missing',
    releaseDate: '1982-02-12',
  },
  {
    id: 954,
    title: 'Mission: Impossible',
    releaseDate: '1996-05-22',
  },
  {
    id: 575264,
    title: 'Mission: Impossible - Dead Reckoning Part One',
    releaseDate: '2023-07-08',
  },
  {
    id: 353081,
    title: 'Mission: Impossible - Fallout',
    releaseDate: '2018-07-25',
  },
  {
    id: 56292,
    title: 'Mission: Impossible - Ghost Protocol',
    releaseDate: '2011-12-07',
  },
  {
    id: 177677,
    title: 'Mission: Impossible - Rogue Nation',
    releaseDate: '2015-07-28',
  },
  {
    id: 575265,
    title: 'Mission: Impossible - The Final Reckoning',
    releaseDate: '2025-05-17',
  },
  {
    id: 1632,
    title: 'Mississippi Burning',
    releaseDate: '1988-12-08',
  },
  {
    id: 37853,
    title: 'Mister Roberts',
    releaseDate: '1955-07-10',
  },
  {
    id: 277834,
    title: 'Moana',
    releaseDate: '2016-10-13',
  },
  {
    id: 1241982,
    title: 'Moana 2',
    releaseDate: '2024-11-21',
  },
  {
    id: 10339,
    title: 'Moby Dick',
    releaseDate: '1956-06-27',
  },
  {
    id: 3082,
    title: 'Modern Times',
    releaseDate: '1936-02-05',
  },
  {
    id: 34308,
    title: 'Modigliani',
    releaseDate: '2004-05-18',
  },
  {
    id: 396371,
    title: "Molly's Game",
    releaseDate: '2017-12-07',
  },
  {
    id: 438446,
    title: 'Mommy Dead and Dearest',
    releaseDate: '2017-03-11',
  },
  {
    id: 60308,
    title: 'Moneyball',
    releaseDate: '2011-09-23',
  },
  {
    id: 30588,
    title: 'Monsieur Verdoux',
    releaseDate: '1947-09-26',
  },
  {
    id: 504,
    title: 'Monster',
    releaseDate: '2003-12-24',
  },
  {
    id: 212470,
    title: 'Monster High: 13 Wishes',
    releaseDate: '2013-10-08',
  },
  {
    id: 360404,
    title: 'Monster High: Boo York, Boo York',
    releaseDate: '2015-10-19',
  },
  {
    id: 324963,
    title: 'Monster High: Haunted',
    releaseDate: '2015-03-02',
  },
  {
    id: 167313,
    title: 'Monster High: Why Do Ghouls Fall in Love?',
    releaseDate: '2012-02-12',
  },
  {
    id: 813258,
    title: 'Monster Pets: A Hotel Transylvania Short',
    releaseDate: '2021-04-02',
  },
  {
    id: 62211,
    title: 'Monsters University',
    releaseDate: '2013-06-19',
  },
  {
    id: 585,
    title: 'Monsters, Inc.',
    releaseDate: '2001-11-01',
  },
  {
    id: 762,
    title: 'Monty Python and the Holy Grail',
    releaseDate: '1975-04-03',
  },
  {
    id: 11949,
    title: 'Monty Python Live at the Hollywood Bowl',
    releaseDate: '1982-06-25',
  },
  {
    id: 4543,
    title: "Monty Python's The Meaning of Life",
    releaseDate: '1983-03-31',
  },
  {
    id: 17431,
    title: 'Moon',
    releaseDate: '2009-06-12',
  },
  {
    id: 957457,
    title: 'Moonage Daydream',
    releaseDate: '2022-09-15',
  },
  {
    id: 376867,
    title: 'Moonlight',
    releaseDate: '2016-10-21',
  },
  {
    id: 83666,
    title: 'Moonrise Kingdom',
    releaseDate: '2012-05-16',
  },
  {
    id: 36107,
    title: 'More',
    releaseDate: '1998-09-01',
  },
  {
    id: 841755,
    title: 'Mortal Kombat Legends: Battle of the Realms',
    releaseDate: '2021-08-30',
  },
  {
    id: 664767,
    title: "Mortal Kombat Legends: Scorpion's Revenge",
    releaseDate: '2020-04-12',
  },
  {
    id: 1007401,
    title: 'Mortal Kombat Legends: Snow Blind',
    releaseDate: '2022-10-09',
  },
  {
    id: 824,
    title: 'Moulin Rouge!',
    releaseDate: '2001-05-18',
  },
  {
    id: 583689,
    title: 'Moxie',
    releaseDate: '2021-03-03',
  },
  {
    id: 374461,
    title: 'Mr. Church',
    releaseDate: '2016-09-16',
  },
  {
    id: 24807,
    title: 'Mr. Deeds Goes to Town',
    releaseDate: '1936-04-09',
  },
  {
    id: 31011,
    title: 'Mr. Nobody',
    releaseDate: '2009-11-06',
  },
  {
    id: 3083,
    title: 'Mr. Smith Goes to Washington',
    releaseDate: '1939-10-19',
  },
  {
    id: 788,
    title: 'Mrs. Doubtfire',
    releaseDate: '1993-11-24',
  },
  {
    id: 754609,
    title: 'Mrs. Harris Goes to Paris',
    releaseDate: '2022-07-15',
  },
  {
    id: 27367,
    title: 'Mrs. Miniver',
    releaseDate: '1942-07-03',
  },
  {
    id: 40001,
    title: 'Mrs. Winterbourne',
    releaseDate: '1996-04-19',
  },
  {
    id: 103731,
    title: 'Mud',
    releaseDate: '2013-04-26',
  },
  {
    id: 414425,
    title: 'Mudbound',
    releaseDate: '2017-11-16',
  },
  {
    id: 762509,
    title: 'Mufasa: The Lion King',
    releaseDate: '2024-12-18',
  },
  {
    id: 10674,
    title: 'Mulan',
    releaseDate: '1998-06-18',
  },
  {
    id: 1018,
    title: 'Mulholland Drive',
    releaseDate: '2001-06-06',
  },
  {
    id: 612,
    title: 'Munich',
    releaseDate: '2005-12-23',
  },
  {
    id: 758,
    title: 'Murder Ahoy',
    releaseDate: '1964-09-22',
  },
  {
    id: 751,
    title: 'Murder at the Gallop',
    releaseDate: '1963-05-09',
  },
  {
    id: 6037,
    title: 'Murder by Death',
    releaseDate: '1976-06-23',
  },
  {
    id: 8438,
    title: 'Murder in the First',
    releaseDate: '1995-01-20',
  },
  {
    id: 757,
    title: 'Murder Most Foul',
    releaseDate: '1964-03-01',
  },
  {
    id: 4176,
    title: 'Murder on the Orient Express',
    releaseDate: '1974-11-22',
  },
  {
    id: 750,
    title: 'Murder She Said',
    releaseDate: '1961-09-26',
  },
  {
    id: 1834,
    title: 'Murder, My Sweet',
    releaseDate: '1944-12-14',
  },
  {
    id: 2263,
    title: 'Music Box',
    releaseDate: '1989-12-22',
  },
  {
    id: 12311,
    title: 'Mutiny on the Bounty',
    releaseDate: '1935-11-22',
  },
  {
    id: 11085,
    title: 'Mutiny on the Bounty',
    releaseDate: '1962-11-08',
  },
  {
    id: 334531,
    title: 'My All American',
    releaseDate: '2015-11-13',
  },
  {
    id: 10377,
    title: 'My Cousin Vinny',
    releaseDate: '1992-03-13',
  },
  {
    id: 3088,
    title: 'My Darling Clementine',
    releaseDate: '1946-10-17',
  },
  {
    id: 434714,
    title: 'My Days of Mercy',
    releaseDate: '2018-03-31',
  },
  {
    id: 25468,
    title: 'My Dinner with Andre',
    releaseDate: '1981-10-11',
  },
  {
    id: 11113,
    title: 'My Fair Lady',
    releaseDate: '1964-12-01',
  },
  {
    id: 1294203,
    title: 'My Fault: London',
    releaseDate: '2025-02-12',
  },
  {
    id: 741011,
    title: 'My First Summer',
    releaseDate: '2020-10-24',
  },
  {
    id: 4032,
    title: 'My Girl',
    releaseDate: '1991-11-27',
  },
  {
    id: 10161,
    title: 'My Left Foot: The Story of Christy Brown',
    releaseDate: '1989-04-07',
  },
  {
    id: 292177,
    title: 'My Little Pony - Equestria Girls - Rainbow Rocks',
    releaseDate: '2014-09-27',
  },
  {
    id: 597316,
    title: 'My Little Pony: A New Generation',
    releaseDate: '2021-09-22',
  },
  {
    id: 201676,
    title: 'My Little Pony: Equestria Girls',
    releaseDate: '2013-06-16',
  },
  {
    id: 335360,
    title: 'My Little Pony: The Movie',
    releaseDate: '2017-10-05',
  },
  {
    id: 13562,
    title: 'My Man Godfrey',
    releaseDate: '1936-09-02',
  },
  {
    id: 8129,
    title: 'My Name Is Joe',
    releaseDate: '1998-05-15',
  },
  {
    id: 682110,
    title: 'My Octopus Teacher',
    releaseDate: '2020-09-04',
  },
  {
    id: 468,
    title: 'My Own Private Idaho',
    releaseDate: '1991-02-01',
  },
  {
    id: 1159799,
    title: 'My Penguin Friend',
    releaseDate: '2024-08-07',
  },
  {
    id: 744114,
    title: 'My Policeman',
    releaseDate: '2022-10-20',
  },
  {
    id: 10024,
    title: "My Sister's Keeper",
    releaseDate: '2009-06-26',
  },
  {
    id: 11171,
    title: 'Mysterious Skin',
    releaseDate: '2005-03-30',
  },
  {
    id: 11305,
    title: 'Mystery Train',
    releaseDate: '1989-09-06',
  },
  {
    id: 322,
    title: 'Mystic River',
    releaseDate: '2003-10-08',
  },
  {
    id: 21450,
    title: 'Naked',
    releaseDate: '1993-08-06',
  },
  {
    id: 2742,
    title: 'Naked Lunch',
    releaseDate: '1991-12-27',
  },
  {
    id: 669,
    title: 'Nanook of the North',
    releaseDate: '1922-06-11',
  },
  {
    id: 519035,
    title: 'Nappily Ever After',
    releaseDate: '2018-09-21',
  },
  {
    id: 3121,
    title: 'Nashville',
    releaseDate: '1975-06-11',
  },
  {
    id: 5825,
    title: "National Lampoon's Christmas Vacation",
    releaseDate: '1989-11-30',
  },
  {
    id: 11153,
    title: "National Lampoon's Vacation",
    releaseDate: '1983-07-29',
  },
  {
    id: 241,
    title: 'Natural Born Killers',
    releaseDate: '1994-08-26',
  },
  {
    id: 926676,
    title: 'Navalny',
    releaseDate: '2022-04-08',
  },
  {
    id: 129670,
    title: 'Nebraska',
    releaseDate: '2013-09-21',
  },
  {
    id: 328387,
    title: 'Nerve',
    releaseDate: '2016-06-27',
  },
  {
    id: 10774,
    title: 'Network',
    releaseDate: '1976-11-27',
  },
  {
    id: 391757,
    title: 'Never Back Down: No Surrender',
    releaseDate: '2016-06-07',
  },
  {
    id: 595671,
    title: 'Never Rarely Sometimes Always',
    releaseDate: '2020-03-13',
  },
  {
    id: 37757,
    title: 'Never Sleep Again: The Elm Street Legacy',
    releaseDate: '2010-05-04',
  },
  {
    id: 14613,
    title: 'Next Avengers: Heroes of Tomorrow',
    releaseDate: '2008-09-02',
  },
  {
    id: 19119,
    title: 'Night and the City',
    releaseDate: '1950-06-15',
  },
  {
    id: 10331,
    title: 'Night of the Living Dead',
    releaseDate: '1968-10-04',
  },
  {
    id: 339,
    title: 'Night on Earth',
    releaseDate: '1991-12-12',
  },
  {
    id: 242582,
    title: 'Nightcrawler',
    releaseDate: '2014-10-23',
  },
  {
    id: 19169,
    title: 'Nightmare Alley',
    releaseDate: '1947-10-09',
  },
  {
    id: 961323,
    title: 'Nimona',
    releaseDate: '2023-06-23',
  },
  {
    id: 1859,
    title: 'Ninotchka',
    releaseDate: '1939-11-16',
  },
  {
    id: 6977,
    title: 'No Country for Old Men',
    releaseDate: '2007-11-09',
  },
  {
    id: 46247,
    title: 'No Time for Nuts',
    releaseDate: '2006-10-23',
  },
  {
    id: 370172,
    title: 'No Time to Die',
    releaseDate: '2021-09-29',
  },
  {
    id: 615457,
    title: 'Nobody',
    releaseDate: '2021-03-18',
  },
  {
    id: 1007734,
    title: 'Nobody 2',
    releaseDate: '2025-08-13',
  },
  {
    id: 340666,
    title: 'Nocturnal Animals',
    releaseDate: '2016-11-04',
  },
  {
    id: 26670,
    title: 'Noises Off...',
    releaseDate: '1992-03-20',
  },
  {
    id: 581734,
    title: 'Nomadland',
    releaseDate: '2021-01-29',
  },
  {
    id: 40842,
    title: 'Norma Rae',
    releaseDate: '1979-03-02',
  },
  {
    id: 213,
    title: 'North by Northwest',
    releaseDate: '1959-08-06',
  },
  {
    id: 9701,
    title: 'North Country',
    releaseDate: '2005-02-12',
  },
  {
    id: 1259,
    title: 'Notes on a Scandal',
    releaseDate: '2006-12-25',
  },
  {
    id: 303,
    title: 'Notorious',
    releaseDate: '1946-08-21',
  },
  {
    id: 509,
    title: 'Notting Hill',
    releaseDate: '1999-05-21',
  },
  {
    id: 90369,
    title: 'Now Is Good',
    releaseDate: '2012-09-19',
  },
  {
    id: 75656,
    title: 'Now You See Me',
    releaseDate: '2013-05-29',
  },
  {
    id: 32847,
    title: 'Now, Voyager',
    releaseDate: '1942-10-22',
  },
  {
    id: 33511,
    title: 'Nowhere Boy',
    releaseDate: '2009-12-25',
  },
  {
    id: 728142,
    title: 'Nowhere Special',
    releaseDate: '2020-09-10',
  },
  {
    id: 484133,
    title: 'Nude',
    releaseDate: '2017-10-29',
  },
  {
    id: 1214931,
    title: 'Nuremberg',
    releaseDate: '2025-11-06',
  },
  {
    id: 895549,
    title: 'NYAD',
    releaseDate: '2023-10-18',
  },
  {
    id: 134,
    title: 'O Brother, Where Art Thou?',
    releaseDate: '2000-08-30',
  },
  {
    id: 377462,
    title: 'O.J.: Made in America',
    releaseDate: '2016-05-20',
  },
  {
    id: 161,
    title: "Ocean's Eleven",
    releaseDate: '2001-12-07',
  },
  {
    id: 36970,
    title: 'Oceans',
    releaseDate: '2010-01-22',
  },
  {
    id: 13466,
    title: 'October Sky',
    releaseDate: '1999-02-19',
  },
  {
    id: 43461,
    title: 'Odd Man Out',
    releaseDate: '1947-01-30',
  },
  {
    id: 9609,
    title: 'Of Mice and Men',
    releaseDate: '1992-09-16',
  },
  {
    id: 1542,
    title: 'Office Space',
    releaseDate: '1999-02-19',
  },
  {
    id: 393624,
    title: 'Official Secrets',
    releaseDate: '2019-08-30',
  },
  {
    id: 387426,
    title: 'Okja',
    releaseDate: '2017-06-28',
  },
  {
    id: 785663,
    title: 'Old Henry',
    releaseDate: '2021-10-01',
  },
  {
    id: 10949,
    title: 'Oliver Twist',
    releaseDate: '1948-06-28',
  },
  {
    id: 17917,
    title: 'Oliver!',
    releaseDate: '1968-09-26',
  },
  {
    id: 11816,
    title: 'On Golden Pond',
    releaseDate: '1981-12-04',
  },
  {
    id: 339380,
    title: 'On the Basis of Sex',
    releaseDate: '2018-12-25',
  },
  {
    id: 654,
    title: 'On the Waterfront',
    releaseDate: '1954-06-22',
  },
  {
    id: 5723,
    title: 'Once',
    releaseDate: '2007-03-23',
  },
  {
    id: 567604,
    title: 'Once Upon a Deadpool',
    releaseDate: '2018-12-11',
  },
  {
    id: 1139087,
    title: 'Once Upon a Studio',
    releaseDate: '2023-09-24',
  },
  {
    id: 311,
    title: 'Once Upon a Time in America',
    releaseDate: '1984-05-23',
  },
  {
    id: 466272,
    title: 'Once Upon a Time... in Hollywood',
    releaseDate: '2019-07-24',
  },
  {
    id: 527,
    title: 'Once Were Warriors',
    releaseDate: '1994-09-02',
  },
  {
    id: 1054867,
    title: 'One Battle After Another',
    releaseDate: '2025-09-23',
  },
  {
    id: 566368,
    title: 'One Child Nation',
    releaseDate: '2019-03-29',
  },
  {
    id: 51828,
    title: 'One Day',
    releaseDate: '2011-03-02',
  },
  {
    id: 164558,
    title: 'One Direction: This Is Us',
    releaseDate: '2013-08-20',
  },
  {
    id: 283559,
    title: 'One Direction: Where We Are - The Concert Film',
    releaseDate: '2014-10-08',
  },
  {
    id: 510,
    title: "One Flew Over the Cuckoo's Nest",
    releaseDate: '1975-11-19',
  },
  {
    id: 53211,
    title: 'One Froggy Evening',
    releaseDate: '1955-12-30',
  },
  {
    id: 12230,
    title: 'One Hundred and One Dalmatians',
    releaseDate: '1961-01-25',
  },
  {
    id: 760774,
    title: 'One Life',
    releaseDate: '2023-12-21',
  },
  {
    id: 13933,
    title: 'One Man Band',
    releaseDate: '2005-06-21',
  },
  {
    id: 661914,
    title: 'One Night in Miami...',
    releaseDate: '2020-12-25',
  },
  {
    id: 430,
    title: 'One, Two, Three',
    releaseDate: '1961-12-15',
  },
  {
    id: 43832,
    title: 'Only Angels Have Wings',
    releaseDate: '1939-05-15',
  },
  {
    id: 152603,
    title: 'Only Lovers Left Alive',
    releaseDate: '2013-12-12',
  },
  {
    id: 395991,
    title: 'Only the Brave',
    releaseDate: '2017-09-22',
  },
  {
    id: 508439,
    title: 'Onward',
    releaseDate: '2020-02-29',
  },
  {
    id: 2055,
    title: 'Open Range',
    releaseDate: '2003-08-11',
  },
  {
    id: 33665,
    title: 'Opening Night',
    releaseDate: '1977-12-22',
  },
  {
    id: 9660,
    title: 'Operation Petticoat',
    releaseDate: '1959-12-05',
  },
  {
    id: 428836,
    title: 'Ophelia',
    releaseDate: '2019-06-28',
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    releaseDate: '2023-07-19',
  },
  {
    id: 974036,
    title: 'Ordinary Angels',
    releaseDate: '2024-02-22',
  },
  {
    id: 16619,
    title: 'Ordinary People',
    releaseDate: '1980-09-19',
  },
  {
    id: 47697,
    title: 'Othello',
    releaseDate: '1951-11-28',
  },
  {
    id: 583903,
    title: 'Our Friend',
    releaseDate: '2019-09-04',
  },
  {
    id: 701,
    title: 'Our Hospitality',
    releaseDate: '1923-11-19',
  },
  {
    id: 706860,
    title: 'Out',
    releaseDate: '2020-05-22',
  },
  {
    id: 606,
    title: 'Out of Africa',
    releaseDate: '1985-12-20',
  },
  {
    id: 678,
    title: 'Out of the Past',
    releaseDate: '1947-11-25',
  },
  {
    id: 560050,
    title: 'Over the Moon',
    releaseDate: '2020-10-16',
  },
  {
    id: 527776,
    title: 'Overcomer',
    releaseDate: '2019-08-22',
  },
  {
    id: 6023,
    title: 'P.S. I Love You',
    releaseDate: '2007-11-15',
  },
  {
    id: 116149,
    title: 'Paddington',
    releaseDate: '2014-11-24',
  },
  {
    id: 346648,
    title: 'Paddington 2',
    releaseDate: '2017-11-09',
  },
  {
    id: 8879,
    title: 'Pale Rider',
    releaseDate: '1985-06-28',
  },
  {
    id: 587792,
    title: 'Palm Springs',
    releaseDate: '2020-07-10',
  },
  {
    id: 458220,
    title: 'Palmer',
    releaseDate: '2021-01-28',
  },
  {
    id: 11293,
    title: 'Paper Moon',
    releaseDate: '1973-05-09',
  },
  {
    id: 140420,
    title: 'Paperman',
    releaseDate: '2012-11-02',
  },
  {
    id: 433498,
    title: 'Papillon',
    releaseDate: '2017-09-07',
  },
  {
    id: 5924,
    title: 'Papillon',
    releaseDate: '1973-12-16',
  },
  {
    id: 17204,
    title: 'Paradise Lost: The Child Murders at Robin Hood Hills',
    releaseDate: '1996-12-03',
  },
  {
    id: 77174,
    title: 'ParaNorman',
    releaseDate: '2012-08-03',
  },
  {
    id: 31225,
    title: 'Paris Is Burning',
    releaseDate: '1991-03-13',
  },
  {
    id: 655,
    title: 'Paris, Texas',
    releaseDate: '1984-07-16',
  },
  {
    id: 202141,
    title: 'Particle Fever',
    releaseDate: '2013-06-14',
  },
  {
    id: 24480,
    title: 'Partly Cloudy',
    releaseDate: '2009-05-28',
  },
  {
    id: 130925,
    title: 'Partysaurus Rex',
    releaseDate: '2012-09-14',
  },
  {
    id: 666277,
    title: 'Past Lives',
    releaseDate: '2023-06-02',
  },
  {
    id: 11577,
    title: 'Pat Garrett & Billy the Kid',
    releaseDate: '1973-05-23',
  },
  {
    id: 10312,
    title: 'Patch Adams',
    releaseDate: '1998-12-25',
  },
  {
    id: 370755,
    title: 'Paterson',
    releaseDate: '2016-11-17',
  },
  {
    id: 975,
    title: 'Paths of Glory',
    releaseDate: '1957-10-25',
  },
  {
    id: 388399,
    title: 'Patriots Day',
    releaseDate: '2016-12-12',
  },
  {
    id: 11202,
    title: 'Patton',
    releaseDate: '1970-01-25',
  },
  {
    id: 476968,
    title: 'Paul, Apostle of Christ',
    releaseDate: '2018-03-23',
  },
  {
    id: 743439,
    title: 'PAW Patrol: Jet to the Rescue',
    releaseDate: '2020-09-10',
  },
  {
    id: 552095,
    title: 'PAW Patrol: Mighty Pups',
    releaseDate: '2018-10-04',
  },
  {
    id: 893723,
    title: 'PAW Patrol: The Mighty Movie',
    releaseDate: '2023-09-21',
  },
  {
    id: 675445,
    title: 'PAW Patrol: The Movie',
    releaseDate: '2021-08-09',
  },
  {
    id: 10647,
    title: 'Pay It Forward',
    releaseDate: '2000-10-20',
  },
  {
    id: 13689,
    title: 'Peaceful Warrior',
    releaseDate: '2006-03-30',
  },
  {
    id: 949423,
    title: 'Pearl',
    releaseDate: '2022-09-16',
  },
  {
    id: 11167,
    title: 'Peeping Tom',
    releaseDate: '1960-04-07',
  },
  {
    id: 245913,
    title: 'Pelé: Birth of a Legend',
    releaseDate: '2016-05-06',
  },
  {
    id: 1034716,
    title: 'People We Meet on Vacation',
    releaseDate: '2026-01-06',
  },
  {
    id: 1427,
    title: 'Perfume: The Story of a Murderer',
    releaseDate: '2006-09-13',
  },
  {
    id: 13949,
    title: 'Persuasion',
    releaseDate: '2007-04-01',
  },
  {
    id: 10693,
    title: 'Peter Pan',
    releaseDate: '1953-02-05',
  },
  {
    id: 10601,
    title: 'Peter Pan',
    releaseDate: '2003-12-18',
  },
  {
    id: 522478,
    title: 'Peter Rabbit 2: The Runaway',
    releaseDate: '2021-03-25',
  },
  {
    id: 27327,
    title: 'Phantom of the Paradise',
    releaseDate: '1974-10-31',
  },
  {
    id: 400617,
    title: 'Phantom Thread',
    releaseDate: '2017-12-25',
  },
  {
    id: 9800,
    title: 'Philadelphia',
    releaseDate: '1993-12-22',
  },
  {
    id: 205220,
    title: 'Philomena',
    releaseDate: '2013-11-01',
  },
  {
    id: 71689,
    title: 'Phineas and Ferb The Movie: Across the 2nd Dimension',
    releaseDate: '2011-08-05',
  },
  {
    id: 594328,
    title: 'Phineas and Ferb the Movie: Candace Against the Universe',
    releaseDate: '2020-08-27',
  },
  {
    id: 392216,
    title: 'Phineas and Ferb: Star Wars',
    releaseDate: '2014-07-26',
  },
  {
    id: 19079,
    title: 'Phoebe in Wonderland',
    releaseDate: '2008-02-07',
  },
  {
    id: 473,
    title: 'Pi',
    releaseDate: '1998-07-10',
  },
  {
    id: 25955,
    title: 'Pickup on South Street',
    releaseDate: '1953-05-27',
  },
  {
    id: 11020,
    title: 'Picnic at Hanging Rock',
    releaseDate: '1975-09-02',
  },
  {
    id: 641662,
    title: 'Pieces of a Woman',
    releaseDate: '2020-12-30',
  },
  {
    id: 4952,
    title: 'Pillow Talk',
    releaseDate: '1959-10-07',
  },
  {
    id: 25771,
    title: 'Pink Floyd: Live at Pompeii',
    releaseDate: '1972-10-25',
  },
  {
    id: 12104,
    title: 'Pink Floyd: The Wall',
    releaseDate: '1982-07-14',
  },
  {
    id: 10895,
    title: 'Pinocchio',
    releaseDate: '1940-02-23',
  },
  {
    id: 399106,
    title: 'Piper',
    releaseDate: '2016-06-16',
  },
  {
    id: 3293,
    title: 'Pirates of Silicon Valley',
    releaseDate: '1999-06-20',
  },
  {
    id: 285,
    title: "Pirates of the Caribbean: At World's End",
    releaseDate: '2007-05-19',
  },
  {
    id: 58,
    title: "Pirates of the Caribbean: Dead Man's Chest",
    releaseDate: '2006-07-06',
  },
  {
    id: 22,
    title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    releaseDate: '2003-07-09',
  },
  {
    id: 114150,
    title: 'Pitch Perfect',
    releaseDate: '2012-09-28',
  },
  {
    id: 13681,
    title: 'Places in the Heart',
    releaseDate: '1984-09-11',
  },
  {
    id: 2609,
    title: 'Planes, Trains and Automobiles',
    releaseDate: '1987-11-26',
  },
  {
    id: 30675,
    title: 'Planet Hulk',
    releaseDate: '2010-02-02',
  },
  {
    id: 871,
    title: 'Planet of the Apes',
    releaseDate: '1968-02-07',
  },
  {
    id: 792,
    title: 'Platoon',
    releaseDate: '1986-12-19',
  },
  {
    id: 11610,
    title: 'Play It Again, Sam',
    releaseDate: '1972-05-04',
  },
  {
    id: 2657,
    title: 'Pleasantville',
    releaseDate: '1998-09-17',
  },
  {
    id: 248,
    title: 'Pocketful of Miracles',
    releaseDate: '1961-12-18',
  },
  {
    id: 26039,
    title: 'Point Blank',
    releaseDate: '1967-08-30',
  },
  {
    id: 1089,
    title: 'Point Break',
    releaseDate: '1991-07-12',
  },
  {
    id: 609,
    title: 'Poltergeist',
    releaseDate: '1982-06-04',
  },
  {
    id: 14269,
    title: 'Polyester',
    releaseDate: '1981-05-29',
  },
  {
    id: 14903,
    title: "Pooh's Grand Adventure: The Search for Christopher Robin",
    releaseDate: '1997-08-05',
  },
  {
    id: 792307,
    title: 'Poor Things',
    releaseDate: '2023-12-07',
  },
  {
    id: 21484,
    title: 'Possession',
    releaseDate: '1981-05-27',
  },
  {
    id: 24348,
    title: 'Powaqqatsi',
    releaseDate: '1988-04-29',
  },
  {
    id: 21634,
    title: 'Prayers for Bobby',
    releaseDate: '2009-01-24',
  },
  {
    id: 25793,
    title: 'Precious',
    releaseDate: '2009-11-06',
  },
  {
    id: 106,
    title: 'Predator',
    releaseDate: '1987-06-12',
  },
  {
    id: 1242898,
    title: 'Predator: Badlands',
    releaseDate: '2025-11-05',
  },
  {
    id: 1376434,
    title: 'Predator: Killer of Killers',
    releaseDate: '2025-06-05',
  },
  {
    id: 206487,
    title: 'Predestination',
    releaseDate: '2014-08-28',
  },
  {
    id: 13042,
    title: 'Presto',
    releaseDate: '2008-06-27',
  },
  {
    id: 114,
    title: 'Pretty Woman',
    releaseDate: '1990-03-23',
  },
  {
    id: 766507,
    title: 'Prey',
    releaseDate: '2022-08-02',
  },
  {
    id: 393765,
    title: 'Priceless',
    releaseDate: '2016-10-14',
  },
  {
    id: 234200,
    title: 'Pride',
    releaseDate: '2014-09-12',
  },
  {
    id: 4348,
    title: 'Pride & Prejudice',
    releaseDate: '2005-09-16',
  },
  {
    id: 1592,
    title: 'Primal Fear',
    releaseDate: '1996-03-06',
  },
  {
    id: 176241,
    title: 'Prison Break: The Final Break',
    releaseDate: '2009-09-10',
  },
  {
    id: 146233,
    title: 'Prisoners',
    releaseDate: '2013-09-19',
  },
  {
    id: 420622,
    title: 'Professor Marston and the Wonder Women',
    releaseDate: '2017-10-13',
  },
  {
    id: 932430,
    title: 'Prom Pact',
    releaseDate: '2023-03-30',
  },
  {
    id: 582014,
    title: 'Promising Young Woman',
    releaseDate: '2020-12-13',
  },
  {
    id: 457840,
    title: 'Psych: The Movie',
    releaseDate: '2017-12-07',
  },
  {
    id: 539,
    title: 'Psycho',
    releaseDate: '1960-06-22',
  },
  {
    id: 680,
    title: 'Pulp Fiction',
    releaseDate: '1994-09-10',
  },
  {
    id: 8428,
    title: 'Pump Up the Volume',
    releaseDate: '1990-08-22',
  },
  {
    id: 5205,
    title: 'Pumping Iron',
    releaseDate: '1977-01-18',
  },
  {
    id: 8051,
    title: 'Punch-Drunk Love',
    releaseDate: '2002-10-11',
  },
  {
    id: 26513,
    title: 'Punishment Park',
    releaseDate: '1971-10-01',
  },
  {
    id: 229407,
    title: 'Puppy',
    releaseDate: '2013-12-10',
  },
  {
    id: 762975,
    title: 'Purple Hearts',
    releaseDate: '2022-07-29',
  },
  {
    id: 315162,
    title: 'Puss in Boots: The Last Wish',
    releaseDate: '2022-12-07',
  },
  {
    id: 25016,
    title: 'Pygmalion',
    releaseDate: '1938-10-06',
  },
  {
    id: 631143,
    title: 'QT8: The First Eight',
    releaseDate: '2019-10-21',
  },
  {
    id: 10373,
    title: 'Quadrophenia',
    releaseDate: '1979-09-14',
  },
  {
    id: 536743,
    title: 'Queen & Slim',
    releaseDate: '2019-11-27',
  },
  {
    id: 317557,
    title: 'Queen of Katwe',
    releaseDate: '2016-09-23',
  },
  {
    id: 74406,
    title: 'Queen: Days of Our Lives',
    releaseDate: '2011-05-29',
  },
  {
    id: 20575,
    title: 'Queen: Live at Wembley Stadium',
    releaseDate: '1986-07-12',
  },
  {
    id: 10876,
    title: 'Quills',
    releaseDate: '2000-11-22',
  },
  {
    id: 11450,
    title: 'Quiz Show',
    releaseDate: '1994-08-25',
  },
  {
    id: 11620,
    title: 'Quo Vadis',
    releaseDate: '1951-11-08',
  },
  {
    id: 52971,
    title: 'Rabbit of Seville',
    releaseDate: '1950-12-16',
  },
  {
    id: 52954,
    title: 'Rabbit Seasoning',
    releaseDate: '1952-09-20',
  },
  {
    id: 323677,
    title: 'Race',
    releaseDate: '2016-02-19',
  },
  {
    id: 300792,
    title: 'Racing Extinction',
    releaseDate: '2015-01-24',
  },
  {
    id: 13920,
    title: 'Radio',
    releaseDate: '2003-10-24',
  },
  {
    id: 30890,
    title: 'Radio Days',
    releaseDate: '1987-01-30',
  },
  {
    id: 1578,
    title: 'Raging Bull',
    releaseDate: '1980-11-14',
  },
  {
    id: 110490,
    title: 'Rags',
    releaseDate: '2012-05-28',
  },
  {
    id: 85,
    title: 'Raiders of the Lost Ark',
    releaseDate: '1981-06-12',
  },
  {
    id: 380,
    title: 'Rain Man',
    releaseDate: '1988-12-12',
  },
  {
    id: 378,
    title: 'Raising Arizona',
    releaseDate: '1987-03-13',
  },
  {
    id: 461955,
    title: 'Rakka',
    releaseDate: '2017-06-14',
  },
  {
    id: 404368,
    title: 'Ralph Breaks the Internet',
    releaseDate: '2018-11-20',
  },
  {
    id: 2062,
    title: 'Ratatouille',
    releaseDate: '2007-06-28',
  },
  {
    id: 29698,
    title: 'Ratcatcher',
    releaseDate: '1999-11-12',
  },
  {
    id: 1677,
    title: 'Ray',
    releaseDate: '2004-10-29',
  },
  {
    id: 527774,
    title: 'Raya and the Last Dragon',
    releaseDate: '2021-03-03',
  },
  {
    id: 493099,
    title: 'RBG',
    releaseDate: '2018-05-04',
  },
  {
    id: 1694,
    title: 'Re-Animator',
    releaseDate: '1985-10-18',
  },
  {
    id: 567609,
    title: 'Ready or Not',
    releaseDate: '2019-08-21',
  },
  {
    id: 333339,
    title: 'Ready Player One',
    releaseDate: '2018-03-28',
  },
  {
    id: 39254,
    title: 'Real Steel',
    releaseDate: '2011-09-28',
  },
  {
    id: 567,
    title: 'Rear Window',
    releaseDate: '1954-08-01',
  },
  {
    id: 223,
    title: 'Rebecca',
    releaseDate: '1940-03-23',
  },
  {
    id: 221,
    title: 'Rebel Without a Cause',
    releaseDate: '1955-10-27',
  },
  {
    id: 256876,
    title: 'Red Army',
    releaseDate: '2014-08-13',
  },
  {
    id: 66125,
    title: 'Red Dog',
    releaseDate: '2011-08-04',
  },
  {
    id: 9533,
    title: 'Red Dragon',
    releaseDate: '2002-10-02',
  },
  {
    id: 447061,
    title: 'Red Nose Day Actually',
    releaseDate: '2017-03-24',
  },
  {
    id: 845781,
    title: 'Red One',
    releaseDate: '2024-10-31',
  },
  {
    id: 3089,
    title: 'Red River',
    releaseDate: '1948-09-17',
  },
  {
    id: 930094,
    title: 'Red, White & Royal Blue',
    releaseDate: '2023-07-27',
  },
  {
    id: 698508,
    title: 'Redeeming Love',
    releaseDate: '2022-01-21',
  },
  {
    id: 1327862,
    title: 'Regretting You',
    releaseDate: '2025-10-22',
  },
  {
    id: 354857,
    title: 'Regular Show: The Movie',
    releaseDate: '2015-09-01',
  },
  {
    id: 487672,
    title: 'Reign of the Supermen',
    releaseDate: '2019-01-13',
  },
  {
    id: 2355,
    title: 'Reign Over Me',
    releaseDate: '2007-03-22',
  },
  {
    id: 32536,
    title: 'Rejected',
    releaseDate: '2000-07-25',
  },
  {
    id: 13007,
    title: 'Religulous',
    releaseDate: '2008-10-01',
  },
  {
    id: 302528,
    title: 'Remember',
    releaseDate: '2015-10-23',
  },
  {
    id: 23169,
    title: 'Remember Me',
    releaseDate: '2010-03-11',
  },
  {
    id: 188538,
    title: 'Remember Sunday',
    releaseDate: '2013-04-21',
  },
  {
    id: 10637,
    title: 'Remember the Titans',
    releaseDate: '2000-09-29',
  },
  {
    id: 1208348,
    title: 'Rental Family',
    releaseDate: '2025-11-20',
  },
  {
    id: 11481,
    title: 'Repulsion',
    releaseDate: '1965-06-01',
  },
  {
    id: 641,
    title: 'Requiem for a Dream',
    releaseDate: '2000-10-06',
  },
  {
    id: 333377,
    title: 'Requiem for the American Dream',
    releaseDate: '2015-04-18',
  },
  {
    id: 921655,
    title: 'Rescued by Ruby',
    releaseDate: '2022-03-17',
  },
  {
    id: 443129,
    title: 'Reservoir Dogs',
    releaseDate: '1991-06-01',
  },
  {
    id: 500,
    title: 'Reservoir Dogs',
    releaseDate: '1992-09-02',
  },
  {
    id: 785539,
    title: 'Resort to Love',
    releaseDate: '2021-07-29',
  },
  {
    id: 39312,
    title: 'Restrepo',
    releaseDate: '2010-06-25',
  },
  {
    id: 1892,
    title: 'Return of the Jedi',
    releaseDate: '1983-05-25',
  },
  {
    id: 292011,
    title: 'Richard Jewell',
    releaseDate: '2019-12-13',
  },
  {
    id: 1208476,
    title: 'Ricky Gervais: Armageddon',
    releaseDate: '2023-12-01',
  },
  {
    id: 508933,
    title: 'Ricky Gervais: Humanity',
    releaseDate: '2018-03-13',
  },
  {
    id: 973164,
    title: 'Ricky Gervais: SuperNature',
    releaseDate: '2022-05-24',
  },
  {
    id: 487291,
    title: 'Ride Like a Girl',
    releaseDate: '2019-09-26',
  },
  {
    id: 36206,
    title: 'Ride the High Country',
    releaseDate: '1962-06-20',
  },
  {
    id: 355338,
    title: "Riley's First Date?",
    releaseDate: '2015-11-03',
  },
  {
    id: 301,
    title: 'Rio Bravo',
    releaseDate: '1959-03-08',
  },
  {
    id: 759054,
    title: 'Rise',
    releaseDate: '2022-06-23',
  },
  {
    id: 81188,
    title: 'Rise of the Guardians',
    releaseDate: '2012-11-21',
  },
  {
    id: 61791,
    title: 'Rise of the Planet of the Apes',
    releaseDate: '2011-08-03',
  },
  {
    id: 4147,
    title: 'Road to Perdition',
    releaseDate: '2002-07-12',
  },
  {
    id: 11886,
    title: 'Robin Hood',
    releaseDate: '1973-11-08',
  },
  {
    id: 649928,
    title: 'Robin Robin',
    releaseDate: '2021-10-09',
  },
  {
    id: 493100,
    title: 'Robin Williams: Come Inside My Mind',
    releaseDate: '2018-01-19',
  },
  {
    id: 5548,
    title: 'RoboCop',
    releaseDate: '1987-07-17',
  },
  {
    id: 42979,
    title: 'Robot Chicken: Star Wars',
    releaseDate: '2007-07-17',
  },
  {
    id: 51888,
    title: 'Robot Chicken: Star Wars Episode III',
    releaseDate: '2010-12-19',
  },
  {
    id: 504608,
    title: 'Rocketman',
    releaseDate: '2019-05-17',
  },
  {
    id: 1366,
    title: 'Rocky',
    releaseDate: '1976-11-20',
  },
  {
    id: 1367,
    title: 'Rocky II',
    releaseDate: '1979-06-15',
  },
  {
    id: 1374,
    title: 'Rocky IV',
    releaseDate: '1985-11-21',
  },
  {
    id: 1779,
    title: 'Roger & Me',
    releaseDate: '1989-09-01',
  },
  {
    id: 290382,
    title: 'Roger Waters: The Wall',
    releaseDate: '2014-09-29',
  },
  {
    id: 330459,
    title: 'Rogue One: A Star Wars Story',
    releaseDate: '2016-12-14',
  },
  {
    id: 804,
    title: 'Roman Holiday',
    releaseDate: '1953-08-26',
  },
  {
    id: 6003,
    title: 'Romeo and Juliet',
    releaseDate: '1968-04-02',
  },
  {
    id: 482321,
    title: "Ron's Gone Wrong",
    releaseDate: '2021-10-14',
  },
  {
    id: 361931,
    title: 'Ronaldo',
    releaseDate: '2015-11-09',
  },
  {
    id: 1242419,
    title: 'Roofman',
    releaseDate: '2025-10-08',
  },
  {
    id: 264644,
    title: 'Room',
    releaseDate: '2015-10-16',
  },
  {
    id: 1580,
    title: 'Rope',
    releaseDate: '1948-02-01',
  },
  {
    id: 826769,
    title: 'Rosaline',
    releaseDate: '2022-10-11',
  },
  {
    id: 805,
    title: "Rosemary's Baby",
    releaseDate: '1968-06-12',
  },
  {
    id: 10220,
    title: 'Rounders',
    releaseDate: '1998-09-11',
  },
  {
    id: 1040148,
    title: 'Ruby Gillman, Teenage Kraken',
    releaseDate: '2023-06-28',
  },
  {
    id: 103332,
    title: 'Ruby Sparks',
    releaseDate: '2012-07-25',
  },
  {
    id: 244403,
    title: 'Rudderless',
    releaseDate: '2014-10-17',
  },
  {
    id: 13382,
    title: 'Rudolph the Red-Nosed Reindeer',
    releaseDate: '1964-12-06',
  },
  {
    id: 14534,
    title: 'Rudy',
    releaseDate: '1993-09-17',
  },
  {
    id: 546121,
    title: 'Run',
    releaseDate: '2020-11-20',
  },
  {
    id: 18197,
    title: 'Running on Empty',
    releaseDate: '1988-09-09',
  },
  {
    id: 96721,
    title: 'Rush',
    releaseDate: '2013-09-02',
  },
  {
    id: 2109,
    title: 'Rush Hour',
    releaseDate: '1998-09-18',
  },
  {
    id: 11545,
    title: 'Rushmore',
    releaseDate: '1998-12-11',
  },
  {
    id: 38953,
    title: "Ryan's Daughter",
    releaseDate: '1970-03-19',
  },
  {
    id: 1049638,
    title: 'Rye Lane',
    releaseDate: '2023-03-17',
  },
  {
    id: 6620,
    title: 'Sabrina',
    releaseDate: '1954-09-01',
  },
  {
    id: 112949,
    title: 'Safe Haven',
    releaseDate: '2013-02-07',
  },
  {
    id: 727306,
    title: 'Safety',
    releaseDate: '2020-12-11',
  },
  {
    id: 22596,
    title: 'Safety Last!',
    releaseDate: '1923-04-01',
  },
  {
    id: 18783,
    title: 'Sahara',
    releaseDate: '1943-09-22',
  },
  {
    id: 6106,
    title: 'Salvador',
    releaseDate: '1986-04-23',
  },
  {
    id: 89708,
    title: 'Samsara',
    releaseDate: '2011-09-16',
  },
  {
    id: 13400,
    title: "Santa Claus Is Comin' to Town",
    releaseDate: '1970-12-13',
  },
  {
    id: 19236,
    title: 'Santa Sangre',
    releaseDate: '1989-11-24',
  },
  {
    id: 37230,
    title: 'Saturday Night and Sunday Morning',
    releaseDate: '1960-10-27',
  },
  {
    id: 19316,
    title: 'Saving Face',
    releaseDate: '2004-09-12',
  },
  {
    id: 140823,
    title: 'Saving Mr. Banks',
    releaseDate: '2013-11-29',
  },
  {
    id: 857,
    title: 'Saving Private Ryan',
    releaseDate: '1998-07-24',
  },
  {
    id: 2042,
    title: 'Savior',
    releaseDate: '1998-06-01',
  },
  {
    id: 246355,
    title: 'Saw',
    releaseDate: '2003-10-16',
  },
  {
    id: 176,
    title: 'Saw',
    releaseDate: '2004-10-01',
  },
  {
    id: 951491,
    title: 'Saw X',
    releaseDate: '2023-09-27',
  },
  {
    id: 2028,
    title: 'Say Anything...',
    releaseDate: '1989-04-14',
  },
  {
    id: 31587,
    title: 'Scarecrow',
    releaseDate: '1973-04-11',
  },
  {
    id: 877,
    title: 'Scarface',
    releaseDate: '1932-04-09',
  },
  {
    id: 111,
    title: 'Scarface',
    releaseDate: '1983-12-09',
  },
  {
    id: 17058,
    title: 'Scarlet Street',
    releaseDate: '1945-12-25',
  },
  {
    id: 9475,
    title: 'Scent of a Woman',
    releaseDate: '1992-12-23',
  },
  {
    id: 424,
    title: "Schindler's List",
    releaseDate: '1993-12-15',
  },
  {
    id: 271467,
    title: 'School Dance',
    releaseDate: '2014-07-02',
  },
  {
    id: 1584,
    title: 'School of Rock',
    releaseDate: '2003-10-03',
  },
  {
    id: 385103,
    title: 'Scoob!',
    releaseDate: '2020-07-08',
  },
  {
    id: 20410,
    title: 'Scooby-Doo and the Alien Invaders',
    releaseDate: '2000-10-03',
  },
  {
    id: 15601,
    title: 'Scooby-Doo and the Cyber Chase',
    releaseDate: '2001-03-22',
  },
  {
    id: 13350,
    title: 'Scooby-Doo and the Ghoul School',
    releaseDate: '1988-10-16',
  },
  {
    id: 13151,
    title: 'Scooby-Doo on Zombie Island',
    releaseDate: '1998-09-22',
  },
  {
    id: 484862,
    title: 'Scooby-Doo! & Batman: The Brave and the Bold',
    releaseDate: '2018-01-31',
  },
  {
    id: 32916,
    title: 'Scooby-Doo! Abracadabra-Doo',
    releaseDate: '2010-02-16',
  },
  {
    id: 347688,
    title: 'Scooby-Doo! and KISS: Rock and Roll Mystery',
    releaseDate: '2015-07-09',
  },
  {
    id: 560066,
    title: 'Scooby-Doo! and the Curse of the 13th Ghost',
    releaseDate: '2019-02-05',
  },
  {
    id: 12903,
    title: 'Scooby-Doo! and the Goblin King',
    releaseDate: '2008-09-23',
  },
  {
    id: 533592,
    title: 'Scooby-Doo! and the Gourmet Ghost',
    releaseDate: '2018-08-28',
  },
  {
    id: 30074,
    title: 'Scooby-Doo! and the Legend of the Vampire',
    releaseDate: '2003-03-04',
  },
  {
    id: 12902,
    title: 'Scooby-Doo! and the Loch Ness Monster',
    releaseDate: '2004-05-20',
  },
  {
    id: 21956,
    title: 'Scooby-Doo! and the Monster of Mexico',
    releaseDate: '2003-09-30',
  },
  {
    id: 37211,
    title: 'Scooby-Doo! and the Reluctant Werewolf',
    releaseDate: '1988-11-13',
  },
  {
    id: 16390,
    title: 'Scooby-Doo! and the Samurai Sword',
    releaseDate: '2009-04-07',
  },
  {
    id: 17681,
    title: "Scooby-Doo! and the Witch's Ghost",
    releaseDate: '1999-10-05',
  },
  {
    id: 409122,
    title: 'Scooby-Doo! and WWE: Curse of the Speed Demon',
    releaseDate: '2016-07-23',
  },
  {
    id: 45752,
    title: 'Scooby-Doo! Camp Scare',
    releaseDate: '2010-09-14',
  },
  {
    id: 284995,
    title: 'Scooby-Doo! Frankencreepy',
    releaseDate: '2014-08-05',
  },
  {
    id: 13351,
    title: 'Scooby-Doo! in Arabian Nights',
    releaseDate: '1994-09-03',
  },
  {
    id: 20558,
    title: "Scooby-Doo! in Where's My Mummy?",
    releaseDate: '2005-05-13',
  },
  {
    id: 67900,
    title: 'Scooby-Doo! Legend of the Phantosaur',
    releaseDate: '2011-09-03',
  },
  {
    id: 151535,
    title: 'Scooby-Doo! Mask of the Blue Falcon',
    releaseDate: '2012-12-15',
  },
  {
    id: 24787,
    title: 'Scooby-Doo! Meets the Boo Brothers',
    releaseDate: '1987-10-18',
  },
  {
    id: 302960,
    title: 'Scooby-Doo! Moon Monster Madness',
    releaseDate: '2015-02-03',
  },
  {
    id: 81900,
    title: 'Scooby-Doo! Music of the Vampire',
    releaseDate: '2012-03-07',
  },
  {
    id: 13355,
    title: 'Scooby-Doo! Pirates Ahoy!',
    releaseDate: '2006-09-10',
  },
  {
    id: 427564,
    title: "Scooby-Doo! Shaggy's Showdown",
    releaseDate: '2017-02-14',
  },
  {
    id: 203696,
    title: 'Scooby-Doo! Stage Fright',
    releaseDate: '2013-08-10',
  },
  {
    id: 682254,
    title: 'Scooby-Doo! The Sword and the Scoob',
    releaseDate: '2021-02-24',
  },
  {
    id: 258893,
    title: 'Scooby-Doo! WrestleMania Mystery',
    releaseDate: '2014-03-11',
  },
  {
    id: 22538,
    title: 'Scott Pilgrim vs. the World',
    releaseDate: '2010-08-12',
  },
  {
    id: 4232,
    title: 'Scream',
    releaseDate: '1996-12-20',
  },
  {
    id: 13188,
    title: 'Scrooge',
    releaseDate: '1951-11-30',
  },
  {
    id: 25476,
    title: 'Scum',
    releaseDate: '1979-09-12',
  },
  {
    id: 807,
    title: 'Se7en',
    releaseDate: '1995-09-22',
  },
  {
    id: 4464,
    title: 'Seabiscuit',
    releaseDate: '2003-07-22',
  },
  {
    id: 489999,
    title: 'Searching',
    releaseDate: '2018-08-24',
  },
  {
    id: 14291,
    title: 'Searching for Bobby Fischer',
    releaseDate: '1993-08-13',
  },
  {
    id: 84334,
    title: 'Searching for Sugar Man',
    releaseDate: '2012-06-30',
  },
  {
    id: 801058,
    title: 'Seaspiracy',
    releaseDate: '2021-03-24',
  },
  {
    id: 13156,
    title: 'Secondhand Lions',
    releaseDate: '2003-09-19',
  },
  {
    id: 20620,
    title: 'Seconds',
    releaseDate: '1966-10-05',
  },
  {
    id: 75258,
    title: 'Secret of the Wings',
    releaseDate: '2012-08-17',
  },
  {
    id: 39486,
    title: 'Secretariat',
    releaseDate: '2010-08-20',
  },
  {
    id: 11159,
    title: 'Secrets & Lies',
    releaseDate: '1996-05-24',
  },
  {
    id: 1122932,
    title: 'See You on Venus',
    releaseDate: '2023-07-20',
  },
  {
    id: 16052,
    title: 'Selena',
    releaseDate: '1997-03-21',
  },
  {
    id: 1022256,
    title: 'Selena Gomez: My Mind & Me',
    releaseDate: '2022-11-04',
  },
  {
    id: 273895,
    title: 'Selma',
    releaseDate: '2014-12-25',
  },
  {
    id: 58496,
    title: 'Senna',
    releaseDate: '2010-10-07',
  },
  {
    id: 4584,
    title: 'Sense and Sensibility',
    releaseDate: '1995-12-13',
  },
  {
    id: 1211472,
    title: 'September 5',
    releaseDate: '2024-11-07',
  },
  {
    id: 16320,
    title: 'Serenity',
    releaseDate: '2005-09-25',
  },
  {
    id: 16442,
    title: 'Sergeant York',
    releaseDate: '1941-09-27',
  },
  {
    id: 9040,
    title: 'Serpico',
    releaseDate: '1973-12-18',
  },
  {
    id: 9400,
    title: 'Set It Off',
    releaseDate: '1996-11-06',
  },
  {
    id: 16563,
    title: 'Seven Brides for Seven Brothers',
    releaseDate: '1954-07-22',
  },
  {
    id: 32600,
    title: 'Seven Chances',
    releaseDate: '1925-03-15',
  },
  {
    id: 23518,
    title: 'Seven Days in May',
    releaseDate: '1964-02-01',
  },
  {
    id: 11321,
    title: 'Seven Pounds',
    releaseDate: '2008-12-18',
  },
  {
    id: 978,
    title: 'Seven Years in Tibet',
    releaseDate: '1997-09-12',
  },
  {
    id: 433694,
    title: 'Sgt. Stubby: An American Hero',
    releaseDate: '2018-04-13',
  },
  {
    id: 21734,
    title: 'Shadow of a Doubt',
    releaseDate: '1943-01-12',
  },
  {
    id: 9905,
    title: 'Shallow Grave',
    releaseDate: '1994-12-22',
  },
  {
    id: 3110,
    title: 'Shane',
    releaseDate: '1953-04-23',
  },
  {
    id: 566525,
    title: 'Shang-Chi and the Legend of the Ten Rings',
    releaseDate: '2021-09-01',
  },
  {
    id: 747,
    title: 'Shaun of the Dead',
    releaseDate: '2004-04-09',
  },
  {
    id: 752939,
    title: 'Shawn Mendes: In Wonder',
    releaseDate: '2020-11-23',
  },
  {
    id: 1196573,
    title: 'She Rides Shotgun',
    releaseDate: '2025-07-31',
  },
  {
    id: 837881,
    title: 'She Said',
    releaseDate: '2022-11-17',
  },
  {
    id: 17483,
    title: 'Shelter',
    releaseDate: '2007-06-16',
  },
  {
    id: 10528,
    title: 'Sherlock Holmes',
    releaseDate: '2009-12-23',
  },
  {
    id: 58574,
    title: 'Sherlock Holmes: A Game of Shadows',
    releaseDate: '2011-11-22',
  },
  {
    id: 992,
    title: 'Sherlock Jr.',
    releaseDate: '1924-04-17',
  },
  {
    id: 379170,
    title: 'Sherlock: The Abominable Bride',
    releaseDate: '2016-01-01',
  },
  {
    id: 7863,
    title: 'Shine',
    releaseDate: '1996-08-15',
  },
  {
    id: 664300,
    title: 'Shiva Baby',
    releaseDate: '2021-03-26',
  },
  {
    id: 7485,
    title: 'Shooter',
    releaseDate: '2007-03-22',
  },
  {
    id: 8588,
    title: 'Shooting Dogs',
    releaseDate: '2006-03-08',
  },
  {
    id: 970284,
    title: 'Shooting Stars',
    releaseDate: '2023-06-02',
  },
  {
    id: 695,
    title: 'Short Cuts',
    releaseDate: '1993-10-01',
  },
  {
    id: 169813,
    title: 'Short Term 12',
    releaseDate: '2013-08-23',
  },
  {
    id: 13830,
    title: 'Shottas',
    releaseDate: '2002-02-27',
  },
  {
    id: 808,
    title: 'Shrek',
    releaseDate: '2001-05-18',
  },
  {
    id: 809,
    title: 'Shrek 2',
    releaseDate: '2004-05-19',
  },
  {
    id: 11324,
    title: 'Shutter Island',
    releaseDate: '2010-02-14',
  },
  {
    id: 273481,
    title: 'Sicario',
    releaseDate: '2015-09-17',
  },
  {
    id: 2359,
    title: 'Sicko',
    releaseDate: '2007-05-18',
  },
  {
    id: 110354,
    title: 'Side by Side',
    releaseDate: '2012-08-19',
  },
  {
    id: 9675,
    title: 'Sideways',
    releaseDate: '2004-10-22',
  },
  {
    id: 68730,
    title: 'Silence',
    releaseDate: '2016-12-23',
  },
  {
    id: 82693,
    title: 'Silver Linings Playbook',
    releaseDate: '2012-11-16',
  },
  {
    id: 1105832,
    title: 'Simón',
    releaseDate: '2023-04-15',
  },
  {
    id: 187,
    title: 'Sin City',
    releaseDate: '2005-04-01',
  },
  {
    id: 335797,
    title: 'Sing',
    releaseDate: '2016-11-23',
  },
  {
    id: 438695,
    title: 'Sing 2',
    releaseDate: '2021-12-01',
  },
  {
    id: 1155828,
    title: 'Sing Sing',
    releaseDate: '2024-07-12',
  },
  {
    id: 369557,
    title: 'Sing Street',
    releaseDate: '2016-03-11',
  },
  {
    id: 1371727,
    title: 'Sing: Thriller',
    releaseDate: '2024-10-15',
  },
  {
    id: 872,
    title: "Singin' in the Rain",
    releaseDate: '1952-04-10',
  },
  {
    id: 1233413,
    title: 'Sinners',
    releaseDate: '2025-04-16',
  },
  {
    id: 45745,
    title: 'Sintel',
    releaseDate: '2010-09-30',
  },
  {
    id: 25126,
    title: 'Six Shooter',
    releaseDate: '2004-10-14',
  },
  {
    id: 785522,
    title: 'Skater Girl',
    releaseDate: '2021-06-11',
  },
  {
    id: 37724,
    title: 'Skyfall',
    releaseDate: '2012-10-24',
  },
  {
    id: 6396,
    title: 'SLC Punk',
    releaseDate: '1998-09-24',
  },
  {
    id: 819,
    title: 'Sleepers',
    releaseDate: '1996-10-18',
  },
  {
    id: 2668,
    title: 'Sleepy Hollow',
    releaseDate: '1999-11-19',
  },
  {
    id: 993,
    title: 'Sleuth',
    releaseDate: '1972-12-10',
  },
  {
    id: 12498,
    title: 'Sling Blade',
    releaseDate: '1996-08-30',
  },
  {
    id: 668461,
    title: 'Slumberland',
    releaseDate: '2022-11-18',
  },
  {
    id: 12405,
    title: 'Slumdog Millionaire',
    releaseDate: '2008-11-12',
  },
  {
    id: 1146302,
    title: 'Sly',
    releaseDate: '2023-09-16',
  },
  {
    id: 10149,
    title: 'Smoke',
    releaseDate: '1995-06-09',
  },
  {
    id: 1037113,
    title: 'Snack Shack',
    releaseDate: '2024-03-15',
  },
  {
    id: 107,
    title: 'Snatch',
    releaseDate: '2000-09-01',
  },
  {
    id: 15242,
    title: 'Snoopy, Come Home',
    releaseDate: '1972-08-09',
  },
  {
    id: 313,
    title: 'Snow Cake',
    releaseDate: '2006-09-08',
  },
  {
    id: 408,
    title: 'Snow White and the Seven Dwarfs',
    releaseDate: '1938-01-14',
  },
  {
    id: 302401,
    title: 'Snowden',
    releaseDate: '2016-09-15',
  },
  {
    id: 295595,
    title: 'Soaked in Bleach',
    releaseDate: '2015-06-09',
  },
  {
    id: 239,
    title: 'Some Like It Hot',
    releaseDate: '1959-03-19',
  },
  {
    id: 28000,
    title: 'Somebody Up There Likes Me',
    releaseDate: '1956-07-04',
  },
  {
    id: 20544,
    title: 'Something the Lord Made',
    releaseDate: '2004-05-30',
  },
  {
    id: 16633,
    title: 'Somewhere in Time',
    releaseDate: '1980-10-02',
  },
  {
    id: 251519,
    title: 'Son of Batman',
    releaseDate: '2014-05-13',
  },
  {
    id: 110416,
    title: 'Song of the Sea',
    releaseDate: '2014-06-23',
  },
  {
    id: 454626,
    title: 'Sonic the Hedgehog',
    releaseDate: '2020-02-12',
  },
  {
    id: 675353,
    title: 'Sonic the Hedgehog 2',
    releaseDate: '2022-03-30',
  },
  {
    id: 939243,
    title: 'Sonic the Hedgehog 3',
    releaseDate: '2024-12-19',
  },
  {
    id: 43128,
    title: 'Sons of the Desert',
    releaseDate: '1933-12-29',
  },
  {
    id: 15764,
    title: "Sophie's Choice",
    releaseDate: '1982-12-08',
  },
  {
    id: 38985,
    title: 'Sorcerer',
    releaseDate: '1977-06-24',
  },
  {
    id: 522369,
    title: 'Sorry We Missed You',
    releaseDate: '2019-10-04',
  },
  {
    id: 508442,
    title: 'Soul',
    releaseDate: '2020-12-25',
  },
  {
    id: 43959,
    title: 'Soul Surfer',
    releaseDate: '2011-04-08',
  },
  {
    id: 157117,
    title: 'Sound City',
    releaseDate: '2013-01-18',
  },
  {
    id: 678512,
    title: 'Sound of Freedom',
    releaseDate: '2023-07-03',
  },
  {
    id: 502033,
    title: 'Sound of Metal',
    releaseDate: '2020-11-20',
  },
  {
    id: 45612,
    title: 'Source Code',
    releaseDate: '2011-03-30',
  },
  {
    id: 1219926,
    title: 'South Park (Not Suitable for Children)',
    releaseDate: '2023-12-20',
  },
  {
    id: 974691,
    title: 'South Park the Streaming Wars',
    releaseDate: '2022-06-01',
  },
  {
    id: 993729,
    title: 'South Park the Streaming Wars Part 2',
    releaseDate: '2022-07-13',
  },
  {
    id: 9473,
    title: 'South Park: Bigger, Longer & Uncut',
    releaseDate: '1999-06-24',
  },
  {
    id: 1190012,
    title: 'South Park: Joining the Panderverse',
    releaseDate: '2023-10-27',
  },
  {
    id: 874299,
    title: 'South Park: Post COVID',
    releaseDate: '2021-11-25',
  },
  {
    id: 874300,
    title: 'South Park: Post COVID: The Return of COVID',
    releaseDate: '2021-12-16',
  },
  {
    id: 1290938,
    title: 'South Park: The End of Obesity',
    releaseDate: '2024-05-24',
  },
  {
    id: 307081,
    title: 'Southpaw',
    releaseDate: '2015-03-24',
  },
  {
    id: 264337,
    title: 'Spare Parts',
    releaseDate: '2015-01-16',
  },
  {
    id: 967,
    title: 'Spartacus',
    releaseDate: '1960-10-13',
  },
  {
    id: 15058,
    title: 'Speak',
    releaseDate: '2004-01-20',
  },
  {
    id: 1114513,
    title: 'Speak No Evil',
    releaseDate: '2024-09-11',
  },
  {
    id: 1637,
    title: 'Speed',
    releaseDate: '1994-06-09',
  },
  {
    id: 4174,
    title: 'Spellbound',
    releaseDate: '1945-11-08',
  },
  {
    id: 557,
    title: 'Spider-Man',
    releaseDate: '2002-05-01',
  },
  {
    id: 558,
    title: 'Spider-Man 2',
    releaseDate: '2004-06-25',
  },
  {
    id: 569094,
    title: 'Spider-Man: Across the Spider-Verse',
    releaseDate: '2023-05-31',
  },
  {
    id: 429617,
    title: 'Spider-Man: Far From Home',
    releaseDate: '2019-06-28',
  },
  {
    id: 315635,
    title: 'Spider-Man: Homecoming',
    releaseDate: '2017-07-05',
  },
  {
    id: 324857,
    title: 'Spider-Man: Into the Spider-Verse',
    releaseDate: '2018-12-06',
  },
  {
    id: 634649,
    title: 'Spider-Man: No Way Home',
    releaseDate: '2021-12-15',
  },
  {
    id: 467062,
    title: 'Spielberg',
    releaseDate: '2017-10-05',
  },
  {
    id: 431693,
    title: 'Spies in Disguise',
    releaseDate: '2019-12-04',
  },
  {
    id: 637693,
    title: 'Spirit Untamed',
    releaseDate: '2021-05-20',
  },
  {
    id: 9023,
    title: 'Spirit: Stallion of the Cimarron',
    releaseDate: '2002-05-24',
  },
  {
    id: 28569,
    title: 'Splendor in the Grass',
    releaseDate: '1961-10-10',
  },
  {
    id: 381288,
    title: 'Split',
    releaseDate: '2017-01-19',
  },
  {
    id: 314365,
    title: 'Spotlight',
    releaseDate: '2015-11-06',
  },
  {
    id: 239563,
    title: 'St. Vincent',
    releaseDate: '2014-10-09',
  },
  {
    id: 995,
    title: 'Stagecoach',
    releaseDate: '1939-03-02',
  },
  {
    id: 632,
    title: 'Stalag 17',
    releaseDate: '1953-05-29',
  },
  {
    id: 29154,
    title: 'Stand and Deliver',
    releaseDate: '1988-03-11',
  },
  {
    id: 235,
    title: 'Stand by Me',
    releaseDate: '1986-08-08',
  },
  {
    id: 30416,
    title: 'Stanley Kubrick: A Life in Pictures',
    releaseDate: '2001-05-02',
  },
  {
    id: 13475,
    title: 'Star Trek',
    releaseDate: '2009-05-06',
  },
  {
    id: 154,
    title: 'Star Trek II: The Wrath of Khan',
    releaseDate: '1982-06-04',
  },
  {
    id: 54138,
    title: 'Star Trek Into Darkness',
    releaseDate: '2013-05-05',
  },
  {
    id: 168,
    title: 'Star Trek IV: The Voyage Home',
    releaseDate: '1986-11-26',
  },
  {
    id: 174,
    title: 'Star Trek VI: The Undiscovered Country',
    releaseDate: '1991-12-06',
  },
  {
    id: 199,
    title: 'Star Trek: First Contact',
    releaseDate: '1996-11-22',
  },
  {
    id: 11,
    title: 'Star Wars',
    releaseDate: '1977-05-25',
  },
  {
    id: 287663,
    title: 'Star Wars Rebels: Spark of Rebellion',
    releaseDate: '2014-10-03',
  },
  {
    id: 1895,
    title: 'Star Wars: Episode III - Revenge of the Sith',
    releaseDate: '2005-05-17',
  },
  {
    id: 140607,
    title: 'Star Wars: The Force Awakens',
    releaseDate: '2015-12-15',
  },
  {
    id: 2270,
    title: 'Stardust',
    releaseDate: '2007-08-10',
  },
  {
    id: 2164,
    title: 'Stargate',
    releaseDate: '1994-10-28',
  },
  {
    id: 12914,
    title: 'Stargate: Continuum',
    releaseDate: '2008-07-29',
  },
  {
    id: 13001,
    title: 'Stargate: The Ark of Truth',
    releaseDate: '2008-03-11',
  },
  {
    id: 382748,
    title: 'Stargirl',
    releaseDate: '2020-03-10',
  },
  {
    id: 209276,
    title: 'Starred Up',
    releaseDate: '2014-03-21',
  },
  {
    id: 563,
    title: 'Starship Troopers',
    releaseDate: '1997-11-07',
  },
  {
    id: 35558,
    title: 'Starstruck',
    releaseDate: '2010-02-14',
  },
  {
    id: 416494,
    title: 'Status Update',
    releaseDate: '2018-02-09',
  },
  {
    id: 25768,
    title: 'Steamboat Bill, Jr.',
    releaseDate: '1928-05-09',
  },
  {
    id: 53565,
    title: 'Steamboat Willie',
    releaseDate: '1928-05-15',
  },
  {
    id: 10860,
    title: 'Steel Magnolias',
    releaseDate: '1989-11-15',
  },
  {
    id: 9441,
    title: 'Stepmom',
    releaseDate: '1998-12-25',
  },
  {
    id: 537061,
    title: 'Steven Universe: The Movie',
    releaseDate: '2019-10-07',
  },
  {
    id: 284293,
    title: 'Still Alice',
    releaseDate: '2014-12-05',
  },
  {
    id: 216156,
    title: 'Still Life',
    releaseDate: '2013-11-28',
  },
  {
    id: 1058699,
    title: 'STILL: A Michael J. Fox Movie',
    releaseDate: '2023-01-20',
  },
  {
    id: 1931,
    title: 'Stomp the Yard',
    releaseDate: '2007-05-16',
  },
  {
    id: 24128,
    title: 'Stop Making Sense',
    releaseDate: '1984-10-19',
  },
  {
    id: 128216,
    title: 'Stories We Tell',
    releaseDate: '2012-10-12',
  },
  {
    id: 277216,
    title: 'Straight Outta Compton',
    releaseDate: '2015-08-11',
  },
  {
    id: 843906,
    title: 'Straight Outta Nowhere: Scooby-Doo! Meets Courage the Cowardly Dog',
    releaseDate: '2021-09-14',
  },
  {
    id: 23397,
    title: 'Straight Time',
    releaseDate: '1978-03-18',
  },
  {
    id: 281,
    title: 'Strange Days',
    releaseDate: '1995-10-13',
  },
  {
    id: 302429,
    title: 'Strange Magic',
    releaseDate: '2015-01-23',
  },
  {
    id: 1262,
    title: 'Stranger Than Fiction',
    releaseDate: '2006-09-09',
  },
  {
    id: 469,
    title: 'Stranger Than Paradise',
    releaseDate: '1984-10-01',
  },
  {
    id: 845,
    title: 'Strangers on a Train',
    releaseDate: '1951-06-27',
  },
  {
    id: 1426776,
    title: 'STRAW',
    releaseDate: '2025-06-05',
  },
  {
    id: 994,
    title: 'Straw Dogs',
    releaseDate: '1971-11-25',
  },
  {
    id: 912908,
    title: 'Strays',
    releaseDate: '2023-08-17',
  },
  {
    id: 50032,
    title: 'Stuart: A Life Backwards',
    releaseDate: '2007-09-23',
  },
  {
    id: 111969,
    title: 'Stuck in Love',
    releaseDate: '2013-06-14',
  },
  {
    id: 799375,
    title: 'Stutz',
    releaseDate: '2022-11-14',
  },
  {
    id: 49020,
    title: 'Submarine',
    releaseDate: '2011-03-18',
  },
  {
    id: 1130276,
    title: 'Succubus',
    releaseDate: '2024-10-06',
  },
  {
    id: 14698,
    title: 'Suddenly, Last Summer',
    releaseDate: '1959-12-22',
  },
  {
    id: 245168,
    title: 'Suffragette',
    releaseDate: '2015-10-16',
  },
  {
    id: 487242,
    title: 'Suicide Squad: Hell to Pay',
    releaseDate: '2018-03-23',
  },
  {
    id: 271674,
    title: 'Suite Française',
    releaseDate: '2015-03-12',
  },
  {
    id: 16305,
    title: "Sullivan's Travels",
    releaseDate: '1941-11-30',
  },
  {
    id: 363676,
    title: 'Sully',
    releaseDate: '2016-09-07',
  },
  {
    id: 776527,
    title: 'Summer of Soul (...Or, When the Revolution Could Not Be Televised)',
    releaseDate: '2021-07-02',
  },
  {
    id: 523977,
    title: 'Summerland',
    releaseDate: '2020-07-24',
  },
  {
    id: 631,
    title: 'Sunrise: A Song of Two Humans',
    releaseDate: '1927-11-04',
  },
  {
    id: 599,
    title: 'Sunset Boulevard',
    releaseDate: '1950-08-10',
  },
  {
    id: 1128559,
    title: 'Super/Man: The Christopher Reeve Story',
    releaseDate: '2024-09-21',
  },
  {
    id: 8363,
    title: 'Superbad',
    releaseDate: '2007-08-17',
  },
  {
    id: 1061474,
    title: 'Superman',
    releaseDate: '2025-07-09',
  },
  {
    id: 1924,
    title: 'Superman',
    releaseDate: '1978-12-14',
  },
  {
    id: 624479,
    title: 'Superman II: The Richard Donner Cut',
    releaseDate: '2006-11-02',
  },
  {
    id: 45162,
    title: 'Superman/Batman: Apocalypse',
    releaseDate: '2010-09-28',
  },
  {
    id: 22855,
    title: 'Superman/Batman: Public Enemies',
    releaseDate: '2009-09-29',
  },
  {
    id: 43641,
    title: 'Superman/Shazam!: The Return of Black Adam',
    releaseDate: '2010-11-16',
  },
  {
    id: 618354,
    title: 'Superman: Man of Tomorrow',
    releaseDate: '2020-08-23',
  },
  {
    id: 618355,
    title: 'Superman: Red Son',
    releaseDate: '2020-02-24',
  },
  {
    id: 412924,
    title: 'Supersonic',
    releaseDate: '2016-10-02',
  },
  {
    id: 11462,
    title: 'Suspicion',
    releaseDate: '1941-11-14',
  },
  {
    id: 765245,
    title: 'Swan Song',
    releaseDate: '2021-12-17',
  },
  {
    id: 13885,
    title: 'Sweeney Todd: The Demon Barber of Fleet Street',
    releaseDate: '2007-12-21',
  },
  {
    id: 976,
    title: 'Sweet Smell of Success',
    releaseDate: '1957-07-04',
  },
  {
    id: 216769,
    title: 'Swindle',
    releaseDate: '2014-03-22',
  },
  {
    id: 4960,
    title: 'Synecdoche, New York',
    releaseDate: '2008-10-24',
  },
  {
    id: 977,
    title: 'Tabu: A Story of the South Seas',
    releaseDate: '1931-07-30',
  },
  {
    id: 64720,
    title: 'Take Shelter',
    releaseDate: '2011-09-30',
  },
  {
    id: 11485,
    title: 'Take the Money and Run',
    releaseDate: '1969-08-18',
  },
  {
    id: 8681,
    title: 'Taken',
    releaseDate: '2008-02-18',
  },
  {
    id: 25405,
    title: 'Taking Chance',
    releaseDate: '2009-09-21',
  },
  {
    id: 10132,
    title: 'Talk Radio',
    releaseDate: '1988-12-21',
  },
  {
    id: 1008042,
    title: 'Talk to Me',
    releaseDate: '2023-07-26',
  },
  {
    id: 38757,
    title: 'Tangled',
    releaseDate: '2010-11-24',
  },
  {
    id: 82881,
    title: 'Tangled Ever After',
    releaseDate: '2012-01-13',
  },
  {
    id: 19383,
    title: 'Targets',
    releaseDate: '1968-08-13',
  },
  {
    id: 37135,
    title: 'Tarzan',
    releaseDate: '1999-06-17',
  },
  {
    id: 103,
    title: 'Taxi Driver',
    releaseDate: '1976-02-09',
  },
  {
    id: 1160164,
    title: 'TAYLOR SWIFT | THE ERAS TOUR',
    releaseDate: '2023-10-13',
  },
  {
    id: 568332,
    title: 'Taylor Swift: Reputation Stadium Tour',
    releaseDate: '2018-12-31',
  },
  {
    id: 373558,
    title: 'Taylor Swift: The 1989 World Tour - Live',
    releaseDate: '2015-12-20',
  },
  {
    id: 413279,
    title: 'Team Thor',
    releaseDate: '2016-08-28',
  },
  {
    id: 474395,
    title: 'Teen Titans Go! To the Movies',
    releaseDate: '2018-07-27',
  },
  {
    id: 556901,
    title: 'Teen Titans Go! vs. Teen Titans',
    releaseDate: '2019-07-21',
  },
  {
    id: 408647,
    title: 'Teen Titans: The Judas Contract',
    releaseDate: '2017-03-31',
  },
  {
    id: 16237,
    title: 'Teen Titans: Trouble in Tokyo',
    releaseDate: '2006-09-15',
  },
  {
    id: 877703,
    title: 'Teen Wolf: The Movie',
    releaseDate: '2023-01-18',
  },
  {
    id: 614930,
    title: 'Teenage Mutant Ninja Turtles: Mutant Mayhem',
    releaseDate: '2023-07-31',
  },
  {
    id: 475888,
    title: 'Tell It to the Bees',
    releaseDate: '2019-05-03',
  },
  {
    id: 627070,
    title: 'Tell Me Who I Am',
    releaseDate: '2019-10-18',
  },
  {
    id: 33602,
    title: 'Temple Grandin',
    releaseDate: '2010-02-06',
  },
  {
    id: 14843,
    title: 'Ten Inch Hero',
    releaseDate: '2007-04-25',
  },
  {
    id: 577922,
    title: 'Tenet',
    releaseDate: '2020-08-22',
  },
  {
    id: 280,
    title: 'Terminator 2: Judgment Day',
    releaseDate: '1991-07-03',
  },
  {
    id: 11050,
    title: 'Terms of Endearment',
    releaseDate: '1983-11-20',
  },
  {
    id: 11121,
    title: 'Tess',
    releaseDate: '1979-10-06',
  },
  {
    id: 284689,
    title: 'Testament of Youth',
    releaseDate: '2015-01-16',
  },
  {
    id: 726759,
    title: 'Tetris',
    releaseDate: '2023-03-15',
  },
  {
    id: 9388,
    title: 'Thank You for Smoking',
    releaseDate: '2005-09-09',
  },
  {
    id: 645757,
    title: 'That Christmas',
    releaseDate: '2024-11-27',
  },
  {
    id: 260,
    title: 'The 39 Steps',
    releaseDate: '1935-06-06',
  },
  {
    id: 2756,
    title: 'The Abyss',
    releaseDate: '1989-08-09',
  },
  {
    id: 302946,
    title: 'The Accountant',
    releaseDate: '2016-10-13',
  },
  {
    id: 870028,
    title: 'The Accountant²',
    releaseDate: '2025-04-23',
  },
  {
    id: 10868,
    title: 'The Accused',
    releaseDate: '1988-10-14',
  },
  {
    id: 696806,
    title: 'The Adam Project',
    releaseDate: '2022-03-11',
  },
  {
    id: 2907,
    title: 'The Addams Family',
    releaseDate: '1991-11-22',
  },
  {
    id: 2759,
    title: 'The Adventures of Priscilla, Queen of the Desert',
    releaseDate: '1994-05-31',
  },
  {
    id: 10907,
    title: 'The Adventures of Robin Hood',
    releaseDate: '1938-05-13',
  },
  {
    id: 488,
    title: 'The African Queen',
    releaseDate: '1952-01-07',
  },
  {
    id: 293863,
    title: 'The Age of Adaline',
    releaseDate: '2015-04-16',
  },
  {
    id: 11209,
    title: 'The Alamo',
    releaseDate: '1960-10-23',
  },
  {
    id: 682587,
    title: 'The Alpinist',
    releaseDate: '2021-02-07',
  },
  {
    id: 10514,
    title: 'The Andromeda Strain',
    releaseDate: '1971-03-12',
  },
  {
    id: 454640,
    title: 'The Angry Birds Movie 2',
    releaseDate: '2019-08-02',
  },
  {
    id: 55931,
    title: 'The Animatrix',
    releaseDate: '2003-05-09',
  },
  {
    id: 284,
    title: 'The Apartment',
    releaseDate: '1960-06-21',
  },
  {
    id: 10112,
    title: 'The Aristocats',
    releaseDate: '1970-12-24',
  },
  {
    id: 68450,
    title: 'The Art of Flight',
    releaseDate: '2011-09-08',
  },
  {
    id: 522924,
    title: 'The Art of Racing in the Rain',
    releaseDate: '2019-08-08',
  },
  {
    id: 16958,
    title: 'The Asphalt Jungle',
    releaseDate: '1950-05-12',
  },
  {
    id: 4512,
    title: 'The Assassination of Jesse James by the Coward Robert Ford',
    releaseDate: '2007-09-20',
  },
  {
    id: 24428,
    title: 'The Avengers',
    releaseDate: '2012-04-25',
  },
  {
    id: 2567,
    title: 'The Aviator',
    releaseDate: '2004-12-17',
  },
  {
    id: 14675,
    title: 'The Awful Truth',
    releaseDate: '1937-10-21',
  },
  {
    id: 397601,
    title: 'The Bachelors',
    releaseDate: '2017-10-20',
  },
  {
    id: 32499,
    title: 'The Bad and the Beautiful',
    releaseDate: '1952-12-25',
  },
  {
    id: 629542,
    title: 'The Bad Guys',
    releaseDate: '2022-03-17',
  },
  {
    id: 1175942,
    title: 'The Bad Guys 2',
    releaseDate: '2025-07-24',
  },
  {
    id: 532814,
    title: 'The Bad Seed',
    releaseDate: '2018-09-09',
  },
  {
    id: 42196,
    title: 'The Bad Seed',
    releaseDate: '1956-09-12',
  },
  {
    id: 537996,
    title: 'The Ballad of Buster Scruggs',
    releaseDate: '2018-11-09',
  },
  {
    id: 67572,
    title: 'The Band Concert',
    releaseDate: '1935-02-23',
  },
  {
    id: 29376,
    title: 'The Band Wagon',
    releaseDate: '1953-08-07',
  },
  {
    id: 627725,
    title: 'The Banker',
    releaseDate: '2020-03-06',
  },
  {
    id: 674324,
    title: 'The Banshees of Inisherin',
    releaseDate: '2022-10-20',
  },
  {
    id: 10474,
    title: 'The Basketball Diaries',
    releaseDate: '1995-04-21',
  },
  {
    id: 414906,
    title: 'The Batman',
    releaseDate: '2022-03-01',
  },
  {
    id: 20077,
    title: 'The Batman vs. Dracula',
    releaseDate: '2005-10-18',
  },
  {
    id: 15267,
    title: 'The Beast',
    releaseDate: '1988-09-14',
  },
  {
    id: 391698,
    title: 'The Beatles: Eight Days a Week - The Touring Years',
    releaseDate: '2016-09-15',
  },
  {
    id: 866398,
    title: 'The Beekeeper',
    releaseDate: '2024-01-08',
  },
  {
    id: 31906,
    title: 'The Beguiled',
    releaseDate: '1971-01-23',
  },
  {
    id: 458131,
    title: 'The Best of Enemies',
    releaseDate: '2019-04-05',
  },
  {
    id: 239571,
    title: 'The Best of Me',
    releaseDate: '2014-10-15',
  },
  {
    id: 887,
    title: 'The Best Years of Our Lives',
    releaseDate: '1946-12-25',
  },
  {
    id: 2525,
    title: 'The Bible: In the Beginning...',
    releaseDate: '1966-09-28',
  },
  {
    id: 19974,
    title: 'The Big Clock',
    releaseDate: '1948-03-18',
  },
  {
    id: 22342,
    title: 'The Big Combo',
    releaseDate: '1955-02-13',
  },
  {
    id: 12501,
    title: 'The Big Country',
    releaseDate: '1958-09-30',
  },
  {
    id: 14580,
    title: 'The Big Heat',
    releaseDate: '1953-10-14',
  },
  {
    id: 115,
    title: 'The Big Lebowski',
    releaseDate: '1998-03-06',
  },
  {
    id: 318846,
    title: 'The Big Short',
    releaseDate: '2015-12-11',
  },
  {
    id: 416477,
    title: 'The Big Sick',
    releaseDate: '2017-03-30',
  },
  {
    id: 910,
    title: 'The Big Sleep',
    releaseDate: '1946-08-22',
  },
  {
    id: 543084,
    title: 'The Biggest Little Farm',
    releaseDate: '2019-06-05',
  },
  {
    id: 11000,
    title: 'The Birdcage',
    releaseDate: '1996-03-08',
  },
  {
    id: 571,
    title: 'The Birds',
    releaseDate: '1963-03-28',
  },
  {
    id: 19490,
    title: "The Bishop's Wife",
    releaseDate: '1947-12-25',
  },
  {
    id: 756999,
    title: 'The Black Phone',
    releaseDate: '2022-06-16',
  },
  {
    id: 17264,
    title: 'The Black Stallion',
    releaseDate: '1979-10-13',
  },
  {
    id: 22881,
    title: 'The Blind Side',
    releaseDate: '2009-11-20',
  },
  {
    id: 200481,
    title: 'The Blue Umbrella',
    releaseDate: '2013-02-12',
  },
  {
    id: 525,
    title: 'The Blues Brothers',
    releaseDate: '1980-06-16',
  },
  {
    id: 18947,
    title: 'The Boat That Rocked',
    releaseDate: '2009-04-01',
  },
  {
    id: 382614,
    title: 'The Book of Henry',
    releaseDate: '2017-06-16',
  },
  {
    id: 228326,
    title: 'The Book of Life',
    releaseDate: '2014-10-01',
  },
  {
    id: 203833,
    title: 'The Book Thief',
    releaseDate: '2013-11-08',
  },
  {
    id: 8374,
    title: 'The Boondock Saints',
    releaseDate: '1999-01-22',
  },
  {
    id: 459151,
    title: 'The Boss Baby: Family Business',
    releaseDate: '2021-07-01',
  },
  {
    id: 2501,
    title: 'The Bourne Identity',
    releaseDate: '2002-06-14',
  },
  {
    id: 2502,
    title: 'The Bourne Supremacy',
    releaseDate: '2004-07-23',
  },
  {
    id: 2503,
    title: 'The Bourne Ultimatum',
    releaseDate: '2007-08-03',
  },
  {
    id: 14574,
    title: 'The Boy in the Striped Pyjamas',
    releaseDate: '2008-05-07',
  },
  {
    id: 491480,
    title: 'The Boy Who Harnessed the Wind',
    releaseDate: '2019-02-14',
  },
  {
    id: 995133,
    title: 'The Boy, the Mole, the Fox and the Horse',
    releaseDate: '2022-12-25',
  },
  {
    id: 823452,
    title: 'The Boys in the Boat',
    releaseDate: '2023-12-25',
  },
  {
    id: 435129,
    title: 'The Breadwinner',
    releaseDate: '2017-11-17',
  },
  {
    id: 2108,
    title: 'The Breakfast Club',
    releaseDate: '1985-02-15',
  },
  {
    id: 826,
    title: 'The Bridge on the River Kwai',
    releaseDate: '1957-10-11',
  },
  {
    id: 688,
    title: 'The Bridges of Madison County',
    releaseDate: '1995-06-02',
  },
  {
    id: 616251,
    title: 'The Broken Hearts Gallery',
    releaseDate: '2020-09-11',
  },
  {
    id: 7350,
    title: 'The Bucket List',
    releaseDate: '2007-12-25',
  },
  {
    id: 20007,
    title: 'The Bugs Bunny/Road Runner Movie',
    releaseDate: '1979-09-28',
  },
  {
    id: 763165,
    title: 'The Burial',
    releaseDate: '2023-10-06',
  },
  {
    id: 132363,
    title: 'The Butler',
    releaseDate: '2013-08-16',
  },
  {
    id: 1954,
    title: 'The Butterfly Effect',
    releaseDate: '2004-01-17',
  },
  {
    id: 10178,
    title: 'The Caine Mutiny',
    releaseDate: '1954-06-24',
  },
  {
    id: 481848,
    title: 'The Call of the Wild',
    releaseDate: '2020-02-19',
  },
  {
    id: 31411,
    title: 'The Cameraman',
    releaseDate: '1928-09-10',
  },
  {
    id: 13852,
    title: 'The Castle',
    releaseDate: '1997-04-10',
  },
  {
    id: 39853,
    title: 'The Cat Concerto',
    releaseDate: '1947-04-26',
  },
  {
    id: 31602,
    title: 'The Chase',
    releaseDate: '1966-02-18',
  },
  {
    id: 20139,
    title: "The Children's Hour",
    releaseDate: '1961-12-19',
  },
  {
    id: 988,
    title: 'The China Syndrome',
    releaseDate: '1979-03-16',
  },
  {
    id: 330483,
    title: 'The Choice',
    releaseDate: '2016-02-04',
  },
  {
    id: 527435,
    title: 'The Christmas Chronicles',
    releaseDate: '2018-11-22',
  },
  {
    id: 411,
    title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    releaseDate: '2005-12-07',
  },
  {
    id: 1715,
    title: 'The Cider House Rules',
    releaseDate: '1999-12-17',
  },
  {
    id: 28978,
    title: 'The Circus',
    releaseDate: '1928-01-06',
  },
  {
    id: 42740,
    title: 'The Collector',
    releaseDate: '1965-06-17',
  },
  {
    id: 558915,
    title: 'The Color Purple',
    releaseDate: '2023-12-25',
  },
  {
    id: 873,
    title: 'The Color Purple',
    releaseDate: '1985-12-18',
  },
  {
    id: 11663,
    title: 'The Commitments',
    releaseDate: '1991-08-14',
  },
  {
    id: 138843,
    title: 'The Conjuring',
    releaseDate: '2013-07-18',
  },
  {
    id: 259693,
    title: 'The Conjuring 2',
    releaseDate: '2016-06-08',
  },
  {
    id: 423108,
    title: 'The Conjuring: The Devil Made Me Do It',
    releaseDate: '2021-05-25',
  },
  {
    id: 592,
    title: 'The Conversation',
    releaseDate: '1974-04-07',
  },
  {
    id: 7452,
    title: 'The Cook, the Thief, His Wife & Her Lover',
    releaseDate: '1989-10-13',
  },
  {
    id: 11420,
    title: 'The Corporation',
    releaseDate: '2003-09-10',
  },
  {
    id: 11362,
    title: 'The Count of Monte Cristo',
    releaseDate: '2002-01-23',
  },
  {
    id: 522241,
    title: 'The Courier',
    releaseDate: '2020-01-24',
  },
  {
    id: 11839,
    title: 'The Court Jester',
    releaseDate: '1955-12-24',
  },
  {
    id: 23128,
    title: 'The Cove',
    releaseDate: '2009-07-31',
  },
  {
    id: 15573,
    title: 'The Cowboys',
    releaseDate: '1972-01-13',
  },
  {
    id: 670292,
    title: 'The Creator',
    releaseDate: '2023-09-27',
  },
  {
    id: 11570,
    title: 'The Crimson Pirate',
    releaseDate: '1952-09-27',
  },
  {
    id: 529203,
    title: 'The Croods: A New Age',
    releaseDate: '2020-11-25',
  },
  {
    id: 9495,
    title: 'The Crow',
    releaseDate: '1994-05-11',
  },
  {
    id: 3061,
    title: 'The Crowd',
    releaseDate: '1928-03-03',
  },
  {
    id: 6715,
    title: 'The Cure',
    releaseDate: '1995-04-21',
  },
  {
    id: 4922,
    title: 'The Curious Case of Benjamin Button',
    releaseDate: '2008-12-25',
  },
  {
    id: 16562,
    title: 'The Cutting Edge',
    releaseDate: '1992-03-27',
  },
  {
    id: 21641,
    title: 'The Damned United',
    releaseDate: '2009-03-27',
  },
  {
    id: 306819,
    title: 'The Danish Girl',
    releaseDate: '2015-11-27',
  },
  {
    id: 4538,
    title: 'The Darjeeling Limited',
    releaseDate: '2007-09-07',
  },
  {
    id: 11639,
    title: 'The Dark Crystal',
    releaseDate: '1982-12-17',
  },
  {
    id: 155,
    title: 'The Dark Knight',
    releaseDate: '2008-07-16',
  },
  {
    id: 49026,
    title: 'The Dark Knight Rises',
    releaseDate: '2012-07-17',
  },
  {
    id: 445651,
    title: 'The Darkest Minds',
    releaseDate: '2018-07-25',
  },
  {
    id: 489471,
    title: 'The Dawn Wall',
    releaseDate: '2017-11-01',
  },
  {
    id: 4909,
    title: 'The Day of the Jackal',
    releaseDate: '1973-05-16',
  },
  {
    id: 870360,
    title: 'The Day the Earth Blew Up: A Looney Tunes Movie',
    releaseDate: '2024-08-01',
  },
  {
    id: 828,
    title: 'The Day the Earth Stood Still',
    releaseDate: '1951-09-18',
  },
  {
    id: 11336,
    title: 'The Dead Zone',
    releaseDate: '1983-10-21',
  },
  {
    id: 402897,
    title: 'The Death of Stalin',
    releaseDate: '2017-10-20',
  },
  {
    id: 487670,
    title: 'The Death of Superman',
    releaseDate: '2018-07-24',
  },
  {
    id: 1058647,
    title: 'The Deepest Breath',
    releaseDate: '2023-01-21',
  },
  {
    id: 11778,
    title: 'The Deer Hunter',
    releaseDate: '1978-12-08',
  },
  {
    id: 11414,
    title: 'The Defiant Ones',
    releaseDate: '1958-08-14',
  },
  {
    id: 1422,
    title: 'The Departed',
    releaseDate: '2006-10-04',
  },
  {
    id: 18612,
    title: 'The Desperate Hours',
    releaseDate: '1955-10-05',
  },
  {
    id: 499932,
    title: 'The Devil All the Time',
    releaseDate: '2020-09-11',
  },
  {
    id: 350,
    title: 'The Devil Wears Prada',
    releaseDate: '2006-06-29',
  },
  {
    id: 1813,
    title: "The Devil's Advocate",
    releaseDate: '1997-10-17',
  },
  {
    id: 31767,
    title: 'The Devils',
    releaseDate: '1971-07-16',
  },
  {
    id: 2576,
    title: 'The Diary of Anne Frank',
    releaseDate: '1959-03-18',
  },
  {
    id: 327331,
    title: 'The Dirt',
    releaseDate: '2019-03-22',
  },
  {
    id: 1654,
    title: 'The Dirty Dozen',
    releaseDate: '1967-06-15',
  },
  {
    id: 371638,
    title: 'The Disaster Artist',
    releaseDate: '2017-03-12',
  },
  {
    id: 10537,
    title: 'The Doors',
    releaseDate: '1991-03-01',
  },
  {
    id: 10831,
    title: "The Draughtsman's Contract",
    releaseDate: '1982-11-12',
  },
  {
    id: 1278,
    title: 'The Dreamers',
    releaseDate: '2003-10-10',
  },
  {
    id: 2153,
    title: 'The Driver',
    releaseDate: '1978-06-08',
  },
  {
    id: 19067,
    title: 'The Duellists',
    releaseDate: '1977-08-31',
  },
  {
    id: 376660,
    title: 'The Edge of Seventeen',
    releaseDate: '2016-11-18',
  },
  {
    id: 1955,
    title: 'The Elephant Man',
    releaseDate: '1980-10-09',
  },
  {
    id: 17187,
    title: "The Emperor's Club",
    releaseDate: '2002-11-22',
  },
  {
    id: 11688,
    title: "The Emperor's New Groove",
    releaseDate: '2000-12-15',
  },
  {
    id: 1891,
    title: 'The Empire Strikes Back',
    releaseDate: '1980-05-20',
  },
  {
    id: 249688,
    title: 'The End of the Tour',
    releaseDate: '2015-07-31',
  },
  {
    id: 15876,
    title: 'The Enemy Below',
    releaseDate: '1957-12-25',
  },
  {
    id: 846433,
    title: 'The Enforcer',
    releaseDate: '2022-09-22',
  },
  {
    id: 409,
    title: 'The English Patient',
    releaseDate: '1996-11-14',
  },
  {
    id: 156022,
    title: 'The Equalizer',
    releaseDate: '2014-09-24',
  },
  {
    id: 926393,
    title: 'The Equalizer 3',
    releaseDate: '2023-08-30',
  },
  {
    id: 764,
    title: 'The Evil Dead',
    releaseDate: '1981-10-15',
  },
  {
    id: 836225,
    title: 'The Exorcism of God',
    releaseDate: '2022-03-11',
  },
  {
    id: 9552,
    title: 'The Exorcist',
    releaseDate: '1973-12-26',
  },
  {
    id: 14325,
    title: 'The Express',
    releaseDate: '2008-10-10',
  },
  {
    id: 804095,
    title: 'The Fabelmans',
    releaseDate: '2022-11-11',
  },
  {
    id: 14784,
    title: 'The Fall',
    releaseDate: '2006-09-09',
  },
  {
    id: 21631,
    title: 'The Fallen Idol',
    releaseDate: '1948-09-30',
  },
  {
    id: 795514,
    title: 'The Fallout',
    releaseDate: '2021-03-17',
  },
  {
    id: 1029575,
    title: 'The Family Plan',
    releaseDate: '2023-12-14',
  },
  {
    id: 565310,
    title: 'The Farewell',
    releaseDate: '2019-07-12',
  },
  {
    id: 9799,
    title: 'The Fast and the Furious',
    releaseDate: '2001-06-22',
  },
  {
    id: 600354,
    title: 'The Father',
    releaseDate: '2020-12-23',
  },
  {
    id: 222935,
    title: 'The Fault in Our Stars',
    releaseDate: '2014-06-02',
  },
  {
    id: 375262,
    title: 'The Favourite',
    releaseDate: '2018-11-23',
  },
  {
    id: 45317,
    title: 'The Fighter',
    releaseDate: '2010-12-10',
  },
  {
    id: 177,
    title: 'The Fisher King',
    releaseDate: '1991-09-20',
  },
  {
    id: 10243,
    title: 'The Flight of the Phoenix',
    releaseDate: '1965-12-15',
  },
  {
    id: 394117,
    title: 'The Florida Project',
    releaseDate: '2017-10-06',
  },
  {
    id: 11815,
    title: 'The Fly',
    releaseDate: '1958-07-16',
  },
  {
    id: 9426,
    title: 'The Fly',
    releaseDate: '1986-08-15',
  },
  {
    id: 20789,
    title: 'The Flyboys',
    releaseDate: '2008-08-15',
  },
  {
    id: 12698,
    title: 'The Fog of War',
    releaseDate: '2003-10-26',
  },
  {
    id: 1186532,
    title: 'The Forge',
    releaseDate: '2024-08-22',
  },
  {
    id: 1888,
    title: 'The Fortune Cookie',
    releaseDate: '1966-10-19',
  },
  {
    id: 310307,
    title: 'The Founder',
    releaseDate: '2016-11-24',
  },
  {
    id: 10948,
    title: 'The Fox and the Hound',
    releaseDate: '1981-07-10',
  },
  {
    id: 1051,
    title: 'The French Connection',
    releaseDate: '1971-10-09',
  },
  {
    id: 542178,
    title: 'The French Dispatch of the Liberty, Kansas Evening Sun',
    releaseDate: '2021-10-21',
  },
  {
    id: 738362,
    title: 'The Fresh Prince of Bel-Air Reunion',
    releaseDate: '2020-11-18',
  },
  {
    id: 25680,
    title: 'The Friends of Eddie Coyle',
    releaseDate: '1973-06-26',
  },
  {
    id: 1723,
    title: 'The Front',
    releaseDate: '1976-09-17',
  },
  {
    id: 987,
    title: 'The Front Page',
    releaseDate: '1974-11-01',
  },
  {
    id: 5503,
    title: 'The Fugitive',
    releaseDate: '1993-08-06',
  },
  {
    id: 318121,
    title: 'The Fundamentals of Caring',
    releaseDate: '2016-06-16',
  },
  {
    id: 2649,
    title: 'The Game',
    releaseDate: '1997-09-12',
  },
  {
    id: 463088,
    title: 'The Game Changers',
    releaseDate: '2019-09-16',
  },
  {
    id: 748783,
    title: 'The Garfield Movie',
    releaseDate: '2024-04-30',
  },
  {
    id: 961,
    title: 'The General',
    releaseDate: '1926-12-25',
  },
  {
    id: 522627,
    title: 'The Gentlemen',
    releaseDate: '2020-01-01',
  },
  {
    id: 5916,
    title: 'The Getaway',
    releaseDate: '1972-12-13',
  },
  {
    id: 22292,
    title: 'The Ghost and Mrs. Muir',
    releaseDate: '1947-05-25',
  },
  {
    id: 65754,
    title: 'The Girl with the Dragon Tattoo',
    releaseDate: '2011-12-14',
  },
  {
    id: 336000,
    title: 'The Glass Castle',
    releaseDate: '2017-08-11',
  },
  {
    id: 51360,
    title: 'The Goat',
    releaseDate: '1921-05-15',
  },
  {
    id: 238,
    title: 'The Godfather',
    releaseDate: '1972-03-14',
  },
  {
    id: 240,
    title: 'The Godfather Part II',
    releaseDate: '1974-12-20',
  },
  {
    id: 242,
    title: 'The Godfather Part III',
    releaseDate: '1990-12-25',
  },
  {
    id: 8393,
    title: 'The Gods Must Be Crazy',
    releaseDate: '1980-09-10',
  },
  {
    id: 11937,
    title: 'The Gods Must Be Crazy II',
    releaseDate: '1989-07-01',
  },
  {
    id: 962,
    title: 'The Gold Rush',
    releaseDate: '1925-07-13',
  },
  {
    id: 472674,
    title: 'The Goldfinch',
    releaseDate: '2019-09-12',
  },
  {
    id: 250538,
    title: 'The Good Lie',
    releaseDate: '2014-09-10',
  },
  {
    id: 32790,
    title: 'The Good Witch',
    releaseDate: '2008-01-19',
  },
  {
    id: 846214,
    title: 'The Good, the Bart, and the Loki',
    releaseDate: '2021-07-07',
  },
  {
    id: 9340,
    title: 'The Goonies',
    releaseDate: '1985-06-07',
  },
  {
    id: 950396,
    title: 'The Gorge',
    releaseDate: '2025-02-13',
  },
  {
    id: 37247,
    title: 'The Graduate',
    releaseDate: '1967-12-21',
  },
  {
    id: 120467,
    title: 'The Grand Budapest Hotel',
    releaseDate: '2014-02-26',
  },
  {
    id: 596,
    title: 'The Grapes of Wrath',
    releaseDate: '1940-03-15',
  },
  {
    id: 14047,
    title: 'The Great Debaters',
    releaseDate: '2007-12-25',
  },
  {
    id: 914,
    title: 'The Great Dictator',
    releaseDate: '1940-10-15',
  },
  {
    id: 5925,
    title: 'The Great Escape',
    releaseDate: '1963-07-03',
  },
  {
    id: 64682,
    title: 'The Great Gatsby',
    releaseDate: '2013-05-09',
  },
  {
    id: 9994,
    title: 'The Great Mouse Detective',
    releaseDate: '1986-07-02',
  },
  {
    id: 11575,
    title: 'The Great Race',
    releaseDate: '1965-07-01',
  },
  {
    id: 597922,
    title: 'The Greatest Beer Run Ever',
    releaseDate: '2022-09-23',
  },
  {
    id: 15487,
    title: 'The Greatest Game Ever Played',
    releaseDate: '2005-09-30',
  },
  {
    id: 1226841,
    title: 'The Greatest Night in Pop',
    releaseDate: '2024-01-19',
  },
  {
    id: 316029,
    title: 'The Greatest Showman',
    releaseDate: '2017-12-20',
  },
  {
    id: 497,
    title: 'The Green Mile',
    releaseDate: '1999-12-10',
  },
  {
    id: 28118,
    title: 'The Gruffalo',
    releaseDate: '2009-12-25',
  },
  {
    id: 4643,
    title: 'The Guardian',
    releaseDate: '2006-09-28',
  },
  {
    id: 774752,
    title: 'The Guardians of the Galaxy Holiday Special',
    releaseDate: '2022-11-24',
  },
  {
    id: 451480,
    title: 'The Guernsey Literary & Potato Peel Pie Society',
    releaseDate: '2018-04-19',
  },
  {
    id: 17409,
    title: 'The Gunfighter',
    releaseDate: '1950-05-26',
  },
  {
    id: 10911,
    title: 'The Guns of Navarone',
    releaseDate: '1961-04-27',
  },
  {
    id: 597219,
    title: 'The Half of It',
    releaseDate: '2020-05-01',
  },
  {
    id: 18785,
    title: 'The Hangover',
    releaseDate: '2009-06-02',
  },
  {
    id: 470044,
    title: 'The Hate U Give',
    releaseDate: '2018-10-19',
  },
  {
    id: 273248,
    title: 'The Hateful Eight',
    releaseDate: '2015-12-25',
  },
  {
    id: 603661,
    title: 'The Hating Game',
    releaseDate: '2021-12-09',
  },
  {
    id: 11772,
    title: 'The Haunting',
    releaseDate: '1963-03-28',
  },
  {
    id: 340270,
    title: 'The Healer',
    releaseDate: '2017-02-17',
  },
  {
    id: 28571,
    title: 'The Heiress',
    releaseDate: '1949-10-06',
  },
  {
    id: 50014,
    title: 'The Help',
    releaseDate: '2011-08-09',
  },
  {
    id: 862557,
    title: 'The Hill',
    releaseDate: '2023-08-18',
  },
  {
    id: 24395,
    title: 'The Hill',
    releaseDate: '1965-06-11',
  },
  {
    id: 64353,
    title: 'The Hitch Hikers Guide to the Galaxy',
    releaseDate: '1981-02-09',
  },
  {
    id: 49051,
    title: 'The Hobbit: An Unexpected Journey',
    releaseDate: '2012-12-12',
  },
  {
    id: 122917,
    title: 'The Hobbit: The Battle of the Five Armies',
    releaseDate: '2014-12-10',
  },
  {
    id: 57158,
    title: 'The Hobbit: The Desolation of Smaug',
    releaseDate: '2013-12-11',
  },
  {
    id: 840430,
    title: 'The Holdovers',
    releaseDate: '2023-10-27',
  },
  {
    id: 1581,
    title: 'The Holiday',
    releaseDate: '2006-12-05',
  },
  {
    id: 27118,
    title: 'The Hound of the Baskervilles',
    releaseDate: '1939-03-24',
  },
  {
    id: 590,
    title: 'The Hours',
    releaseDate: '2002-12-27',
  },
  {
    id: 926899,
    title: 'The House',
    releaseDate: '2022-01-14',
  },
  {
    id: 398173,
    title: 'The House That Jack Built',
    releaseDate: '2018-10-04',
  },
  {
    id: 1368166,
    title: 'The Housemaid',
    releaseDate: '2025-12-18',
  },
  {
    id: 11934,
    title: 'The Hudsucker Proxy',
    releaseDate: '1994-03-11',
  },
  {
    id: 31685,
    title: 'The Hunchback of Notre Dame',
    releaseDate: '1939-08-31',
  },
  {
    id: 10545,
    title: 'The Hunchback of Notre Dame',
    releaseDate: '1996-06-21',
  },
  {
    id: 228194,
    title: 'The Hundred-Foot Journey',
    releaseDate: '2014-08-06',
  },
  {
    id: 70160,
    title: 'The Hunger Games',
    releaseDate: '2012-03-12',
  },
  {
    id: 101299,
    title: 'The Hunger Games: Catching Fire',
    releaseDate: '2013-11-15',
  },
  {
    id: 1669,
    title: 'The Hunt for Red October',
    releaseDate: '1990-03-02',
  },
  {
    id: 10400,
    title: 'The Hurricane',
    releaseDate: '1999-09-17',
  },
  {
    id: 12162,
    title: 'The Hurt Locker',
    releaseDate: '2008-10-10',
  },
  {
    id: 990,
    title: 'The Hustler',
    releaseDate: '1961-09-25',
  },
  {
    id: 843527,
    title: 'The Idea of You',
    releaseDate: '2024-05-02',
  },
  {
    id: 1491,
    title: 'The Illusionist',
    releaseDate: '2006-08-18',
  },
  {
    id: 205596,
    title: 'The Imitation Game',
    releaseDate: '2014-11-14',
  },
  {
    id: 47653,
    title: 'The Immigrant',
    releaseDate: '1917-06-17',
  },
  {
    id: 80278,
    title: 'The Impossible',
    releaseDate: '2012-09-09',
  },
  {
    id: 84287,
    title: 'The Imposter',
    releaseDate: '2012-07-13',
  },
  {
    id: 818750,
    title: 'The In Between',
    releaseDate: '2022-02-11',
  },
  {
    id: 31682,
    title: 'The Incredible Shrinking Man',
    releaseDate: '1957-02-22',
  },
  {
    id: 9806,
    title: 'The Incredibles',
    releaseDate: '2004-11-05',
  },
  {
    id: 16372,
    title: 'The Innocents',
    releaseDate: '1961-11-24',
  },
  {
    id: 9008,
    title: 'The Insider',
    releaseDate: '1999-10-28',
  },
  {
    id: 257211,
    title: 'The Intern',
    releaseDate: '2015-09-23',
  },
  {
    id: 250658,
    title: "The Internet's Own Boy: The Story of Aaron Swartz",
    releaseDate: '2014-06-27',
  },
  {
    id: 566228,
    title: 'The Inventor: Out for Blood in Silicon Valley',
    releaseDate: '2019-01-24',
  },
  {
    id: 570670,
    title: 'The Invisible Man',
    releaseDate: '2020-02-26',
  },
  {
    id: 10787,
    title: 'The Invisible Man',
    releaseDate: '1933-10-31',
  },
  {
    id: 398978,
    title: 'The Irishman',
    releaseDate: '2019-11-01',
  },
  {
    id: 850165,
    title: 'The Iron Claw',
    releaseDate: '2023-12-21',
  },
  {
    id: 10386,
    title: 'The Iron Giant',
    releaseDate: '1999-08-06',
  },
  {
    id: 133792,
    title: 'The Joker is Wild',
    releaseDate: '1957-09-26',
  },
  {
    id: 19931,
    title: 'The Joy Luck Club',
    releaseDate: '1993-09-08',
  },
  {
    id: 205587,
    title: 'The Judge',
    releaseDate: '2014-10-08',
  },
  {
    id: 9325,
    title: 'The Jungle Book',
    releaseDate: '1967-10-18',
  },
  {
    id: 1885,
    title: 'The Karate Kid',
    releaseDate: '1984-06-22',
  },
  {
    id: 10098,
    title: 'The Kid',
    releaseDate: '1921-01-21',
  },
  {
    id: 14638,
    title: 'The Killers',
    releaseDate: '1946-08-30',
  },
  {
    id: 247,
    title: 'The Killing',
    releaseDate: '1956-06-06',
  },
  {
    id: 625,
    title: 'The Killing Fields',
    releaseDate: '1984-11-23',
  },
  {
    id: 32040,
    title: 'The Killing of a Chinese Bookie',
    releaseDate: '1976-02-15',
  },
  {
    id: 399057,
    title: 'The Killing of a Sacred Deer',
    releaseDate: '2017-10-20',
  },
  {
    id: 504949,
    title: 'The King',
    releaseDate: '2019-10-11',
  },
  {
    id: 16520,
    title: 'The King and I',
    releaseDate: '1956-06-29',
  },
  {
    id: 262,
    title: 'The King of Comedy',
    releaseDate: '1982-12-18',
  },
  {
    id: 13958,
    title: 'The King of Kong: A Fistful of Quarters',
    releaseDate: '2007-03-25',
  },
  {
    id: 579583,
    title: 'The King of Staten Island',
    releaseDate: '2020-07-22',
  },
  {
    id: 245842,
    title: "The King's Daughter",
    releaseDate: '2022-01-21',
  },
  {
    id: 45269,
    title: "The King's Speech",
    releaseDate: '2010-11-26',
  },
  {
    id: 454983,
    title: 'The Kissing Booth',
    releaseDate: '2018-05-11',
  },
  {
    id: 583083,
    title: 'The Kissing Booth 2',
    releaseDate: '2020-07-24',
  },
  {
    id: 7979,
    title: 'The Kite Runner',
    releaseDate: '2007-12-14',
  },
  {
    id: 3086,
    title: 'The Lady Eve',
    releaseDate: '1941-02-25',
  },
  {
    id: 3766,
    title: 'The Lady from Shanghai',
    releaseDate: '1947-12-24',
  },
  {
    id: 940,
    title: 'The Lady Vanishes',
    releaseDate: '1938-10-07',
  },
  {
    id: 5506,
    title: 'The Ladykillers',
    releaseDate: '1955-12-08',
  },
  {
    id: 2044,
    title: 'The Lake House',
    releaseDate: '2006-06-16',
  },
  {
    id: 12144,
    title: 'The Land Before Time',
    releaseDate: '1988-11-18',
  },
  {
    id: 718867,
    title: 'The Larva Island Movie',
    releaseDate: '2020-07-23',
  },
  {
    id: 522039,
    title: 'The Last Black Man in San Francisco',
    releaseDate: '2019-06-07',
  },
  {
    id: 2100,
    title: 'The Last Castle',
    releaseDate: '2001-10-19',
  },
  {
    id: 14886,
    title: 'The Last Detail',
    releaseDate: '1973-12-11',
  },
  {
    id: 617653,
    title: 'The Last Duel',
    releaseDate: '2021-10-13',
  },
  {
    id: 746,
    title: 'The Last Emperor',
    releaseDate: '1987-10-04',
  },
  {
    id: 442065,
    title: 'The Last Full Measure',
    releaseDate: '2020-01-23',
  },
  {
    id: 1523,
    title: 'The Last King of Scotland',
    releaseDate: '2006-09-27',
  },
  {
    id: 948713,
    title: 'The Last Kingdom: Seven Kings Must Die',
    releaseDate: '2023-04-14',
  },
  {
    id: 638449,
    title: 'The Last Letter from Your Lover',
    releaseDate: '2021-07-23',
  },
  {
    id: 9361,
    title: 'The Last of the Mohicans',
    releaseDate: '1992-08-26',
  },
  {
    id: 25188,
    title: 'The Last Picture Show',
    releaseDate: '1971-10-03',
  },
  {
    id: 616,
    title: 'The Last Samurai',
    releaseDate: '2003-12-05',
  },
  {
    id: 35690,
    title: 'The Last Song',
    releaseDate: '2010-03-31',
  },
  {
    id: 11051,
    title: 'The Last Temptation of Christ',
    releaseDate: '1988-05-28',
  },
  {
    id: 10150,
    title: 'The Last Unicorn',
    releaseDate: '1982-11-19',
  },
  {
    id: 13963,
    title: 'The Last Waltz',
    releaseDate: '1978-04-26',
  },
  {
    id: 32961,
    title: 'The Lavender Hill Mob',
    releaseDate: '1951-06-28',
  },
  {
    id: 43650,
    title: 'The Legend of Sleepy Hollow',
    releaseDate: '1949-10-08',
  },
  {
    id: 324849,
    title: 'The Lego Batman Movie',
    releaseDate: '2017-02-08',
  },
  {
    id: 137106,
    title: 'The Lego Movie',
    releaseDate: '2014-02-06',
  },
  {
    id: 449749,
    title: 'The Leisure Seeker',
    releaseDate: '2018-01-03',
  },
  {
    id: 17801,
    title: 'The Letter',
    releaseDate: '1940-11-21',
  },
  {
    id: 25037,
    title: 'The Life and Death of Colonel Blimp',
    releaseDate: '1943-07-26',
  },
  {
    id: 421,
    title: 'The Life Aquatic with Steve Zissou',
    releaseDate: '2004-12-10',
  },
  {
    id: 1254786,
    title: 'The Life List',
    releaseDate: '2025-03-27',
  },
  {
    id: 842924,
    title: 'The Life of Chuck',
    releaseDate: '2025-06-05',
  },
  {
    id: 11615,
    title: 'The Life of David Gale',
    releaseDate: '2003-02-21',
  },
  {
    id: 283552,
    title: 'The Light Between Oceans',
    releaseDate: '2016-09-02',
  },
  {
    id: 503919,
    title: 'The Lighthouse',
    releaseDate: '2019-09-13',
  },
  {
    id: 50348,
    title: 'The Lincoln Lawyer',
    releaseDate: '2011-03-17',
  },
  {
    id: 18988,
    title: 'The Lion in Winter',
    releaseDate: '1968-08-20',
  },
  {
    id: 420818,
    title: 'The Lion King',
    releaseDate: '2019-07-12',
  },
  {
    id: 8587,
    title: 'The Lion King',
    releaseDate: '1994-06-15',
  },
  {
    id: 43802,
    title: 'The Little Foxes',
    releaseDate: '1941-08-29',
  },
  {
    id: 1010819,
    title: 'The Little Guy',
    releaseDate: '2022-08-10',
  },
  {
    id: 38580,
    title: 'The Little Matchgirl',
    releaseDate: '2006-09-07',
  },
  {
    id: 10144,
    title: 'The Little Mermaid',
    releaseDate: '1989-11-17',
  },
  {
    id: 309809,
    title: 'The Little Prince',
    releaseDate: '2015-07-29',
  },
  {
    id: 254320,
    title: 'The Lobster',
    releaseDate: '2015-10-15',
  },
  {
    id: 2760,
    title: 'The Lodger: A Story of the London Fog',
    releaseDate: '1927-02-14',
  },
  {
    id: 16103,
    title: 'The Loneliness of the Long Distance Runner',
    releaseDate: '1962-09-20',
  },
  {
    id: 14807,
    title: 'The Long Good Friday',
    releaseDate: '1980-11-01',
  },
  {
    id: 1847,
    title: 'The Long Goodbye',
    releaseDate: '1973-03-08',
  },
  {
    id: 51763,
    title: 'The Long Walk Home',
    releaseDate: '1990-12-21',
  },
  {
    id: 40085,
    title: 'The Long, Hot Summer',
    releaseDate: '1958-05-17',
  },
  {
    id: 9289,
    title: 'The Longest Day',
    releaseDate: '1962-09-25',
  },
  {
    id: 228205,
    title: 'The Longest Ride',
    releaseDate: '2015-04-09',
  },
  {
    id: 267480,
    title: 'The Look of Silence',
    releaseDate: '2014-11-13',
  },
  {
    id: 120,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    releaseDate: '2001-12-18',
  },
  {
    id: 122,
    title: 'The Lord of the Rings: The Return of the King',
    releaseDate: '2003-12-17',
  },
  {
    id: 121,
    title: 'The Lord of the Rings: The Two Towers',
    releaseDate: '2002-12-18',
  },
  {
    id: 1547,
    title: 'The Lost Boys',
    releaseDate: '1987-07-31',
  },
  {
    id: 1236470,
    title: 'The Lost Bus',
    releaseDate: '2025-09-19',
  },
  {
    id: 28580,
    title: 'The Lost Weekend',
    releaseDate: '1945-11-29',
  },
  {
    id: 410113,
    title: 'The Loud House Movie',
    releaseDate: '2021-08-20',
  },
  {
    id: 7980,
    title: 'The Lovely Bones',
    releaseDate: '2009-12-26',
  },
  {
    id: 77877,
    title: 'The Lucky One',
    releaseDate: '2012-04-19',
  },
  {
    id: 4553,
    title: 'The Machinist',
    releaseDate: '2004-09-24',
  },
  {
    id: 8094,
    title: 'The Magdalene Sisters',
    releaseDate: '2002-08-30',
  },
  {
    id: 965,
    title: 'The Magnificent Ambersons',
    releaseDate: '1942-07-10',
  },
  {
    id: 966,
    title: 'The Magnificent Seven',
    releaseDate: '1960-10-12',
  },
  {
    id: 124277,
    title: 'The Maker',
    releaseDate: '2011-06-23',
  },
  {
    id: 963,
    title: 'The Maltese Falcon',
    releaseDate: '1941-10-18',
  },
  {
    id: 13363,
    title: 'The Man from Earth',
    releaseDate: '2007-06-10',
  },
  {
    id: 18264,
    title: 'The Man from Laramie',
    releaseDate: '1955-08-19',
  },
  {
    id: 203801,
    title: 'The Man from U.N.C.L.E.',
    releaseDate: '2015-08-13',
  },
  {
    id: 17474,
    title: 'The Man in the Moon',
    releaseDate: '1991-09-30',
  },
  {
    id: 353326,
    title: 'The Man Who Knew Infinity',
    releaseDate: '2016-04-08',
  },
  {
    id: 574,
    title: 'The Man Who Knew Too Much',
    releaseDate: '1956-05-16',
  },
  {
    id: 27517,
    title: 'The Man Who Laughs',
    releaseDate: '1928-11-04',
  },
  {
    id: 11697,
    title: 'The Man Who Shot Liberty Valance',
    releaseDate: '1962-04-13',
  },
  {
    id: 10778,
    title: "The Man Who Wasn't There",
    releaseDate: '2001-10-26',
  },
  {
    id: 983,
    title: 'The Man Who Would Be King',
    releaseDate: '1975-12-03',
  },
  {
    id: 541,
    title: 'The Man with the Golden Arm',
    releaseDate: '1955-12-26',
  },
  {
    id: 982,
    title: 'The Manchurian Candidate',
    releaseDate: '1962-10-24',
  },
  {
    id: 250480,
    title: 'The Many Adventures of Winnie the Pooh',
    releaseDate: '1977-03-11',
  },
  {
    id: 672647,
    title: 'The Map of Tiny Perfect Things',
    releaseDate: '2021-02-12',
  },
  {
    id: 32093,
    title: 'The Mark of Zorro',
    releaseDate: '1940-11-08',
  },
  {
    id: 286217,
    title: 'The Martian',
    releaseDate: '2015-09-30',
  },
  {
    id: 68722,
    title: 'The Master',
    releaseDate: '2012-09-14',
  },
  {
    id: 603,
    title: 'The Matrix',
    releaseDate: '1999-03-31',
  },
  {
    id: 604,
    title: 'The Matrix Reloaded',
    releaseDate: '2003-05-15',
  },
  {
    id: 644583,
    title: 'The Mauritanian',
    releaseDate: '2021-02-12',
  },
  {
    id: 198663,
    title: 'The Maze Runner',
    releaseDate: '2014-09-10',
  },
  {
    id: 593643,
    title: 'The Menu',
    releaseDate: '2022-11-17',
  },
  {
    id: 26842,
    title: 'The Message',
    releaseDate: '1976-03-09',
  },
  {
    id: 9821,
    title: 'The Mighty',
    releaseDate: '1998-06-01',
  },
  {
    id: 799583,
    title: 'The Ministry of Ungentlemanly Warfare',
    releaseDate: '2024-04-18',
  },
  {
    id: 425373,
    title: 'The Miracle Season',
    releaseDate: '2018-04-13',
  },
  {
    id: 1162,
    title: 'The Miracle Worker',
    releaseDate: '1962-05-23',
  },
  {
    id: 11416,
    title: 'The Mission',
    releaseDate: '1986-09-06',
  },
  {
    id: 501929,
    title: 'The Mitchells vs. the Machines',
    releaseDate: '2021-04-22',
  },
  {
    id: 10437,
    title: 'The Muppet Christmas Carol',
    releaseDate: '1992-12-11',
  },
  {
    id: 11176,
    title: 'The Muppet Movie',
    releaseDate: '1979-06-22',
  },
  {
    id: 44892,
    title: 'The Music Box',
    releaseDate: '1932-04-16',
  },
  {
    id: 13671,
    title: 'The Music Man',
    releaseDate: '1962-06-19',
  },
  {
    id: 56401,
    title: 'The Music Never Stopped',
    releaseDate: '2011-03-18',
  },
  {
    id: 20482,
    title: 'The Naked City',
    releaseDate: '1948-03-04',
  },
  {
    id: 37136,
    title: 'The Naked Gun: From the Files of Police Squad!',
    releaseDate: '1988-12-02',
  },
  {
    id: 192,
    title: 'The Name of the Rose',
    releaseDate: '1986-09-24',
  },
  {
    id: 31713,
    title: 'The Narrow Margin',
    releaseDate: '1952-05-03',
  },
  {
    id: 32318,
    title: 'The Navigator',
    releaseDate: '1924-09-28',
  },
  {
    id: 9631,
    title: 'The Negotiator',
    releaseDate: '1998-07-29',
  },
  {
    id: 43539,
    title: 'The Next Three Days',
    releaseDate: '2010-11-18',
  },
  {
    id: 290250,
    title: 'The Nice Guys',
    releaseDate: '2016-05-15',
  },
  {
    id: 3112,
    title: 'The Night of the Hunter',
    releaseDate: '1955-07-26',
  },
  {
    id: 14703,
    title: 'The Night of the Iguana',
    releaseDate: '1964-08-06',
  },
  {
    id: 400090,
    title: 'The Nightingale',
    releaseDate: '2018-09-23',
  },
  {
    id: 9479,
    title: 'The Nightmare Before Christmas',
    releaseDate: '1993-10-09',
  },
  {
    id: 113833,
    title: 'The Normal Heart',
    releaseDate: '2014-05-25',
  },
  {
    id: 639933,
    title: 'The Northman',
    releaseDate: '2022-04-07',
  },
  {
    id: 11036,
    title: 'The Notebook',
    releaseDate: '2004-06-25',
  },
  {
    id: 27029,
    title: "The Nun's Story",
    releaseDate: '1959-06-18',
  },
  {
    id: 11356,
    title: 'The Odd Couple',
    releaseDate: '1968-05-16',
  },
  {
    id: 71864,
    title: 'The Odd Life of Timothy Green',
    releaseDate: '2012-08-15',
  },
  {
    id: 547016,
    title: 'The Old Guard',
    releaseDate: '2020-07-09',
  },
  {
    id: 72640,
    title: 'The Old Mill',
    releaseDate: '1937-11-05',
  },
  {
    id: 970348,
    title: 'The Old Oak',
    releaseDate: '2023-09-29',
  },
  {
    id: 794,
    title: 'The Omen',
    releaseDate: '1976-06-25',
  },
  {
    id: 508570,
    title: 'The One and Only Ivan',
    releaseDate: '2020-08-21',
  },
  {
    id: 1933,
    title: 'The Others',
    releaseDate: '2001-08-02',
  },
  {
    id: 799876,
    title: 'The Outfit',
    releaseDate: '2022-02-25',
  },
  {
    id: 10747,
    title: 'The Outlaw Josey Wales',
    releaseDate: '1976-06-30',
  },
  {
    id: 227,
    title: 'The Outsiders',
    releaseDate: '1983-03-25',
  },
  {
    id: 980,
    title: 'The Ox-Bow Incident',
    releaseDate: '1943-03-11',
  },
  {
    id: 14202,
    title: 'The Painted Veil',
    releaseDate: '2006-12-09',
  },
  {
    id: 19186,
    title: 'The Parent Trap',
    releaseDate: '1961-05-13',
  },
  {
    id: 9820,
    title: 'The Parent Trap',
    releaseDate: '1998-07-28',
  },
  {
    id: 10794,
    title: 'The Party',
    releaseDate: '1968-04-04',
  },
  {
    id: 615,
    title: 'The Passion of the Christ',
    releaseDate: '2004-02-25',
  },
  {
    id: 2024,
    title: 'The Patriot',
    releaseDate: '2000-06-28',
  },
  {
    id: 20540,
    title: 'The Pawnbroker',
    releaseDate: '1965-04-20',
  },
  {
    id: 463257,
    title: 'The Peanut Butter Falcon',
    releaseDate: '2019-08-09',
  },
  {
    id: 56601,
    title: 'The Perfect Game',
    releaseDate: '2009-11-09',
  },
  {
    id: 84892,
    title: 'The Perks of Being a Wallflower',
    releaseDate: '2012-09-20',
  },
  {
    id: 34283,
    title: "The Pervert's Guide to Cinema",
    releaseDate: '2006-10-06',
  },
  {
    id: 17030,
    title: 'The Petrified Forest',
    releaseDate: '1936-02-08',
  },
  {
    id: 9833,
    title: 'The Phantom of the Opera',
    releaseDate: '2004-12-08',
  },
  {
    id: 964,
    title: 'The Phantom of the Opera',
    releaseDate: '1925-06-29',
  },
  {
    id: 76115,
    title: 'The Phantom of the Opera at the Royal Albert Hall',
    releaseDate: '2011-09-27',
  },
  {
    id: 981,
    title: 'The Philadelphia Story',
    releaseDate: '1940-12-05',
  },
  {
    id: 169881,
    title: 'The Physician',
    releaseDate: '2013-12-25',
  },
  {
    id: 423,
    title: 'The Pianist',
    releaseDate: '2002-09-17',
  },
  {
    id: 713,
    title: 'The Piano',
    releaseDate: '1993-05-18',
  },
  {
    id: 16559,
    title: 'The Picture of Dorian Gray',
    releaseDate: '1945-03-03',
  },
  {
    id: 15302,
    title: 'The Pixar Story',
    releaseDate: '2007-08-28',
  },
  {
    id: 30060,
    title: 'The Plague Dogs',
    releaseDate: '1982-10-01',
  },
  {
    id: 10403,
    title: 'The Player',
    releaseDate: '1992-05-08',
  },
  {
    id: 551,
    title: 'The Poseidon Adventure',
    releaseDate: '1972-12-01',
  },
  {
    id: 446354,
    title: 'The Post',
    releaseDate: '2017-12-22',
  },
  {
    id: 25736,
    title: 'The Postman Always Rings Twice',
    releaseDate: '1946-05-02',
  },
  {
    id: 379779,
    title: 'The Present',
    releaseDate: '2014-04-22',
  },
  {
    id: 1124,
    title: 'The Prestige',
    releaseDate: '2006-10-17',
  },
  {
    id: 9837,
    title: 'The Prince of Egypt',
    releaseDate: '1998-12-16',
  },
  {
    id: 10198,
    title: 'The Princess and the Frog',
    releaseDate: '2009-12-08',
  },
  {
    id: 2493,
    title: 'The Princess Bride',
    releaseDate: '1987-09-25',
  },
  {
    id: 30197,
    title: 'The Producers',
    releaseDate: '1968-03-18',
  },
  {
    id: 22383,
    title: 'The Professionals',
    releaseDate: '1966-11-01',
  },
  {
    id: 411728,
    title: 'The Professor and the Madman',
    releaseDate: '2019-03-07',
  },
  {
    id: 18240,
    title: 'The Proposal',
    releaseDate: '2009-06-02',
  },
  {
    id: 16608,
    title: 'The Proposition',
    releaseDate: '2005-10-06',
  },
  {
    id: 17687,
    title: 'The Public Enemy',
    releaseDate: '1931-04-23',
  },
  {
    id: 10849,
    title: 'The Purple Rose of Cairo',
    releaseDate: '1985-03-01',
  },
  {
    id: 1402,
    title: 'The Pursuit of Happyness',
    releaseDate: '2006-12-14',
  },
  {
    id: 3109,
    title: 'The Quiet Man',
    releaseDate: '1952-07-21',
  },
  {
    id: 11975,
    title: 'The Rainmaker',
    releaseDate: '1997-11-18',
  },
  {
    id: 8055,
    title: 'The Reader',
    releaseDate: '2008-12-10',
  },
  {
    id: 366696,
    title: 'The Red Pill',
    releaseDate: '2016-10-14',
  },
  {
    id: 19542,
    title: 'The Red Shoes',
    releaseDate: '1948-09-06',
  },
  {
    id: 1018648,
    title: 'The Redeem Team',
    releaseDate: '2022-10-07',
  },
  {
    id: 1245,
    title: 'The Remains of the Day',
    releaseDate: '1993-11-05',
  },
  {
    id: 524348,
    title: 'The Report',
    releaseDate: '2019-09-12',
  },
  {
    id: 680058,
    title: 'The Rescue',
    releaseDate: '2021-10-08',
  },
  {
    id: 10925,
    title: 'The Return of the Living Dead',
    releaseDate: '1985-04-25',
  },
  {
    id: 281957,
    title: 'The Revenant',
    releaseDate: '2015-12-25',
  },
  {
    id: 453278,
    title: 'The Rider',
    releaseDate: '2018-03-28',
  },
  {
    id: 9549,
    title: 'The Right Stuff',
    releaseDate: '1983-10-20',
  },
  {
    id: 1306368,
    title: 'The Rip',
    releaseDate: '2026-01-13',
  },
  {
    id: 20766,
    title: 'The Road',
    releaseDate: '2009-11-25',
  },
  {
    id: 10501,
    title: 'The Road to El Dorado',
    releaseDate: '2000-03-31',
  },
  {
    id: 37698,
    title: 'The Roaring Twenties',
    releaseDate: '1939-10-28',
  },
  {
    id: 9802,
    title: 'The Rock',
    releaseDate: '1996-06-07',
  },
  {
    id: 36685,
    title: 'The Rocky Horror Picture Show',
    releaseDate: '1975-08-14',
  },
  {
    id: 25527,
    title: 'The Ron Clark Story',
    releaseDate: '2006-08-13',
  },
  {
    id: 9428,
    title: 'The Royal Tenenbaums',
    releaseDate: '2001-10-05',
  },
  {
    id: 5923,
    title: 'The Sand Pebbles',
    releaseDate: '1966-12-20',
  },
  {
    id: 11528,
    title: 'The Sandlot',
    releaseDate: '1993-04-07',
  },
  {
    id: 51357,
    title: 'The Scarecrow',
    releaseDate: '1920-11-07',
  },
  {
    id: 779782,
    title: 'The School for Good and Evil',
    releaseDate: '2022-10-19',
  },
  {
    id: 560057,
    title: 'The Sea Beast',
    releaseDate: '2022-06-24',
  },
  {
    id: 3114,
    title: 'The Searchers',
    releaseDate: '1956-05-16',
  },
  {
    id: 24358,
    title: 'The Second Renaissance Part I',
    releaseDate: '2003-02-04',
  },
  {
    id: 24362,
    title: 'The Second Renaissance Part II',
    releaseDate: '2003-05-05',
  },
  {
    id: 11236,
    title: 'The Secret Garden',
    releaseDate: '1993-08-13',
  },
  {
    id: 12837,
    title: 'The Secret Life of Bees',
    releaseDate: '2008-09-17',
  },
  {
    id: 116745,
    title: 'The Secret Life of Walter Mitty',
    releaseDate: '2013-12-18',
  },
  {
    id: 26963,
    title: 'The Secret of Kells',
    releaseDate: '2009-02-09',
  },
  {
    id: 11704,
    title: 'The Secret of NIMH',
    releaseDate: '1982-06-17',
  },
  {
    id: 283591,
    title: 'The Secret Scripture',
    releaseDate: '2017-03-23',
  },
  {
    id: 550231,
    title: 'The Secret: Dare to Dream',
    releaseDate: '2020-04-16',
  },
  {
    id: 194101,
    title: 'The Selfish Giant',
    releaseDate: '2013-10-25',
  },
  {
    id: 42987,
    title: 'The Servant',
    releaseDate: '1963-11-14',
  },
  {
    id: 17218,
    title: 'The Set-Up',
    releaseDate: '1949-03-29',
  },
  {
    id: 10653,
    title: 'The Seven Year Itch',
    releaseDate: '1955-06-03',
  },
  {
    id: 345938,
    title: 'The Shack',
    releaseDate: '2017-03-03',
  },
  {
    id: 399055,
    title: 'The Shape of Water',
    releaseDate: '2017-12-01',
  },
  {
    id: 278,
    title: 'The Shawshank Redemption',
    releaseDate: '1994-09-23',
  },
  {
    id: 694,
    title: 'The Shining',
    releaseDate: '1980-05-23',
  },
  {
    id: 12584,
    title: 'The Shootist',
    releaseDate: '1976-07-21',
  },
  {
    id: 20334,
    title: 'The Shop Around the Corner',
    releaseDate: '1940-01-12',
  },
  {
    id: 334517,
    title: 'The Siege of Jadotville',
    releaseDate: '2016-09-19',
  },
  {
    id: 274,
    title: 'The Silence of the Lambs',
    releaseDate: '1991-02-14',
  },
  {
    id: 35,
    title: 'The Simpsons Movie',
    releaseDate: '2007-07-25',
  },
  {
    id: 1061699,
    title: 'The Six Triple Eight',
    releaseDate: '2024-12-06',
  },
  {
    id: 745,
    title: 'The Sixth Sense',
    releaseDate: '1999-08-06',
  },
  {
    id: 88018,
    title: 'The Skeleton Dance',
    releaseDate: '1929-08-29',
  },
  {
    id: 13396,
    title: 'The Snowman',
    releaseDate: '1982-12-26',
  },
  {
    id: 656690,
    title: 'The Social Dilemma',
    releaseDate: '2020-01-26',
  },
  {
    id: 37799,
    title: 'The Social Network',
    releaseDate: '2010-10-01',
  },
  {
    id: 16211,
    title: 'The Sons of Katie Elder',
    releaseDate: '1965-06-23',
  },
  {
    id: 15121,
    title: 'The Sound of Music',
    releaseDate: '1965-03-29',
  },
  {
    id: 365942,
    title: 'The Space Between Us',
    releaseDate: '2017-01-26',
  },
  {
    id: 27452,
    title: 'The Spiral Staircase',
    releaseDate: '1946-01-26',
  },
  {
    id: 367544,
    title: 'The Spirit of Christmas',
    releaseDate: '2015-11-28',
  },
  {
    id: 400160,
    title: 'The SpongeBob Movie: Sponge on the Run',
    releaseDate: '2020-08-14',
  },
  {
    id: 11836,
    title: 'The SpongeBob SquarePants Movie',
    releaseDate: '2004-11-19',
  },
  {
    id: 13580,
    title: 'The Spy Who Came In from the Cold',
    releaseDate: '1965-12-16',
  },
  {
    id: 2056,
    title: 'The Station Agent',
    releaseDate: '2003-12-05',
  },
  {
    id: 9277,
    title: 'The Sting',
    releaseDate: '1973-12-25',
  },
  {
    id: 33409,
    title: 'The Stoning of Soraya M.',
    releaseDate: '2009-06-26',
  },
  {
    id: 404,
    title: 'The Straight Story',
    releaseDate: '1999-10-15',
  },
  {
    id: 27033,
    title: 'The Strange Love of Martha Ivers',
    releaseDate: '1946-08-19',
  },
  {
    id: 20246,
    title: 'The Stranger',
    releaseDate: '1946-06-02',
  },
  {
    id: 933260,
    title: 'The Substance',
    releaseDate: '2024-09-07',
  },
  {
    id: 436969,
    title: 'The Suicide Squad',
    releaseDate: '2021-07-28',
  },
  {
    id: 56831,
    title: 'The Sunset Limited',
    releaseDate: '2011-02-12',
  },
  {
    id: 502356,
    title: 'The Super Mario Bros. Movie',
    releaseDate: '2023-04-05',
  },
  {
    id: 33564,
    title: 'The Swimmer',
    releaseDate: '1968-08-09',
  },
  {
    id: 821881,
    title: 'The Swimmers',
    releaseDate: '2022-09-08',
  },
  {
    id: 9078,
    title: 'The Sword in the Stone',
    releaseDate: '1963-12-25',
  },
  {
    id: 8333,
    title: 'The Taking of Pelham One Two Three',
    releaseDate: '1974-10-02',
  },
  {
    id: 369523,
    title: 'The Tale',
    releaseDate: '2018-01-20',
  },
  {
    id: 1213,
    title: 'The Talented Mr. Ripley',
    releaseDate: '1999-12-25',
  },
  {
    id: 6844,
    title: 'The Ten Commandments',
    releaseDate: '1956-10-05',
  },
  {
    id: 594,
    title: 'The Terminal',
    releaseDate: '2004-06-17',
  },
  {
    id: 218,
    title: 'The Terminator',
    releaseDate: '1984-10-26',
  },
  {
    id: 30497,
    title: 'The Texas Chain Saw Massacre',
    releaseDate: '1974-10-11',
  },
  {
    id: 266856,
    title: 'The Theory of Everything',
    releaseDate: '2014-11-07',
  },
  {
    id: 28963,
    title: 'The Thief of Bagdad',
    releaseDate: '1924-03-18',
  },
  {
    id: 12232,
    title: 'The Thief of Bagdad',
    releaseDate: '1940-02-19',
  },
  {
    id: 14285,
    title: 'The Thin Blue Line',
    releaseDate: '1988-08-28',
  },
  {
    id: 3529,
    title: 'The Thin Man',
    releaseDate: '1934-05-25',
  },
  {
    id: 8741,
    title: 'The Thin Red Line',
    releaseDate: '1998-12-23',
  },
  {
    id: 1091,
    title: 'The Thing',
    releaseDate: '1982-06-25',
  },
  {
    id: 1092,
    title: 'The Third Man',
    releaseDate: '1949-08-31',
  },
  {
    id: 1090,
    title: 'The Thirteenth Floor',
    releaseDate: '1999-04-16',
  },
  {
    id: 8053,
    title: 'The Three Burials of Melquiades Estrada',
    releaseDate: '2005-11-17',
  },
  {
    id: 2134,
    title: 'The Time Machine',
    releaseDate: '1960-05-25',
  },
  {
    id: 588228,
    title: 'The Tomorrow War',
    releaseDate: '2021-09-03',
  },
  {
    id: 5919,
    title: 'The Towering Inferno',
    releaseDate: '1974-12-14',
  },
  {
    id: 23168,
    title: 'The Town',
    releaseDate: '2010-09-15',
  },
  {
    id: 3482,
    title: 'The Train',
    releaseDate: '1964-09-24',
  },
  {
    id: 1857,
    title: 'The Transformers: The Movie',
    releaseDate: '1986-08-08',
  },
  {
    id: 3090,
    title: 'The Treasure of the Sierra Madre',
    releaseDate: '1948-01-15',
  },
  {
    id: 556984,
    title: 'The Trial of the Chicago 7',
    releaseDate: '2020-09-25',
  },
  {
    id: 339065,
    title: 'The True Cost',
    releaseDate: '2015-05-29',
  },
  {
    id: 37165,
    title: 'The Truman Show',
    releaseDate: '1998-06-04',
  },
  {
    id: 551332,
    title: 'The Two Popes',
    releaseDate: '2019-11-27',
  },
  {
    id: 14624,
    title: 'The Ultimate Gift',
    releaseDate: '2007-03-09',
  },
  {
    id: 1007826,
    title: 'The Underdoggs',
    releaseDate: '2024-01-25',
  },
  {
    id: 645886,
    title: 'The Unforgivable',
    releaseDate: '2021-11-24',
  },
  {
    id: 27503,
    title: 'The Unknown',
    releaseDate: '1927-05-29',
  },
  {
    id: 117,
    title: 'The Untouchables',
    releaseDate: '1987-06-03',
  },
  {
    id: 440472,
    title: 'The Upside',
    releaseDate: '2019-01-10',
  },
  {
    id: 629,
    title: 'The Usual Suspects',
    releaseDate: '1995-07-19',
  },
  {
    id: 810171,
    title: 'The Valet',
    releaseDate: '2022-05-11',
  },
  {
    id: 42329,
    title: 'The Valley of Gwangi',
    releaseDate: '1969-06-11',
  },
  {
    id: 24226,
    title: 'The Verdict',
    releaseDate: '1982-12-08',
  },
  {
    id: 42661,
    title: 'The Vikings',
    releaseDate: '1958-06-11',
  },
  {
    id: 1443,
    title: 'The Virgin Suicides',
    releaseDate: '2000-04-21',
  },
  {
    id: 12473,
    title: 'The Visitor',
    releaseDate: '2008-02-21',
  },
  {
    id: 1018645,
    title: 'The Volcano: Rescue from Whakaari',
    releaseDate: '2022-11-03',
  },
  {
    id: 72570,
    title: 'The Vow',
    releaseDate: '2012-02-05',
  },
  {
    id: 26508,
    title: 'The War Game',
    releaseDate: '1966-04-13',
  },
  {
    id: 11474,
    title: 'The Warriors',
    releaseDate: '1979-02-01',
  },
  {
    id: 59468,
    title: 'The Way',
    releaseDate: '2010-09-10',
  },
  {
    id: 49009,
    title: 'The Way Back',
    releaseDate: '2010-11-22',
  },
  {
    id: 147773,
    title: 'The Way Way Back',
    releaseDate: '2013-06-06',
  },
  {
    id: 785084,
    title: 'The Whale',
    releaseDate: '2022-12-09',
  },
  {
    id: 16307,
    title: 'The Wicker Man',
    releaseDate: '1973-12-06',
  },
  {
    id: 340613,
    title: 'The Wife',
    releaseDate: '2018-08-02',
  },
  {
    id: 576,
    title: 'The Wild Bunch',
    releaseDate: '1969-06-19',
  },
  {
    id: 1184918,
    title: 'The Wild Robot',
    releaseDate: '2024-09-12',
  },
  {
    id: 560044,
    title: 'The Willoughbys',
    releaseDate: '2020-04-22',
  },
  {
    id: 1116,
    title: 'The Wind That Shakes the Barley',
    releaseDate: '2006-06-23',
  },
  {
    id: 666243,
    title: 'The Witcher: Nightmare of the Wolf',
    releaseDate: '2021-08-22',
  },
  {
    id: 630,
    title: 'The Wizard of Oz',
    releaseDate: '1939-08-15',
  },
  {
    id: 178682,
    title: 'The Wizards Return: Alex vs. Alex',
    releaseDate: '2013-06-01',
  },
  {
    id: 13666,
    title: 'The Wolf Man',
    releaseDate: '1941-12-09',
  },
  {
    id: 106646,
    title: 'The Wolf of Wall Street',
    releaseDate: '2013-12-25',
  },
  {
    id: 17136,
    title: 'The Woman in the Window',
    releaseDate: '1944-10-25',
  },
  {
    id: 724495,
    title: 'The Woman King',
    releaseDate: '2022-09-16',
  },
  {
    id: 22490,
    title: 'The Women',
    releaseDate: '1939-09-01',
  },
  {
    id: 923939,
    title: 'The Wonderful Story of Henry Sugar',
    releaseDate: '2023-09-20',
  },
  {
    id: 506281,
    title: 'The World to Come',
    releaseDate: '2021-02-12',
  },
  {
    id: 9912,
    title: "The World's Fastest Indian",
    releaseDate: '2005-10-12',
  },
  {
    id: 12163,
    title: 'The Wrestler',
    releaseDate: '2008-09-07',
  },
  {
    id: 22527,
    title: 'The Wrong Man',
    releaseDate: '1956-12-22',
  },
  {
    id: 531,
    title: 'The Wrong Trousers',
    releaseDate: '1993-12-17',
  },
  {
    id: 28415,
    title: 'The Yakuza',
    releaseDate: '1974-12-21',
  },
  {
    id: 13397,
    title: 'The Year Without a Santa Claus',
    releaseDate: '1974-12-10',
  },
  {
    id: 408159,
    title: 'The Young Offenders',
    releaseDate: '2016-09-16',
  },
  {
    id: 18320,
    title: 'The Young Victoria',
    releaseDate: '2009-03-04',
  },
  {
    id: 467244,
    title: 'The Zone of Interest',
    releaseDate: '2023-12-15',
  },
  {
    id: 289222,
    title: "The Zookeeper's Wife",
    releaseDate: '2017-03-24',
  },
  {
    id: 1541,
    title: 'Thelma & Louise',
    releaseDate: '1991-05-24',
  },
  {
    id: 375785,
    title: 'Then Came You',
    releaseDate: '2018-12-05',
  },
  {
    id: 7345,
    title: 'There Will Be Blood',
    releaseDate: '2007-12-26',
  },
  {
    id: 8337,
    title: 'They Live',
    releaseDate: '1988-11-04',
  },
  {
    id: 543580,
    title: 'They Shall Not Grow Old',
    releaseDate: '2018-11-09',
  },
  {
    id: 28145,
    title: "They Shoot Horses, Don't They?",
    releaseDate: '1969-12-10',
  },
  {
    id: 11524,
    title: 'Thief',
    releaseDate: '1981-03-27',
  },
  {
    id: 11973,
    title: 'Thirteen Days',
    releaseDate: '2000-12-25',
  },
  {
    id: 698948,
    title: 'Thirteen Lives',
    releaseDate: '2022-07-18',
  },
  {
    id: 352490,
    title: 'This Beautiful Fantastic',
    releaseDate: '2016-10-20',
  },
  {
    id: 8092,
    title: "This Boy's Life",
    releaseDate: '1993-04-09',
  },
  {
    id: 16070,
    title: 'This Film Is Not Yet Rated',
    releaseDate: '2006-01-25',
  },
  {
    id: 11798,
    title: 'This Is England',
    releaseDate: '2007-04-27',
  },
  {
    id: 13576,
    title: 'This Is It',
    releaseDate: '2009-10-28',
  },
  {
    id: 11031,
    title: 'This Is Spinal Tap',
    releaseDate: '1984-03-02',
  },
  {
    id: 284053,
    title: 'Thor: Ragnarok',
    releaseDate: '2017-10-02',
  },
  {
    id: 17835,
    title: 'Threads',
    releaseDate: '1985-08-06',
  },
  {
    id: 359940,
    title: 'Three Billboards Outside Ebbing, Missouri',
    releaseDate: '2017-12-01',
  },
  {
    id: 11963,
    title: 'Three Days of the Condor',
    releaseDate: '1975-09-24',
  },
  {
    id: 489988,
    title: 'Three Identical Strangers',
    releaseDate: '2018-06-29',
  },
  {
    id: 67661,
    title: 'Thru the Mirror',
    releaseDate: '1936-05-30',
  },
  {
    id: 986056,
    title: 'Thunderbolts*',
    releaseDate: '2025-04-30',
  },
  {
    id: 537116,
    title: 'tick, tick... BOOM!',
    releaseDate: '2021-11-11',
  },
  {
    id: 373072,
    title: 'Tickled',
    releaseDate: '2016-05-26',
  },
  {
    id: 854239,
    title: 'Till',
    releaseDate: '2022-10-14',
  },
  {
    id: 212063,
    title: "Tim's Vermeer",
    releaseDate: '2013-12-06',
  },
  {
    id: 297270,
    title: 'Tinker Bell and the Legend of the NeverBeast',
    releaseDate: '2014-12-12',
  },
  {
    id: 597,
    title: 'Titanic',
    releaseDate: '1997-12-18',
  },
  {
    id: 466282,
    title: "To All the Boys I've Loved Before",
    releaseDate: '2018-08-17',
  },
  {
    id: 614409,
    title: 'To All the Boys: Always and Forever',
    releaseDate: '2021-02-12',
  },
  {
    id: 198,
    title: 'To Be or Not to Be',
    releaseDate: '1942-03-06',
  },
  {
    id: 381,
    title: 'To Catch a Thief',
    releaseDate: '1955-08-03',
  },
  {
    id: 1149947,
    title: 'To End All War: Oppenheimer & the Atomic Bomb',
    releaseDate: '2023-07-09',
  },
  {
    id: 22584,
    title: 'To Have and Have Not',
    releaseDate: '1945-01-20',
  },
  {
    id: 595,
    title: 'To Kill a Mockingbird',
    releaseDate: '1962-12-20',
  },
  {
    id: 823147,
    title: 'To Leslie',
    releaseDate: '2022-10-07',
  },
  {
    id: 9846,
    title: 'To Live and Die in L.A.',
    releaseDate: '1985-11-01',
  },
  {
    id: 25934,
    title: 'To Sir, with Love',
    releaseDate: '1967-06-14',
  },
  {
    id: 401104,
    title: 'To the Bone',
    releaseDate: '2017-01-22',
  },
  {
    id: 9090,
    title: 'To Wong Foo, Thanks for Everything! Julie Newmar',
    releaseDate: '1995-09-08',
  },
  {
    id: 1242011,
    title: 'Together',
    releaseDate: '2025-07-28',
  },
  {
    id: 606856,
    title: 'Togo',
    releaseDate: '2019-12-20',
  },
  {
    id: 42246,
    title: 'Tom and Jerry: The Fast and the Furry',
    releaseDate: '2005-09-03',
  },
  {
    id: 11969,
    title: 'Tombstone',
    releaseDate: '1993-12-25',
  },
  {
    id: 9576,
    title: 'Tootsie',
    releaseDate: '1982-12-17',
  },
  {
    id: 744,
    title: 'Top Gun',
    releaseDate: '1986-05-16',
  },
  {
    id: 361743,
    title: 'Top Gun: Maverick',
    releaseDate: '2022-05-21',
  },
  {
    id: 3080,
    title: 'Top Hat',
    releaseDate: '1935-08-29',
  },
  {
    id: 8764,
    title: 'Top Secret!',
    releaseDate: '1984-06-22',
  },
  {
    id: 11165,
    title: 'Tora! Tora! Tora!',
    releaseDate: '1970-01-26',
  },
  {
    id: 861,
    title: 'Total Recall',
    releaseDate: '1990-06-01',
  },
  {
    id: 1480,
    title: 'Touch of Evil',
    releaseDate: '1958-03-30',
  },
  {
    id: 11194,
    title: 'Touching the Void',
    releaseDate: '2003-09-05',
  },
  {
    id: 381028,
    title: 'Tower',
    releaseDate: '2016-03-13',
  },
  {
    id: 862,
    title: 'Toy Story',
    releaseDate: '1995-11-22',
  },
  {
    id: 863,
    title: 'Toy Story 2',
    releaseDate: '1999-10-30',
  },
  {
    id: 10193,
    title: 'Toy Story 3',
    releaseDate: '2010-06-16',
  },
  {
    id: 301528,
    title: 'Toy Story 4',
    releaseDate: '2019-06-19',
  },
  {
    id: 213121,
    title: 'Toy Story of Terror!',
    releaseDate: '2013-10-16',
  },
  {
    id: 256835,
    title: 'Toy Story That Time Forgot',
    releaseDate: '2014-12-02',
  },
  {
    id: 1621,
    title: 'Trading Places',
    releaseDate: '1983-06-07',
  },
  {
    id: 1900,
    title: 'Traffic',
    releaseDate: '2000-12-27',
  },
  {
    id: 1241983,
    title: 'Train Dreams',
    releaseDate: '2025-11-05',
  },
  {
    id: 2034,
    title: 'Training Day',
    releaseDate: '2001-10-05',
  },
  {
    id: 229408,
    title: 'Training Wheels',
    releaseDate: '2013-12-10',
  },
  {
    id: 627,
    title: 'Trainspotting',
    releaseDate: '1996-02-23',
  },
  {
    id: 698687,
    title: 'Transformers One',
    releaseDate: '2024-09-11',
  },
  {
    id: 667538,
    title: 'Transformers: Rise of the Beasts',
    releaseDate: '2023-06-06',
  },
  {
    id: 206563,
    title: 'Trash',
    releaseDate: '2014-10-09',
  },
  {
    id: 9016,
    title: 'Treasure Planet',
    releaseDate: '2002-11-26',
  },
  {
    id: 481880,
    title: 'Trial by Fire',
    releaseDate: '2019-05-17',
  },
  {
    id: 497828,
    title: 'Triangle of Sadness',
    releaseDate: '2022-09-18',
  },
  {
    id: 1015724,
    title: 'Trick or Treat Scooby-Doo!',
    releaseDate: '2022-10-04',
  },
  {
    id: 730840,
    title: 'Trollhunters: Rise of the Titans',
    releaseDate: '2021-07-21',
  },
  {
    id: 901362,
    title: 'Trolls Band Together',
    releaseDate: '2023-10-12',
  },
  {
    id: 896221,
    title: 'Trolls Holiday in Harmony',
    releaseDate: '2021-11-26',
  },
  {
    id: 446893,
    title: 'Trolls World Tour',
    releaseDate: '2020-03-11',
  },
  {
    id: 195,
    title: 'Trouble in Paradise',
    releaseDate: '1932-10-30',
  },
  {
    id: 652,
    title: 'Troy',
    releaseDate: '2004-05-13',
  },
  {
    id: 44264,
    title: 'True Grit',
    releaseDate: '2010-12-22',
  },
  {
    id: 17529,
    title: 'True Grit',
    releaseDate: '1969-06-11',
  },
  {
    id: 36955,
    title: 'True Lies',
    releaseDate: '1994-07-15',
  },
  {
    id: 319,
    title: 'True Romance',
    releaseDate: '1993-09-09',
  },
  {
    id: 294016,
    title: 'Trumbo',
    releaseDate: '2015-10-27',
  },
  {
    id: 46838,
    title: 'Tucker and Dale vs. Evil',
    releaseDate: '2010-01-22',
  },
  {
    id: 21525,
    title: 'Tupac: Resurrection',
    releaseDate: '2003-11-14',
  },
  {
    id: 508947,
    title: 'Turning Red',
    releaseDate: '2022-03-10',
  },
  {
    id: 574451,
    title: 'Turtles All the Way Down',
    releaseDate: '2024-04-27',
  },
  {
    id: 34003,
    title: 'Turtles Forever',
    releaseDate: '2009-11-21',
  },
  {
    id: 63,
    title: 'Twelve Monkeys',
    releaseDate: '1995-01-05',
  },
  {
    id: 15497,
    title: "Twelve O'Clock High",
    releaseDate: '1949-12-21',
  },
  {
    id: 1923,
    title: 'Twin Peaks: Fire Walk with Me',
    releaseDate: '1992-06-03',
  },
  {
    id: 587562,
    title: 'Two by Two: Overboard!',
    releaseDate: '2020-09-24',
  },
  {
    id: 787428,
    title: 'Two Distant Strangers',
    releaseDate: '2020-11-20',
  },
  {
    id: 5767,
    title: 'Two for the Road',
    releaseDate: '1967-04-27',
  },
  {
    id: 76543,
    title: 'Tyrannosaur',
    releaseDate: '2011-10-07',
  },
  {
    id: 817758,
    title: 'TÁR',
    releaseDate: '2022-09-23',
  },
  {
    id: 829402,
    title: 'Ultraman: Rising',
    releaseDate: '2024-06-14',
  },
  {
    id: 9741,
    title: 'Unbreakable',
    releaseDate: '2000-11-22',
  },
  {
    id: 227306,
    title: 'Unbroken',
    releaseDate: '2014-12-25',
  },
  {
    id: 634544,
    title: 'Uncle Frank',
    releaseDate: '2020-11-25',
  },
  {
    id: 473033,
    title: 'Uncut Gems',
    releaseDate: '2019-08-30',
  },
  {
    id: 15255,
    title: 'Undisputed II: Last Man Standing',
    releaseDate: '2006-04-11',
  },
  {
    id: 38234,
    title: 'Undisputed III: Redemption',
    releaseDate: '2010-04-17',
  },
  {
    id: 33,
    title: 'Unforgiven',
    releaseDate: '1992-08-07',
  },
  {
    id: 9829,
    title: 'United 93',
    releaseDate: '2006-04-28',
  },
  {
    id: 14160,
    title: 'Up',
    releaseDate: '2009-05-28',
  },
  {
    id: 500664,
    title: 'Upgrade',
    releaseDate: '2018-05-31',
  },
  {
    id: 1014590,
    title: 'Upgraded',
    releaseDate: '2024-02-07',
  },
  {
    id: 671583,
    title: 'Upside-Down Magic',
    releaseDate: '2020-07-31',
  },
  {
    id: 779047,
    title: 'Us Again',
    releaseDate: '2021-03-03',
  },
  {
    id: 752,
    title: 'V for Vendetta',
    releaseDate: '2006-02-23',
  },
  {
    id: 653349,
    title: 'Vacation Friends',
    releaseDate: '2021-08-27',
  },
  {
    id: 834027,
    title: 'Val',
    releaseDate: '2021-07-23',
  },
  {
    id: 11951,
    title: 'Vanishing Point',
    releaseDate: '1971-01-15',
  },
  {
    id: 11109,
    title: 'Vera Drake',
    releaseDate: '2004-10-22',
  },
  {
    id: 426,
    title: 'Vertigo',
    releaseDate: '1958-05-09',
  },
  {
    id: 429197,
    title: 'Vice',
    releaseDate: '2018-12-25',
  },
  {
    id: 43028,
    title: 'Victim',
    releaseDate: '1961-08-01',
  },
  {
    id: 12614,
    title: 'Victor/Victoria',
    releaseDate: '1982-04-25',
  },
  {
    id: 837,
    title: 'Videodrome',
    releaseDate: '1983-02-04',
  },
  {
    id: 11773,
    title: 'Village of the Damned',
    releaseDate: '1960-06-16',
  },
  {
    id: 32085,
    title: 'Vincent',
    releaseDate: '1982-10-01',
  },
  {
    id: 899112,
    title: 'Violent Night',
    releaseDate: '2022-11-30',
  },
  {
    id: 263614,
    title: 'Virunga',
    releaseDate: '2014-11-07',
  },
  {
    id: 449406,
    title: 'Vivo',
    releaseDate: '2021-07-30',
  },
  {
    id: 21876,
    title: "Von Ryan's Express",
    releaseDate: '1965-06-23',
  },
  {
    id: 11206,
    title: 'Wait Until Dark',
    releaseDate: '1967-10-26',
  },
  {
    id: 26405,
    title: 'Wake in Fright',
    releaseDate: '1971-07-21',
  },
  {
    id: 812583,
    title: 'Wake Up Dead Man: A Knives Out Mystery',
    releaseDate: '2025-11-26',
  },
  {
    id: 9081,
    title: 'Waking Life',
    releaseDate: '2001-10-19',
  },
  {
    id: 10162,
    title: 'Waking Ned',
    releaseDate: '1998-11-20',
  },
  {
    id: 69,
    title: 'Walk the Line',
    releaseDate: '2005-09-13',
  },
  {
    id: 581420,
    title: 'Walk. Ride. Rodeo.',
    releaseDate: '2019-03-08',
  },
  {
    id: 36040,
    title: 'Walkabout',
    releaseDate: '1971-07-01',
  },
  {
    id: 10673,
    title: 'Wall Street',
    releaseDate: '1987-12-10',
  },
  {
    id: 533,
    title: 'Wallace & Gromit: The Curse of the Were-Rabbit',
    releaseDate: '2005-09-15',
  },
  {
    id: 929204,
    title: 'Wallace & Gromit: Vengeance Most Fowl',
    releaseDate: '2024-12-18',
  },
  {
    id: 10681,
    title: 'WALL·E',
    releaseDate: '2008-06-22',
  },
  {
    id: 281338,
    title: 'War for the Planet of the Apes',
    releaseDate: '2017-07-11',
  },
  {
    id: 57212,
    title: 'War Horse',
    releaseDate: '2011-12-25',
  },
  {
    id: 323272,
    title: 'War Room',
    releaseDate: '2015-08-28',
  },
  {
    id: 1241436,
    title: 'Warfare',
    releaseDate: '2025-04-09',
  },
  {
    id: 860,
    title: 'WarGames',
    releaseDate: '1983-06-03',
  },
  {
    id: 1076487,
    title: 'Warhorse One',
    releaseDate: '2023-06-30',
  },
  {
    id: 59440,
    title: 'Warrior',
    releaseDate: '2011-09-09',
  },
  {
    id: 13183,
    title: 'Watchmen',
    releaseDate: '2009-03-04',
  },
  {
    id: 1155058,
    title: 'Watchmen: Chapter I',
    releaseDate: '2024-08-12',
  },
  {
    id: 1299652,
    title: 'Watchmen: Chapter II',
    releaseDate: '2024-11-25',
  },
  {
    id: 33157,
    title: 'Waterloo',
    releaseDate: '1970-10-26',
  },
  {
    id: 43824,
    title: 'Waterloo Bridge',
    releaseDate: '1940-05-17',
  },
  {
    id: 11837,
    title: 'Watership Down',
    releaseDate: '1978-10-14',
  },
  {
    id: 533444,
    title: 'Waves',
    releaseDate: '2019-11-15',
  },
  {
    id: 25599,
    title: 'Way Out West',
    releaseDate: '1937-04-16',
  },
  {
    id: 97690,
    title: 'We Are Legion: The Story of the Hacktivists',
    releaseDate: '2012-01-20',
  },
  {
    id: 677638,
    title: 'We Bare Bears: The Movie',
    releaseDate: '2020-06-30',
  },
  {
    id: 1100099,
    title: 'We Live in Time',
    releaseDate: '2024-10-10',
  },
  {
    id: 71859,
    title: 'We Need to Talk About Kevin',
    releaseDate: '2011-09-28',
  },
  {
    id: 10590,
    title: 'We Were Soldiers',
    releaseDate: '2002-03-01',
  },
  {
    id: 5996,
    title: "We're No Angels",
    releaseDate: '1955-07-07',
  },
  {
    id: 1078605,
    title: 'Weapons',
    releaseDate: '2025-08-04',
  },
  {
    id: 79120,
    title: 'Weekend',
    releaseDate: '2011-10-23',
  },
  {
    id: 376261,
    title: 'Weiner',
    releaseDate: '2016-05-20',
  },
  {
    id: 11446,
    title: 'Welcome to the Dollhouse',
    releaseDate: '1996-03-22',
  },
  {
    id: 84351,
    title: 'West of Memphis',
    releaseDate: '2012-11-22',
  },
  {
    id: 1725,
    title: 'West Side Story',
    releaseDate: '1961-12-13',
  },
  {
    id: 1088,
    title: 'Whale Rider',
    releaseDate: '2003-01-30',
  },
  {
    id: 12159,
    title: 'What Dreams May Come',
    releaseDate: '1998-10-02',
  },
  {
    id: 10242,
    title: 'What Ever Happened to Baby Jane?',
    releaseDate: '1962-10-31',
  },
  {
    id: 406990,
    title: 'What Happened to Monday',
    releaseDate: '2017-08-18',
  },
  {
    id: 318044,
    title: 'What Happened, Miss Simone?',
    releaseDate: '2015-01-22',
  },
  {
    id: 127373,
    title: 'What Maisie Knew',
    releaseDate: '2013-05-02',
  },
  {
    id: 246741,
    title: 'What We Do in the Shadows',
    releaseDate: '2014-06-19',
  },
  {
    id: 1587,
    title: "What's Eating Gilbert Grape",
    releaseDate: '1993-12-17',
  },
  {
    id: 15765,
    title: "What's Love Got to Do with It",
    releaseDate: '1993-06-09',
  },
  {
    id: 53217,
    title: "What's Opera, Doc?",
    releaseDate: '1957-07-06',
  },
  {
    id: 6949,
    title: "What's Up, Doc?",
    releaseDate: '1972-03-09',
  },
  {
    id: 19265,
    title: 'Whatever Works',
    releaseDate: '2009-06-19',
  },
  {
    id: 639,
    title: 'When Harry Met Sally...',
    releaseDate: '1989-07-12',
  },
  {
    id: 10857,
    title: 'When the Wind Blows',
    releaseDate: '1986-10-24',
  },
  {
    id: 10548,
    title: 'When We Were Kings',
    releaseDate: '1996-10-25',
  },
  {
    id: 37659,
    title: "When You're Strange",
    releaseDate: '2010-04-09',
  },
  {
    id: 11046,
    title: 'Where Eagles Dare',
    releaseDate: '1968-12-04',
  },
  {
    id: 426618,
    title: 'Where Hands Touch',
    releaseDate: '2018-09-14',
  },
  {
    id: 682507,
    title: 'Where the Crawdads Sing',
    releaseDate: '2022-07-14',
  },
  {
    id: 10564,
    title: 'Where the Heart Is',
    releaseDate: '2000-04-27',
  },
  {
    id: 17221,
    title: 'Where the Sidewalk Ends',
    releaseDate: '1950-07-07',
  },
  {
    id: 352208,
    title: 'Where to Invade Next',
    releaseDate: '2015-12-23',
  },
  {
    id: 2064,
    title: 'While You Were Sleeping',
    releaseDate: '1995-04-21',
  },
  {
    id: 367412,
    title: 'Whiplash',
    releaseDate: '2013-01-18',
  },
  {
    id: 244786,
    title: 'Whiplash',
    releaseDate: '2014-10-10',
  },
  {
    id: 779816,
    title: 'White Bird',
    releaseDate: '2023-10-25',
  },
  {
    id: 13368,
    title: 'White Christmas',
    releaseDate: '1954-10-14',
  },
  {
    id: 15794,
    title: 'White Heat',
    releaseDate: '1949-09-02',
  },
  {
    id: 10994,
    title: 'White Oleander',
    releaseDate: '2002-10-11',
  },
  {
    id: 507256,
    title: 'Whitney',
    releaseDate: '2018-07-05',
  },
  {
    id: 696157,
    title: 'Whitney Houston: I Wanna Dance with Somebody',
    releaseDate: '2022-12-20',
  },
  {
    id: 856,
    title: 'Who Framed Roger Rabbit',
    releaseDate: '1988-06-22',
  },
  {
    id: 13508,
    title: 'Who Killed the Electric Car?',
    releaseDate: '2006-08-04',
  },
  {
    id: 396,
    title: "Who's Afraid of Virginia Woolf?",
    releaseDate: '1966-06-22',
  },
  {
    id: 228970,
    title: 'Wild',
    releaseDate: '2014-12-05',
  },
  {
    id: 483,
    title: 'Wild at Heart',
    releaseDate: '1990-08-17',
  },
  {
    id: 847,
    title: 'Willow',
    releaseDate: '1988-05-20',
  },
  {
    id: 252,
    title: 'Willy Wonka & the Chocolate Factory',
    releaseDate: '1971-06-29',
  },
  {
    id: 14551,
    title: "Winchester '73",
    releaseDate: '1950-07-12',
  },
  {
    id: 574091,
    title: 'Wind',
    releaseDate: '2019-12-13',
  },
  {
    id: 395834,
    title: 'Wind River',
    releaseDate: '2017-08-03',
  },
  {
    id: 28966,
    title: 'Wings',
    releaseDate: '1927-08-12',
  },
  {
    id: 355020,
    title: "Winter on Fire: Ukraine's Fight for Freedom",
    releaseDate: '2015-09-03',
  },
  {
    id: 1059073,
    title: 'Winter Spring Summer or Fall',
    releaseDate: '2024-12-27',
  },
  {
    id: 550205,
    title: 'Wish Dragon',
    releaseDate: '2021-01-15',
  },
  {
    id: 13446,
    title: 'Withnail & I',
    releaseDate: '1987-06-19',
  },
  {
    id: 9281,
    title: 'Witness',
    releaseDate: '1985-02-08',
  },
  {
    id: 37257,
    title: 'Witness for the Prosecution',
    releaseDate: '1957-12-17',
  },
  {
    id: 26736,
    title: 'Wizards of Waverly Place: The Movie',
    releaseDate: '2009-08-28',
  },
  {
    id: 441130,
    title: 'Wolfwalkers',
    releaseDate: '2020-10-26',
  },
  {
    id: 304357,
    title: 'Woman in Gold',
    releaseDate: '2015-03-20',
  },
  {
    id: 490003,
    title: "Won't You Be My Neighbor?",
    releaseDate: '2018-06-29',
  },
  {
    id: 406997,
    title: 'Wonder',
    releaseDate: '2017-11-13',
  },
  {
    id: 297762,
    title: 'Wonder Woman',
    releaseDate: '2017-05-30',
  },
  {
    id: 15359,
    title: 'Wonder Woman',
    releaseDate: '2009-03-03',
  },
  {
    id: 787699,
    title: 'Wonka',
    releaseDate: '2023-12-06',
  },
  {
    id: 9459,
    title: 'Woodstock',
    releaseDate: '1970-03-26',
  },
  {
    id: 523781,
    title: 'Words on Bathroom Walls',
    releaseDate: '2020-08-21',
  },
  {
    id: 612706,
    title: 'Work It',
    releaseDate: '2020-08-07',
  },
  {
    id: 303867,
    title: 'World of Tomorrow',
    releaseDate: '2015-01-22',
  },
  {
    id: 637649,
    title: 'Wrath of Man',
    releaseDate: '2021-04-22',
  },
  {
    id: 82690,
    title: 'Wreck-It Ralph',
    releaseDate: '2012-11-01',
  },
  {
    id: 3084,
    title: 'Wuthering Heights',
    releaseDate: '1939-04-07',
  },
  {
    id: 36657,
    title: 'X-Men',
    releaseDate: '2000-07-13',
  },
  {
    id: 127585,
    title: 'X-Men: Days of Future Past',
    releaseDate: '2014-05-15',
  },
  {
    id: 49538,
    title: 'X-Men: First Class',
    releaseDate: '2011-06-01',
  },
  {
    id: 36658,
    title: 'X2',
    releaseDate: '2003-04-27',
  },
  {
    id: 3087,
    title: 'Yankee Doodle Dandy',
    releaseDate: '1942-05-29',
  },
  {
    id: 12105,
    title: 'Yellow Submarine',
    releaseDate: '1968-07-17',
  },
  {
    id: 34106,
    title: "You Can't Take It with You",
    releaseDate: '1938-09-01',
  },
  {
    id: 36950,
    title: "You Don't Know Jack",
    releaseDate: '2010-06-27',
  },
  {
    id: 52758,
    title: 'You Only Live Once',
    releaseDate: '1937-01-23',
  },
  {
    id: 290542,
    title: "You're Not You",
    releaseDate: '2014-10-10',
  },
  {
    id: 3034,
    title: 'Young Frankenstein',
    releaseDate: '1974-12-15',
  },
  {
    id: 43838,
    title: 'Young Mr. Lincoln',
    releaseDate: '1939-06-09',
  },
  {
    id: 774531,
    title: 'Young Woman and the Sea',
    releaseDate: '2024-05-31',
  },
  {
    id: 483980,
    title: 'Z-O-M-B-I-E-S',
    releaseDate: '2018-02-16',
  },
  {
    id: 599521,
    title: 'Z-O-M-B-I-E-S 2',
    releaseDate: '2020-06-13',
  },
  {
    id: 809107,
    title: 'Z-O-M-B-I-E-S 3',
    releaseDate: '2022-07-09',
  },
  {
    id: 2998,
    title: 'Zabriskie Point',
    releaseDate: '1970-03-26',
  },
  {
    id: 791373,
    title: "Zack Snyder's Justice League",
    releaseDate: '2021-03-18',
  },
  {
    id: 13180,
    title: 'Zeitgeist: Addendum',
    releaseDate: '2008-10-02',
  },
  {
    id: 54293,
    title: 'Zeitgeist: Moving Forward',
    releaseDate: '2011-01-15',
  },
  {
    id: 11030,
    title: 'Zelig',
    releaseDate: '1983-07-15',
  },
  {
    id: 380808,
    title: 'Zero Days',
    releaseDate: '2016-07-08',
  },
  {
    id: 1949,
    title: 'Zodiac',
    releaseDate: '2007-03-02',
  },
  {
    id: 19908,
    title: 'Zombieland',
    releaseDate: '2009-10-02',
  },
  {
    id: 269149,
    title: 'Zootopia',
    releaseDate: '2016-02-11',
  },
  {
    id: 1084242,
    title: 'Zootopia 2',
    releaseDate: '2025-11-26',
  },
  {
    id: 14433,
    title: 'Zulu',
    releaseDate: '1964-01-22',
  },
  {
    id: 464111,
    title: 'Zygote',
    releaseDate: '2017-07-12',
  },
  {
    id: 1181678,
    title: '¿Quieres ser mi hijo?',
    releaseDate: '2023-09-21',
  },
  {
    id: 671318,
    title: '¿Y Cómo Es Él?',
    releaseDate: '2022-04-07',
  },
];

export default movies;
