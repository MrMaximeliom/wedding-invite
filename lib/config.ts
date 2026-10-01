// Everything here can be overridden with environment variables (see .env.local.example).
// Sensible defaults are in place so the app runs immediately; edit .env.local for the real event.

export const weddingConfig = {
  // Couple initials shown on the stamp, e.g. "M" and "A"
  initialA: process.env.NEXT_PUBLIC_INITIAL_A || 'M',
  initialB: process.env.NEXT_PUBLIC_INITIAL_B || 'A',

  coupleNames: process.env.NEXT_PUBLIC_COUPLE_NAMES || 'Moayed & Alaa',

  // ISO date-time string, e.g. "2026-12-12T18:00:00+04:00"
  weddingDateTime: process.env.NEXT_PUBLIC_WEDDING_DATETIME || '2026-10-30T18:00:00+04:00',

  venueName: process.env.NEXT_PUBLIC_VENUE_NAME || 'The Grand Ballroom',
  venueAddress: process.env.NEXT_PUBLIC_VENUE_ADDRESS || 'Abu Dhabi, United Arab Emirates',

  // Full Google Maps share link to the venue
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    'https://maps.google.com/?q=Abu+Dhabi',

  // Invitation text shown on the /invite page
  inviteMessage:
    process.env.NEXT_PUBLIC_INVITE_MESSAGE ||
    'Together with our families, we joyfully invite you to celebrate the beginning of our forever. Your presence would mean the world to us as we say "I do".',

  // 30 songs, one per day of the countdown. Defaults to /audio/day-01.mp3 .. day-30.mp3.
  // Override with a comma-separated list of 30 paths via NEXT_PUBLIC_MUSIC_TRACKS if you'd
  // rather name your files differently, e.g. "/audio/a.mp3,/audio/b.mp3,...".
  musicTracks: (process.env.NEXT_PUBLIC_MUSIC_TRACKS
    ? process.env.NEXT_PUBLIC_MUSIC_TRACKS.split(',').map((s) => s.trim())
    : Array.from({ length: 30 }, (_, i) => `/audio/${String(i + 1)}.mp3`)),

};
export const weddingCountdownPhrases = [
  {
    day: 29,
    title: { ar: "اليوم", en: "Today" },
    phrase: {
      ar: "اليوم لا نحتفل بيوم واحد فقط… نحتفل بكل من أوصلنا إليه، وبكل من يشاركنا هذه اللحظة، وبكل ما نرجوه من الأيام القادمة. 🤍",
      en: "Today, we celebrate more than a single day… we celebrate everyone who brought us here, everyone sharing this moment with us, and everything we hope the days ahead will bring. 🤍",
    },
  },

  {
    day: 28,
    title: { ar: "الشكر", en: "Gratitude" },
    phrase: {
      ar: "قبل أن نبدأ فصلًا جديدًا، نشكر كل من كان جزءًا من الفصول التي أوصلتنا إلى هنا.",
      en: "Before beginning a new chapter, we are grateful to everyone who was part of the chapters that brought us here.",
    },
  },
  {
    day: 27,
    title: { ar: "اللحظة", en: "The Moment" },
    phrase: {
      ar: "هناك لحظات لا تحتاج إلى وصف طويل… يكفي أن نعيشها بكامل قلوبنا.",
      en: "Some moments need no long description… they simply need to be lived with all our hearts.",
    },
  },
  {
    day: 26,
    title: { ar: "الحضور", en: "Presence" },
    phrase: {
      ar: "بعض الأشخاص يجعلون المناسبة أجمل بمجرد حضورهم… شكرًا لكل من سيكون جزءًا من هذه الذكرى.",
      en: "Some people make a celebration more beautiful simply by being there… thank you to everyone who will be part of this memory.",
    },
  },
  {
    day: 25,
    title: { ar: "الأحلام", en: "Dreams" },
    phrase: {
      ar: "الأحلام التي تُشارك تصبح أجمل… لأنها تتحول من أمنيات إلى حياة تُبنى يومًا بعد يوم.",
      en: "Shared dreams become more beautiful… because they turn from wishes into a life built day by day.",
    },
  },
  {
    day: 24,
    title: { ar: "البركة", en: "Blessing" },
    phrase: {
      ar: "نسأل الله أن تكون هذه الخطوة مباركة، وأن يجعل ما بعدها خيرًا مما قبلها.",
      en: "May God bless this step and make what follows even better than what came before.",
    },
  },
  {
    day: 23,
    title: { ar: "أسبوع", en: "One Week" },
    phrase: {
      ar: "أسبوع واحد… وربما أجمل ما في هذه الأيام أن الكثير من الأشخاص يستعدون ليشاركونا فرحتنا.",
      en: "One week… and perhaps the most beautiful part is knowing that so many people are preparing to share our joy.",
    },
  },
  {
    day: 22,
    title: { ar: "الطريق", en: "The Journey" },
    phrase: {
      ar: "ليس المهم أن يكون الطريق خاليًا من الصعوبات… المهم ألا نسير فيه وحدنا.",
      en: "What matters is not having a road without difficulties… but knowing we do not have to walk it alone.",
    },
  },
  {
    day: 21,
    title: { ar: "المحبة", en: "Love" },
    phrase: {
      ar: "المحبة الحقيقية لا تحتاج إلى الكثير من الكلام؛ يكفي أن تظهر في الحضور والاهتمام.",
      en: "True love does not need many words; it reveals itself through presence and care.",
    },
  },
  {
    day: 20,
    title: { ar: "الغد", en: "Tomorrow" },
    phrase: {
      ar: "لا نعرف ماذا تخبئ لنا الأيام، لكننا نستطيع أن نستقبلها بقلوب ممتنة وأمنيات طيبة.",
      en: "We do not know what the days ahead may hold, but we can welcome them with grateful hearts and good wishes.",
    },
  },
  {
    day: 19,
    title: { ar: "الطمأنينة", en: "Comfort" },
    phrase: {
      ar: "أن تعرف أن هناك شخصًا يمكنك أن تكون معه على طبيعتك… ذلك نوع جميل من الأمان.",
      en: "Knowing there is someone you can truly be yourself with… is a beautiful kind of security.",
    },
  },
  {
    day: 18,
    title: { ar: "الفرح", en: "Joy" },
    phrase: {
      ar: "الفرح الحقيقي يصبح أجمل عندما يكون هناك من نشاركه إياه.",
      en: "True joy becomes even more beautiful when there is someone to share it with.",
    },
  },
  {
    day: 17,
    title: { ar: "الصحبة", en: "Good Company" },
    phrase: {
      ar: "خير الصحبة تلك التي تجعلك أكثر اطمئنانًا للحياة، وأكثر امتنانًا لها.",
      en: "The best company is the kind that makes you more at peace with life and more grateful for it.",
    },
  },
  {
    day: 16,
    title: { ar: "الذكريات", en: "Memories" },
    phrase: {
      ar: "بعض اللحظات تمرّ سريعًا، لكنها تبقى معنا سنوات طويلة.",
      en: "Some moments pass quickly, yet stay with us for many years.",
    },
  },
  {
    day: 15,
    title: { ar: "العمر", en: "A Lifetime" },
    phrase: {
      ar: "أجمل ما في العمر ليس عدد السنوات، بل الأشخاص الذين يجعلونها تستحق أن تُعاش.",
      en: "The beauty of life is not in the number of years, but in the people who make those years worth living.",
    },
  },
  {
    day: 14,
    title: { ar: "الاختلاف", en: "Differences" },
    phrase: {
      ar: "ليس المطلوب أن نتشابه في كل شيء… يكفي أن نعرف كيف نختلف ونبقى قريبين.",
      en: "We do not need to be alike in everything… it is enough to know how to differ and still remain close.",
    },
  },
  {
    day: 13,
    title: { ar: "المودة", en: "Affection" },
    phrase: {
      ar: "المودة ليست كلمة تُقال، بل أشياء صغيرة نفعلها كل يوم دون أن نطلب مقابلًا.",
      en: "Affection is not just a word; it is found in the little things we do every day without expecting anything in return.",
    },
  },
  {
    day: 12,
    title: { ar: "المستقبل", en: "The Future" },
    phrase: {
      ar: "المستقبل لا يحتاج أن يكون مثاليًا؛ يكفي أن يكون مليئًا بما يستحق أن نعيشه معًا.",
      en: "The future does not need to be perfect; it only needs to be filled with things worth experiencing together.",
    },
  },
  {
    day: 11,
    title: { ar: "الرفاق", en: "Those Around Us" },
    phrase: {
      ar: "هناك أشخاص لا يظهرون في الصور فقط… بل يظهر أثرهم في كل ذكرى جميلة.",
      en: "Some people do not simply appear in our pictures… their presence lives in every beautiful memory.",
    },
  },
  {
    day: 10,
    title: { ar: "الامتنان", en: "Gratitude" },
    phrase: {
      ar: "في وسط كل ما ننتظره، هناك الكثير مما يستحق أن نقول له: الحمد لله.",
      en: "Amidst everything we look forward to, there is already so much worth saying: Alhamdulillah.",
    },
  },
  {
    day: 9,
    title: { ar: "العائلة", en: "Family" },
    phrase: {
      ar: "اليوم الذي يجمع عائلتين، يفتح الباب لعائلة أكبر وحكايات أكثر.",
      en: "A day that brings two families together opens the door to a bigger family and more stories to share.",
    },
  },
  {
    day: 8,
    title: { ar: "المشاركة", en: "Togetherness" },
    phrase: {
      ar: "الحياة تصبح أخف عندما تجد من يشاركك أفراحها، ويتقاسم معك أثقالها.",
      en: "Life becomes lighter when you have someone to share its joys and carry its burdens with you.",
    },
  },
  {
    day: 7,
    title: { ar: "السكينة", en: "Serenity" },
    phrase: {
      ar: "ليست كل الأشياء الجميلة صاخبة؛ بعضها يأتي بهدوء، ثم يصبح جزءًا لا يمكن الاستغناء عنه.",
      en: "Not everything beautiful arrives with noise; some things come quietly and become an irreplaceable part of our lives.",
    },
  },
  {
    day: 6,
    title: { ar: "الضحكة", en: "Laughter" },
    phrase: {
      ar: "أن يكون في حياتك شخص تستطيع أن تضحك معه من أبسط الأشياء… نعمة لا تُقدّر.",
      en: "Having someone in your life you can laugh with over the simplest things… is a priceless blessing.",
    },
  },
  {
    day: 5,
    title: { ar: "التفاصيل", en: "The Little Things" },
    phrase: {
      ar: "الحياة الجميلة لا تُبنى من اللحظات الكبيرة وحدها، بل من التفاصيل الصغيرة التي تتكرر كل يوم.",
      en: "A beautiful life is not built only from grand moments, but from the little things that happen every day.",
    },
  },
  {
    day: 4,
    title: { ar: "الدعاء", en: "Prayers" },
    phrase: {
      ar: "وراء كل فرحة كبيرة، أمنيات كثيرة قيلت بصوتٍ عالٍ وأخرى لم يسمعها إلا الله.",
      en: "Behind every great joy are countless wishes, some spoken aloud and others heard only by God.",
    },
  },
  {
    day: 3,
    title: { ar: "الأهل", en: "Family" },
    phrase: {
      ar: "أجمل ما في الأفراح أنها لا تخص شخصين فقط؛ بل تجمع قلوبًا كثيرة حولهما.",
      en: "The beauty of celebrations is that they belong to more than two people; they bring many hearts together.",
    },
  },
  {
    day: 2,
    title: { ar: "البيت", en: "Home" },
    phrase: {
      ar: "البيت ليس جدرانًا وأثاثًا… البيت هو المكان الذي نشعر فيه أننا لسنا وحدنا.",
      en: "Home is not walls and furniture… it is the place where we feel that we are never alone.",
    },
  },
  {
    day: 1,
    title: { ar: "الرفقة", en: "Companionship" },
    phrase: {
      ar: "أن تجد شخصًا ترتاح معه في الطريق، أهم من أن تعرف إلى أين سيأخذك الطريق.",
      en: "Finding someone you feel at ease with along the way matters more than knowing where the road will lead.",
    },
  },
  {
    day: 0,
    title: { ar: "البدايات", en: "Beginnings" },
    phrase: {
      ar: "كل حكاية جميلة تبدأ بخطوة… وبعض الخطوات تغيّر العمر كله.",
      en: "Every beautiful story begins with a step… and some steps change an entire life.",
    },
  },
] as const;

// Number of days before the wedding that the countdown/background theme/song starts rotating
export const THEME_WINDOW_DAYS = 30;

export const DEBUG_DAY = new Date(); // for testing, pretend today is 30 days before the wedding