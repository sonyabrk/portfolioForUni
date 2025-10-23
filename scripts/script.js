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
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            const filterValue = this.textContent.toLowerCase();
            
            // Сопоставление сокращений с полными названиями технологий
            const techMapping = {
                'js': 'javascript',
                'ts': 'typescript'
            };
            
            const searchTech = techMapping[filterValue] || filterValue;
            
            projectItems.forEach(item => {
                const itemTech = item.getAttribute('data-tech');
                
                if (filterValue === 'все' || itemTech.includes(searchTech)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
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