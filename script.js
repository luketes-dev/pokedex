var URL = 'https://pokeapi.co/api/v2/'

var all_pokemons = {}

// Função global que busca os dados de acordo com o que for solicitado
async function search_datas (data, limit) {
    const global_datas = await fetch(`${URL}${data}?limit=${limit}`)
    const response = await global_datas.json()
    return response
}

// Função que busca todos os tipos dos pokémons
async function types() {
    const all_types = await search_datas('type', 30)
    
    for(let type of all_types.results) {
        console.log(type.name)
    }
}

async function pokemons() {
    const all_pokemons = await search_datas('pokemon', 1500)

    for(let pokemon of all_pokemons.results) {
        const pokemons_datas = await fetch(`${URL}pokemon/${pokemon.name}`)
        const pokemons_response = await pokemons_datas.json()
        console.log(pokemons_response)
    }
}

pokemons()