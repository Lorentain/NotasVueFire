import './assets/main.css' // Importar css

import { createApp } from 'vue' // Importar la creación de la app
import App from './App.vue' // Importar la creación de la app
import { VueFire, VueFireAuth } from 'vuefire' // Importar firebase
import { firebaseApp } from './firebase' // Importar firebase

import { createRouter, createWebHistory } from 'vue-router' // Importar router

import { getAuth,onAuthStateChanged } from 'firebase/auth' // Importar comprobar cambios en la identificación

import inicio from '../views/inicio.vue' // Importar vista "inicio"
import privada from '../views/privada.vue' // Importar vista "privada"
import admin from '../views/admin.vue' // Importar vista "admin"

// Rutas de los enlaces

const routes = [
  { path: '/', name: 'inicio', component: inicio,},
  { path: '/privada', name: 'privada', component: privada,},
  { path: '/admin', name: 'admin', component: admin,}
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes 
})

// Logueo con Google
let isIdentificado = false;
router.beforeEach( (to,from) => {
  if( to.name == 'privada' && isIdentificado == false) {
    return false;
  }
});

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    isIdentificado = true;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    isIdentificado = false;
    // User is signed out
    // ...
  }
});

// Creación de la app

const app = createApp(App)
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(router)

app.mount('#app')
