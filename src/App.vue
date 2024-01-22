<script setup>
import { RouterLink,RouterView } from 'vue-router'; // Instanciar los enlaces y vistas del router

</script>

<template>
  <router-link to="/">Inicio</router-link>
  <router-link to="/privada">Mis Notas</router-link>
  <RouterView/>
</template>

<style>

</style>