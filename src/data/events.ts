import type { HistoricalEvent } from '@/types/event'

export const events = [
  {
    id: 'first-mention-hattorf',
    title: {
      en: 'First Mention of Hattorf',
      de: 'Erste Erwähnung von Hattorf',
      ru: 'Первое упоминание Хатторфа',
    },
    description: {
      en: 'Emperor Otto I granted a charter donating a third of the village ("tertiam partem villae Hattorpp") to the Pöhlde Monastery. The document is considered a 12th-century forgery, likely created to fend off territorial claims.',
      de: 'Kaiser Otto I. erteilte eine Urkunde über die Schenkung eines Drittels des Dorfes („tertiam partem villae Hattorpp") an das Kloster Pöhlde. Das Dokument gilt als Fälschung des 12. Jahrhunderts.',
      ru: 'Император Оттон I выдал грамоту о дарении трети деревни («tertiam partem villae Hattorpp») монастырю Пёльде. Документ считается подделкой XII века, созданной для отклонения территориальных претензий.',
    },
    date: '952',
    relatedPlaceIds: ['hattorf', 'kloster-poehlde'],
    relatedPersonIds: [],
  },
  {
    id: 'herren-von-hattorf',
    title: {
      en: 'Knights von Hattorf Build the Wasserburg',
      de: 'Die Herren von Hattorf errichten die Wasserburg',
      ru: 'Рыцари фон Хатторф строят Вассербург',
    },
    description: {
      en: 'The Herren von Hattorf appeared in records and built a Wasserburg (lowland castle). The village lived under their protection. The Schwachheim ancestors may have already been living on this land.',
      de: 'Die Herren von Hattorf erschienen in den Aufzeichnungen und errichteten eine Wasserburg. Das Dorf lebte unter ihrem Schutz. Die Vorfahren der Schwachheims lebten möglicherweise bereits auf diesem Land.',
      ru: 'Рыцари фон Хатторф появились в хрониках и построили низинный замок (Вассербург). Деревня жила под их защитой. Предки Швахгеймов, возможно, уже жили на этой земле.',
    },
    date: '1241',
    relatedPlaceIds: ['hattorf'],
    relatedPersonIds: [],
  },
  {
    id: 'reformation-1568',
    title: {
      en: 'Reformation Established in the Region',
      de: 'Reformation in der Region eingeführt',
      ru: 'Утверждение Реформации в регионе',
    },
    description: {
      en: 'Duke Julius of Braunschweig-Wolfenbüttel officially established Lutheranism as the sole religion in his lands. The transition was top-down but thorough, without the bloody religious violence seen in southern Germany.',
      de: 'Herzog Julius von Braunschweig-Wolfenbüttel führte das Luthertum offiziell als einzige Religion in seinen Landen ein. Der Übergang verlief von oben nach unten, aber gründlich, ohne die blutigen religiösen Konflikte Süddeutschlands.',
      ru: 'Герцог Юлий Брауншвейг-Вольфенбюттельский официально закрепил лютеранство как единственную религию в своих землях. Переход прошёл «сверху вниз», но очень основательно, без кровавых религиозных столкновений, как на юге Германии.',
    },
    date: '1568',
    relatedPlaceIds: ['hattorf', 'osterode', 'herzberg'],
    relatedPersonIds: ['duke-julius'],
  },
  {
    id: 'siege-of-braunschweig',
    title: {
      en: 'Siege of Braunschweig',
      de: 'Belagerung von Braunschweig',
      ru: 'Осада Брауншвейга',
    },
    description: {
      en: 'Duke Friedrich Ulrich besieged the wealthy Hanseatic city of Braunschweig, demanding taxes. He dammed the Oker river to flood the city, but Braunschweig resisted with help from other Hanseatic cities and Dutch forces. Hans Schwachheim, aged 17, was killed at Rottenburg during the siege. His father rode 75 km to be with him. The siege ended in December with the Duke\'s humiliating retreat.',
      de: 'Herzog Friedrich Ulrich belagerte die reiche Hansestadt Braunschweig und forderte Steuern. Er staute die Oker, um die Stadt zu fluten, aber Braunschweig widerstand mit Hilfe anderer Hansestädte und niederländischer Truppen. Hans Schwachheim, 17 Jahre alt, wurde bei Rottenburg getötet. Sein Vater ritt 75 km zu ihm. Die Belagerung endete im Dezember mit dem schmachvollen Rückzug des Herzogs.',
      ru: 'Герцог Фридрих Ульрих осадил богатый ганзейский город Брауншвейг, требуя налогов. Он построил плотины на реке Окер, чтобы затопить город, но Брауншвейг оборонялся при помощи других ганзейских городов и голландских войск. Ганс Швахгейм, 17 лет, погиб у Роттенбурга. Его отец проехал 75 км, чтобы быть с ним. Осада закончилась в декабре позорным отступлением герцога.',
    },
    date: '1615',
    relatedPlaceIds: ['braunschweig', 'rottenburg', 'hattorf'],
    relatedPersonIds: ['hans-schwachheim', 'jacob-schwachheim', 'duke-friedrich-ulrich'],
  },
  {
    id: 'thirty-years-war',
    title: {
      en: 'Thirty Years\' War',
      de: 'Dreißigjähriger Krieg',
      ru: 'Тридцатилетняя война',
    },
    description: {
      en: 'The devastating war that ravaged Europe. Through Hattorf marched armies of Tilly, Wallenstein, Swedes, and the feared Lisowczycy — Polish-Lithuanian light cavalry whom Germans called "Horsemen of the Apocalypse."',
      de: 'Der verheerende Krieg, der Europa verwüstete. Durch Hattorf marschierten die Armeen von Tilly, Wallenstein, Schweden und die gefürchteten Lisowczycy — polnisch-litauische leichte Kavallerie, die die Deutschen „Reiter der Apokalypse" nannten.',
      ru: 'Разрушительная война, опустошившая Европу. Через Хатторф маршировали армии Тилли, Валленштейна, шведы и наводившие ужас Лисовчики — польско-литовская лёгкая кавалерия, которую немцы называли «Всадниками Апокалипсиса».',
    },
    date: '1618',
    endDate: '1648',
    relatedPlaceIds: ['hattorf'],
    relatedPersonIds: [],
  },
  {
    id: 'fire-of-hattorf',
    title: {
      en: 'Fire of Hattorf',
      de: 'Brand von Hattorf',
      ru: 'Пожар Хатторфа',
    },
    description: {
      en: 'Soldiers ("Croats" of General Tilly) set fire to Hattorf during the Thirty Years\' War. The church, school, parsonage, and 14 houses burned. Pastor Johannes Buhlenus rushed into the burning parsonage and rescued the church books — still bearing scorch marks today.',
      de: 'Soldaten („Kroaten" des Generals Tilly) setzten Hattorf während des Dreißigjährigen Krieges in Brand. Kirche, Schule, Pfarrhaus und 14 Häuser brannten ab. Pastor Johannes Buhlenus stürzte in das brennende Pfarrhaus und rettete die Kirchenbücher — die noch heute Brandspuren tragen.',
      ru: 'Солдаты («кроаты» генерала Тилли) подожгли Хатторф во время Тридцатилетней войны. Сгорели церковь, школа, дом пастора и 14 домов. Пастор Йоханнес Буленус бросился в горящий дом и спас церковные книги — на оригиналах до сих пор видны следы огня.',
    },
    date: '1623-06-18',
    relatedPlaceIds: ['hattorf', 'st-pancras-church'],
    relatedPersonIds: ['johannes-buhlenus'],
  },
  {
    id: 'battle-of-lutter',
    title: {
      en: 'Battle of Lutter am Barenberge',
      de: 'Schlacht bei Lutter am Barenberge',
      ru: 'Битва при Луттере',
    },
    description: {
      en: 'One of the bloodiest battles of the Thirty Years\' War, fought 25 km from Hattorf. After the imperial army\'s victory, thousands of soldiers flooded the region, bringing plague. In Osterode alone, 358 people died in September 1626, and 1,200 in total — a third of the city\'s population. Jakob Schwachheim the Elder likely died from this plague three months later.',
      de: 'Eine der blutigsten Schlachten des Dreißigjährigen Krieges, 25 km von Hattorf entfernt. Nach dem Sieg der kaiserlichen Armee überfluteten tausende Soldaten die Region und brachten die Pest. Allein in Osterode starben im September 1626 358 Menschen, insgesamt 1.200 — ein Drittel der Stadtbevölkerung. Jakob Schwachheim der Ältere starb wahrscheinlich drei Monate später an dieser Pest.',
      ru: 'Одно из самых кровопролитных сражений Тридцатилетней войны, в 25 км от Хатторфа. После победы имперской армии тысячи солдат хлынули в регион, принеся чуму. Только в Остероде в сентябре 1626 года умерло 358 человек, всего за год — 1200, треть населения города. Якоб Швахгейм-старший, вероятно, умер от этой чумы три месяца спустя.',
    },
    date: '1626-08-27',
    relatedPlaceIds: ['lutter-am-barenberge', 'hattorf', 'osterode'],
    relatedPersonIds: ['jakob-sr-schwachheim'],
  },
  {
    id: 'andreas-becomes-pastor',
    title: {
      en: 'Andreas Becomes Pastor of Hattorf',
      de: 'Andreas wird Pastor von Hattorf',
      ru: 'Андреас становится пастором Хатторфа',
    },
    description: {
      en: 'The elderly pastor Andreas Schmiedekind invited Andreas Schwachheim as his adjunct. After Schmiedekind\'s death, Andreas became the full pastor of his home village, serving for over 50 years.',
      de: 'Der betagte Pastor Andreas Schmiedekind lud Andreas Schwachheim als seinen Adjunkten ein. Nach Schmiedekinds Tod wurde Andreas Vollpastor seines Heimatdorfes und diente über 50 Jahre.',
      ru: 'Пожилой пастор Андреас Шмидекинд пригласил Андреаса Швахгейма себе в помощники. После смерти Шмидекинда Андреас стал полноправным пастором родной деревни, прослужив более 50 лет.',
    },
    date: '1640',
    relatedPlaceIds: ['hattorf', 'st-pancras-church'],
    relatedPersonIds: ['andreas-schwachheim', 'andreas-schmiedekind'],
  },
  {
    id: 'bastian-leases-herzberg-mill',
    title: {
      en: 'Bastian Leases the Herzberg Mill',
      de: 'Bastian pachtet die Herzberger Mühle',
      ru: 'Бастиан арендует мельницу в Херцберге',
    },
    description: {
      en: 'Bastian Schwachheim began leasing the Lower Mill in Herzberg, later moving up to the prestigious Ducal Upper Mill, which served the castle and garrison. His marriage to the Obervogt\'s daughter likely helped secure the promotion.',
      de: 'Bastian Schwachheim begann, die Untermühle in Herzberg zu pachten und stieg später zur prestigeträchtigen Herrschaftlichen Obermühle auf, die Schloss und Garnison versorgte. Seine Heirat mit der Tochter des Obervogts half wahrscheinlich beim Aufstieg.',
      ru: 'Бастиан Швахгейм начал арендовать Нижнюю мельницу в Херцберге, затем перейдя к престижной Княжеской Верхней мельнице, обслуживавшей замок и гарнизон. Брак с дочерью оберфогта, вероятно, помог получить повышение.',
    },
    date: '1650',
    relatedPlaceIds: ['herzberg', 'schloss-herzberg'],
    relatedPersonIds: ['bastian-schwachheim', 'anna-christina-kruger', 'burchard-kruger'],
  },
  {
    id: 'andreas-funeral-sermon',
    title: {
      en: 'Funeral of Andreas Schwachheim',
      de: 'Beerdigung von Andreas Schwachheim',
      ru: 'Похороны Андреаса Швахгейма',
    },
    description: {
      en: 'Superintendent Christian Friedrich Knorr of Osterode delivered a printed funeral sermon (Leichenpredigt) for Andreas, describing him as a "lover of books and researcher of history" who suffered from insomnia for the last 30 years of his life.',
      de: 'Superintendent Christian Friedrich Knorr aus Osterode hielt eine gedruckte Leichenpredigt für Andreas und beschrieb ihn als „Bücherliebhaber und Geschichtsforscher", der die letzten 30 Jahre seines Lebens an Schlaflosigkeit litt.',
      ru: 'Суперинтендант Кристиан Фридрих Кнорр из Остероде произнёс печатную погребальную проповедь (Leichenpredigt), описав Андреаса как «любителя книг и исследователя истории», страдавшего бессонницей последние 30 лет жизни.',
    },
    date: '1691-12-31',
    relatedPlaceIds: ['hattorf', 'st-pancras-church', 'osterode'],
    relatedPersonIds: ['andreas-schwachheim', 'superintendent-knorr'],
  },
] as const satisfies readonly HistoricalEvent[]
