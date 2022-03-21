<template>
    <div class="home" v-if="home">
        <transition name="slide-fade">
            <div class="contenedor">
                <div class="img-welcome">
                    <div class="border-circle"></div>
                    <img class="img" src="../../../assets/img-welcome.svg" alt="img-welcome">  
                </div>
                <div class="title-welcome">
                    <h1>Welcome to Pokédex</h1>
                </div>
                <div class="subtitle-welcome">
                    <p>The digital encyclopedia created by Professor Oak is
                    an invaluable tool to Trainers in the Pokémon world.
                    </p>
                </div>
                <div class="contenedor-button">
                    <router-link class="button-general btn-home" to="/buscador">  Get started</router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
       return {
           home: false
       }
    },
    mounted() {
        this.home = true
    }
}
</script>

<style>
    .home {
        width: 100%;
        height: 100vh;
        position: relative;
        margin: 0 auto;
        font-style: normal;
        background: #E5E5E5;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .contenedor {
        max-width: 569px;
        width: 100%;
        max-height: 800px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        text-align: center;
        padding: 0 10px;
    }

    .img-welcome {
        position: relative;
    }

    .border-circle {
        position: relative;
        width: 205px;
        height: 205px;
        background: #F22539;
        border-radius: 100%;
        border: 2px solid #000000;
    }

    .img-welcome .img {
        position: absolute;    
        top: -68px;
        left: -48px;

    }

    .title-welcome {
        margin-top: 50px;
    }
    .title-welcome h1{
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #353535;
    }
    .subtitle-welcome p {
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
        color: #5E5E5E;
        font-weight: 500;
        margin-bottom: 50px;
    }
    @media (max-width: 768px) {
        .subtitle-welcome {
            max-width: 315px;
            width: 100%;
        }
    }
    .btn-home {
        width: 131px;
    }

</style>