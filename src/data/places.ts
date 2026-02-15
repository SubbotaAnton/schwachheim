import type { Place } from '@/types/place'

export const places = [
  // ── Core locations ────────────────────────────────────────────────
  {
    id: 'hattorf',
    name: {
      en: 'Hattorf am Harz',
      de: 'Hattorf am Harz',
      ru: 'Хатторф-ам-Харц',
    },
    germanName: 'Hattorf am Harz',
    description: {
      en: 'The ancestral home of the Schwachheim family. A village at the confluence of the Sieber and Oder rivers, on the Nürnberger Heerstraße military road. First mentioned in 952 when Emperor Otto I granted a third of the village to the Pöhlde monastery.',
      de: 'Die Stammheimat der Familie Schwachheim. Ein Dorf am Zusammenfluss von Sieber und Oder, an der Nürnberger Heerstraße. Erstmals erwähnt 952, als Kaiser Otto I. ein Drittel des Dorfes dem Kloster Pöhlde schenkte.',
      ru: 'Родовое гнездо Швахгеймов. Деревня у слияния рек Зибер и Одер, на Нюрнбергской военной дороге. Впервые упоминается в 952 году, когда император Оттон I передал треть деревни монастырю Пёльде.',
    },
    coordinates: { lat: 51.6489, lng: 10.2364 },
    type: 'village',
  },
  {
    id: 'osterode',
    name: {
      en: 'Osterode am Harz',
      de: 'Osterode am Harz',
      ru: 'Остероде-ам-Харц',
    },
    germanName: 'Osterode am Harz',
    description: {
      en: 'A prosperous walled town 10 km from Hattorf. Administrative and trading center of the region. Home to the Latin school at St. Aegidien church, where Andreas Böttcher served as rector and later chief pastor.',
      de: 'Eine wohlhabende Stadtmauerstadt 10 km von Hattorf entfernt. Verwaltungs- und Handelszentrum der Region. Heimat der Lateinschule an der St.-Aegidien-Kirche, wo Andreas Böttcher als Rektor und später als Hauptpastor diente.',
      ru: 'Процветающий город с крепостной стеной в 10 км от Хатторфа. Административный и торговый центр региона. Здесь при церкви Св. Эгидия находилась латинская школа, где Андреас Бётчер был ректором, а затем первым пастором.',
    },
    coordinates: { lat: 51.7287, lng: 10.2530 },
    type: 'city',
  },
  {
    id: 'herzberg',
    name: {
      en: 'Herzberg am Harz',
      de: 'Herzberg am Harz',
      ru: 'Херцберг-ам-Харц',
    },
    germanName: 'Herzberg am Harz',
    description: {
      en: 'A Residenzstadt (residence city) 5–7 km from Hattorf. Capital of the Principality of Grubenhagen, home to the Welf ducal family until 1665. Bastian Schwachheim leased the prestigious Ducal Upper Mill here.',
      de: 'Eine Residenzstadt 5–7 km von Hattorf entfernt. Hauptstadt des Fürstentums Grubenhagen, Heimat der Welfenfamilie bis 1665. Bastian Schwachheim pachtete hier die prestigeträchtige Herrschaftliche Obermühle.',
      ru: 'Город-резиденция в 5–7 км от Хатторфа. Столица княжества Грубенхаген, резиденция герцогов Вельфов до 1665 года. Бастиан Швахгейм арендовал здесь престижную Княжескую Верхнюю мельницу.',
    },
    coordinates: { lat: 51.6544, lng: 10.3394 },
    type: 'city',
  },
  {
    id: 'braunschweig',
    name: {
      en: 'Braunschweig',
      de: 'Braunschweig',
      ru: 'Брауншвейг',
    },
    germanName: 'Braunschweig',
    description: {
      en: 'A powerful Hanseatic city 75 km from Hattorf. In 1615, Duke Friedrich Ulrich laid siege to the city, where Hans Schwachheim was killed at age 17. The city successfully resisted, preserving its independence.',
      de: 'Eine mächtige Hansestadt 75 km von Hattorf entfernt. 1615 belagerte Herzog Friedrich Ulrich die Stadt, wobei Hans Schwachheim im Alter von 17 Jahren getötet wurde. Die Stadt leistete erfolgreich Widerstand und bewahrte ihre Unabhängigkeit.',
      ru: 'Могущественный ганзейский город в 75 км от Хатторфа. В 1615 году герцог Фридрих Ульрих осадил город — там погиб 17-летний Ганс Швахгейм. Город успешно оборонялся, сохранив независимость.',
    },
    coordinates: { lat: 52.2689, lng: 10.5268 },
    type: 'city',
  },
  {
    id: 'schloss-herzberg',
    name: {
      en: 'Herzberg Castle',
      de: 'Schloss Herzberg',
      ru: 'Замок Херцберг',
    },
    germanName: 'Schloss Herzberg',
    description: {
      en: 'The seat of the Welf dukes, towering above Herzberg. Home to the ducal court, garrison, chancery, and armory until 1665. The Upper Mill that Bastian leased served the castle and its garrison.',
      de: 'Der Sitz der Welfen-Herzöge, der über Herzberg thront. Heimat des herzoglichen Hofes, der Garnison, Kanzlei und Waffenfabrik bis 1665. Die Obermühle, die Bastian pachtete, versorgte das Schloss und seine Garnison.',
      ru: 'Резиденция герцогов Вельфов, возвышающаяся над Херцбергом. Здесь располагались двор, гарнизон, канцелярия и оружейная фабрика до 1665 года. Верхняя мельница, которую арендовал Бастиан, обслуживала замок и гарнизон.',
    },
    coordinates: { lat: 51.6560, lng: 10.3350 },
    type: 'castle',
  },

  // ── Battle/event sites ────────────────────────────────────────────
  {
    id: 'lutter-am-barenberge',
    name: {
      en: 'Lutter am Barenberge',
      de: 'Lutter am Barenberge',
      ru: 'Луттер-ам-Баренберге',
    },
    germanName: 'Lutter am Barenberge',
    description: {
      en: 'Site of one of the bloodiest battles of the Thirty Years\' War (August 27, 1626), just 25 km from Hattorf. The aftermath brought plague and destruction to the entire region.',
      de: 'Ort einer der blutigsten Schlachten des Dreißigjährigen Krieges (27. August 1626), nur 25 km von Hattorf entfernt. Die Folgen brachten Pest und Verwüstung in die gesamte Region.',
      ru: 'Место одного из самых кровопролитных сражений Тридцатилетней войны (27 августа 1626), в 25 км от Хатторфа. Последствия битвы принесли чуму и разрушения всему региону.',
    },
    coordinates: { lat: 51.9744, lng: 10.2631 },
    type: 'battlefield',
  },
  {
    id: 'rottenburg',
    name: {
      en: 'Rottenburg (near Braunschweig)',
      de: 'Rottenburg (bei Braunschweig)',
      ru: 'Роттенбург (у Брауншвейга)',
    },
    germanName: 'Rottenburg',
    description: {
      en: 'A fortified position near Braunschweig where Hans Schwachheim received his mortal wound on October 21, 1615, during the Siege of Braunschweig.',
      de: 'Eine befestigte Stellung bei Braunschweig, wo Hans Schwachheim am 21. Oktober 1615 während der Belagerung von Braunschweig seine tödliche Verwundung erlitt.',
      ru: 'Укреплённая позиция у Брауншвейга, где 21 октября 1615 года Ганс Швахгейм получил смертельное ранение при осаде Брауншвейга.',
    },
    coordinates: { lat: 52.2700, lng: 10.5200 },
    type: 'battlefield',
  },

  // ── Education cities ──────────────────────────────────────────────
  {
    id: 'jena',
    name: {
      en: 'Jena',
      de: 'Jena',
      ru: 'Йена',
    },
    germanName: 'Jena',
    description: {
      en: 'University city where Andreas Schwachheim studied from 1627. He returned here after finding the climate of Wittenberg unsuitable.',
      de: 'Universitätsstadt, in der Andreas Schwachheim ab 1627 studierte. Er kehrte hierher zurück, nachdem er das Klima von Wittenberg als ungeeignet empfand.',
      ru: 'Университетский город, где Андреас Швахгейм учился с 1627 года. Вернулся сюда после того, как не смог перенести виттенбергский климат.',
    },
    coordinates: { lat: 50.9271, lng: 11.5892 },
    type: 'university',
  },
  {
    id: 'wittenberg',
    name: {
      en: 'Wittenberg',
      de: 'Wittenberg',
      ru: 'Виттенберг',
    },
    germanName: 'Wittenberg',
    description: {
      en: 'Historic university city, cradle of the Reformation. Andreas Schwachheim studied here briefly in 1629 but left because he "could not endure the Wittenberg climate."',
      de: 'Historische Universitätsstadt, Wiege der Reformation. Andreas Schwachheim studierte hier kurz 1629, verließ die Stadt aber, weil er „das Wittenberger Klima nicht ertragen konnte."',
      ru: 'Исторический университетский город, колыбель Реформации. Андреас Швахгейм недолго учился здесь в 1629 году, но уехал, «не перенеся виттенбергского климата».',
    },
    coordinates: { lat: 51.8661, lng: 12.6494 },
    type: 'university',
  },
  {
    id: 'goettingen',
    name: {
      en: 'Göttingen',
      de: 'Göttingen',
      ru: 'Гёттинген',
    },
    germanName: 'Göttingen',
    description: {
      en: 'City where Andreas Schwachheim attended gymnasium after his schooling in Osterode.',
      de: 'Stadt, in der Andreas Schwachheim nach seiner Schulzeit in Osterode das Gymnasium besuchte.',
      ru: 'Город, где Андреас Швахгейм посещал гимназию после школы в Остероде.',
    },
    coordinates: { lat: 51.5328, lng: 9.9354 },
    type: 'city',
  },
  {
    id: 'hildesheim',
    name: {
      en: 'Hildesheim',
      de: 'Hildesheim',
      ru: 'Хильдесхайм',
    },
    germanName: 'Hildesheim',
    description: {
      en: 'City with a famous cathedral (Dom). Andreas Schwachheim preached a trial sermon before Duke Georg of Braunschweig-Lüneburg here, earning his parish in Groß- und Klein-Ilde.',
      de: 'Stadt mit einem berühmten Dom. Andreas Schwachheim hielt hier eine Probepredigt vor Herzog Georg von Braunschweig-Lüneburg und erhielt dadurch seine Pfarrstelle in Groß- und Klein-Ilde.',
      ru: 'Город со знаменитым собором. Андреас Швахгейм прочитал здесь пробную проповедь перед герцогом Георгом Брауншвейг-Люнебургским, получив приход в Гросс- и Кляйн-Ильде.',
    },
    coordinates: { lat: 52.1508, lng: 9.9511 },
    type: 'city',
  },

  // ── Other important places ────────────────────────────────────────
  {
    id: 'giboldehausen',
    name: {
      en: 'Gieboldehausen',
      de: 'Gieboldehausen',
      ru: 'Гибольдехаузен',
    },
    germanName: 'Gieboldehausen',
    description: {
      en: 'Town in the Eichsfeld region where Andreas Schwachheim briefly held a pastorate in 1634, thanks to Weimar troops capturing the area. He lost the position when Protestants were defeated at Nördlingen.',
      de: 'Stadt im Eichsfeld, wo Andreas Schwachheim 1634 kurzzeitig eine Pfarrstelle innehatte, dank der Einnahme des Gebiets durch Weimarer Truppen. Er verlor die Stelle nach der protestantischen Niederlage bei Nördlingen.',
      ru: 'Город в области Айхсфельд, где Андреас Швахгейм ненадолго получил пасторский приход в 1634 году благодаря веймарским войскам. Потерял должность после поражения протестантов при Нёрдлингене.',
    },
    coordinates: { lat: 51.6181, lng: 10.2000 },
    type: 'city',
  },
  {
    id: 'gross-klein-ilde',
    name: {
      en: 'Groß- und Klein-Ilde',
      de: 'Groß- und Klein-Ilde',
      ru: 'Гросс- и Кляйн-Ильде',
    },
    germanName: 'Groß- und Klein-Ilde',
    description: {
      en: 'Parish where Andreas Schwachheim served as pastor from 1635, after impressing Duke Georg with a trial sermon in the Hildesheim Cathedral.',
      de: 'Pfarrei, in der Andreas Schwachheim ab 1635 als Pastor diente, nachdem er Herzog Georg mit einer Probepredigt im Hildesheimer Dom beeindruckt hatte.',
      ru: 'Приход, где Андреас Швахгейм служил пастором с 1635 года, впечатлив герцога Георга пробной проповедью в соборе Хильдесхайма.',
    },
    coordinates: { lat: 52.0500, lng: 10.0300 },
    type: 'village',
  },
  {
    id: 'hannover',
    name: {
      en: 'Hannover',
      de: 'Hannover',
      ru: 'Ганновер',
    },
    germanName: 'Hannover',
    description: {
      en: 'City where Konrad Schwachheim (Bastian\'s son from his first marriage) settled, becoming a court tailor and homeowner.',
      de: 'Stadt, in die Konrad Schwachheim (Bastians Sohn aus erster Ehe) zog und Hofschneider und Hausbesitzer wurde.',
      ru: 'Город, куда переехал Конрад Швахгейм (сын Бастиана от первого брака), став придворным портным и домовладельцем.',
    },
    coordinates: { lat: 52.3759, lng: 9.7320 },
    type: 'city',
  },
  {
    id: 'kloster-poehlde',
    name: {
      en: 'Pöhlde Monastery',
      de: 'Kloster Pöhlde',
      ru: 'Монастырь Пёльде',
    },
    germanName: 'Kloster Pöhlde',
    description: {
      en: 'Monastery 5 km from Hattorf. According to a document (considered a 12th-century forgery), Emperor Otto I granted a third of Hattorf village to this monastery in 952.',
      de: 'Kloster 5 km von Hattorf entfernt. Laut einem Dokument (als Fälschung des 12. Jahrhunderts betrachtet) schenkte Kaiser Otto I. 952 ein Drittel des Dorfes Hattorf diesem Kloster.',
      ru: 'Монастырь в 5 км от Хатторфа. Согласно документу (считается подделкой XII века), в 952 году император Оттон I передал треть деревни Хатторф этому монастырю.',
    },
    coordinates: { lat: 51.6200, lng: 10.2800 },
    type: 'monastery',
  },
  {
    id: 'st-pancras-church',
    name: {
      en: 'St. Pancras Church, Hattorf',
      de: 'St.-Pankratius-Kirche, Hattorf',
      ru: 'Церковь Св. Панкратия, Хатторф',
    },
    germanName: 'St.-Pankratius-Kirche',
    description: {
      en: 'The parish church of Hattorf. The original Catholic church was built in 1522. The current half-timbered Protestant church was built in 1756, standing next to the ancient stone tower with 1.5m-thick walls — possibly a remnant of the knights\' castle.',
      de: 'Die Pfarrkirche von Hattorf. Die ursprüngliche katholische Kirche wurde 1522 erbaut. Die heutige Fachwerkkirche wurde 1756 errichtet, neben dem alten Steinturm mit 1,5 m dicken Mauern — möglicherweise ein Überrest der Ritterburg.',
      ru: 'Приходская церковь Хатторфа. Первая католическая церковь построена в 1522 году. Нынешняя фахверковая протестантская церковь возведена в 1756 году рядом с древней каменной башней со стенами толщиной 1,5 метра — возможно, остатком рыцарского замка.',
    },
    coordinates: { lat: 51.6490, lng: 10.2370 },
    type: 'church',
  },
  {
    id: 'obermuhle-hattorf',
    name: {
      en: 'Schwachheim Mill (Obermühle)',
      de: 'Schwachheimsche Mühle (Obermühle)',
      ru: 'Мельница Швахгеймов (Обермюле)',
    },
    germanName: 'Schwachheimsche Mühle (Obermühle)',
    description: {
      en: 'The Upper Mill of Hattorf — the Schwachheim family home. Located in the Grabendorf quarter, the highest point safe from floods. Combined living quarters and mill, standing for nearly 450 years. The mill portion was removed in the 1950s–1970s under the Mühlengesetz program.',
      de: 'Die Obermühle von Hattorf — das Familienheim der Schwachheims. Im Grabendorf-Viertel gelegen, dem höchsten, hochwassersicheren Punkt. Kombinierte Wohn- und Mühlengebäude, fast 450 Jahre alt. Der Mühlenteil wurde in den 1950er–1970er Jahren im Rahmen des Mühlengesetzes abgerissen.',
      ru: 'Верхняя мельница Хатторфа — родовой дом Швахгеймов. Расположена в квартале Грабендорф, самой высокой точке, безопасной от наводнений. Совмещала жилые помещения с мельницей, простояв почти 450 лет. Мельничная часть была снесена в 1950–1970-х по программе Mühlengesetz.',
    },
    coordinates: { lat: 51.6495, lng: 10.2360 },
    type: 'mill',
  },
] as const satisfies readonly Place[]
