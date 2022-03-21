<template>
    <div class="search">
        <transition name="slide-fade">
           <loading v-if="loading"></loading><!-- Componente Loader -->
        </transition>
        <transition name="slide-fade">
            <div class="contenedor-search" v-if="!loading">

                <div class="lista-pokemones" v-if="pokemones.length > 0">
                    <list-page :pokemones="pokemones" :opcionesCliente="opcionesCliente"
                    @selection="setNamePokemon($event)" @favorites="disabledButton()"></list-page>
                </div>

            </div>
        </transition>
        <div class="footer" v-if="!loading">
            <div class="contenedor-search">
                <div class="contenedor-buttones">
                    <div class="btn-footer">
                        <button @click="opcionesCliente = true" type="button" class="button-general btn-lista">
                            <img src="../../../assets/all.svg" alt="icon-all"> 
                            <span>All</span> 
                        </button>
                    </div>
                    <div class="btn-footer">
                        <button :disabled="!favorites" @click="opcionesCliente = false" type="button" class="button-general btn-lista">
                            <img class="icon-all" src="../../../assets/starWhite.svg" alt="icon-favorites"> 
                            <span>Favorites</span> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="detailPokemon">
            <detail-page :namePokemon="namePokemon"></detail-page>
        </div>
    </div>
</template>

<script>
import Loading from './components/Loading.vue';
import ListPage from './ListPage.vue';
import axios from "axios";
import DetailPage from './DetailPage.vue';

export default {
    components: {
        Loading,
        ListPage,
        DetailPage
    },
    data() {
        return {
            loading: false,
            pokemones: [],
            url: 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200',
            opcionesCliente: true,
            namePokemon: '',
            favorites: false
        }
    },
    mounted() {
        this.loading = true;
        this.getPokemones();
        this.disabledButton();
    },
    methods: {
        getPokemones() {
            axios.get(this.url).then(result => {
              let res = result.data.results;
              this.hiddenLoadin(res);
            }).catch(error => {
               this.loading = false;
            });
        },
        hiddenLoadin(res) {
            this.pokemones = res;
            setTimeout(() => {
               this.loading = false;
            }, 3000);
        },
        setNamePokemon(name) { // Obtenemos el nombre del pokemon del componente lista
            this.namePokemon = name;
        },
        disabledButton() {
            if(localStorage.getItem("favorites")) {
                let favoritesTemp = JSON.parse(localStorage.getItem("favorites"));
                for(let i = 0; i < favoritesTemp.length; i++) {
                   if(!favoritesTemp[i] == '') {
                      this.favorites = true;
                      localStorage.setItem("favorites", JSON.stringify(favoritesTemp));
                      return;
                    } else {
                       this.favorites = false;
                       localStorage.removeItem('favorites');
                    }
                }
            }
        }
    }
}
</script>

<style>
    .search {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .contenedor-search {
        max-width: 570px;
        width: 100%;
        height: 100%;
        margin: 0 auto !important;
    }
    .pokemon-empty {
        display: flex;
        justify-content: center;
    }
    .footer {
        position: fixed;
        width: 100%;
        height: 80px;
        left: 0;
        bottom: 0;
        background: #FFFFFF;
        box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    }
    .contenedor-buttones {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btn-lista {
        width: 251px; 
    }
    .btn-footer button span {
        margin-left: 10px;
    }
    @media (max-width: 768px) {
        .btn-footer {
            max-width: 251px;
            width: 100%;
        }
        .btn-lista {
           max-width: 251px; 
           width: 100%;

        }
        .contenedor-search {
            max-width: 315px;
        }
        .btn-footer:first-child {
            margin-right: 15px;
        }
    }

</style>