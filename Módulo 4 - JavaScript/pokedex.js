const fetchPokemon = async () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    let data = await fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    })

    if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            pokeData(data);
        }
};

document.getElementById('search').onclick(() => fetchPokemon());

/*
setTimeout(() => {
    const pokeNameInput = document.getElementById("pokeName");
    pokeNameInput.value = 'gengar';
    fetchPokemon();
}, 200);
*/

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeData = ({abilities, name, stats, moves, types}) =>{
    const pokeAbilities = document.getElementById("abilities");
    const abilitiesName = abilities.map(item => `<div class="ability">${item.ability.name}</div>`);
    pokeAbilities.innerHTML = `<div class="abilities-list">${abilitiesName.join('')}</div>`;

    const pokeName = document.getElementById('pokeName2');
    pokeName.innerHTML = `${name[0].toUpperCase()}${name.substring(1, name.length)}`;

    const statsToShow = new Set(['hp', 'attack', 'defense', 'speed']);
    for (const stat of stats) {
        if (!statsToShow.has(stat.stat.name)) continue;

        const elem = document.getElementById(`${stat.stat.name}-bar`);
        
        if (!elem) continue;

        elem.innerHTML = stat.base_stat;
    }

    const pokeMoveElem = document.getElementById("moves");
    const PokeMove = moves.map(item => `<div class="move">${item.move.name}</div>`)
    pokeMoveElem.innerHTML = `<div class="move-list">${PokeMove.join('')}</div>`

    const typePok = document.getElementById("type");
    const type = types.map(item => `<div class="type ${item.type.name}">${item.type.name}</div>`)
    typePok.innerHTML = `<div class="type-list">${type.join('')}</div>`;
}
