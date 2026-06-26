import type { MonthlyData, ComparisonData } from '../types'

// ── Types ──────────────────────────────────────────────────────────────────────

export type Department =
  | 'RMG (Choir)' | 'Ushering' | 'Media' | 'Protocol'
  | 'VIP' | 'Next (Youth)' | 'Kids'
  | 'Sanitation (Sanctuary)' | 'Prayer' | 'None'

export type ServiceName = '1st' | '2nd' | '3rd'
export type Gender = 'Male' | 'Female'
export type MaritalStatus = 'Single' | 'Married' | 'Widowed'

export interface AttendanceRecord {
  date: string
  services: ServiceName[]
}

const SERVICE_LABELS: Record<ServiceName, string> = {
  '1st': '1st Service (7:00 AM)',
  '2nd': '2nd Service (8:30 AM)',
  '3rd': '3rd Service (10:00 AM)',
}

export function getServiceLabel(s: ServiceName) { return SERVICE_LABELS[s] }

export type MembershipLevel =
  | 'Regular' | 'Worker' | 'Choir' | 'Usher' | 'Media'
  | 'Protocol' | 'VIP' | 'Youth' | 'Kids'
  | 'Sanctuary' | 'Prayer' | 'New Convert'

export const MEMBERSHIP_LEVEL_COLORS: Record<MembershipLevel, string> = {
  'Regular':     'bg-blue-100 text-blue-700',
  'Worker':      'bg-green-100 text-green-700',
  'Choir':       'bg-purple-100 text-purple-700',
  'Usher':       'bg-yellow-100 text-yellow-700',
  'Media':       'bg-orange-100 text-orange-700',
  'Protocol':    'bg-indigo-100 text-indigo-700',
  'VIP':         'bg-rose-100 text-rose-700',
  'Youth':       'bg-cyan-100 text-cyan-700',
  'Kids':        'bg-pink-100 text-pink-700',
  'Sanctuary':   'bg-slate-100 text-slate-700',
  'Prayer':      'bg-violet-100 text-violet-700',
  'New Convert': 'bg-emerald-100 text-emerald-700',
}

const DEPT_TO_LEVEL: Record<Department, MembershipLevel> = {
  'RMG (Choir)':          'Choir',
  'Ushering':             'Usher',
  'Media':                'Media',
  'Protocol':             'Protocol',
  'VIP':                  'VIP',
  'Next (Youth)':         'Youth',
  'Kids':                 'Kids',
  'Sanitation (Sanctuary)': 'Sanctuary',
  'Prayer':               'Prayer',
  'None':                 'Regular',
}

export interface Member {
  id: number
  name: string
  phone: string
  email: string
  gender: Gender
  department: Department
  membershipLevel: MembershipLevel
  maritalStatus: MaritalStatus
  joined: string
  attendance: AttendanceRecord[]
}

// ── Constants ──────────────────────────────────────────────────────────────────

export const DEPARTMENTS: Department[] = [
  'RMG (Choir)', 'Ushering', 'Media', 'Protocol',
  'VIP', 'Next (Youth)', 'Kids',
  'Sanitation (Sanctuary)', 'Prayer', 'None',
]

export const SERVICES: ServiceName[] = ['1st', '2nd', '3rd']

// ── Last 8 Sundays from June 9, 2026 ───────────────────────────────────────────

const LAST_8_SUNDAYS = [
  '2026-06-07',
  '2026-05-31',
  '2026-05-24',
  '2026-05-17',
  '2026-05-10',
  '2026-05-03',
  '2026-04-26',
  '2026-04-19',
]

function last4Sundays(): string[] {
  return LAST_8_SUNDAYS.slice(0, 4)
}

function all8Sundays() { return LAST_8_SUNDAYS }

// ── Seeded PRNG (hydrate-safe) ────────────────────────────────────────────────

function createRng(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rng = createRng(42)

// ── Helper: pick random items ──────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr]
  for (let i = 0; i < n && i < shuffled.length; i++) {
    const j = i + Math.floor(rng() * (shuffled.length - i))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled.slice(0, n)
}

// ── 1500+ Members (generated) ───────────────────────────────────────────────────

const MALE_NAMES = [
  'Emeka','Chinedu','Oluwaseun','Tunde','Ifeanyi','Segun','Chibueze',
  'Femi','Kayode','Rotimi','Ugochukwu','Damilare','Ayodele','Ebuka',
  'Tolulope','Somtochukwu','Obinna','Adedamola','Olumide','Kunle',
  'Chidi','Nnamdi','Okechukwu','Ikenna','Kelechi','Ebere','Chuka',
  'Chima','Uchenna','Kenechukwu','Nonso','Chidozie','Izuchukwu',
  'Tochukwu','Onyekachi','Chijindu','Azubuike','Onyedika','Onyema',
  'Chukwudi','Chukwuebuka','Chukwuemeka','Chukwunonso','Dumebi',
  'Ejiro','Enyinnaya','Eze','Ikechukwu','Ikeoluwa','Kingsley',
  'Micheal','Nurudeen','Olawale','Olayinka','Oluwatobi','Oluwatoyin',
  'Opeyemi','Taofeek','Temitope','Wasiu','Yusuf','Abdullahi',
  'Abubakar','Adebayo','Adegoke','Adeola','Adesoji','Adewale',
  'Adeyemi','Afeez','Akinlolu','Akintunde','Ariyo','Ayobami',
  'Ayodeji','Babatunde','Bamidele','Bolanle','Bosun','Damilola',
  'Dayo','Dele','Demola','Diran','Ebenezer','Efosa','Ekene',
  'Festus','Fisayo','Gbenga','Goke','Ibrahim','Idris','Ike',
  'Ireoluwa','Isaac','Isaiah','Ismail','Jamiu','Jeremiah','Joshua',
  'Kazeem','Kehinde','Kolawole','Lanre','Lateef','Lukman',
  'Makanjuola','Moyin','Mubarak','Musa','Niyi','Olabode','Oladapo',
  'Oladipupo','Oladotun','Olamide','Olanrewaju','Olasunkanmi',
  'Olatunde','Olawole','Olayemi','Olorunfemi','Olubunmi','Olufemi',
  'Olugbenga','Olusegun','Olushola','Oluwadamilare','Oluwadamilola',
  'Oluwafemi','Oluwakayode','Oluwasegun','Oluwasina','Oluwatade',
  'Oluwatimilehin','Oluwatobi','Oluwatosin','Oluwole','Omotayo',
  'Onyeka','Opeoluwa','Osagie','Paul','Peter','Philip','Rasheed',
  'Samuel','Seye','Sodiq','Sola','Stephen','Suleiman','Sunday',
  'Tajudeen','Tayo','Temidayo','Timilehin','Timothy','Tobi',
  'Tolani','Tomiwa','Toyin','Tunji','Uche','Udo','Wale','Yemi','Yinka',
]

const FEMALE_NAMES = [
  'Chioma','Funke','Amina','Temitope','Ngozi','Bisola','Yetunde',
  'Zainab','Simisola','Ezinne','Adaeze','Morenike','Rahmat',
  'Chiamaka','Folake','Opeyemi','Abimbola','Kafayat','Kehinde',
  'Chidinma','Amara','Chika','Chisom','Chinyere','Ebere','Efe',
  'Ejiro','Folashade','Gbemisola','Halima','Ifeoma','Ijeoma',
  'Ireti','Jumoke','Kemi','Kosisochukwu','Lara','Mojisola',
  'Moyinoluwa','Nafisat','Nkechi','Nkiruka','Nnenna','Nonye',
  'Ogechi','Olabisi','Oladunni','Olamide','Olasumbo','Olawunmi',
  'Olayemi','Olufunke','Oluremi','Olusola','Oluwadamilola',
  'Oluwakemi','Oluwaseun','Oluwaseyi','Oluwatosin','Oluwatoyin',
  'Oluwayemisi','Oluyemisi','Omobolanle','Omolade','Omolara',
  'Omolola','Omotayo','Omotola','Omowunmi','Onyinye','Ooreoluwa',
  'Oyindamola','Patience','Peace','Priscilla','Rebecca','Ronke',
  'Roseline','Ruth','Sade','Similoluwa','Simisola','Suliat',
  'Taiwo','Temilade','Temiloluwa','Temitayo','Titilayo','Tolulope',
  'Tomi','Tomilola','Toyin','Uchechi','Ufuoma','Victoria','Wuraola',
  'Yewande','Yinka','Abigail','Adanna','Adaugo','Adesuwa','Adunni',
  'Agnes','Aisha','Amarachi','Angela','Anuoluwapo','Ayomide',
  'Blessing','Bolanle','Boluwatife','Bukola','Catherine','Cecilia',
  'Chidera','Chidimma','Chidubem','Deborah','Damilola','Dorcas',
  'Dorathy','Dunsin','Ebunoluwa','Elizabeth','Emmanuella','Eniola',
  'Enitan','Esther','Eunice','Faith','Fatima','Favour','Feyisara',
  'Foluke','Funmilayo','Funmilola','Gift','Glory','Grace','Hadiza',
  'Hauwa','Helen','Ibiyemi','Irene','Isabella','Iyabo','Janet',
  'Jennifer','Jessica','Joy','Joyce','Judith','Juliana','June',
  'Kafilat','Kamsiyochukwu','Khadijat','Kikelomo','Kofoworola',
  'Lillian','Lola','Loveth','Lucy','Margaret','Maria','Martha',
  'Mary','Mercy','Mobolaji','Mofoluwake','Monica','Monisola',
  'Motunrayo','Muinat','Naomi','Nathania','Nifemi','Nikita',
  'Nwamaka','Nwando','Nwanneka','Olabimpe','Oladoyin','Olanike',
  'Olasimbo','Olawunmi','Ololade','Oluchi','Olufolake','Olukemi',
  'Omobolaji','Omofolarin','Omoleye','Omoniyi','Omorinsola',
  'Omorose','Oreoluwa','Osariemen','Oyebisi','Oyedoyin','Oyinlola',
  'Oyinkansola','Praise','Queensley','Sandra','Sarah','Sharon',
  'Shukurat','Stephanie','Susan','Tamara','Temidayo','Tola',
  'Tolani','Veronica','Wemimo','Winifred','Yemisi','Yvonne','Zara','Zion',
]

const SURNAMES = [
  'Okafor','Nwosu','Adebayo','Bello','Okonkwo','Balogun','Adegoke',
  'Eze','Bakare','Williams','Obi','Akintola','Adewale','Abdullah',
  'Igwe','Ogunlana','Ajayi','Nwachukwu','Osunsanya','Onyema',
  'Akinwunmi','Afolabi','Okezie','Suleiman','Ogunyemi','Eneh',
  'Fasanya','Madueke','Adeniran','Fasasi','Shittu','Oseni',
  'Egwuatu','Oyedeji','Jinadu','Okpara','Adebayo','Adeyemi',
  'Agbaje','Agboola','Agu','Ajayi','Akpan','Aliyu','Amadi',
  'Amaechi','Aremu','Ashiru','Attah','Awolowo','Azubuike',
  'Babalola','Badmus','Bakare','Bankole','Bassey','Bello',
  'Chibueze','Chijioke','Chima','Chinaka','Chinyere','Chukwudi',
  'Chukwuma','Dada','Dairo','Danjuma','Daramola','David','Diya',
  'Eboh','Effiong','Egbe','Ejiofor','Ekpo','Ekwueme','Emenike',
  'Eneh','Enyi','Essien','Etim','Eze','Ezeh','Ezenwa','Ezeugwu',
  'Fabiyi','Fadipe','Fagbemi','Falade','Falana','Fashina','Fasina',
  'Fayemi','Folorunso','George','Godwin','Hassan','Ibe','Ibeh',
  'Idowu','Ifeanyi','Igwe','Ike','Ikechi','Ikpeme','Inyang',
  'Irabor','Iroegbu','Iroha','Isa','Isah','Isibor','Ismail',
  'Iwegbu','Iweka','Iwuchukwu','Iyamu','Jamiu','Jegede','Jinadu',
  'Johnson','Jonathan','Joseph','Joshua','Kalu','Kareem','Kazeem',
  'Kehinde','Kingsley','Kola','Kosoko','Kuku','Kuye','Labinjo',
  'Ladipo','Lamidi','Lawal','Lawani','Lucas','Lucky','Macaulay',
  'Madu','Maduka','Majekodunmi','Makanjuola','Maku','Malami',
  'Mamman','Marcus','Mark','Martins','Matthew','Mba','Mbachu',
  'Mbah','Mbakwe','Mbanefo','Micheal','Mohammed','Mojekwu',
  'Momodu','Moses','Muhammad','Musa','Mustapha','Muyiwa','Nafi',
  'Ndukwe','Ndukwu','Nwachukwu','Nwadike','Nwaeze','Nwagwu',
  'Nwaiwu','Nwaji','Nwaka','Nwankwo','Nwanne','Nwanze','Nwaogu',
  'Nwaubani','Nweke','Nwigwe','Nwiyi','Nwodo','Nwokedi','Nwoko',
  'Nwokocha','Nwokolo','Nwokoye','Nwosu','Nworgu','Nzeribe',
  'Nzewi','Oba','Obafemi','Obaseki','Obasi','Obi','Obianwu',
  'Obilor','Obinna','Obioha','Obiora','Obisesan','Obodo','Oboh',
  'Ochefu','Ochigbo','Odeh','Oderanti','Odesanya','Odeyemi',
  'Odigie','Odili','Odinaka','Odion','Odoh','Odu','Odukwe',
  'Odunze','Odusanya','Oduwole','Ofili','Ofodile','Oforji',
  'Ogah','Ogan','Ogar','Ogbe','Ogbeide','Ogbonna','Ogbu',
  'Ogbuchi','Ogbuewe','Ogechukwu','Ogedegbe','Ogenyi','Oghuma',
  'Ogunbiyi','Ogundare','Ogundele','Ogundipe','Ogungbemi',
  'Ogunjimi','Ogunlade','Ogunlana','Ogunleye','Ogunniyi',
  'Ogunode','Ogunsanya','Ogunseye','Ogunsola','Oguntade',
  'Ogunwale','Ogunyemi','Ohia','Oji','Ojikutu','Ojo','Ojukwu',
  'Oke','Okechukwu','Okediji','Okeke','Okereke','Okezie',
  'Okigbo','Okoh','Okolo','Okon','Okonkwo','Okorie','Okoronkwo',
  'Okorocha','Okoye','Okpara','Okpe','Okpo','Okunade','Okunola',
  'Okwu','Okwuegbu','Ola','Olabode','Oladimeji','Oladipo',
  'Oladokun','Olajide','Olajire','Olalekan','Olaleye','Olanipekun',
  'Olaniyan','Olaniyi','Olanrewaju','Olasunkanmi','Olatunde',
  'Olatunji','Olawole','Olayemi','Olayinka','Olayiwola','Olisa',
  'Ologun','Olojede','Olomu','Olonade','Olopade','Olorunsola',
  'Oloruntoba','Oloyede','Olubiyi','Olubunmi','Oludare','Olufemi',
  'Olugbemi','Olukayode','Olukoju','Oluleye','Olumide','Olumuyiwa',
  'Olusanya','Olusegun','Olushola','Olusola','Oluwadare','Oluwafemi',
  'Oluwakemi','Oluwaseun','Oluwaseyi','Oluwatosin','Oluwatoyin',
  'Oluwayemi','Oluwole','Oma','Omar','Omeje','Omeke','Omole',
  'Omolewa','Omololu','Omorogbe','Omoruyi','Omotayo','Omotola',
  'Omotoso','Omowumi','Omu','Onabanjo','Onadeko','Onah','Onakoya',
  'Onanuga','Oni','Onifade','Onigbinde','Onoja','Onu','Onuoha',
  'Onuorah','Onyema','Onyekachi','Onyekwere','Onyema','Onyenagu',
  'Onyeneke','Onyewuchi','Opara','Opatola','Opeyemi','Orabueze',
  'Orafidiya','Oragwu','Oreh','Orekoya','Oriaku','Osagie','Osaro',
  'Oseni','Osuji','Osunde','Osunkwo','Otubu','Otubu','Otuya',
  'Oyeniyi','Oyedele','Oyedeji','Oyedokun','Oyenuga','Oyesanya',
  'Oyelude','Oyelola','Oyekan','Oyekunle','Oyeniyi','Oyesiku',
  'Oyetade','Oyetunji','Oyetunde','Oyewole','Oyewumi','Ozigbo',
  'Paul','Peter','Philip','Rafiu','Raji','Rasheed','Rilwan',
  'Sadiku','Salami','Salisu','Samson','Samuel','Sanya','Seyi',
  'Shittu','Sikiru','Sodiq','Sofoluwe','Sokunbi','Soleye','Soretire',
  'Stephen','Suleiman','Sunday','Tajudeen','Tanko','Tayo','Tella',
  'Temidayo','Temitayo','Thomas','Timilehin','Timothy','Tobi',
  'Togun','Tolani','Tomiwa','Toyin','Tubosun','Tunji','Ubah',
  'Ubani','Uche','Uchegbu','Uchendu','Ucheoma','Uche-Okeke',
  'Ude','Udeh','Udenze','Udeozo','Udogu','Udoji','Uduehi',
  'Udoh','Udu','Uduak','Uduma','Uduroh','Ufomba','Ugah',
  'Ugbaja','Ugbo','Ugboma','Ugeh','Ugwu','Ugwuagbo','Ugwuanyi',
  'Ugwuoke','Ugwuona','Uka','Ukah','Ukpai','Ukpaka','Ukpe',
  'Ukpono','Ukwu','Ukwueze','Ukwuoma','Ule','Ulasi','Ullah',
  'Ulo','Uloko','Ulu','Uluocha','Umar','Umah','Umana',
  'Umba','Umelo','Umeobi','Umeoka','Umerah','Umez','Umezulike',
  'Umunna','Umunna','Umunze','Umunze','Unegbu','Unigwe','Unogu',
  'Unojie','Unoka','Unoma','Unuigbe','Unyolo','Uzochukwu','Uzodinma',
  'Uzoka','Uzoukwu','Uzuegbu','Uzui','Uzuke','Uzoma','Uzoukwu',
  'Wada','Wahab','Wakama','Wali','Waliyu','Wande','Wari',
  'Wasiu','Waziri','Weke','Williams','Wilson','Wodi','Wogu',
  'Wokoma','Wokoro','Wonu','Worlu','Wosa','Yahaya','Yakubu',
  'Yalaju','Yamah','Yankari','Yarima','Yarube','Yashim','Yasur',
  'Yaya','Yebube','Yekini','Yemi','Yerima','Yesufu','Yilme',
  'Yinusa','Yisa','Yisau','Yohanna','Yola','Yongo','Yoroki',
  'Yoruba','Yuguda','Yunana','Yunusa','Yusuf','Yusuff','Zakari',
  'Zakka','Zarma','Zira','Zorto','Zubairu','Zubair','Zungu',
]

function generatePhone(): string {
  const prefixes = ['0803', '0806', '0802', '0901', '0903', '0810', '0816', '0703']
  const suffix = String(Math.floor(10000000 + rng() * 90000000))
  return `${pick(prefixes)}${suffix}`
}

function generateEmail(name: string): string {
  const domain = pick(['gmail.com', 'yahoo.com', 'outlook.com', 'proton.me', 'icloud.com'])
  const cleaned = name.toLowerCase().replace(/\s+/g, '.')
  return `${cleaned}@${domain}`
}

const joinDates = [
  'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
  'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024',
  'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025',
  'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025',
  'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026',
  'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026',
]

function generateAttendance(last4: number): AttendanceRecord[] {
  const records: AttendanceRecord[] = []
  const sundays = all8Sundays()

  // First 4 Sundays (older) — partial attendance
  for (let i = 4; i < 8; i++) {
    if (rng() > 0.5) {
      records.push({
        date: sundays[i],
        services: pickN(SERVICES, Math.floor(rng() * 3) + 1),
      })
    }
  }

  // Last 4 Sundays — controlled by last4 param
  const activeSundays = pickN(sundays.slice(0, 4), last4)
  for (const date of activeSundays) {
    records.push({
      date,
      services: pickN(SERVICES, Math.floor(rng() * 3) + 1),
    })
  }

  return records
}

let memberIdCounter = 0

export function buildMembers(): Member[] {
  return []
}

export const allMembers = buildMembers()

// ── Derived Metrics ────────────────────────────────────────────────────────────

export function isActive(member: Member): boolean {
  const recent = last4Sundays()
  const attendedRecent = recent.filter(sun =>
    member.attendance.some(a => a.date === sun && a.services.length > 0)
  ).length
  return attendedRecent >= 3
}

export function isReturning(member: Member): boolean {
  // Was absent for ≥4 consecutive weeks, then attended recently
  const sundays = all8Sundays()

  // Check if they attended any of the most recent 2 Sundays
  const recent2 = sundays.slice(0, 2)
  const attendedRecent = recent2.some(sun =>
    member.attendance.some(a => a.date === sun && a.services.length > 0)
  )

  if (!attendedRecent) return false

  // Check if they were absent for a stretch of 4+ consecutive weeks
  let longestAbsence = 0
  let currentAbsence = 0

  for (const sun of sundays) {
    const attended = member.attendance.some(a => a.date === sun && a.services.length > 0)
    if (attended) {
      longestAbsence = Math.max(longestAbsence, currentAbsence)
      currentAbsence = 0
    } else {
      currentAbsence++
    }
  }
  longestAbsence = Math.max(longestAbsence, currentAbsence)

  return longestAbsence >= 4
}

export function needsAttention(member: Member): boolean {
  const sundays = all8Sundays()
  for (let i = 0; i < 3; i++) {
    if (member.attendance.some(a => a.date === sundays[i] && a.services.length > 0)) {
      return false
    }
  }
  return true
}

export function isNewThisMonth(member: Member): boolean {
  // Use a fixed month 'Jun 2026' to align with the mock data's June 2026 anchor date
  // and prevent server/client hydration mismatches due to system time/locale
  return member.joined === 'Jun 2026'
}

export interface MemberStats {
  total: number
  active: number
  returning: number
  newThisMonth: number
  needsAttention: number
}

export const precomputedStats = computeStats(allMembers)

export function computeStats(members: Member[]): MemberStats {
  let active = 0, returning = 0, newThisMonth = 0, needsAttn = 0

  for (const m of members) {
    if (isActive(m)) active++
    if (isReturning(m)) returning++
    if (isNewThisMonth(m)) newThisMonth++
    if (needsAttention(m)) needsAttn++
  }

  return {
    total: members.length,
    active,
    returning,
    newThisMonth,
    needsAttention: needsAttn,
  }
}

// ── Membership Database per Year ───────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function joinedToRank(joined: string): number {
  const [m, y] = joined.split(' ')
  return parseInt(y) * 12 + MONTHS.indexOf(m)
}

function computeCumulativeMembership(): Map<string, number> {
  const sorted = [...allMembers].sort((a, b) => joinedToRank(a.joined) - joinedToRank(b.joined))
  const cum = new Map<string, number>()
  let count = 0
  for (const m of sorted) {
    count++
    cum.set(m.joined, count)
  }
  return cum
}

export function getYearlyMonthlyData(): MonthlyData {
  const cum = computeCumulativeMembership()
  const series1: number[] = []
  const series2: number[] = []
  const series3: number[] = []

  for (const month of MONTHS) {
    series1.push(cum.get(`${month} 2024`) ?? 0)
    series2.push(cum.get(`${month} 2025`) ?? 0)
    series3.push(cum.get(`${month} 2026`) ?? 0)
  }

  const all = [...series1, ...series2, ...series3]
  const rawMin = Math.min(...all)
  const rawMax = Math.max(...all)

  if (rawMin === rawMax) {
    return {
      months: MONTHS,
      series1,
      series2,
      series3,
    }
  }

  if (rawMin >= 901) return { months: MONTHS, series1, series2, series3 }

  const factor = (rawMax - 901) / (rawMax - rawMin)
  const shift = (v: number) => Math.round(901 + (v - rawMin) * factor)

  return {
    months: MONTHS,
    series1: series1.map(shift),
    series2: series2.map(shift),
    series3: series3.map(shift),
  }
}

export function getYearlyComparisonData(): ComparisonData {
  const monthly = getYearlyMonthlyData()
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

  return {
    labels: quarters,
    series: [
      { name: '2024', data: quarters.map((_, q) => monthly.series1[q * 3 + 2]), color: '#3B82F6' },
      { name: '2025', data: quarters.map((_, q) => monthly.series2[q * 3 + 2]), color: '#22C55E' },
      { name: '2026', data: quarters.map((_, q) => monthly.series3[q * 3 + 2]), color: '#8B5CF6' },
    ],
  }
}

// ── Attendance Chart Data ──────────────────────────────────────────────────────

export interface AttendancePerService {
  date: string
  s1: number
  s2: number
  s3: number
}

export function buildAttendanceChartData(): AttendancePerService[] {
  const sundays = all8Sundays()

  return sundays.map((date) => {
    // Count how many members attended each service on this date
    const s1 = allMembers.filter(m =>
      m.attendance.some(a => a.date === date && a.services.includes('1st'))
    ).length

    const s2 = allMembers.filter(m =>
      m.attendance.some(a => a.date === date && a.services.includes('2nd'))
    ).length

    const s3 = allMembers.filter(m =>
      m.attendance.some(a => a.date === date && a.services.includes('3rd'))
    ).length

    return {
      date: formatDateShort(date),
      s1,
      s2,
      s3,
    }
  })
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const attendanceChartData = buildAttendanceChartData()

// ── Check-in Method Distribution ───────────────────────────────────────────────

export const checkInMethodData = [
  { name: 'Physical', value: 0, color: '#3B82F6' },
  { name: 'Online',   value: 0, color: '#F43F5E' },
  { name: 'Visitors', value: 0, color: '#F59E0B' },
]

// ── Check-in Timeline (per service) ────────────────────────────────────────────

const SERVICE_START: Record<ServiceName, string> = {
  '1st': '7:00',
  '2nd': '8:30',
  '3rd': '10:00',
}

function generateCheckinTimeline(service: ServiceName): { time: string; count: number }[] {
  const start = SERVICE_START[service]
  const startHour = parseInt(start.split(':')[0])
  const startMin = parseInt(start.split(':')[1])

  const points: { time: string; count: number }[] = []

  for (let i = -30; i <= 150; i += 15) {
    const totalMin = (startHour * 60 + startMin) + i
    const h = Math.floor(totalMin / 60)
    const m = totalMin % 60
    const time = `${h}:${m === 0 ? '00' : m}`
    points.push({ time, count: 0 })
  }

  return points
}

export const checkinTimelines: Record<ServiceName, { time: string; count: number }[]> = {
  '1st': generateCheckinTimeline('1st'),
  '2nd': generateCheckinTimeline('2nd'),
  '3rd': generateCheckinTimeline('3rd'),
}

// ── Check-in Service Counts ────────────────────────────────────────────────────

export function getServiceCount(service: ServiceName): string {
  const attended = allMembers.filter(m =>
    m.attendance.some(a => a.date === all8Sundays()[0] && a.services.includes(service))
  ).length
  return String(attended)
}

export const defaultServiceCounts: Record<ServiceName, string> = {
  '1st': getServiceCount('1st'),
  '2nd': getServiceCount('2nd'),
  '3rd': getServiceCount('3rd'),
}

// ── Events for Attendance Breakdown ────────────────────────────────────────────

export interface Event {
  title: string
  date: string
  attendance: number
  change: string
}

export const events: Event[] = []

// ── Dashboard Weekly Chart Data ────────────────────────────────────────────────

export function buildWeeklyChartData(): { time: string; value: number }[] {
  return all8Sundays().map((date, i) => {
    const total = allMembers.reduce((sum, m) => {
      const rec = m.attendance.find(a => a.date === date)
      return sum + (rec ? rec.services.length : 0)
    }, 0)
    return {
      time: `W${8 - i}`,
      value: total,
    }
  }).reverse()
}

export const weeklyChartData = buildWeeklyChartData()

// ── Department Distribution ────────────────────────────────────────────────────

export interface DeptCount {
  dept: Department
  count: number
  color: string
}

const DEPT_COLORS: Record<string, string> = {
  'RMG (Choir)': '#3B82F6',
  'Ushering': '#22C55E',
  'Media': '#F59E0B',
  'Protocol': '#A855F7',
  'VIP': '#F43F5E',
  'Next (Youth)': '#06B6D4',
  'Kids': '#EC4899',
  'Sanitation (Sanctuary)': '#6B7280',
  'Prayer': '#8B5CF6',
  'None': '#D1D5DB',
}

export function getDepartmentDistribution(): DeptCount[] {
  const map = new Map<Department, number>()
  for (const m of allMembers) {
    map.set(m.department, (map.get(m.department) ?? 0) + 1)
  }
  return DEPARTMENTS.map(dept => ({
    dept,
    count: map.get(dept) ?? 0,
    color: DEPT_COLORS[dept],
  }))
}

// ── Onboarding / Follow-up Data ────────────────────────────────────────────────

export interface OnboardingMember {
  name: string
  percent: number
  badges: string[]
}

export function getOnboardingMembers(): OnboardingMember[] {
  // Newest 6 members (joined in last 3 months)
  return allMembers
    .filter(m => {
      const joinIdx = joinDates.indexOf(m.joined)
      return joinIdx >= joinDates.length - 6
    })
    .slice(0, 6)
    .map(m => {
      const hasAttendedRecent = last4Sundays().some(sun =>
        m.attendance.some(a => a.date === sun && a.services.length > 0)
      )

      // Use a local deterministic RNG seeded by member ID to keep percent/badges stable across renders
      const localRng = createRng(m.id + 777)

      if (hasAttendedRecent) {
        const progress = Math.min(100, Math.round(40 + localRng() * 60))
        return {
          name: m.name,
          percent: progress,
          badges: progress === 100
            ? ['New', 'Completed']
            : ['New', 'In progress'],
        }
      }

      return {
        name: m.name,
        percent: Math.round(localRng() * 30),
        badges: ['New', 'Need attention'],
      }
    })
}

export interface BirthdayEntry {
  name: string
  note: string
  day: string
  icon: string
}

export function getBirthdays(): BirthdayEntry[] {
  const members = allMembers.slice(0, 4)
  const days = ['Tomorrow', 'Mon', 'Tue', 'Wed']
  const notes = [
    'birthday is tomorrow',
    'celebrates 10 years – May 22',
    'birthday is on – May 23',
    'anniversary – May 24',
  ]
  const icons = ['📞', '💬', '📞', '🙏']

  return members.map((m, i) => ({
    name: m.name,
    note: notes[i % notes.length],
    day: days[i],
    icon: icons[i],
  }))
}

export interface ContactAttempt {
  icon: 'call' | 'sms' | 'email' | 'prayer'
  text: string
  time: string
}

export function getContactAttempts(): ContactAttempt[] {
  const people = allMembers.slice(0, 6)
  if (people.length === 0) return []
  const actions: ContactAttempt['icon'][] = ['call', 'sms', 'email', 'prayer']
  const times = ['2 hrs ago', 'yesterday', '2 days ago', '3 days ago', '4 days ago', '1 week ago']

  // Seed local RNG to make contact attempts stable and deterministic across client/server renders
  const localRng = createRng(12345)
  const entries: ContactAttempt[] = []
  for (let i = 0; i < 9; i++) {
    const person = people[i % people.length]
    const action = actions[Math.floor(localRng() * actions.length)]
    const time = times[i % times.length]

    let text: string
    switch (action) {
      case 'call':
        text = `Called ${person.name} – No answer, left 2 messages`
        break
      case 'sms':
        text = `SMS sent to ${person.name} – Check in after 3 weeks`
        break
      case 'email':
        text = `Email sent to ${person.name} – No response yet`
        break
      case 'prayer':
        text = `Prayer logged for ${person.name} – by Pastor on duty`
        break
    }

    entries.push({ icon: action, text, time })
  }

  return entries
}

// ── Need Attention Cards ──────────────────────────────────────────────────────

export interface NeedAttentionCard {
  name: string
  lastSeen: string
  time: string
}

export function getNeedAttentionCards(): NeedAttentionCard[] {
  return allMembers
    .filter(needsAttention)
    .slice(0, 5)
    .map(m => ({
      name: m.name,
      lastSeen: 'Last seen, Connect meeting – 3 weeks ago',
      time: '3 wk',
    }))
}

// ── Reports Data ───────────────────────────────────────────────────────────────

export function getFilteredAttendanceRows(serviceFilter: string) {
  const all = all8Sundays().map((date) => {
    const rec = attendanceChartData.find(a => a.date === formatDateShort(date))
    return {
      date: formatDateShort(date),
      s1: rec?.s1 ?? 0,
      s2: rec?.s2 ?? 0,
      s3: rec?.s3 ?? 0,
      online: Math.round(((rec?.s1 ?? 0) + (rec?.s2 ?? 0) + (rec?.s3 ?? 0)) * 0.12),
    }
  })

  if (serviceFilter === 'All Services') return all
  if (serviceFilter === '1st Service') return all.map(r => ({ ...r, s2: 0, s3: 0 }))
  if (serviceFilter === '2nd Service') return all.map(r => ({ ...r, s1: 0, s3: 0 }))
  if (serviceFilter === '3rd Service') return all.map(r => ({ ...r, s1: 0, s2: 0 }))
  if (serviceFilter === 'Online') return all.map(r => ({ ...r, s1: 0, s2: 0, s3: 0 }))
  return all
}

export const serviceMax = { s1: 1200, s2: 1200, s3: 1200, online: 400 }

// ── Reports: Member Rows ───────────────────────────────────────────────────────

export interface ReportMemberRow {
  name: string
  phone: string
  email: string
  gender: string
  department: string
  status: string
}

export function getReportMemberRows(): ReportMemberRow[] {
  return allMembers.slice(0, 50).map(m => ({
    name: m.name,
    phone: m.phone,
    email: m.email,
    gender: m.gender,
    department: m.department,
    status: isActive(m) ? 'Active' : 'Inactive',
  }))
}

// ── Monthly Overview Data ─────────────────────────────────────────────────────

export interface MonthlyRow {
  month: string
  totalAttendance: number
  newMembers: number
  avgPerService: number
  growth: string
}

function generateMonthlyData(): MonthlyRow[] {
  return []
}

export const monthlyData = generateMonthlyData()

// ── Year-to-Year Comparison Data ─────────────────────────────────────────────

export interface YearRow {
  year: string
  q1: number
  q2: number
  q3: number
  q4: number
  total: number
  growth: string
}

function generateYearData(): YearRow[] {
  return []
}

export const yearData = generateYearData()

// ── Dashboard Filter Support ──────────────────────────────────────────────────

export type MemberFilter = 'all' | 'active' | 'returning' | 'newThisMonth'

export function getFilteredMembers(filter: MemberFilter): Member[] {
  switch (filter) {
    case 'all': return allMembers
    case 'active': return allMembers.filter(isActive)
    case 'returning': return allMembers.filter(isReturning)
    case 'newThisMonth': return allMembers.filter(isNewThisMonth)
  }
}

export function buildFilteredWeeklyChart(members: Member[]): { time: string; value: number }[] {
  return all8Sundays().map((date, i) => {
    const total = members.reduce((sum, m) => {
      const rec = m.attendance.find(a => a.date === date)
      return sum + (rec ? rec.services.length : 0)
    }, 0)
    return {
      time: `W${8 - i}`,
      value: total,
    }
  }).reverse()
}

interface FilteredStatRow {
  label: string
  value: number | string
  change?: string
  changeLabel?: string
  positive?: boolean
  date?: string
}

export function buildFilteredStats(members: Member[]): FilteredStatRow[] {
  const membersList = getFilteredMembers('all')
  const totalMembers = members.length

  const sundays = all8Sundays()
  const weeklyTotals = sundays.map(date =>
    members.reduce((sum, m) => {
      const rec = m.attendance.find(a => a.date === date)
      return sum + (rec ? rec.services.length : 0)
    }, 0)
  )

  const avg = weeklyTotals.length === 0 ? 0 : Math.round(weeklyTotals.reduce((a, b) => a + b, 0) / weeklyTotals.length)
  const peak = Math.max(...weeklyTotals)
  const lowestAttendance = Math.min(...weeklyTotals)
  const peakVsAvg = lowestAttendance === 0 || Math.max(...weeklyTotals) === 0 ? 0 : Math.round((1 - lowestAttendance / Math.max(...weeklyTotals)) * 100)
  const yearGrowth = membersList.length > 0 ? ((totalMembers - membersList.length) / membersList.length * 100) : 0

  return [
    { label: 'Average Weekly', value: avg, change: '0%', changeLabel: 'vs last week', positive: true },
    { label: 'Peak attendance', value: peak, date: '-' },
    { label: 'Lowest drop-off', value: lowestAttendance, change: `${peakVsAvg}%`, changeLabel: 'from peak', positive: false },
    { label: 'Year to year growth', value: `+ ${yearGrowth.toFixed(1)}%`, change: 'vs 0', changeLabel: 'prior to last year', positive: true },
  ]
}

export function buildFilteredMonthlyData(members: Member[]): MonthlyData {
  const factor = allMembers.length === 0 ? 0 : members.length / allMembers.length
  return {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series1: [4200, 4100, 4300, 4000, 4200, 4100, 3900, 4100, 4200, 4200, 3800, 3700].map(v => Math.round(v * factor)),
    series2: [4500, 4400, 4600, 4300, 4500, 4400, 4200, 4400, 4300, 4500, 4100, 4000].map(v => Math.round(v * factor)),
    series3: [4800, 4700, 4900, 4600, 4800, 4700, 4500, 4700, 4600, 4800, 4400, 4300].map(v => Math.round(v * factor)),
  }
}

export function buildFilteredComparisonData(members: Member[]): { labels: string[]; series: { name: string; data: number[]; color: string }[] } {
  const factor = allMembers.length === 0 ? 0 : members.length / allMembers.length
  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      { name: '2024', data: [12600, 12300, 12000, 11700].map(v => Math.round(v * factor)), color: '#3B82F6' },
      { name: '2025', data: [13500, 13200, 12900, 12600].map(v => Math.round(v * factor)), color: '#22C55E' },
      { name: '2026', data: [14400, 14100, 13800, 13500].map(v => Math.round(v * factor)), color: '#8B5CF6' },
    ],
  }
}
