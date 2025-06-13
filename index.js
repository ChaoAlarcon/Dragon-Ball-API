   // Variables globales
let personajesTotales = []; // Almacena todos los personajes
let paginaActual = 1; // Página actual
const elementosPorPagina = 20; // Número de personajes por página

// Función para obtener todos los personajes desde la API paginada
async function obtenerTodosLosPersonajes() {
  let personajes = [];
  let pagina = 1;
  let hayMas = true;

  while (hayMas) {
    const respuesta = await fetch(`https://dragonball-api.com/api/characters?page=${pagina}`);
    const datos = await respuesta.json();

    if (datos.items && datos.items.length > 0) {
      personajes = personajes.concat(datos.items);
      pagina++;
    } else {
      hayMas = false;
    }
  }

  return personajes;
}

// Función principal de búsqueda y filtrado
async function filtrarPersonajes() {
  const nombre = document.getElementById('name').value.toLowerCase();
  const raza = document.getElementById('race').value;
  const genero = document.getElementById('gender').value;

  if (personajesTotales.length === 0) {
    personajesTotales = await obtenerTodosLosPersonajes();
  }

  const filtrados = personajesTotales.filter(personaje => {
    return (!nombre || personaje.name.toLowerCase().includes(nombre)) &&
           (!raza || personaje.race === raza) &&
           (!genero || personaje.gender === genero);
  });

  mostrarResultados(filtrados);
}

// Muestra los personajes en la interfaz
function mostrarResultados(personajes) {
  const contenedorResultados = document.getElementById('results');
  contenedorResultados.innerHTML = '';

  const inicio = (paginaActual - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  const personajesPagina = personajes.slice(inicio, fin);

  if (personajesPagina.length === 0) {
    contenedorResultados.innerHTML = '<p>No se encontraron personajes.</p>';
    return;
  }

  personajesPagina.forEach(personaje => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'window carta-personaje card soft-shadow m-3';
    tarjeta.style.width = '300px';
    tarjeta.style.padding = '0';
    tarjeta.style.boxShadow = '8px 8px #171717';

    tarjeta.addEventListener('mouseover', () => {
    tarjeta.style.boxShadow = '0px 8px #171717';
});

tarjeta.addEventListener('mouseout', () => {
    tarjeta.style.boxShadow = '8px 15px #171717';
});
    

    tarjeta.innerHTML = `
      <div class="window-titlebar" style="background-color: #2a9d90;">
        <span class="title" style="font-size: 20px;">${personaje.name.toUpperCase()}</span>
        <button class="cerrar" data-bs-dismiss="modal" onclick="cerrarTarjeta(this)">X</button>
      </div>
      <div class="text-center">
        <img src="${personaje.image}" alt="${personaje.name}" style="width: 100px; height: auto; margin-bottom: 15px ; margin-top: 15px;">
        <p style="font-family: 'Press Start 2P', monospace; font-size: 20px; margin: 10px 0;">Race: ${personaje.race}</p>
        <p style="font-family: 'Press Start 2P', monospace; font-size: 20px;">Gender: ${personaje.gender}</p>
      </div>
    `;

    contenedorResultados.appendChild(tarjeta);
  });

  generarPaginacion(personajes.length);
}

// Crea la paginación
function generarPaginacion(totalElementos) {
  const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
  const paginacion = document.getElementById('pagination');
  paginacion.innerHTML = '';

  if (totalPaginas > 1) {
    const contenedor = document.createElement('div');
    contenedor.className = 'd-flex justify-content-center gap-2 flex-wrap w-100';

    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement('button');
      boton.textContent = i;
      boton.className = 'border-5 ';
      boton.onclick = () => {
        paginaActual = i;
        filtrarPersonajes();
      };

      if (i === paginaActual) {
        boton.style.fontWeight = 'bold';
      }

      contenedor.appendChild(boton);
    }

    const contenedorCentral = document.createElement('div');
    contenedorCentral.className = 'd-flex justify-content-center w-100';
    contenedorCentral.appendChild(contenedor);

    paginacion.appendChild(contenedorCentral);
  }
}

// Alterna visibilidad del título principal
function alternarTitulo() {
  const titulo = document.querySelector('.Título');
  titulo.classList.toggle('hidden');
}

function alternarSubtitulo() {
  const titulo = document.querySelector('.Subtítulo');
  titulo.classList.toggle('Subtítulo-hidden');
}

// Alterna visibilidad de la sección de modales
function alternarBotones() {
  const subtitulo = document.querySelector('.Botones');
  subtitulo.classList.toggle('Botones-hidden');
}



// Cierra una tarjeta con animación
function cerrarTarjeta(boton) {
  const tarjeta = boton.closest('.card');
  if (tarjeta) {
    tarjeta.style.transition = 'opacity 0.2s ease-out';
    tarjeta.style.opacity = '0';
  }
}

function hideTitle() {
    alternarTitulo();
  }

  function hideSubtitle() {
    alternarSubtitulo();
  }

  function hideBotones() {
    alternarBotones();
  }

 

// Botón para reiniciar la búsqueda
document.getElementById('resetBtn').addEventListener('click', () => {
  window.location.reload();
});
