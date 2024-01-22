<script setup>
import {ref} from "vue";
import { getAuth } from "firebase/auth"; // Importar Autentificación
import { GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth"; // Importar Google Autentificación
import { GithubAuthProvider } from "firebase/auth"; // Importar Github Autentificación
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"; // Importar Autentificación normal

    let usuarioActivo = ref (getAuth().currentUser);

    function iniciaSesionGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Inicia sesion Google");
            usuarioActivo.value = user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    function cerrarSesion() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sesion Cerrada")
            usuarioActivo.value = "";
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
    

    let email = "";
    let password = "";

    function registrarUsuario(registroEmail,registroPassword) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, registroEmail,registroPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Registrado con éxito");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error al registrar:", errorCode, errorMessage);
        });
    }

    function iniciarSesion(loginEmail,loginPassword) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, loginEmail,loginPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Inicio de sesión con éxito")
            usuarioActivo.value = user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function iniciaSesionGithub() {
        const auth = getAuth();
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            console.log("Inicio sesión de Github");
            usuarioActivo.value = user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
            console.log(errorCode,errorMessage);
        });
    }

</script>

<template>
    <h1 v-if="usuarioActivo">Usuario: {{ usuarioActivo.email }}</h1>
    <h1 v-else>No hay usuario activo</h1>

    <div class="contenedor__login">
        <h1>Registrar Usuario</h1>

        <h1>Registro de Usuario</h1>
        <form class="formulario__registro" @submit.prevent="registrarUsuario(registroEmail,registroPassword)">
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="registroEmail" required>

        <label for="password">Contraseña:</label>
        <input type="password" v-model="registroPassword" minlength="6" required>

        <br><button type="submit">Registrarse</button><br>
        </form>

        <div class="contenedor__iconos">
            <button @click="iniciaSesionGoogle"><img class="iconosLogin" src="../src/assets/google.png"></button>
            <button @click="iniciaSesionGithub"><img class="iconosLogin" src="../src/assets/facebook.png"></button>
        </div>

        <h1>Inicio de sesión de Usuario</h1>
        <form class="formulario_iniciarSesion" @submit.prevent="iniciarSesion(loginEmail,loginPassword)">
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="loginEmail" required>

        <label for="password">Contraseña:</label>
        <input type="password" v-model="loginPassword" minlength="6" required>

        <br><button type="submit">Iniciar Sesion</button>
        </form><br>

        <button @click="cerrarSesion">Cerrar Sesión</button><br><br>
    </div>
</template>

<style scoped>
a .router-link-active router-link-exact-active {
  color: white !important;
}

.contenedor__login {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 600px;
    height: 600px;
    background-color: rgba(0, 255, 255, 0.184);
    color: white;
    border-radius: 8px;
}

.contenedor__iconos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    width: 100%;
}

.formulario__registro {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.formulario_iniciarSesion {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.formulario__registro input, .formulario_iniciarSesion input {
    width: 500px;
    height: 25px;
    border-radius: 4px;
    outline: none;
}

.iconosLogin {
    width: 50px;
    background: transparent;
}

button {
    border-radius: 4px;
    border: 2px solid gray;
    padding: 5px;
    font-size: 1rem;
}

</style>