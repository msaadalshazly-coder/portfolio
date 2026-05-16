document.addEventListener('DOMContentLoaded', () => {
    
    // 1. كاش لعناصر الـ DOM الأساسية لضمان سرعة الاستجابة
    const navbar = document.querySelector('.custom-nav');
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    /**
     * 2. دالة التحكم الذكي في القائمة العلوية عند السكرول
     */
    function handleNavbar() {
        if (window.scrollY > 50) {
            // شكل الـ Navbar الاحترافي بالخلفية البيضاء والظل الخفيف جداً عند النزول
            navbar.classList.add('bg-white', 'shadow-sm');
            navbar.classList.remove('bg-transparent', 'navbar-dark');
        } else {
            // إعادة الوضع الأصلي (شفاف تماماً متناسق مع خلفية الهيرو الداكنة)
            navbar.classList.add('bg-transparent', 'navbar-dark');
            navbar.classList.remove('bg-white', 'shadow-sm');
        }
    }

    /**
     * 3. تفعيل الأنميشن الفائق السلاسة للعناصر عند ظهورها على الشاشة
     * باستخدام الـ Native Intersection Observer API (أقوى أداء بدون استهلاك للبطارية أو المعالج)
     */
    const observerOptions = {
        root: null,            // يراقب بالنسبة لمنطقة العرض الكاملة للمتصفح
        rootMargin: '0px 0px -40px 0px', // نقطة تشغيل الأنميشن بمرونة قبل دخول العنصر بالكامل
        threshold: 0.15        // يبدأ الأنميشن فور ظهور 15% من مساحة الكارت
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة كلاس الظهور
                entry.target.classList.add('show');
                // إلغاء مراقبة العنصر بمجرد ظهوره لتوفير موارد الجهاز تماماً
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // تفعيل المراقب الذكي على كافة الكروت والمشاريع المستهدفة
    scrollElements.forEach(element => scrollObserver.observe(element));

    /**
     * 4. مستمعي الأحداث والتشغيل الفوري
     */
    // مراقبة أحداث السكرول مع تمرير خاصية { passive: true } لتسريع استجابة شاشات الموبايل
    window.addEventListener('scroll', handleNavbar, { passive: true });

    // تشغيل أولي فوري للتأكد من الموضع المباشر للـ Navbar عند تفتيح وتحديث الصفحة
    handleNavbar();
});