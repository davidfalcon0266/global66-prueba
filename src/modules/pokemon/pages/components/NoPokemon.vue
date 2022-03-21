<template>
    <div class="not-pokemon">
        <div class="title">
            <h1>Uh-oh!</h1>
        </div>
        <div class="subtitle">
            <p>You look lost on your journey!</p>
        </div>
        <div class="contenedor-button">
            <router-link class="button-general btn-empty" to="/">Go back home</router-link>
        </div>
    </div>
</template>

<style scoped>
    .not-pokemon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-style: normal;
        text-align: center;
    }
    .title h1{
        font-weight: 700;
        font-size: 36px;
        height: 10px;
    }
    .subtitle p {
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 25px;
    }
    .btn-empty {
        width: 151px; 
    }
</style>