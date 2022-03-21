<template>
  <div class="modal bg-gray">
       <img class="loader" src="../../../../assets/Loader.svg" alt="loader"> 
  </div>
</template>

<script>
export default {

}
</script>

<style scoped> 
    .bg-gray {
        background: #E5E5E5;
    }
    
    .loader {
        animation: spin 2s linear infinite;
    }
    .loader {
        -webkit-animation-name: bounce-pokebola;
        animation-name: bounce-pokebola;
        -webkit-animation-duration: 1.8s;
        animation-duration: 1.8s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    /* Animacion pokebola */
    @keyframes bounce-pokebola {
    from,
    20%,
    53%,
    to {
        -webkit-animation-timing-function: cubic-bezier(
            0.215,
            0.61,
            0.355,
            1
        );
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
        -webkit-animation-timing-function: cubic-bezier(
            0,
            0.05,
            0.795,
            0.06
        );
        animation-timing-function: cubic-bezier(0, 0.05, 0.795, 0.06);
        -webkit-transform: translate3d(0, -25px, 0) scale(1.7);
        transform: translate3d(0, -25px, 0) scale(1.7);
    }

    70% {
        -webkit-animation-timing-function: cubic-bezier(
            0.2,
            0.05,
            0.795,
            0.06
        );
        animation-timing-function: cubic-bezier(0.2, 0.05, 0.795, 0.06);
        -webkit-transform: translate3d(0, -15px, 0) scale(1.3);
        transform: translate3d(0, -15px, 0) scale(1.3);
    }

    80% {
        -webkit-transition-timing-function: cubic-bezier(
            0.215,
            0.61,
            0.355,
            1
        );
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0) scale(1);
        transform: translate3d(0, 0, 0) scale(1);
    }

    90% {
        -webkit-transform: translate3d(0, -4px, 0) scale(1.1);
        transform: translate3d(0, -4px, 0) scale(1.1);
    }
}

</style>