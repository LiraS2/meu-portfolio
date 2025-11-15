class FormValidator {
    constructor(formSelector, fieldRules) {
        this.form = document.querySelector(formSelector);
        this.fieldRules = fieldRules;
        this.errors = {};

        if (!this.form) {
            console.error(`Formulário com seletor "${formSelector}" não encontrado.`);
            return;
        }
    }

    init() {
        if (!this.form) return;

        this.form.setAttribute('novalidate', '');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.clearAllErrors();

        const isFormValid = this.validateAllFields();

        if (isFormValid) {

            const formData = new FormData(this.form);

            fetch(this.form.action, {
                method: this.form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert('E-mail enviado com sucesso!');
                        this.form.reset(); 
                    } else {
                        alert('Erro ao enviar. Verifique sua chave de acesso ou tente mais tarde.');
                    }
                })
                .catch(error => {
                    alert('Erro de rede. Tente novamente.');
                });
        }
    }

    validateAllFields() {
        let isAllValid = true;
        for (const fieldName in this.fieldRules) {
            const rules = this.fieldRules[fieldName];
            const inputElement = this.form.querySelector(`[name="${fieldName}"]`);

            if (!this.validateField(inputElement, rules)) {
                isAllValid = false;
            }
        }
        return isAllValid;
    }

    validateField(inputElement, rules) {
        const value = inputElement.value.trim();
        for (const rule of rules) {
            if (rule === 'required' && value === '') {
                this.showError(inputElement, `O campo é obrigatório.`);
                return false;
            }
            if (rule === 'email') {
                const emailRegex = /^\S+@\S+\.\S+$/;
                if (!emailRegex.test(value)) {
                    this.showError(inputElement, 'Por favor, insira um e-mail válido.');
                    return false;
                }
            }
        }
        return true;
    }

    showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.add('error');
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        formGroup.appendChild(errorSpan);
    }

    clearError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        if (!formGroup || !formGroup.classList.contains('error')) return;

        formGroup.classList.remove('error');
        const errorSpan = formGroup.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    clearAllErrors() {
        const errorGroups = this.form.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorSpan = group.querySelector('.error-message');
            if (errorSpan) errorSpan.remove();
        });
    }
}

class ScrollAnimator {
    constructor(elementSelector, observerOptions = {}) {
        this.elementsToAnimate = document.querySelectorAll(elementSelector);
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
            ...observerOptions
        };
    }

    init() {
        const observer = new IntersectionObserver(this.observerCallback.bind(this), this.observerOptions);
        this.elementsToAnimate.forEach(el => observer.observe(el));
    }

    observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactFormRules = {
        'name': ['required'],
        'email': ['required', 'email'],
        'message': ['required']
    };
    const formValidator = new FormValidator('#contact-form', contactFormRules);
    formValidator.init();

    const elementsToAnimateSelector = '.section-title, .card, .skill-item, #contact-form, .map-container';
    const scrollAnimator = new ScrollAnimator(elementsToAnimateSelector);
    scrollAnimator.init();
});