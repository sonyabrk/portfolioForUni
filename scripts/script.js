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
    
    // ФИКС: Правильная фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активность со всех кнопок
                filterButtons.forEach(b => b.classList.remove('active'));
                // Добавляем активность текущей кнопке
                this.classList.add('active');
                
                const filterValue = this.textContent.trim().toLowerCase();
                console.log('Фильтр:', filterValue); // Для отладки
                
                // Сопоставление кнопок с технологиями в data-tech
                const techMapping = {
                    'все': 'all',
                    'html': 'html',
                    'js': 'javascript',
                    'ts': 'typescript', 
                    'scss': 'scss',
                    'react': 'react'
                };
                
                const searchTech = techMapping[filterValue];
                console.log('Ищем технологию:', searchTech); // Для отладки
                
                projectItems.forEach(item => {
                    const itemTech = item.getAttribute('data-tech');
                    console.log('Технологии проекта:', itemTech); // Для отладки
                    
                    if (filterValue === 'все' || itemTech.includes(searchTech)) {
                        item.style.display = 'block';
                        // Плавное появление
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Плавное исчезновение
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
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
        const linkHref = link.getAttribute('href');
        if (currentPage.includes(linkHref) || 
            (currentPage.endsWith('/') && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Ленивая загрузка изображений
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});