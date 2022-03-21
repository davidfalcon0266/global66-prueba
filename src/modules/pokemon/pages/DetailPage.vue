<template>
   <div>
       <transition name="slide-fade">
           <loading v-if="loading"></loading><!-- Componente Loader -->
        </transition>
         <transition name="slide-fade">
            <div class="modal bg-dark"  v-if="detail">
                <div class="container-detail">
                        <div class="detail">
                            <div class="img-pokemon">
                                <img class="img-detail" src="../../../assets/backgroundDetail.svg" alt="background-detail"> 
                                <img class="icon-close" @click="detail = false" src="../../../assets/icon-close.svg" alt="icon-close"> 
                                <img class="img-detail-pokemon" :src="detailPokemon.img" alt="img-pokemon"> 
                            </div>
                            <div class="features">
                                <div class="item">
                                    <p>Name: {{capitalizeWords(detailPokemon.name)}}</p>
                                </div>
                                <div class="item">
                                    <p>Weight: {{detailPokemon.weight}}</p>
                                </div>
                                <div class="item">
                                    <p>Height: {{detailPokemon.height}}</p>
                                </div>
                                <div class="item">
                                    <p>Type<span v-if="conditionS">s</span>: {{capitalizeWords(detailPokemon.types)}}</p>
                                </div>
                            </div>
                            <div class="footer-detail">
                                <div class="contenedor-buttones detail-buttons">
                                    <div class="btn-detail">
                                        <button type="button" @click="copyPokemon()" class="button-general btn-share">
                                            <span>Share to my friends</span> 
                                        </button>
                                    </div>
                                    <div class="contenedor-img">
                                        <img src="../../../assets/starYellow.svg" alt="star-yellow">
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </transition>
   </div>
</template>

<script>
    import axios from "axios";
    import Loading from './components/Loading.vue';
    export default {
        components: { Loading },
        props: {
            namePokemon: String // Nombre del pokemon al seleccionar en la lista
        },
        data() {
            return {
                loading: false,
                detail: false, // Activa/desactiva el modal
                url: 'https://pokeapi.co/api/v2/pokemon/',
                detailPokemon: { // Propiedades a mostrar en el modal del detalle
                    name: '',
                    weight: '',
                    height: '',
                    img: {},
                    types: ''
                },
                conditionS: false, // Muestra la 'S' o no en el detalle del tipo de pokemon
                dataCopy: '' // Data que se guarda en el portapapel del cliente si presiona el boton de compartir
            }
        },
        watch: {
            namePokemon(name) {
                /* Escuchamos cada vez que se le da click a un pokemon en la lista
                   y llamamos a la api para obtener el pokemon por el nombre
                */
               this.loading = true;
               this.getPokemonByName(name);
            }
        },
        methods: {
            getPokemonByName(name) {
                axios.get(this.url+name).then(result => {
                    if(result.data) {
                        let imgTemp = result.data.sprites.other.home.front_default;// Obtenemos la img
                        /* Reemplazamos la de home por esa otra carpeta por q es la que se pide en el diseño
                          pero como viene en este objeto(official-artwork) da error al acceder a el,
                          por esta razon se modifica solo el string de la imagen para asignarselo a esa variable
                        */
                        let img = imgTemp.replace('home', 'official-artwork');

                        const {name, weight, height, types} = result.data;
                        let typo2 = '';

                        if(types.length > 1) {
                           typo2 = ', '+ types[1].type.name;
                        }
                        this.detailPokemon.name = name;
                        this.detailPokemon.weight = weight;
                        this.detailPokemon.height = height;
                        this.detailPokemon.types = types[0].type.name + typo2;
                        this.detailPokemon.img = img;
                        // Guardamos la data del pokemon para copiarla en el portapapel del cliente
                        this.dataCopy = `Name: ${name}, Weight: ${weight}, Height: ${height}, Type: ${this.detailPokemon.types}, Imagen: ${img}`;
                        // Validamos si el tipo de pokemon contiene mas de un tipo para agregarle una 'S' a type
                       this.validateTypes();
                       this.hiddenLoadin();                   
                    } else {
                       this.loading = false;
                    }
                }).catch(error => {
                       this.loading = false;
                });
            },
            copyPokemon() {     
                try {
                    navigator.clipboard.writeText(this.dataCopy);
                     this.$toast.info(`Se a copiado tu pokemón en los portapapeles`);
                } catch($e) {
                    this.$toast.error(`No se a podido copiar, ocurrio un error`);
                }
            },
            validateTypes() {
                if(this.detailPokemon.types.includes(',')) {
                   return this.conditionS = true;
                }
                this.conditionS = false;
            },
            hiddenLoadin() {
                setTimeout(() => {
                this.loading = false;
                this.detail = true;// Activamos el modal del detalle
                }, 1000);
            },
            capitalizeWords(string) {
                var tem = string.toLowerCase();
                return tem.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            }
        }
    }
</script>

<style>
    .bg-dark {
        background: rgba(100, 100, 100, 0.5);
    }
    .container-detail {
        max-width: 570px;
        width: 100%;
        min-height: 506px;
        width: 100%;
        background: #FFFFFF;
        border-radius: 5px;
    }
    .img-pokemon {
        position: relative;
        max-width: 570px;
        height: 220px;
    }
    .img-pokemon .img-detail{
        max-width: 570px;
        width: 100%;
        height: 100%;
        border-radius: 5px 5px 0px 0px;    
        object-fit: cover;
    }
    .features {
       max-width: 510px;
       margin: 8px auto 0;
    }
    .features .item {
        border-bottom: 1px solid  #E8E8E8;
        font-size: 18px;
        font-weight: bold;
        color: #5E5E5E;
        height: 49px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .icon-close {
        position: absolute;
        right: 15px;
        top: 17px;
        cursor: pointer;
    }
    .img-detail-pokemon {
        position: absolute;
        top: 19px;
        right: 35%;
        width: 180px;
        height: 180px;
    }
    .detail-buttons {
        max-width: 510px;
        height: 78px;
        margin: 0 auto;
    }
    .btn-detail {
        max-width: 195px;
        width: 100%;
    }
    .btn-share {
        width: 100%;
    }
    .detail-buttons {
        max-width: 510px;
        height: 78px !important;
        margin: 0 auto;
    }

    @media (max-width: 768px) {  
        .container-detail {
            max-width: 315px;
        }
        .features {
            padding: 0 30px;
        }
        .detail-buttons {
            max-width: 255px;
        }
        .img-detail-pokemon {
            right: 21%;
        }
    }
    
</style>