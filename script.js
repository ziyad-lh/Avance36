const password = 'ZIYAD.LH';
let userName = '';
let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let points = 0; // متغير لتخزين النقاط

// تعريف ألوان لكل مستوى
const levelColors = [
    "#3498db", // المستوى الأول
    "#e67e22", // المستوى الثاني
    "#2ecc71", // المستوى الثالث
    "#9b59b6", // المستوى الرابع
    "#e74c3c", // المستوى الخامس
    "#f39c12", // المستوى السادس
    "#8e44ad", // المستوى السابع
    "#1abc9c", // المستوى الثامن
    "#34495e", // المستوى التاسع
    "#d35400", // المستوى العاشر
    "#2980b9", // المستوى الحادي عشر
    "#c0392b"  // المستوى الثاني عشر
];

const levels = [
    { name: "المستوى الأول", requiredCorrect: 5 },
    { name: "المستوى الثاني", requiredCorrect: 6 },
    { name: "المستوى الثالث", requiredCorrect: 7 },
    { name: "المستوى الرابع", requiredCorrect: 8 },
    { name: "المستوى الخامس", requiredCorrect: 9 },
    { name: "المستوى السادس", requiredCorrect: 10 },
    { name: "المستوى السابع", requiredCorrect: 11 },
    { name: "المستوى الثامن", requiredCorrect: 8 },
    { name: "المستوى التاسع", requiredCorrect: 10 },
    { name: "المستوى العاشر", requiredCorrect: 12 },
    { name: "المستوى الحادي عشر", requiredCorrect: 14 },
    { name: "المستوى الثاني عشر", requiredCorrect: 16 }
];

// دوال fadeIn و fadeOut لإضافة تأثيرات التلاشي
function fadeIn(element) {
    element.classList.remove('hidden');
    element.classList.add('show');
}

function fadeOut(element, callback) {
    element.classList.remove('show');
    element.addEventListener('transitionend', function() {
        element.classList.add('hidden');
        if (callback) callback();
    }, { once: true });
}


// الرسائل الترحيبية العشوائية
const greetings = [
    "مرحبًا [NAME]! نتمنى لك تجربة ممتعة ومليئة بالتحديات في اختبارنا اليوم. استعد للتعلم والاستكشاف!",
    "أهلاً وسهلاً بك، [NAME]! نحن سعداء بانضمامك إلينا. هل أنت مستعد لاختبار معرفتك؟",
    "يا هلا بك، [NAME]! نأمل أن تكون في أتم الاستعداد لتحدي الثقافة العامة. حظًا موفقًا!"
];

// الأسئلة لكل مستوى
const questions = { 
    level1: [
    { question: "ما هي عاصمة مصر؟", answers: ["القاهرة", "الإسكندرية", "أسوان"], correct: 0 },
    { question: "ما هو أكبر محيط في العالم؟", answers: ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ"], correct: 2 },
    { question: "أي بلد يعرف بأنه بلاد الشمس المشرقة؟", answers: ["الصين", "اليابان", "كوريا الجنوبية"], correct: 1 },
    { question: "ما هي أكبر قارة في العالم؟", answers: ["آسيا", "أفريقيا", "أوروبا"], correct: 0 },
    { question: "ما هو أكبر جبل في العالم؟", answers: ["كي 2", "إيفرست", "أنابورنا"], correct: 1 },
    { question: "أي من الدول التالية ليس لها سواحل؟", answers: ["مصر", "النيجر", "السعودية"], correct: 1 },
    { question: "ما هي الدولة التي تشتهر بحقول اللافندر؟", answers: ["إيطاليا", "فرنسا", "إسبانيا"], correct: 1 },
    { question: "ما هو أكبر صحراء في العالم؟", answers: ["صحراء ساهارا", "صحراء أتاكاما", "صحراء جوبى"], correct: 0 },
    { question: "ما هي الدولة التي يوجد بها أكبر عدد من البراكين؟", answers: ["إندونيسيا", "الولايات المتحدة", "اليابان"], correct: 0 },
    { question: "ما هي عاصمة الولايات المتحدة الأمريكية؟", answers: ["نيويورك", "واشنطن", "لوس أنجلوس"], correct: 1 },
    { question: "ما هي الدولة التي تمتلك أكبر عدد من الجزر؟", answers: ["السويد", "اليابان", "أستراليا"], correct: 0 },
    ],
    level2: [
    { question: "من هو مؤسس علم الاجتماع الحديث؟", answers: ["كارل ماركس", "أوغست كونت", "إميل دوركهايم"], correct: 1 },
    { question: "ما هو مصطلح 'التحضر' يشير إلى؟", answers: ["زيادة عدد السكان في القرى", "زيادة عدد السكان في المدن", "تحسين نوعية الحياة في الريف"], correct: 1 },
    { question: "ما هو مفهوم 'الطبقات الاجتماعية'؟", answers: ["تقسيم المجتمع إلى أفراد", "تقسيم المجتمع إلى طبقات حسب الدخل والمكانة", "تقسيم المجتمع حسب التعليم"], correct: 1 },
    { question: "ما هي نظرية 'التفاعل الرمزي'؟", answers: ["نظرية تركز على كيفية تفاعل الأفراد في المجتمع", "نظرية تركز على الصراع بين الطبقات الاجتماعية", "نظرية تركز على القيم والعادات"], correct: 0 },
    { question: "ما هو علم الاجتماع السياسي؟", answers: ["دراسة السياسة في الدول", "دراسة العلاقات بين السياسة والمجتمع", "دراسة تاريخ الحركات الاجتماعية"], correct: 1 },
    { question: "ما هي أهم وظائف الأسرة في المجتمع؟", answers: ["تنظيم الحياة الاجتماعية", "توفير التعليم", "تربية الأطفال"], correct: 2 },
    { question: "ما هو مفهوم 'التنشئة الاجتماعية'؟", answers: ["عملية التعلم في المدرسة", "عملية اكتساب القيم والعادات من المجتمع", "عملية التواصل مع الآخرين"], correct: 1 },
    { question: "ما هو مفهوم 'الصراع الاجتماعي'؟", answers: ["التنافس بين الأفراد على الموارد", "التعاون بين الطبقات الاجتماعية", "توافق القيم والعادات"], correct: 0 },
    { question: "ما هو 'الاستيعاب الثقافي'؟", answers: ["الاحتفاظ بالثقافة الأصلية", "تغيير الثقافة الأصلية", "اندماج ثقافات مختلفة"], correct: 2 },
    { question: "ما هو مفهوم 'الهوية الاجتماعية'؟", answers: ["كيف يعرف الأفراد أنفسهم في المجتمع", "كيف تحدد العائلة الهوية", "كيف يؤثر الاقتصاد على الهوية"], correct: 0 },
    { question: "ما هو مفهوم 'التحليل الاجتماعي'؟", answers: ["دراسة العلاقات الاجتماعية", "تحليل البيانات الاقتصادية", "تحليل المشكلات النفسية"], correct: 0 },
    ],
    level3: [    { question: "من هو الفيلسوف الذي قال 'أنا أفكر، إذن أنا موجود'؟", answers: ["ديكارت", "كانت", "هيوم"], correct: 0 },
    { question: "ما هو مفهوم 'المثالية' في الفلسفة؟", answers: ["التركيز على الأشياء المادية", "الإيمان بأن الأفكار هي الجوهر الحقيقي للواقع", "الاعتماد على التجربة الحسية"], correct: 1 },
    { question: "ما هي فلسفة 'الوجودية'؟", answers: ["فلسفة تتعامل مع الميتافيزيقا", "فلسفة تركز على الحرية والاختيار الفردي", "فلسفة تدرس القوانين الطبيعية"], correct: 1 },
    {    question: "من هو مؤسس الفلسفة الغربية؟", answers: ["أفلاطون", "أرسطو", "سقراط"], correct: 2 },
    { question: "ما هو 'العقل' وفقًا لفلسفة 'ديكارت'؟", answers: ["جزء من النفس", "أداة للتفكير", "مصدر المعرفة"], correct: 2 },
    { question: "ما هي نظرية 'النسبية الأخلاقية'؟", answers: ["الأخلاق مطلقة", "الأخلاق تعتمد على السياق الثقافي", "الأخلاق ناتجة عن التجربة الفردية"], correct: 1 },
    { question: "من هو الفيلسوف الذي أطلق على نفسه لقب 'أب الفلسفة'؟", answers: ["سقراط", "أفلاطون", "أرسطو"], correct: 0 },
    { question: "ما هو مفهوم 'العدالة' في فلسفة 'أفلاطون'؟", answers: ["تحقيق المساواة بين الأفراد", "توازن المصالح الاجتماعية", "ترتيب المجتمع حسب الفئات"], correct: 2 },
    { question: "ما هي فلسفة 'الهيوم' في المعرفة؟", answers: ["المعرفة تأتي من العقل فقط", "المعرفة تأتي من التجربة الحسية", "المعرفة فطرية"], correct: 1 },
    { question: "من هو الفيلسوف الذي كتب 'نقد العقل الخالص'؟", answers: ["هيوم", "كانت", "ديكارت"], correct: 1 },
    { question: "ما هي الفلسفة التي تركز على دراسة المعنى والوجود؟", answers: ["المادية", "المثالية", "الوجودية"], correct: 2 },
    ],
    level4: [
        { question: "ما هو أعمق نقطة في محيطات الأرض؟", answers: ["خندق ماريانا", "خندق تونغا", "خندق بورتو ريكو"], correct: 0 },
        { question: "ما هو العنصر الأكثر وفرة في الكون؟", answers: ["الهيليوم", "الهيدروجين", "الأكسجين"], correct: 1 },
        { question: "ما هو اسم أكبر شلال في العالم؟", answers: ["شلالات فيكتوريا", "شلالات نياجارا", "شلالات آنجل"], correct: 2 },
        { question: "من هو صاحب أطول فترة حكم في التاريخ؟", answers: ["لويس الرابع عشر", "فرعون بيبي الثاني", "الملكة إليزابيث الثانية"], correct: 1 },
        { question: "ما هو أول حيوان استُنسخ؟", answers: ["النعجة دوللي", "القرد بوبو", "الفأر ميكي"], correct: 0 },
        { question: "ما هو العنصر الكيميائي الذي يرمز له بالرمز 'Fe'؟", answers: ["الحديد", "الفضة", "الزنك"], correct: 0 },
        { question: "ما هي الدولة التي تحتوي على أكبر عدد من البراكين؟", answers: ["الولايات المتحدة", "إندونيسيا", "اليابان"], correct: 1 },
        { question: "ما هو الحيوان الذي يمكنه العيش لأكثر من 200 عام؟", answers: ["السلحفاة", "السمكة الذهبية", "البجعة"], correct: 0 },
        { question: "ما هو أسرع حيوان على وجه الأرض؟", answers: ["الفهد", "الغراب", "الأسد"], correct: 0 },
                  { question: "ما هو الاسم العلمي للجمبري؟", answers: ["الأرنب", "الكركند", "الجمبري"], correct: 2 },
        { question: "ما هو أعمق نقطة في محيطات الأرض؟", answers: ["خندق ماريانا", "خندق تونغا", "خندق بورتو ريكو"], correct: 0 }
    ],
    level4: [
    { question: "ما هي أقدم حضارة معروفة في التاريخ؟", answers: ["الحضارة السومرية", "الحضارة المصرية القديمة", "الحضارة الهندية"], correct: 0 },
    { question: "في أي عام بدأت الحرب العالمية الأولى؟", answers: ["1914", "1939", "1918"], correct: 0 },
    { question: "من هو القائد الذي عبر جبال الألب وغزا روما؟", answers: ["هانيبال", "قيصر", "أكسيمان"], correct: 0 },
    { question: "ما هي الحضارة التي عاشت في بلاد الرافدين؟", answers: ["الحضارة الفينيقية", "الحضارة السومرية", "الحضارة البابلية"], correct: 1 },
    { question: "من هو الملك الذي وحد مصر العليا والسفلى؟", answers: ["رمسيس الثاني", "نارمر", "توت عنخ آمون"], correct: 1 },
    { question: "ما هو الاسم القديم لتركيا؟", answers: ["المملكة الرومانية", "الإمبراطورية العثمانية", "آسيا الصغرى"], correct: 2 },
    { question: "من اكتشف الأمريكتين؟", answers: ["كريستوفر كولومبوس", "فاسكو دا غاما", "ماجلان"], correct: 0 },
    { question: "ما هو الاسم الذي أطلق على فترة العصور الوسطى في أوروبا؟", answers: ["القرون الوسطى", "عصر النهضة", "العصر الحديث"], correct: 0 },
    { question: "في أي سنة تم تأسيس الأمم المتحدة؟", answers: ["1945", "1950", "1939"], correct: 0 },
    { question: "ما هي الحضارة التي أسست مدينة بابل؟", answers: ["الحضارة السومرية", "الحضارة البابلية", "الحضارة الأشورية"], correct: 1 },
    { question: "من هو الملك الذي قاد الفرس في معركة كربلاء؟", answers: ["داريوس", "كورش", "يزيد"], correct: 2 },
    ],
    level5: [
    { question: "ما هو اسم النبي الذي بُعث إلى قوم بني إسرائيل؟", answers: ["موسى", "عيسى", "محمد"], correct: 0 },
    { question: "ما هي أول سورة نزلت في القرآن الكريم؟", answers: ["العصر", "العلق", "الفاتحة"], correct: 1 },
    { question: "ما هو اسم الصحابي الذي كان يُلقب بـ 'الفاروق'؟", answers: ["أبو بكر", "عمر بن الخطاب", "عثمان بن عفان"], correct: 1 },
    { question: "في أي معركة استشهد فيها الإمام الحسين؟", answers: ["معركة بدر", "معركة كربلاء", "معركة أحد"], correct: 1 },
    { question: "ما هو الركن الثالث من أركان الإسلام؟", answers: ["الصلاة", "الزكاة", "الصوم"], correct: 1 },
    { question: "ما هو اسم الكتاب الذي يحتوي على أحاديث النبي محمد؟", answers: ["القرآن الكريم", "صحيح البخاري", "الفقه الإسلامي"], correct: 1 },
    { question: "كم عدد السجدات في القرآن الكريم؟", answers: ["10", "14", "15"], correct: 1 },
    { question: "ما هي المدينة التي هاجر إليها النبي محمد؟", answers: ["مكة", "المدينة المنورة", "بدر"], correct: 1 },
    { question: "من هو النبي الذي بُعث في زمن الملك النمرود؟", answers: ["إبراهيم", "نوح", "يوسف"], correct: 0 },
    { question: "ما هو اسم أول الخلفاء الراشدين؟", answers: ["علي بن أبي طالب", "أبو بكر الصديق", "عثمان بن عفان"], correct: 1 },
    { question: "ما هو عدد سور القرآن الكريم؟", answers: ["114", "120", "150"], correct: 0 },
    ],
    level6: [
    { question: "ما هو الاسم القديم للغة العربية؟", answers: ["اللغة السامية", "اللغة الخليلية", "اللغة العربية الفصحى"], correct: 0 },
    { question: "من هو الشاعر الذي يُلقب بأمير الشعراء؟", answers: ["أحمد شوقي", "حافظ إبراهيم", "المتنبي"], correct: 0 },
    { question: "ما هي عاصمة الأدب العربي؟", answers: ["مكة", "بغداد", "دمشق"], correct: 1 },
    { question: "ما هي أهم الفترات الأدبية في التاريخ العربي؟", answers: ["الجاهلية", "العصور الوسطى", "العصر الحديث"], correct: 0 },
    { question: "من هو كاتب رواية 'ألف ليلة وليلة'؟", answers: ["ابن سينا", "ابن المقفع", "مؤلف غير معروف"], correct: 2 },
    { question: "ما هي أشهر قصائد الشعر العربي القديم؟", answers: ["المعلقات", "القصائد الرومانسية", "قصائد الفخر"], correct: 0 },
    { question: "ما هي النحو والصرف في اللغة العربية؟", answers: ["علم القواعد", "علم المعاني", "علم العروض"], correct: 0 },
    { question: "من هو الكاتب الذي كتب 'حديث الروح'؟", answers: ["جبران خليل جبران", "طه حسين", "مصطفى صادق الرافعي"], correct: 0 },
    { question: "ما هو الفرق بين الفصحى والعامية؟", answers: ["الفرق في الاستخدام", "الفرق في النحو", "الفرق في الثقافة"], correct: 0 },
    { question: "من هو مؤسس أدب القصة القصيرة في العالم العربي؟", answers: ["محمود تيمور", "يوسف إدريس", "طه حسين"], correct: 1 },
    { question: "ما هي أهم خصائص الشعر العربي؟", answers: ["الوزن والقافية", "الأسلوب الساخر", "التجديد"], correct: 0 },
    ],
    level7: [
    { question: "من هو مؤسس علم النفس الحديث؟", answers: ["سيغموند فرويد", "ويليام جيمس", "جون واطسون"], correct: 0 },
    { question: "ما هو مفهوم 'التحليل النفسي'؟", answers: ["دراسة سلوك الفرد", "دراسة العمليات العقلية", "دراسة العلاقات بين الأفراد"], correct: 0 },
    { question: "ما هي النظرية التي تشير إلى أن السلوك يتعلم من خلال الملاحظة؟", answers: ["نظرية التعلم السلوكي", "نظرية التعلم الاجتماعي", "نظرية التعلم المعرفي"], correct: 1 },
    { question: "ما هو مصطلح 'الدافع' في علم النفس؟", answers: ["حاجة تؤدي إلى سلوك", "عاطفة قوية", "حالة عقلية"], correct: 0 },
    { question: "ما هو علم النفس الاجتماعي؟", answers: ["دراسة سلوك الفرد", "دراسة تأثير المجتمع على الفرد", "دراسة العمليات العقلية"], correct: 1 },
    { question: "ما هي إحدى أهم أنواع الاضطرابات النفسية؟", answers: ["الاكتئاب", "القلق", "كلاهما"], correct: 2 },
    { question: "من هو عالم النفس الذي قدم مفهوم 'الهرم الاحتياجات'؟", answers: ["أبراهام ماسلو", "سيغموند فرويد", "كارل روجرز"], correct: 0 },
    { question: "ما هو مفهوم 'السلوك التكيفي'؟", answers: ["السلوك الناتج عن الضغوط", "السلوك الناتج عن التعلم", "السلوك الناتج عن العوامل الوراثية"], correct: 1 },
    { question: "ما هو الاسم العلمي لعلم النفس السريري؟", answers: ["علم نفس الأفراد", "علم النفس العيادي", "علم النفس الاجتماعي"], correct: 1 },
    { question: "ما هي نظرية 'الجشطالت' في علم النفس؟", answers: ["نظرية تركز على التعلم", "نظرية تركز على الوعي", "نظرية تركز على الإدراك"], correct: 2 },
    { question: "ما هي إحدى العوامل المؤثرة في تشكيل الشخصية؟", answers: ["البيئة", "الوراثة", "كلاهما"], correct: 2 },
    ],
     technologyQuestions: [
    { question: "ما هو النظام التشغيلي الذي يستخدمه معظم الهواتف الذكية؟", answers: ["ويندوز", "أندرويد", "ماك"], correct: 1 },
    { question: "ما هو اسم الشركة التي تنتج نظام التشغيل ويندوز؟", answers: ["أبل", "مايكروسوفت", "جوجل"], correct: 1 },
    { question: "ما هو بروتوكول نقل البيانات المستخدم في تصفح الإنترنت؟", answers: ["HTTP", "FTP", "SMTP"], correct: 0 },
    { question: "ما هو الاسم الشائع لأجهزة الحاسوب المحمولة؟", answers: ["حاسوب مكتبي", "حاسوب محمول", "حاسوب لوحي"], correct: 1 },
    { question: "ما هو العنصر الرئيسي الذي يستخدم في تصنيع الدوائر الإلكترونية؟", answers: ["الحديد", "النحاس", "السيليكون"], correct: 2 },
    { question: "ما هو الاسم الذي يُطلق على برامج التحكم في الأجهزة؟", answers: ["أنظمة التشغيل", "التطبيقات", "المتصفحات"], correct: 0 },
    { question: "ما هو اختصار 'الذكاء الاصطناعي'؟", answers: ["AI", "BI", "SI"], correct: 0 },
    { question: "ما هي لغة البرمجة التي تم تطويرها خصيصًا لتطبيقات الويب؟", answers: ["بايثون", "جافا", "جافا سكريبت"], correct: 2 },
    { question: "ما هو الاسم الذي يُطلق على عملية حماية المعلومات من الوصول غير المصرح به؟", answers: ["التشفير", "التحقق", "التخزين"], correct: 0 },
    { question: "ما هو بروتوكول إرسال البريد الإلكتروني؟", answers: ["IMAP", "POP3", "SMTP"], correct: 2 },
    { question: "ما هو المصطلح الذي يُستخدم لوصف شبكة الإنترنت من الأشياء؟", answers: ["IoT", "AI", "ML"], correct: 0 },
    { question: "ما هو الاسم الذي يُطلق على الشفرات البرمجية المستخدمة في تطوير البرمجيات؟", answers: ["الكود", "النص", "البيانات"], correct: 0 },
    { question: "ما هو العنصر الذي يجعل الكمبيوتر يقوم بمعالجة البيانات؟", answers: ["وحدة المعالجة المركزية", "الذاكرة", "القرص الصلب"], correct: 0 },
    { question: "ما هو المجال الذي يدرس الأمان السيبراني؟", answers: ["الأمن المعلوماتي", "التشفير", "الشبكات"], correct: 0 },
    { question: "ما هو نوع البيانات المستخدمة في تخزين الصور الرقمية؟", answers: ["JPEG", "HTML", "XML"], correct: 0 },
    ],
    medicalQuestions: [
    { question: "ما هو الجهاز الذي ينظم دقات القلب؟", answers: ["الرئتين", "الكبد", "الجهاز القلبي"], correct: 2 },
    { question: "ما هو مصطلح 'الطب البديل'؟", answers: ["العلاج التقليدي", "العلاج بالأعشاب", "العلاج الكيميائي"], correct: 1 },
    { question: "ما هو الهرمون الذي يتحكم في مستويات السكر في الدم؟", answers: ["الأنسولين", "الأدرينالين", "الكورتيزول"], correct: 0 },
    { question: "ما هي وظيفة الكبد في جسم الإنسان؟", answers: ["تنقية الدم", "تخزين الدهون", "تخزين الجلوكوز"], correct: 0 },
    { question: "ما هو مصطلح 'الحساسية'؟", answers: ["رد فعل الجسم تجاه مادة معينة", "مرض مزمن", "عدوى فيروسية"], correct: 0 },
    { question: "ما هو الاختبار الذي يستخدم لتشخيص مرض السكري؟", answers: ["اختبار الجلوكوز", "اختبار الكوليسترول", "اختبار ضغط الدم"], correct: 0 },
    { question: "ما هو الاسم العلمي لمرض ارتفاع ضغط الدم؟", answers: ["الحمى", "الفرط ضغط الدم", "السكر"], correct: 1 },
    { question: "ما هو الجزء الذي يقوم بنقل الأكسجين في الدم؟", answers: ["الكريات الحمراء", "الكريات البيضاء", "الصفيحات الدموية"], correct: 0 },
    { question: "ما هي الحالة التي تتسبب في ضعف الذاكرة؟", answers: ["الخرف", "الاكتئاب", "القلق"], correct: 0 },
    { question: "ما هو العضو المسؤول عن إفراز الأنسولين؟", answers: ["الكبد", "البنكرياس", "الطحال"], correct: 1 },
    { question: "ما هو أفضل وسيلة للوقاية من الأمراض المعدية؟", answers: ["التطعيم", "تناول الأدوية", "النوم الكافي"], correct: 0 },
    { question: "ما هو المصطلح الذي يُستخدم لوصف عدوى فيروسية في الجهاز التنفسي؟", answers: ["الإنفلونزا", "البرد", "الزكام"], correct: 0 },
    { question: "ما هو العنصر الغذائي الضروري لصحة العظام؟", answers: ["الكالسيوم", "البروتين", "الحديد"], correct: 0 },
    { question: "ما هو الاختبار الذي يُستخدم للكشف عن فيروس الإيدز؟", answers: ["اختبار ELISA", "اختبار الدم", "اختبار الجلوكوز"], correct: 0 },
    { question: "ما هو المرض الذي يتميز بارتفاع نسبة الكوليسترول في الدم؟", answers: ["ارتفاع ضغط الدم", "أمراض القلب", "السكري"], correct: 1 },
    { question: "ما هي الأدوية المستخدمة لتخفيف الألم؟", answers: ["المسكنات", "المضادات الحيوية", "المهدئات"], correct: 0 },
    ],
    mathematicsQuestions: [
    { question: "ما هو حاصل جمع 5 + 7؟", answers: ["10", "11", "12"], correct: 2 },
    { question: "ما هو العدد الأول الذي يلي 10؟", answers: ["11", "12", "13"], correct: 0 },
    { question: "ما هو مضاعف العدد 6؟", answers: ["12", "18", "24"], correct: 0 },
    { question: "ما هو ناتج 9 × 8؟", answers: ["72", "81", "90"], correct: 0 },
    { question: "ما هو الجذر التربيعي للعدد 16؟", answers: ["2", "4", "8"], correct: 1 },
    { question: "ما هو محيط الدائرة إذا كان قطرها 10 سم؟", answers: ["31.4 سم", "15.7 سم", "20 سم"], correct: 0 },
    { question: "ما هي معادلة الخط المستقيم في الرياضيات؟", answers: ["y = mx + b", "y = ax^2 + bx + c", "x^2 + y^2 = r^2"], correct: 0 },
    { question: "ما هو مجموع زوايا مثلث؟", answers: ["90 درجة", "180 درجة", "360 درجة"], correct: 1 },
    { question: "إذا كان x = 3، فما هو ناتج 2x + 5؟", answers: ["11", "8", "10"], correct: 0 },
    { question: "ما هو الكسر الذي يمثل 50%؟", answers: ["1/2", "1/4", "3/4"], correct: 0 },
    { question: "ما هو العدد الذي يأتي بعد 100 مباشرة؟", answers: ["99", "101", "102"], correct: 1 },
    { question: "ما هي الزاوية القائمة؟", answers: ["45 درجة", "90 درجة", "180 درجة"], correct: 1 },
    { question: "إذا كان لدينا مستطيل طوله 4 سم وعرضه 3 سم، فما هو مساحته؟", answers: ["12 سم²", "7 سم²", "10 سم²"], correct: 0 },
    { question: "ما هو مجموع الأعداد 1 + 2 + 3 + 4 + 5؟", answers: ["10", "11", "15"], correct: 1 },
    { question: "ما هو الاسم الآخر للعدد المربع؟", answers: ["عدد صحيح", "عدد كسري", "عدد صحيح مربع"], correct: 2 },
    { question: "ما هو القيمتان المتساويتان في المعادلة x + 3 = 7؟", answers: ["3", "4", "5"], correct: 1 },
    ],
    chemistryQuestions: [
    { question: "ما هو العنصر الكيميائي الذي يرمز له بالرمز 'H'؟", answers: ["الهيليوم", "الهيدروجين", "الأكسجين"], correct: 1 },
    { question: "ما هي صيغة الماء الكيميائية؟", answers: ["H2O", "CO2", "O2"], correct: 0 },
    { question: "ما هو الغاز الذي نعتبره غاز التنفس؟", answers: ["الأكسجين", "النيتروجين", "ثاني أكسيد الكربون"], correct: 0 },
    { question: "ما هو الرقم الذري للذهب؟", answers: ["29", "47", "79"], correct: 1 },
    { question: "ما هي قاعدة أوغست؟", answers: ["تحكم تفاعل العناصر", "توازن الشحنات", "توازن الوزن"], correct: 1 },
    { question: "ما هي المادة التي تكون قادرة على توصيل الكهرباء؟", answers: ["الموصلات", "العوازل", "الغازات"], correct: 0 },
    { question: "ما هو نوع التفاعل الكيميائي الذي يحدث عند احتراق الوقود؟", answers: ["تفاعل كيميائي", "تفاعل احتراقي", "تفاعل اختزالي"], correct: 1 },
    { question: "ما هو العنصر الذي يعتبر الأكثر وفرة في القشرة الأرضية؟", answers: ["الأكسجين", "السيليكون", "الحديد"], correct: 0 },
    { question: "ما هي وحدة قياس الضغط؟", answers: ["باوند", "باسكال", "كغ"], correct: 1 },
    { question: "ما هو التحليل الكهربائي؟", answers: ["تفاعل كيميائي", "تحليل العناصر بواسطة الكهرباء", "تفاعل فيزيائي"], correct: 1 },
    { question: "ما هو نوع الروابط بين الذرات في المركبات الأيونية؟", answers: ["رابطة تساهمية", "رابطة أيونية", "رابطة هيدروجينية"], correct: 1 },
    { question: "ما هو تفاعل الإزاحة؟", answers: ["تفاعل بين حمض وقاعدة", "تفاعل بين عنصرين", "تفاعل معقد"], correct: 1 },
    { question: "ما هو الرقم الهيدروجيني للماء النقي؟", answers: ["0", "7", "14"], correct: 1 },
    { question: "ما هو المركب الكيميائي الذي يتكون من الهيدروجين والكربون فقط؟", answers: ["الهيدروكربونات", "الكربوهيدرات", "الألكانات"], correct: 0 },
    { question: "ما هي خاصية المواد التي تعتمد على مقدار الكتلة والحجم؟", answers: ["الكثافة", "الوزن", "الطاقة"], correct: 0 },
    { question: "ما هي العوامل التي تؤثر على سرعة التفاعل الكيميائي؟", answers: ["الحرارة", "التركيز", "كلاهما"], correct: 2 },
    ],
    physicsQuestions: [
    { question: "ما هو القانون الذي ينص على أن لكل فعل هناك رد فعل متساوي ومعاكس؟", answers: ["قانون نيوتن الأول", "قانون نيوتن الثاني", "قانون نيوتن الثالث"], correct: 2 },
    { question: "ما هي وحدة قياس القوة؟", answers: ["الكيلوغرام", "النيوتن", "الواط"], correct: 1 },
    { question: "ما هي الطاقة التي يمتلكها جسم بسبب حركته؟", answers: ["الطاقة الكامنة", "الطاقة الحركية", "الطاقة الحرارية"], correct: 1 },
    { question: "ما هو العنصر الذي يستخدم في صناعة المغناطيس؟", answers: ["الحديد", "النحاس", "الألمنيوم"], correct: 0 },
    { question: "ما هي سرعة الضوء في الفراغ؟", answers: ["300000 كم/ث", "150000 كم/ث", "600000 كم/ث"], correct: 0 },
    { question: "ما هو المبدأ الذي ينص على أن الضغط في سائل غير متوازن يتوزع بالتساوي؟", answers: ["مبدأ أرخميدس", "مبدأ باسكال", "مبدأ نيوتن"], correct: 1 },
    { question: "ما هي المادة التي لا يمكن كسرها؟", answers: ["الماء", "الألومنيوم", "الأرض"], correct: 2 },
    { question: "ما هو الاسم الذي يطلق على المسافة التي تقطعها الموجة في وحدة الزمن؟", answers: ["التردد", "السرعة", "الطول"], correct: 1 },
    { question: "ما هي الطاقة الناتجة عن وضع الجسم في موضع مرتفع؟", answers: ["الطاقة الحركية", "الطاقة الكامنة", "الطاقة الكهربائية"], correct: 1 },
    { question: "ما هو مصطلح 'الاحتكاك' في الفيزياء؟", answers: ["قوة تؤثر على الحركة", "قوة بين جسمين", "قوة ضد الجاذبية"], correct: 0 },
    { question: "ما هي وحدة قياس الطاقة؟", answers: ["الجول", "الكيلوغرام", "الواط"], correct: 0 },
    { question: "ما هو القانون الذي ينص على أن الطاقة لا تفنى ولا تستحدث ولكن تتحول من شكل إلى آخر؟", answers: ["قانون الديناميكا الحرارية الأول", "قانون الديناميكا الحرارية الثاني", "قانون نيوتن الأول"], correct: 0 },
    { question: "ما هو المبدأ الذي ينص على أن الموجات الصوتية تحتاج إلى وسط للانتقال؟", answers: ["مبدأ الصوت", "مبدأ السكون", "مبدأ الحركة"], correct: 0 },
    { question: "ما هو الشكل الوحيد للموجات التي يمكنها الانتقال في الفراغ؟", answers: ["الموجات الصوتية", "الموجات الضوئية", "الموجات المائية"], correct: 1 },
    { question: "ما هو الاسم الذي يطلق على تغير الحالة من الغاز إلى السائل؟", answers: ["التبخر", "التكثف", "التجمد"], correct: 1 },
    { question: "ما هو الاسم الذي يطلق على الخاصية التي تجعل المواد تحتفظ بالشحنة الكهربائية؟", answers: ["الديالكتيك", "التوصيل", "الاحتكاك"], correct: 0 },
],
};

// إزالة حفظ النقاط في المتصفح
window.onload = function() {
    const savedName = localStorage.getItem("userName");
    const savedPassword = localStorage.getItem("password");
    
    if (savedName) {
        document.getElementById("first-name").value = savedName.split(" ")[0];
        document.getElementById("last-name").value = savedName.split(" ")[1];
    }
    if (savedPassword) {
        document.getElementById("password").value = savedPassword;
    }

    points = 0; // إعادة تعيين النقاط عند تحميل الصفحة
    updatePointsDisplay(); // تحديث عرض النقاط
};

// رابط الأحداث للأزرار
document.getElementById("start-btn").addEventListener("click", confirmPassword);
document.getElementById("next-btn").addEventListener("click", submitNames);
document.getElementById("begin-quiz-btn").addEventListener("click", startQuizFlow);
document.getElementById("start-quiz-btn").addEventListener("click", loadQuestionsForLevel);

function confirmPassword() {
    const passwordInput = document.getElementById("password").value;
    if (passwordInput === password) {
        document.getElementById("name-screen").style.display = "block";
        document.getElementById("welcome-screen").style.display = "none";
    } else {
        document.getElementById("message").innerText = "كلمة السر غير صحيحة!";
    }
}

function submitNames() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    userName = firstName + " " + lastName;
    
    // حفظ المعلومات في المتصفح
    localStorage.setItem("userName", userName);
    localStorage.setItem("password", password); // احفظ كلمة السر

    document.getElementById("name-screen").style.display = "none";
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)].replace("[NAME]", userName);
    document.getElementById("greeting-message").innerText = randomGreeting;
    document.getElementById("greeting-screen").style.display = "block";
}

function startQuizFlow() {
    document.getElementById("greeting-screen").style.display = "none";
    document.getElementById("rules-screen").style.display = "block";
}

function loadQuestionsForLevel() {
    document.getElementById("rules-screen").style.display = "none"; // إخفاء القوانين
    currentQuestionIndex = 0;
    score = 0;
    changeLevelColor(currentLevel); // تغيير لون المستوى عند بدء المستوى
    showQuestion();
}

function changeLevelColor(level) {
    document.body.style.backgroundColor = levelColors[level]; // تغيير لون الخلفية
    const buttons = document.querySelectorAll(".answer-btn"); // جميع أزرار الإجابة
    buttons.forEach(button => {
        button.style.backgroundColor = levelColors[level]; // تغيير لون الأزرار
    });
}

function showQuestion() {
    const questionObj = questions[Object.keys(questions)[currentLevel]][currentQuestionIndex];
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("question").innerText = questionObj.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = '';

    questionObj.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const questionObj = questions[Object.keys(questions)[currentLevel]][currentQuestionIndex];
    if (selectedIndex === questionObj.correct) {
        score++;
        points += 1; // أضف 10 نقاط للإجابة الصحيحة
        updatePointsDisplay(); // تحديث عرض النقاط
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions[Object.keys(questions)[currentLevel]].length) {
        showQuestion();
    } else {
        checkLevelCompletion();
    }
}

function updatePointsDisplay() {
    document.getElementById("points-display").innerText = `النقاط: ${points}`;
}

// عرض النقاط في HTML
function showPointsDisplay() {
    const pointsDisplay = document.createElement("p");
    pointsDisplay.id = "points-display";
    pointsDisplay.innerText = `النقاط: ${points}`;
    document.body.appendChild(pointsDisplay); // أضف النقاط إلى الصفحة
}

function checkLevelCompletion() {
    const requiredCorrect = levels[currentLevel].requiredCorrect;
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    if (score >= requiredCorrect) {
        document.getElementById("result-message").innerText = `تهانينا! لقد اجتزت ${levels[currentLevel].name}.`;
        document.getElementById("next-level-btn").style.display = "block";
    } else {
        document.getElementById("result-message").innerText = `للأسف، لم تتمكن من اجتياز ${levels[currentLevel].name}.`;
        document.getElementById("next-level-btn").style.display = "none";
    }
}

document.getElementById("next-level-btn").addEventListener("click", () => {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        document.getElementById("result-screen").style.display = "none";
        loadQuestionsForLevel(); // تحميل الأسئلة للمستوى التالي
    } else {
        showFinalCertificate();
    }
});

function showFinalCertificate() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("certificate-screen").style.display = "block";
    document.getElementById("certificate-name").innerText = userName;

    const today = new Date();
    const dateString = today.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeString = today.toLocaleTimeString('ar-EG'); // الحصول على الوقت الحالي

    document.getElementById("certificate-date").innerText = dateString;
    document.getElementById("certificate-time").innerText = timeString; // عرض الوقت

    localStorage.setItem("points", points); // حفظ النقاط في المتصفح
}