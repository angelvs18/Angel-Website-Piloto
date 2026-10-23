const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const WHATSAPP = '529933053417';
const EMAIL = 'angel.maamx@gmail.com';

// ---------- Aparición al hacer scroll (una sola vez) ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// ---------- Menú en teléfono ----------
const menuButton = document.querySelector('.nav__menu');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

menuButton.addEventListener('click', () => setMenu(!navLinks.classList.contains('is-open')));
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        setMenu(false);
        menuButton.focus();
    }
});

// ---------- Solicitud de soporte ----------
const SERVICES = {
    'Computadoras': ['Mantenimiento preventivo', 'Diagnóstico y reparación', 'SSD y memoria RAM', 'Formateo e instalación', 'Virus y lentitud', 'Otro'],
    'Redes e internet': ['Instalación de red y Wi‑Fi', 'Cableado estructurado', 'Internet lento o con cortes', 'Impresoras compartidas', 'Seguridad de red', 'Otro'],
    'Asesoría TI': ['Compra de equipo', 'Respaldos en la nube', 'Correo y cuentas', 'Soporte remoto', 'Plan de mantenimiento', 'Otro'],
    'Programación': ['Sitio web o landing page', 'Sistema a la medida con PHP y Laravel', 'Aplicación con Angular', 'Interfaz con React', 'Backend o automatización con Python', 'Odoo, Shopify o WordPress', 'Otro proyecto'],
};

// Textos que cambian si el visitante pide programación en lugar de soporte
const COPY = {
    support: { intro: 'Hola Angel, quiero solicitar soporte TI.', label: '¿Qué pasa?', placeholder: 'Ej. la laptop no enciende desde ayer', subject: 'Soporte TI' },
    code: { intro: 'Hola Angel, quiero cotizar un proyecto de programación.', label: '¿Qué necesitas?', placeholder: 'Ej. un sitio para mi negocio con catálogo', subject: 'Cotización' },
};

const request = document.querySelector('.cta');
const requestForm = document.getElementById('it-request');
const serviceSelect = document.getElementById('req-service');
const nameInput = document.getElementById('req-name');
const detailInput = document.getElementById('req-detail');
const requestText = requestForm.querySelector('[data-req-text]');
const mailLink = requestForm.querySelector('[data-req-mail]');
const detailLabel = requestForm.querySelector('[data-detail-label]');

// Una sola lista con todos los servicios, agrupados por área.
// El valor guarda "área|servicio" para distinguir los "Otro" de cada grupo.
serviceSelect.append(new Option('Elige un servicio…', ''));
Object.entries(SERVICES).forEach(([area, items]) => {
    const group = document.createElement('optgroup');
    group.label = area;
    items.forEach((item) => group.append(new Option(item, `${area}|${item}`)));
    serviceSelect.append(group);
});

function selected() {
    const [area = '', service = ''] = serviceSelect.value.split('|');
    return { area, service };
}

function copy() {
    return selected().area === 'Programación' ? COPY.code : COPY.support;
}

function requestMessage() {
    const { area, service } = selected();
    const lines = [copy().intro];
    if (service) lines.push(`Área: ${area}`, `Servicio: ${service}`);
    if (nameInput.value.trim()) lines.push(`Nombre: ${nameInput.value.trim()}`);
    if (detailInput.value.trim()) lines.push(`Detalle: ${detailInput.value.trim()}`);
    return lines.join('\n');
}

function syncRequest() {
    detailLabel.textContent = copy().label;
    detailInput.placeholder = copy().placeholder;
    const text = requestMessage();
    requestText.value = text;
    const { area, service } = selected();
    const what = service.startsWith('Otro') ? `${area} (otro)` : service;
    const subject = service ? `${copy().subject}: ${what}` : copy().subject;
    mailLink.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

[serviceSelect, nameInput, detailInput].forEach((el) => el.addEventListener('input', syncRequest));
serviceSelect.addEventListener('change', syncRequest);
syncRequest();

// Los botones "Solicitar" de cada tarjeta preseleccionan el primer servicio de su área
document.querySelectorAll('[data-pick]').forEach((link) => {
    link.addEventListener('click', () => {
        const first = [...serviceSelect.querySelectorAll('optgroup')]
            .find((g) => g.label === link.dataset.pick)?.querySelector('option');
        if (first && !serviceSelect.value.startsWith(`${link.dataset.pick}|`)) {
            serviceSelect.value = first.value;
            syncRequest();
        }
        request.classList.remove('is-flash');
        void request.offsetWidth;
        request.classList.add('is-flash');
        setTimeout(() => serviceSelect.focus({ preventScroll: true }), reduceMotion.matches ? 0 : 500);
    });
});

requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    syncRequest();
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(requestText.value)}`, '_blank', 'noopener');
});

// ---------- Año del pie ----------
document.querySelector('[data-year]').textContent = new Date().getFullYear();
