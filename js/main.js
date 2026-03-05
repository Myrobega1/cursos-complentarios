// Datos de los cursos (simulando una API)
const cursosData = [
    {
        id: 1,
        titulo: "Programación Web Básica",
        descripcion: "Aprende HTML, CSS y JavaScript desde cero",
        imagen: "images/curso1.jpg",
        duracion: "40 horas",
        categoria: "tecnologia",
        estudiantes: 120,
        destacado: true
    },
    {
        id: 2,
        titulo: "Inglés Técnico para el Trabajo",
        descripcion: "Mejora tu inglés enfocado en el ámbito laboral",
        imagen: "images/curso2.jpg",
        duracion: "60 horas",
        categoria: "idiomas",
        estudiantes: 85,
        destacado: true
    },
    {
        id: 3,
        titulo: "Marketing Digital",
        descripcion: "Estrategias de marketing en redes sociales",
        imagen: "images/curso3.jpg",
        duracion: "35 horas",
        categoria: "empresarial",
        estudiantes: 95,
        destacado: true
    },
    {
        id: 4,
        titulo: "Diseño Gráfico con Adobe",
        descripcion: "Domina Photoshop e Illustrator",
        imagen: "images/curso4.jpg",
        duracion: "50 horas",
        categoria: "diseno",
        estudiantes: 70,
        destacado: false
    },
    {
        id: 5,
        titulo: "Excel Avanzado",
        descripcion: "Domina funciones, tablas dinámicas y macros",
        imagen: "images/curso5.jpg",
        duracion: "30 horas",
        categoria: "tecnologia",
        estudiantes: 150,
        destacado: true
    },
    {
        id: 6,
        titulo: "Habilidades Blandas",
        descripcion: "Comunicación, trabajo en equipo y liderazgo",
        imagen: "images/curso6.jpg",
        duracion: "25 horas",
        categoria: "empresarial",
        estudiantes: 110,
        destacado: false
    }
];

// Función para crear tarjetas de cursos
function crearTarjetaCurso(curso) {
    return `
        <div class="course-card" data-categoria="${curso.categoria}" data-duracion="${curso.duracion}">
            <img src="${curso.imagen}" alt="${curso.titulo}" class="course-card__image">
            <div class="course-card__content">
                <h3 class="course-card__title">${curso.titulo}</h3>
                <p class="course-card__description">${curso.descripcion}</p>
                <div class="course-card__meta">
                    <span><i class="far fa-clock"></i> ${curso.duracion}</span>
                    <span><i class="fas fa-users"></i> ${curso.estudiantes} estudiantes</span>
                </div>
                <a href="#" class="course-card__btn">Más información</a>
            </div>
        </div>
    `;
}

// Cargar cursos destacados en la página principal
function cargarCursosDestacados() {
    const container = document.getElementById('featured-courses');
    if (container) {
        const cursosDestacados = cursosData.filter(curso => curso.destacado);
        container.innerHTML = cursosDestacados.map(crearTarjetaCurso).join('');
    }
}

// Cargar todos los cursos
function cargarTodosLosCursos() {
    const container = document.getElementById('all-courses');
    if (container) {
        container.innerHTML = cursosData.map(crearTarjetaCurso).join('');
    }
}

// Filtrar cursos
function filtrarCursos() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoria = document.getElementById('categoryFilter')?.value || 'all';
    const duracion = document.getElementById('durationFilter')?.value || 'all';
    
    const cursosFiltrados = cursosData.filter(curso => {
        // Filtro por búsqueda
        const matchesSearch = curso.titulo.toLowerCase().includes(searchTerm) ||
                             curso.descripcion.toLowerCase().includes(searchTerm);
        
        // Filtro por categoría
        const matchesCategoria = categoria === 'all' || curso.categoria === categoria;
        
        // Filtro por duración
        let matchesDuracion = true;
        if (duracion !== 'all') {
            const horas = parseInt(curso.duracion);
            if (duracion === 'short') matchesDuracion = horas <= 40;
            else if (duracion === 'medium') matchesDuracion = horas > 40 && horas <= 60;
            else if (duracion === 'long') matchesDuracion = horas > 60;
        }
        
        return matchesSearch && matchesCategoria && matchesDuracion;
    });
    
    const container = document.getElementById('all-courses');
    if (container) {
        container.innerHTML = cursosFiltrados.map(crearTarjetaCurso).join('');
    }
}

// Animación de contadores
function animarContadores() {
    const contadores = document.querySelectorAll('.stat-number');
    
    contadores.forEach(contador => {
        const objetivo = parseInt(contador.getAttribute('data-target'));
        let actual = 0;
        const incremento = objetivo / 50; // Dividir en 50 pasos
        
        const actualizarContador = () => {
            actual += incremento;
            if (actual < objetivo) {
                contador.textContent = Math.round(actual);
                requestAnimationFrame(actualizarContador);
            } else {
                contador.textContent = objetivo;
            }
        };
        
        actualizarContador();
    });
}

// Menú móvil
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarCursosDestacados();
    cargarTodosLosCursos();
    animarContadores();
    initMobileMenu();
    initSmoothScroll();
    
    // Event listeners para filtros
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const durationFilter = document.getElementById('durationFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filtrarCursos);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filtrarCursos);
    }
    
    if (durationFilter) {
        durationFilter.addEventListener('change', filtrarCursos);
    }
});

// Validación de formulario de contacto (si existe)
function validarFormularioContacto() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica de validación
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (nombre && email && mensaje) {
                alert('Mensaje enviado correctamente. Pronto te contactaré.');
                form.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
}