import type { GlossaryEntry } from '@/types/glossary'

export const glossary = [
  // ── Church Records ────────────────────────────────────────────────
  {
    id: 'kirchenbuch',
    term: {
      en: 'Kirchenbuch',
      de: 'Kirchenbuch',
      ru: 'Кирхенбух',
    },
    definition: {
      en: 'Parish register. Books kept by pastors recording baptisms, marriages, and deaths. The Hattorf church books were rescued from the 1623 fire by Pastor Buhlenus and later transcribed by Pastor Soltmann.',
      de: 'Kirchliche Personenstandsbücher. Von Pastoren geführte Bücher über Taufen, Ehen und Todesfälle. Die Hattorfer Kirchenbücher wurden 1623 von Pastor Buhlenus aus dem Feuer gerettet und später von Pastor Soltmann abgeschrieben.',
      ru: 'Церковная книга. Записи пасторов о крещениях, браках и смертях прихожан. Хатторфские книги были спасены из огня пастором Буленусом в 1623 году и позднее переписаны пастором Зольтманном.',
    },
    category: 'church-records',
  },
  {
    id: 'leichenpredigt',
    term: {
      en: 'Leichenpredigt',
      de: 'Leichenpredigt',
      ru: 'Лайхенпредигт',
    },
    definition: {
      en: 'Printed funeral sermon. A two-part document: a biblical interpretation and a biography of the deceased. An invaluable genealogical source. Superintendent Knorr delivered one for Andreas Schwachheim in 1691.',
      de: 'Gedruckte Trauerpredigt. Ein zweiteiliges Dokument: Bibelauslegung und Biografie des Verstorbenen. Eine unschätzbare genealogische Quelle. Superintendent Knorr hielt eine für Andreas Schwachheim 1691.',
      ru: 'Печатная погребальная проповедь. Двухчастный документ: толкование Библии и биография покойного. Бесценный генеалогический источник. Суперинтендант Кнорр произнёс такую для Андреаса Швахгейма в 1691 году.',
    },
    category: 'church-records',
  },
  {
    id: 'taufbuch',
    term: {
      en: 'Taufbuch',
      de: 'Taufbuch',
      ru: 'Тауфбух',
    },
    definition: {
      en: 'Baptismal register. Part of the Kirchenbuch recording baptisms, godparents, and dates — a primary source for reconstructing family histories.',
      de: 'Taufregister. Teil des Kirchenbuchs mit Einträgen zu Taufen, Paten und Daten — eine Primärquelle zur Rekonstruktion von Familiengeschichten.',
      ru: 'Книга крещений. Часть церковной книги с записями о крещениях, крёстных и датах — первоисточник для восстановления семейных историй.',
    },
    category: 'church-records',
  },

  // ── Mills ─────────────────────────────────────────────────────────
  {
    id: 'muhlenzwang',
    term: {
      en: 'Mühlenzwang',
      de: 'Mühlenzwang',
      ru: 'Мюленцванг',
    },
    definition: {
      en: 'Compulsory milling right. A law that forced all residents to grind their grain at a specific designated mill, giving the miller a legal monopoly. Bastian benefited from this at the Herzberg Ducal Mill.',
      de: 'Mahlzwang. Ein Gesetz, das alle Einwohner verpflichtete, ihr Getreide an einer bestimmten Mühle mahlen zu lassen, was dem Müller ein Monopol gab. Bastian profitierte davon an der Herzberger Herrschaftsmühle.',
      ru: 'Право принудительного помола. Закон, обязывавший всех жителей молоть зерно на определённой мельнице, давая мельнику легальную монополию. Бастиан пользовался этим правом на Княжеской мельнице в Херцберге.',
    },
    category: 'mills',
  },
  {
    id: 'muhlengraben',
    term: {
      en: 'Mühlengraben',
      de: 'Mühlengraben',
      ru: 'Мюленграбен',
    },
    definition: {
      en: 'Mill canal. An artificial channel diverting water from the Sieber river to power watermills. Ingeniously engineered to maintain elevation while the river dropped into the valley below, keeping mills safe from floods.',
      de: 'Mühlenkanal. Ein künstlicher Kanal, der Wasser aus der Sieber ableitete, um Wassermühlen anzutreiben. Geschickt angelegt, um die Höhe zu halten, während der Fluss ins Tal abfiel, sodass die Mühlen vor Hochwasser geschützt waren.',
      ru: 'Мельничный канал. Искусственный канал, отводящий воду из реки Зибер для водяных мельниц. Гениально спроектирован для сохранения высоты, пока река спускалась в долину, защищая мельницы от наводнений.',
    },
    category: 'mills',
  },
  {
    id: 'obermuhle',
    term: {
      en: 'Obermühle',
      de: 'Obermühle',
      ru: 'Обермюле',
    },
    definition: {
      en: 'Upper Mill. The mill first in line on a river or canal, with guaranteed water supply. The Schwachheim family\'s mill in Hattorf and later Bastian\'s prestigious lease in Herzberg were both Obermühlen.',
      de: 'Obermühle. Die flussaufwärts gelegene Mühle mit garantierter Wasserversorgung. Sowohl die Familienmühle der Schwachheims in Hattorf als auch Bastians Pachtmühle in Herzberg waren Obermühlen.',
      ru: 'Верхняя мельница. Мельница, стоящая первой по течению реки или канала, с гарантированным водоснабжением. И мельница Швахгеймов в Хатторфе, и престижная аренда Бастиана в Херцберге были Обермюле.',
    },
    category: 'mills',
  },
  {
    id: 'pachtschilling',
    term: {
      en: 'Pachtschilling',
      de: 'Pachtschilling',
      ru: 'Пахтшиллинг',
    },
    definition: {
      en: 'Lease payment. The fixed annual sum a miller paid to the mill\'s owner (often the Duke\'s treasury). Everything earned above this amount was the miller\'s profit.',
      de: 'Pachtzins. Die feste Jahressumme, die ein Müller dem Mühlenbesitzer (oft der herzoglichen Kasse) zahlte. Alles, was darüber hinaus verdient wurde, war der Gewinn des Müllers.',
      ru: 'Арендная плата. Фиксированная годовая сумма, которую мельник платил владельцу мельницы (часто казне герцога). Всё заработанное сверх этой суммы было прибылью мельника.',
    },
    category: 'mills',
  },
  {
    id: 'muhlengesetz',
    term: {
      en: 'Mühlengesetz',
      de: 'Mühlengesetz',
      ru: 'Мюленгезетц',
    },
    definition: {
      en: 'Mill demolition law. A 1950s–1970s German program offering premiums for demolishing old mills. Under this law, the mill portion of the Schwachheim house in Hattorf was removed.',
      de: 'Mühlenstilllegungsgesetz. Ein deutsches Programm der 1950er–1970er Jahre, das Prämien für den Abriss alter Mühlen bot. Unter diesem Gesetz wurde der Mühlenteil des Schwachheim-Hauses in Hattorf abgerissen.',
      ru: 'Закон о мельницах. Немецкая программа 1950–1970-х годов, предлагавшая премии за снос старых мельниц. По этому закону мельничная часть дома Швахгеймов в Хатторфе была снесена.',
    },
    category: 'mills',
  },

  // ── Social Status ─────────────────────────────────────────────────
  {
    id: 'schafmeister',
    term: {
      en: 'Schafmeister',
      de: 'Schafmeister',
      ru: 'Шафмайстер',
    },
    definition: {
      en: 'Chief shepherd / sheep-farm manager. Not a simple shepherd, but a manager of large flocks (hundreds or thousands) belonging to nobility, cities, or monasteries. Part of the privileged peasant elite alongside millers and innkeepers.',
      de: 'Oberhirt / Schäfereileiter. Kein einfacher Hirte, sondern Verwalter großer Herden (Hunderte oder Tausende) im Besitz von Adel, Städten oder Klöstern. Teil der privilegierten Bauernelite neben Müllern und Gastwirten.',
      ru: 'Главный овчар / управляющий овцеводческим хозяйством. Не простой пастух, а управляющий огромными стадами (сотни и тысячи голов) знати, городов или монастырей. Часть привилегированного крестьянского слоя наряду с мельниками и трактирщиками.',
    },
    category: 'social-status',
  },
  {
    id: 'ratsherr',
    term: {
      en: 'Ratsherr',
      de: 'Ratsherr',
      ru: 'Ратсхерр',
    },
    definition: {
      en: 'City councilor. A member of the Stadtrat (city council). In cities like Osterode, these were wealthy merchants and burghers who governed civic life. The wife of Ratsherr Bartold Nats was godmother to Christoffel Schwachheim.',
      de: 'Stadtrat. Mitglied des Stadtrats. In Städten wie Osterode waren dies wohlhabende Kaufleute und Bürger, die das städtische Leben verwalteten. Die Frau des Ratsherrn Bartold Nats war Patin von Christoffel Schwachheim.',
      ru: 'Городской советник. Член городского совета (Штадтрата). В городах вроде Остероде это были богатые купцы и бюргеры, управлявшие городской жизнью. Жена ратсхерра Бартольта Наца была крёстной Кристоффеля Швахгейма.',
    },
    category: 'social-status',
  },
  {
    id: 'ackerleute',
    term: {
      en: 'Ackerleute',
      de: 'Ackerleute',
      ru: 'Аккерлёйте',
    },
    definition: {
      en: 'Large-scale farmers / landowners. In villages like Hattorf, after the knights departed, millers and Ackerleute became the local elite, forming a kind of "village aristocracy."',
      de: 'Großbauern / Landbesitzer. In Dörfern wie Hattorf wurden nach dem Wegzug der Ritter Müller und Ackerleute zur lokalen Elite, einer Art „Dorfaristokratie."',
      ru: 'Крупные землевладельцы / зажиточные крестьяне. В деревнях вроде Хатторфа после ухода рыцарей мельники и Аккерлёйте стали местной элитой — своего рода «деревенской аристократией».',
    },
    category: 'social-status',
  },

  // ── Administration ────────────────────────────────────────────────
  {
    id: 'obervogt',
    term: {
      en: 'Obervogt',
      de: 'Obervogt',
      ru: 'Оберфогт',
    },
    definition: {
      en: 'Chief magistrate. The highest administrative and judicial official in a district (Amt), representing the Duke. Managed police, collected taxes, and administered justice. Burchard Krüger held this position in Herzberg.',
      de: 'Oberverwaltungsbeamter. Der höchste Verwaltungs- und Justizbeamte eines Amtes, Vertreter des Herzogs. Verwaltete Polizei, erhob Steuern und sprach Recht. Burchard Krüger hatte diese Position in Herzberg inne.',
      ru: 'Главный фогт. Высший административный и судебный чиновник в округе (амте), представитель герцога. Управлял полицией, собирал налоги и вершил суд. Бурхард Крюгер занимал эту должность в Херцберге.',
    },
    category: 'administration',
  },
  {
    id: 'superintendent',
    term: {
      en: 'Superintendent',
      de: 'Superintendent',
      ru: 'Суперинтендант',
    },
    definition: {
      en: 'Lutheran equivalent of a bishop. Oversaw pastors and churches in a district. Christian Friedrich Knorr was superintendent of Osterode for the Principality of Grubenhagen.',
      de: 'Lutherisches Äquivalent eines Bischofs. Beaufsichtigte Pastoren und Kirchen in einem Bezirk. Christian Friedrich Knorr war Superintendent von Osterode für das Fürstentum Grubenhagen.',
      ru: 'Лютеранский аналог епископа. Надзирал за пасторами и церквями в округе. Кристиан Фридрих Кнорр был суперинтендантом Остероде в княжестве Грубенхаген.',
    },
    category: 'administration',
  },
  {
    id: 'landesherr',
    term: {
      en: 'Landesherr',
      de: 'Landesherr',
      ru: 'Ландесгерр',
    },
    definition: {
      en: 'Territorial lord. The sovereign ruler of a territory within the Holy Roman Empire — in this case, the Duke of Braunschweig-Lüneburg. Owned ducal mills and appointed officials.',
      de: 'Landesherr. Der souveräne Herrscher eines Territoriums im Heiligen Römischen Reich — hier der Herzog von Braunschweig-Lüneburg. Besaß herzogliche Mühlen und ernannte Beamte.',
      ru: 'Территориальный правитель. Суверенный правитель территории в Священной Римской империи — в данном случае герцог Брауншвейг-Люнебургский. Владел княжескими мельницами и назначал чиновников.',
    },
    category: 'administration',
  },

  // ── Architecture ──────────────────────────────────────────────────
  {
    id: 'grabendorf',
    term: {
      en: 'Grabendorf',
      de: 'Grabendorf',
      ru: 'Грабендорф',
    },
    definition: {
      en: '"Village by the ditch." The oldest part of Hattorf, at 180–190m elevation — the highest point safe from river floods. The Schwachheim mill stood here, in the historical heart of the village.',
      de: '„Dorf am Graben." Der älteste Teil von Hattorf, auf 180–190 m Höhe — der höchste, hochwassersichere Punkt. Die Schwachheim-Mühle stand hier, im historischen Herzen des Dorfes.',
      ru: '«Деревня у рва». Самая древняя часть Хатторфа, на высоте 180–190 м — самая высокая точка, безопасная от наводнений. Мельница Швахгеймов стояла именно здесь, в историческом центре деревни.',
    },
    category: 'architecture',
  },
  {
    id: 'wasserburg',
    term: {
      en: 'Wasserburg',
      de: 'Wasserburg',
      ru: 'Вассербург',
    },
    definition: {
      en: 'Lowland castle surrounded by water (moat). The knights von Hattorf built one here in 1241. After they left, it was converted into a church. The ancient stone tower with 1.5m-thick walls may be its remnant.',
      de: 'Niederungsburg, umgeben von Wasser (Burggraben). Die Herren von Hattorf bauten hier 1241 eine. Nach ihrem Wegzug wurde sie zur Kirche umgebaut. Der alte Steinturm mit 1,5 m dicken Mauern könnte ihr Überrest sein.',
      ru: 'Низинный замок, окружённый водой (рвом). Рыцари фон Хатторф построили его здесь в 1241 году. После их ухода замок превратился в церковь. Древняя каменная башня со стенами толщиной 1,5 метра может быть его остатком.',
    },
    category: 'architecture',
  },
  {
    id: 'fachwerk',
    term: {
      en: 'Fachwerk',
      de: 'Fachwerk',
      ru: 'Фахверк',
    },
    definition: {
      en: 'Half-timbered construction. A traditional German building method using wooden frames filled with brick or plaster. The current St. Pancras church (1756) was built in this style because it was cheaper than stone.',
      de: 'Fachwerkbauweise. Eine traditionelle deutsche Bauart mit Holzrahmen, ausgefacht mit Ziegeln oder Putz. Die heutige St.-Pankratius-Kirche (1756) wurde in diesem Stil erbaut, weil es billiger war als Stein.',
      ru: 'Фахверковая конструкция. Традиционный немецкий метод строительства с деревянным каркасом, заполненным кирпичом или штукатуркой. Нынешняя церковь Св. Панкратия (1756) построена в этом стиле — так было дешевле, чем из камня.',
    },
    category: 'architecture',
  },
  {
    id: 'residenzstadt',
    term: {
      en: 'Residenzstadt',
      de: 'Residenzstadt',
      ru: 'Резиденцштадт',
    },
    definition: {
      en: 'Residence city. A town where the ruling family physically lived, with their court, garrison, and administration. Herzberg was a Residenzstadt of the Welf dukes until 1665.',
      de: 'Residenzstadt. Eine Stadt, in der die Herrscherfamilie physisch lebte, mit Hof, Garnison und Verwaltung. Herzberg war bis 1665 Residenzstadt der Welfen-Herzöge.',
      ru: 'Город-резиденция. Город, где физически проживала правящая семья с двором, гарнизоном и администрацией. Херцберг был резиденцией герцогов Вельфов до 1665 года.',
    },
    category: 'architecture',
  },

  // ── Military ──────────────────────────────────────────────────────
  {
    id: 'lisowczycy',
    term: {
      en: 'Lisowczycy',
      de: 'Lisowczycy',
      ru: 'Лисовчики',
    },
    definition: {
      en: 'Polish-Lithuanian light cavalry. Recorded in German chronicles as "Kosaken" or "Polacken." Known for eastern-style dress, sabres, and bows. Called "Horsemen of the Apocalypse" — legends said they ate children. Active in Lower Saxony during the 1620s.',
      de: 'Polnisch-litauische leichte Kavallerie. In deutschen Chroniken als „Kosaken" oder „Polacken" verzeichnet. Bekannt für orientalische Kleidung, Säbel und Bögen. Als „Reiter der Apokalypse" bezeichnet — Legenden besagten, sie äßen Kinder. In den 1620ern in Niedersachsen aktiv.',
      ru: 'Польско-литовская лёгкая кавалерия. В немецких хрониках записаны как «Kosaken» или «Polacken». Известны восточным стилем одежды, саблями и луками. Названы «Всадниками Апокалипсиса» — ходили легенды, что они едят детей. Действовали в Нижней Саксонии в 1620-х.',
    },
    category: 'military',
  },
  {
    id: 'nurnberger-heerstrasse',
    term: {
      en: 'Nürnberger Heerstraße',
      de: 'Nürnberger Heerstraße',
      ru: 'Нюрнбергская военная дорога',
    },
    definition: {
      en: 'The Nuremberg Military Road. A major route passing through Hattorf, connecting Rome to Stockholm. Used by kings, dukes, knights, and papal legates. Also called the "Herrenweg" (Lords\' Road). It fed the village but also brought armies during wartime.',
      de: 'Die Nürnberger Heerstraße. Eine wichtige Route durch Hattorf, die Rom mit Stockholm verband. Genutzt von Königen, Herzögen, Rittern und päpstlichen Legaten. Auch „Herrenweg" genannt. Sie ernährte das Dorf, brachte aber in Kriegszeiten auch Armeen.',
      ru: 'Нюрнбергская военная дорога. Важный путь через Хатторф, соединявший Рим со Стокгольмом. Им пользовались короли, герцоги, рыцари и папские легаты. Также назывался «Herrenwеg» (Господская дорога). Дорога кормила деревню, но в военное время приносила армии.',
    },
    category: 'military',
  },

  // ── Education ─────────────────────────────────────────────────────
  {
    id: 'lateinschule',
    term: {
      en: 'Lateinschule',
      de: 'Lateinschule',
      ru: 'Латинская школа',
    },
    definition: {
      en: 'Latin school. A pre-university school teaching Latin, theology, and classical subjects. The one at St. Aegidien in Osterode was considered very strong. In the 17th century, a Rektor was the head teacher (Schulmeister), often with only 2–3 teachers: Rektor, Konrektor, and Kantor.',
      de: 'Lateinschule. Eine voruniversitäre Schule, die Latein, Theologie und klassische Fächer lehrte. Die an St. Aegidien in Osterode galt als sehr stark. Im 17. Jh. war der Rektor der Hauptlehrer (Schulmeister), oft mit nur 2–3 Lehrern: Rektor, Konrektor und Kantor.',
      ru: 'Латинская школа. Доуниверситетская школа, обучавшая латыни, теологии и классическим предметам. Школа при церкви Св. Эгидия в Остероде считалась очень сильной. В XVII веке ректор — это главный учитель (Schulmeister), часто со всего 2–3 учителями: ректор, конректор и кантор.',
    },
    category: 'education',
  },

  // ── Geography ─────────────────────────────────────────────────────
  {
    id: 'sieber-river',
    term: {
      en: 'River Sieber',
      de: 'Fluss Sieber',
      ru: 'Река Зибер',
    },
    definition: {
      en: 'A mountain stream flowing through Hattorf with a 69 km² watershed in the Harz mountains. Its steep gradient caused devastating flash floods — water rising meters in hours when mountain snow melted or storms hit, sweeping away bridges, livestock, and people.',
      de: 'Ein Gebirgsbach durch Hattorf mit einem 69 km² Einzugsgebiet im Harz. Sein steiles Gefälle verursachte verheerende Sturzfluten — das Wasser stieg bei Schneeschmelze oder Stürmen in Stunden um Meter und riss Brücken, Vieh und Menschen mit.',
      ru: 'Горный поток, протекающий через Хатторф, с водосборной площадью 69 км² в горах Гарца. Крутой уклон вызывал разрушительные наводнения — вода поднималась на метры за считанные часы при таянии снега или ливнях, сносила мосты, скот и людей.',
    },
    category: 'geography',
  },
  {
    id: 'harz-mountains',
    term: {
      en: 'Harz Mountains',
      de: 'Harz (Gebirge)',
      ru: 'Горы Гарц',
    },
    definition: {
      en: 'A mountain range in central Germany. The rivers Sieber and Oder originate here, flowing down to Hattorf. The mountains determined the region\'s economy (mining, forestry) and caused the catastrophic flash floods that shaped village life.',
      de: 'Ein Mittelgebirge in Zentraldeutschland. Die Flüsse Sieber und Oder entspringen hier und fließen hinab nach Hattorf. Die Berge bestimmten die Wirtschaft der Region (Bergbau, Forstwirtschaft) und verursachten die katastrophalen Sturzfluten, die das Dorfleben prägten.',
      ru: 'Горный массив в центральной Германии. Отсюда берут начало реки Зибер и Одер, текущие вниз к Хатторфу. Горы определяли экономику региона (горное дело, лесоводство) и вызывали катастрофические наводнения, формировавшие жизнь деревни.',
    },
    category: 'geography',
  },
] as const satisfies readonly GlossaryEntry[]
