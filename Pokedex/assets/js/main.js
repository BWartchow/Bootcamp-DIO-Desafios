
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let pokemonInfo = document.getElementsByClassName('name')

//Limita os pokemons à primeira geração
const maxRecords = 151
const limit = 12
let offset = 0;

//Converte os dados filtrados em lista html
function convertPokemonToLi(pokemon) {
    return `
        <div class="card">    
            <div class="flip">
                    <div class="front">
                        <li class="pokemon ${pokemon.type}">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name" >${pokemon.name}</span>
                            <div class="detail">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                                <img src="${pokemon.photo}"
                                    alt="${pokemon.name}">
                            </div>
                        </li>
                    </div>
                    <div class="back">
                        <li class="pokemon ${pokemon.type}">
                            <span class="number">#${pokemon.number}</span>
                            <div class="detail">
                                <ol class="info">
                                    <li>Weight: ${pokemon.weight}</li>
                                    <li>Height: ${pokemon.height}</li>
                                    <li>Experience: ${pokemon.experience}</li>
                                    <li>Abilities: ${pokemon.ability}</li>
                                </ol>
                                <img src="${pokemon.photo}"
                                        alt="${pokemon.name}">
                            </div>
                        </li>
                    </div>
                </div>
        </div>
    `
}


//Gera os próximos pokemons em html e concatena
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

//Carrega mais pokemons até limite estabelecido e remove botão ao final
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
