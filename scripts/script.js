// Обработка формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено!');
            this.reset();
        });
    }
    
    // Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Здесь можно добавить логику фильтрации проектов
            console.log('Фильтр: ' + this.textContent);
        });
    });
    
    // Обработка кнопки добавления записи в дневник
    const addEntryBtn = document.querySelector('.add-entry-btn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            alert('Форма добавления новой записи');
        });
    }
    
    // Подсветка активной ссылки в навигации
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});