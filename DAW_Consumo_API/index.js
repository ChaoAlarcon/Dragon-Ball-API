window.addEventListener("DOMContentLoaded", function(){

    let btnPeticion = this.document.getElementById("btnPedir");
    let inputPokemon = this.document.getElementById("numeroPokemon");
    let imgPokemon = this.document.getElementById("imagenPokemon");
    let divInfo = this.document.getElementById("infoPokemon");

    btnPeticion.addEventListener("click", pedirPokemon);

    function pedirPokemon() {
        let nombrePokemon = inputPokemon.value.toLowerCase();

        fetch("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon)
            .then(res =>{
                if(!res.ok){
                    throw new Error("Pokémon no encontrado en la pokédex");
                }
                return res.json();
            }).then(data =>{
                console.log(data);
                mostrarPokemon(data);
                //Aquí va ir la llamada a la siguiente función

            }).catch(error => {
                imgPokemon.src = "error.png";
                divInfo.innerHTML = `<div class="align-items-center d-flex flex-column"><h2 class="text-center" style="color: red">${error.message}</h2>
                </div>`;
            })


    }

    function mostrarPokemon(data) {
        let urlImagen = data.sprites.front_default;
        let nombrePokemon = data.name.toUpperCase();
        let alturaPokemon = data.height / 10 + " m";
        let pesoPokemon = data.weight / 10 + " kg";
        // Mapear las habilidades a una cadena separada por comas
        let tipoPokemon = data.types.map(tipo => tipo.type.name).join(", "); 
       
        let primeraHabilidadPokemon = data.abilities[0]?.ability.name || "Ninguno";
        let segundaHabilidadPokemon = data.abilities[1]?.ability.name || "Ninguno";
        

        divInfo.innerHTML = "<h2><strong>" + nombrePokemon + "</strong></h2>" +
                            "<p><strong>Altura: </strong>" + alturaPokemon + "</p>" +
                            "<p><strong>Peso: </strong>" + pesoPokemon + "</p>" +
                            "<p><strong>Tipo: </strong>" + tipoPokemon + "</p>" +
                            "<p><strong>Primera Habilidad: </strong>" + primeraHabilidadPokemon + "</p>" +
                            "<p><strong>Segunda Habilidad: </strong>" + segundaHabilidadPokemon + "</p>";
        
        

        imgPokemon.src = urlImagen;
    }




})