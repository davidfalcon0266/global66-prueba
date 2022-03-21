<template>
    <div class="contenedor-lista">
        <input type="text" placeholder="Search" v-model="valueSearch" @input="updatePokemon($event.target.value)" >
        <img class="icon-search" src="../../../assets/search.svg" alt="icon-search">

        <transition name="slide-fade"> 
            <!-- Cuando se filtra y no se consigue ningun pokemon -->
            <div class="pokemon-empty" v-if="matchesPokemones.length == 0"><!-- Componente No hay pokemon -->
                <no-pokemon></no-pokemon>
            </div>
        </transition>
        <ul>
            <transition name="slide-fade"> 
            <!-- Listado completo de todos los pokemones -->
                <div v-if="opcionesCliente">
                    <li class="lista" v-for="(pokemon, item) in matchesPokemones" :key="item">
                        <p @click="$emit('selection', pokemon.name)">{{capitalizeWords(pokemon.name)}}</p>
                        <div class="contenedor-img">
                            <img v-if="!pokemon.active" @click="saveFavorite(item, pokemon.name); $emit('favorites', true)" src="../../../assets/starGray.svg" alt="star-gray">
                            <img v-if="pokemon.active"  @click="saveFavorite(item, pokemon.name); $emit('favorites', true)" src="../../../assets/starYellow.svg" alt="star-yellow">
                        </div>
                    </li>
                </div>
            </transition>
            <!-- Listado favoritos -->
            <transition name="slide-fade">
                <div v-if="!opcionesCliente">
                    <div class="mostrarLista"  v-for="(favorite, item) in matchesPokemones" :key="item">
                        <li class="lista" v-if="!favorite == ''">
                            <p @click="$emit('selection', favorite)">{{capitalizeWords(favorite)}}</p>
                            <div class="contenedor-img">
                                <img src="../../../assets/starYellow.svg" alt="star-yellow">
                            </div>
                        </li>
                    </div>
                </div>
            </transition>
        </ul>
    </div>
</template>

<script>
import NoPokemon from './components/NoPokemon.vue';
export default {
  components: { NoPokemon },
    props: {
        pokemones: {
            name: String,
            url: String,
            active: false
        },
        opcionesCliente: Boolean || true

    },
    data() {
        return {
            saveLocal: [],
            favoritesLocal: [],
            pokemon: '',
            valueSearch: '',
            filtro: []
        }
    },
    mounted() {
        if(localStorage.getItem("favorites")) {
            this.favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
            this.validateFavoritesInicio(this.favoritesLocal);
        }
    }, 
    computed: {
        // Este es el filtro de los pokemones
        matchesPokemones() {
            this.filtro = this.pokemones;
            // Si es false filtramos los pokemones favoritos
            if(!this.opcionesCliente) {
                this.filtro = this.favoritesLocal;
            }
            return this.filtro.filter((pokemon, index) => {
                const arrayPoke = new RegExp(this.pokemon, "gi");
                if(!this.opcionesCliente) {
                    return pokemon.match(arrayPoke);
                }
                return pokemon.name.match(arrayPoke);
            })
        }
    },
    methods: {
        saveFavorite(item, name) {
            for(let i = 0; i < this.pokemones.length; i++) {
                // Quiere decir que esta como favorito
                if(this.pokemones[item].active) {
                    // Cambiamos la estrella por la gris
                    this.pokemones[item].active = false;
                    // Si esta incluido en los favoritos, lo eliminamos
                    if(this.saveLocal.includes(name)) {
                        this.deleteFavorite(name);
                    }
                    return;
                }
            }
            // Es un pokemon favorito  nuevo y lo guardamos
            this.saveLocal.push(name)
            // Mostramos la estrella amarilla
            this.pokemones[item].active = true;
            this.favoritesLocal = this.saveLocal;
            localStorage.setItem("favorites", JSON.stringify(this.favoritesLocal));
        },
        deleteFavorite(name) {
            localStorage.removeItem("favorites");
            // Recorremos los pokemones que tenemos en local y si coincide con el que esta llegando lo eliminamos
            for(let i = 0; i < this.saveLocal.length; i++) {
                if(name == this.saveLocal[i]) {  
                   this.saveLocal[i] = '';
                }
            }
            // Asignamos el nuevo valor de los favoritos sin el que se elimino
            this.favoritesLocal = this.saveLocal;
            localStorage.setItem("favorites", JSON.stringify(this.favoritesLocal));

        },
        validateFavoritesInicio(favorites) {
            this.saveLocal = favorites;
             for(let i = 0; i < this.pokemones.length; i++) {
                if(favorites.includes(this.pokemones[i].name)) {
                    this.pokemones[i].active = true;
                }
            }
        },
        updatePokemon(value) { // Cada vez que escribimos le asignamos el value para q se ejecute el computed
            this.pokemon = value;
        },
        capitalizeWords(string) {
            var tem = string.toLowerCase();
            return tem.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        }
    }

}
</script>

<style>
.contenedor-lista {
    width: 100%;
    height: 100%;
    padding-bottom: 75px;
}
input {
    max-width: 525px;
    width: 100%;
    height: 48px;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    border: none;
    padding-left: 43px;
    margin: 35px auto 0;
    font-size: 16px;
}
input:focus {
    outline: none;
}
input::placeholder {
  color: #BFBFBF;
}
.icon-search {
    position: relative;
    left: 15px;
    top: -35px;
}
ul {
    padding: 0;
}
.lista {
    list-style: none;
    max-width: 540px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    border-radius: 5px; 
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    padding: 0 10px 0 20px;
    margin: 10px 0;
    color: #353535;
}
.lista p {
    cursor: pointer;
}
.contenedor-img {
    width: 44px;
    height: 44px;
    background: #F5F5F5;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.lista .contenedor-img img {
    width: 26px;
    height: 26px;
}
@media (max-width: 768px) {
    input {
        max-width: 270px;
        width: 100%;
    }
    .lista {
        max-width: 285px;
    }
}

</style>