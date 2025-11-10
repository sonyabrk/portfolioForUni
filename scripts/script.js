// Обработка всех функций сайта
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const filterStatus = document.getElementById('filter-status');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Обновляем состояние кнопок
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                const filterValue = this.getAttribute('data-filter');
                let visibleCount = 0;
                
                // Фильтруем проекты
                projectItems.forEach(item => {
                    const itemTech = item.getAttribute('data-tech');
                    
                    if (filterValue === 'all' || itemTech.includes(filterValue)) {
                        item.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        item.classList.add('hidden');
                    }
                });
                
                // Обновляем статус для скринридеров
                updateFilterStatus(filterValue, visibleCount);
            });
            
            // Добавляем обработку клавиатуры для кнопок фильтров
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    function updateFilterStatus(filter, count) {
        const filterNames = {
            'all': 'все',
            'html': 'HTML',
            'javascript': 'JavaScript',
            'typescript': 'TypeScript',
            'scss': 'SCSS',
            'react': 'React'
        };
        
        const filterName = filterNames[filter] || filter;
        const projectWord = getProjectWord(count);
        
        if (filterStatus) {
            filterStatus.textContent = `Показаны проекты с технологией ${filterName}. Найдено ${count} ${projectWord}`;
        }
    }
    
    function getProjectWord(count) {
        if (count % 10 === 1 && count % 100 !== 11) return 'проект';
        if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'проекта';
        return 'проектов';
    }

    // ========== УЛУЧШЕННАЯ ОБРАБОТКА ФОРМЫ КОНТАКТОВ ==========
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        // Добавляем обработчики для валидации в реальном времени
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Сбрасываем ошибку при вводе
                if (this.getAttribute('aria-invalid') === 'true') {
                    clearFieldError(this);
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация всех полей
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm();
            } else {
                // Фокусируемся на первом поле с ошибкой
                const firstError = contactForm.querySelector('[aria-invalid="true"]');
                if (firstError) {
                    firstError.focus();
                }
                
                // Сообщаем об ошибках
                announceFormStatus('В форме есть ошибки. Пожалуйста, исправьте их и попробуйте снова.');
            }
        });
        
        // Улучшенная навигация по форме с клавиатуры
        contactForm.addEventListener('keydown', function(e) {
            // Обработка Escape для сброса формы
            if (e.key === 'Escape' && document.activeElement.tagName !== 'BODY') {
                e.preventDefault();
                contactForm.reset();
                clearAllErrors();
                announceFormStatus('Форма сброшена.');
            }
            
            // Навигация между полями с помощью Ctrl+стрелки
            if (e.ctrlKey) {
                const fields = Array.from(contactForm.querySelectorAll('input, textarea, button'));
                const currentIndex = fields.indexOf(document.activeElement);
                
                if (e.key === 'ArrowDown' && currentIndex < fields.length - 1) {
                    e.preventDefault();
                    fields[currentIndex + 1].focus();
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    e.preventDefault();
                    fields[currentIndex - 1].focus();
                }
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        const errorElement = document.getElementById(fieldId + '-error');
        
        // Очищаем предыдущую ошибку
        clearFieldError(field);
        
        let isValid = true;
        let errorMessage = '';
        
        switch (fieldId) {
            case 'name':
                if (!value) {
                    errorMessage = 'Пожалуйста, введите ваше имя';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Имя должно содержать 2 символа';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value) {
                    errorMessage = 'Пожалуйста, введите email адрес';
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    errorMessage = 'Пожалуйста, введите корректный email адрес';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    errorMessage = 'Пожалуйста, введите сообщение';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Сообщение должно содержать 10 символов';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.setAttribute('aria-invalid', 'true');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        field.setAttribute('aria-invalid', 'false');
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm() {
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Показываем состояние загрузки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        submitBtn.setAttribute('aria-busy', 'true');
        
        // Имитация отправки формы
        setTimeout(() => {
            // Сбрасываем форму
            contactForm.reset();
            
            // Восстанавливаем кнопку
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить сообщение';
            submitBtn.removeAttribute('aria-busy');
            
            // Показываем сообщение об успехе
            announceFormStatus('Сообщение успешно отправлено! Отвечу вам в ближайшее время.');
            
            // Добавляем визуальную обратную связь
            contactForm.classList.add('form-success');
            setTimeout(() => {
                contactForm.classList.remove('form-success');
            }, 3000);
            
        }, 1500);
    }
    
    function announceFormStatus(message) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.classList.remove('visually-hidden');
            
            // Через некоторое время скрываем сообщение
            setTimeout(() => {
                formStatus.classList.add('visually-hidden');
                formStatus.textContent = '';
            }, 5000);
        }
        
        // Также объявляем через ARIA live region
        const liveAnnouncement = document.createElement('div');
        liveAnnouncement.setAttribute('aria-live', 'polite');
        liveAnnouncement.setAttribute('aria-atomic', 'true');
        liveAnnouncement.className = 'visually-hidden';
        liveAnnouncement.textContent = message;
        document.body.appendChild(liveAnnouncement);
        
        setTimeout(() => {
            document.body.removeChild(liveAnnouncement);
        }, 100);
    }
    
    function clearAllErrors() {
        if (!contactForm) return;
        const errorFields = contactForm.querySelectorAll('[aria-invalid="true"]');
        errorFields.forEach(field => {
            clearFieldError(field);
        });
    }
    
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
    
    // Улучшенная навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        // Закрытие модальных окон по Escape (если есть)
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                // Функция closeModal должна быть определена, если есть модальные окна
                if (typeof closeModal === 'function') {
                    closeModal();
                }
            }
        }
        
        // Навигация по фильтрам с помощью стрелок (только если есть фильтры на странице)
        if (e.target.classList.contains('filter-btn') && filterButtons.length > 0) {
            const currentIndex = Array.from(filterButtons).indexOf(e.target);
            
            if (e.key === 'ArrowRight' && currentIndex < filterButtons.length - 1) {
                e.preventDefault();
                filterButtons[currentIndex + 1].focus();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                filterButtons[currentIndex - 1].focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                filterButtons[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                filterButtons[filterButtons.length - 1].focus();
            }
        }
    });

    const addEntryBtn = document.querySelector('.add-entry-btn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            alert('Функция добавления новой записи будет реализована в будущем');
        });
    }

    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage.includes(linkHref) || 
            (currentPage.endsWith('/') && linkHref === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
});