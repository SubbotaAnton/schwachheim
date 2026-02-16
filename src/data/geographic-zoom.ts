import type { Locale } from '@/i18n/routing'

export interface GeographicZoomStep {
  id: string
  svgPath: string
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export const geographicZoomSteps: readonly GeographicZoomStep[] = [
  {
    id: 'europe-hre',
    svgPath: '/images/maps/europe-hre.svg',
    title: {
      en: 'Holy Roman Empire',
      de: 'Heiliges Römisches Reich',
      ru: 'Священная Римская империя',
    },
    description: {
      en: 'A vast, decentralized federation of German states stretching across Central Europe. Within its borders lay hundreds of territories — duchies, principalities, free cities — each with its own ruler.',
      de: 'Ein weitreichender, dezentraler Bund deutscher Staaten quer durch Mitteleuropa. In seinen Grenzen lagen Hunderte von Territorien — Herzogtümer, Fürstentümer, freie Städte — jedes mit eigenem Herrscher.',
      ru: 'Огромный, рыхлый союз немецких государств, растянувшийся через всю Центральную Европу. Внутри его границ находились сотни территорий — герцогства, княжества, вольные города — каждое со своим правителем.',
    },
  },
  {
    id: 'brunswick-luneburg',
    svgPath: '/images/maps/brunswick-luneburg.svg',
    title: {
      en: 'Duchy of Brunswick-Lüneburg',
      de: 'Herzogtum Braunschweig-Lüneburg',
      ru: 'Герцогство Брауншвейг-Люнебург',
    },
    description: {
      en: 'A powerful Welf duchy in northern Germany — essentially the former Duchy of Saxony. The Welf dynasty ruled these lands for centuries, dividing them into ever-smaller principalities among their heirs.',
      de: 'Ein mächtiges Welfenherzogtum in Norddeutschland — im Grunde das ehemalige Herzogtum Sachsen. Die Welfendynastie regierte diese Lande über Jahrhunderte und teilte sie unter ihren Erben in immer kleinere Fürstentümer.',
      ru: 'Могущественное герцогство Вельфов в Северной Германии — по сути бывшее герцогство Саксонское. Династия Вельфов правила этими землями веками, разделяя их между наследниками на всё более мелкие княжества.',
    },
  },
  {
    id: 'grubenhagen',
    svgPath: '/images/maps/grubenhagen.svg',
    title: {
      en: 'Principality of Grubenhagen',
      de: 'Fürstentum Grubenhagen',
      ru: 'Княжество Грубенхаген',
    },
    description: {
      en: 'A small principality in the Harz mountains with Herzberg as its capital. The residence castle, Schloss Herzberg, overlooked the town from a hilltop — and the mills along the Sieber river powered the local economy.',
      de: 'Ein kleines Fürstentum im Harz mit Herzberg als Hauptstadt. Das Residenzschloss Herzberg überblickte die Stadt von einem Hügel — und die Mühlen entlang der Sieber trieben die lokale Wirtschaft an.',
      ru: 'Небольшое княжество в горах Гарца со столицей в Херцберге. Резиденция — замок Херцберг — возвышалась над городом на холме, а мельницы вдоль реки Зибер были основой местной экономики.',
    },
  },
  {
    id: 'hattorf',
    svgPath: '/images/maps/hattorf.svg',
    title: {
      en: 'Hattorf am Harz',
      de: 'Hattorf am Harz',
      ru: 'Хатторф-ам-Харц',
    },
    description: {
      en: 'A small village at the foot of the Harz mountains, where the Schwachheim story begins. Situated on the Nuremberg military road, it saw kings, dukes, and armies pass through — bringing both prosperity and devastation.',
      de: 'Ein kleines Dorf am Fuße des Harzes, wo die Geschichte der Schwachheims beginnt. An der Nürnberger Heerstraße gelegen, zogen Könige, Herzöge und Armeen hindurch — und brachten Wohlstand wie Verwüstung.',
      ru: 'Маленькая деревня у подножия Гарца, откуда начинается история Швахгеймов. Расположенная на Нюрнбергской военной дороге, она видела проходящих королей, герцогов и армии — приносивших и достаток, и разорение.',
    },
  },
] as const
