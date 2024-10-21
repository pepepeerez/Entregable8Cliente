let carrito = [];
const carritoElement = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

function agregarCurso(event) {
    if (event.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = event.target.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };


    const existe = carrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
      
        const cursos = carrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        carrito = [...cursos];
    } else {
        
        carrito = [...carrito, infoCurso];
    }

   
    carritoHTML();
}


function eliminarCurso(event) {
    if (event.target.classList.contains('borrar-curso')) {
        const cursoId = event.target.getAttribute('data-id');
        carrito = carrito.filter(curso => curso.id !== cursoId);
        carritoHTML();  
    }
}


function vaciarCarrito() {
    carrito = [];  
    limpiarHTML(); 
}


function carritoHTML() {
    
    limpiarHTML();

    carrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
        carritoElement.appendChild(row);
    });
}


function limpiarHTML() {
    while (carritoElement.firstChild) {
        carritoElement.removeChild(carritoElement.firstChild);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('#lista-cursos').addEventListener('click', agregarCurso);


    document.querySelector('#carrito').addEventListener('click', eliminarCurso);

    
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

});
