var URL_GLOBAL = 'https://pokeapi.co/api/v2'
var next_page

let container_cards = document.querySelector('#container-cards')

// Função que busca todos os tipos dos pokémons
// async function types() {
//     const all_types = await search_datas('type', 30)
    
//     for(let type of all_types.results) {
//         console.log(type.name)
//     }
// }

async function pokemons(URL) {
    const all_pokemons_datas = await fetch(`${URL}/pokemon`)
    const all_pokemons = await all_pokemons_datas.json()

    for(let pokemon of all_pokemons.results) {
        const pokemons_datas = await fetch(pokemon.url)
        const pokemons_response = await pokemons_datas.json()

        card_pokemon(
            pokemons_response.id,
            pokemons_response.name,
            pokemons_response.types,
            pokemons_response.weight/10,
            pokemons_response.height/10,
            pokemons_response.sprites.other["official-artwork"].front_default
        )
    }

    next_page = all_pokemons.next
}

// btnTeste.addEventListener('click', () => pokemons(next_page))

function card_pokemon(id, name, types, weight, height, sprite_url) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.id = id

    const sprite = document.createElement('img')
    sprite.src = sprite_url
    sprite.classList.add('sprite')

    const id_field = document.createElement('span')
    id_field.innerText = id
    id_field.classList.add('index')

    const name_field = document.createElement('h3')
    name_field.innerText = name
    name_field.classList.add('name')

    const container_types = document.createElement('div')
    container_types.classList.add('types')

    const container_characteristics = document.createElement('div')
    container_characteristics.classList.add('container_characteristics')

    const weight_box = document.createElement('div')
    weight_box.classList.add('weight')

    const weight_title = document.createElement('strong')
    weight_title.classList.add('weight_title')
    weight_title.innerText = 'Weight'

    const weight_field = document.createElement('span')
    weight_field.innerText = weight + "Kg"
    weight_field.classList.add('weight_field')

    const height_box = document.createElement('div')
    height_box.classList.add('height')

    const height_title = document.createElement('strong')
    height_title.classList.add('height_title')
    height_title.innerText = 'Height'

    const height_field = document.createElement('span')
    height_field.innerText = height + " M"
    height_field.classList.add('height_field')

    weight_box.appendChild(weight_title)
    weight_box.appendChild(weight_field)
    height_box.appendChild(height_title)
    height_box.appendChild(height_field)

    container_characteristics.appendChild(height_box)
    container_characteristics.appendChild(weight_box)

    const button_more_details = document.createElement('a')
    button_more_details.innerText = 'Mais Detalhes'
    button_more_details.classList.add('btn')
    button_more_details.id = 'btn-more-details'

    card.appendChild(id_field)
    card.appendChild(sprite)
    card.appendChild(name_field)
    for(let type of types) {
        const type_field = document.createElement('div')
        type_field.innerText = type.type.name
        type_field.classList.add('type')

        type_field.style.backgroundColor = 'var(--' + type.type.name + ")"

        container_types.appendChild(type_field)
        card.appendChild(container_types)
    }
    card.appendChild(container_characteristics)
    card.appendChild(button_more_details)
    
    container_cards.appendChild(card)
}

pokemons(URL_GLOBAL)