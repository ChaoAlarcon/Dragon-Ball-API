// Obtener referencias a los elementos del DOM (HTML)
const searchBox = document.getElementById('searchBox');
const resultsContainer = document.getElementById('results');

// Variable para almacenar todos los personajes
let allCharacters = [];

/**
 * Función asíncrona para cargar todos los personajes desde la API
 */
async function loadCharacters() {
  try {
    // Realizar la petición a la API de Dragon Ball
    const response = await fetch('https://dragonball-api.com/api/characters');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parsear la respuesta y guardar los personajes en allCharacters
    const data = await response.json();
    allCharacters = data.items || [];
  } catch (error) {
    // Manejar errores de la petición
    console.error('Error al obtener datos de la API:', error);
    resultsContainer.innerHTML = '<p>Error al obtener datos de la API. Verifica si la API está disponible y permite peticiones CORS.</p>';
  }
}

// Llamar a la función para cargar los personajes al iniciar
loadCharacters();

/**
 * Evento que se dispara cada vez que el usuario escribe en el cuadro de búsqueda
 */
searchBox.addEventListener('input', () => {
  // Obtener el texto de búsqueda y limpiar el contenedor de resultados
  const query = searchBox.value.trim().toLowerCase();
  resultsContainer.innerHTML = '';

  // Solo buscar si hay más de un carácter en la búsqueda
  if (query.length > 1) {
    // Filtrar los personajes cuyo nombre incluya el texto de búsqueda
    const filtered = allCharacters.filter(character =>
      character.name.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      // Mostrar cada personaje filtrado en una tarjeta
      filtered.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${character.image}" alt="${character.name}">
          <h3>${character.name}</h3>
          <p><strong>Raza:</strong> ${character.race || 'Desconocida'}</p>
          <p><strong>Universo:</strong> ${character.universe || 'Desconocido'}</p>
        `;
        resultsContainer.appendChild(card);
      });
    } else {
      // Mensaje si no se encontraron personajes
      resultsContainer.innerHTML = '<p>No se encontraron personajes.</p>';
    }
  }
});