const navigation = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const navigationLinks = navigation?.querySelectorAll('a');
const srOnlyLabel = menuToggle?.querySelector('.sr-only');

const closeNavigation = () => {
  if (!navigation || !menuToggle) return;
  navigation.classList.remove('nav--open');
  menuToggle.setAttribute('aria-expanded', 'false');
  if (srOnlyLabel) {
    srOnlyLabel.textContent = 'Abrir menu';
  }
};

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = navigation.classList.toggle('nav--open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (srOnlyLabel) {
      srOnlyLabel.textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation.classList.contains('nav--open')) return;
    const target = event.target;
    if (target instanceof Node && !navigation.contains(target) && target !== menuToggle) {
      closeNavigation();
    }
  });

  navigationLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 800) {
        closeNavigation();
      }
    });
  });
}

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const contactForm = document.querySelector('.contact__form');
const formMessage = contactForm?.querySelector('.form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Por favor, preencha os campos obrigatórios.';
      formMessage.classList.add('form-message--error');
      return;
    }

    if (!isValidEmail(email)) {
      formMessage.textContent = 'Informe um e-mail válido para receber nosso retorno.';
      formMessage.classList.add('form-message--error');
      return;
    }

    formMessage.classList.remove('form-message--error');
    const firstName = name.split(' ')[0];
    formMessage.textContent = `Obrigado, ${firstName}! Recebemos sua mensagem e retornaremos em breve.`;
    contactForm.reset();
  });
}

const currentYear = document.querySelector('[data-current-year]');
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
