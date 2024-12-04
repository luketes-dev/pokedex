var pokemon_types = []

// Função global que busca os dados de acordo com o que for solicitado
async function search_datas (data, limit) {
    const global_datas = await fetch(`https://pokeapi.co/api/v2/${data}?limit=${limit}`)
    const response = await global_datas.json()
    return response
}

// Função que busca todos os tipos dos pokémons
async function types() {
    const all_types = await search_datas('type', 30)
    
    for(type of all_types.results) {
        pokemon_types.push(type.name)
    }

    console.log(pokemon_types)
}

types()