// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el código
window.addEventListener("DOMContentLoaded", function(){

    // Obtiene referencias a los elementos del DOM por su ID
    let btnPeticion = this.document.getElementById("searchButton"); // Botón para buscar
    let input = this.document.getElementById("searchBox"); // Caja de texto para el nombre
    let img = this.document.getElementById("imagenPersonaje"); // Imagen del personaje
    let divInfo = this.document.getElementById("results"); // Div donde se muestra la info

    // Añade un listener al botón para ejecutar la función pedirPersonaje al hacer clic
    btnPeticion.addEventListener("click", pedirPersonaje);

    // Función que realiza la petición a la API y muestra el personaje
    function pedirPersonaje() {
        let nombre = input.value.toLowerCase(); // Obtiene el nombre ingresado y lo pasa a minúsculas

        // Realiza una petición a la API de Dragon Ball
        fetch("https://dragonball-api.com/api/characters")
            .then(res =>{
                // Si la respuesta no es correcta, lanza un error
                if(!res.ok){
                    throw new Error("No encontrado ");
                }
                // Convierte la respuesta a JSON
                return res.json();
            }).then(data =>{
                // Busca el personaje cuyo nombre coincida con el ingresado
                const character = data.items.find(c => c.name.toLowerCase() === nombre);
                if (!character) {
                    // Si no lo encuentra, lanza un error
                    throw new Error("Personaje no encontrado");
                }
                // Muestra el personaje encontrado en consola
                console.log(character);
                // Llama a la función mostrar para actualizar la interfaz
                mostrar(character);
            }).catch(error => {
                // Si ocurre un error, muestra una imagen de error y el mensaje en rojo
                img.src = "error.png";
                divInfo.innerHTML = `<div class="align-items-center d-flex flex-column"><h2 class="text-center" style="color: red">${error.message}</h2>
                </div>`;
            });
    }

    // Función para mostrar la información del personaje en el HTML
    function mostrar(character) {
        let urlImagen = character.image; // URL de la imagen del personaje
        let nombre = character.name.toUpperCase(); // Nombre en mayúsculas

        // Actualiza el contenido del div con el nombre y la imagen del personaje
        divInfo.innerHTML = `<h2><strong>${nombre}</strong></h2>
        <img src="${urlImagen}" alt="${nombre}" class="img-fluid mb-3" id="imagenPersonaje">`;
    }
});