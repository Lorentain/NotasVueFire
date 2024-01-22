<script setup>
import { ref } from 'vue';
import { doc, deleteDoc, onSnapshot, query } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useCollection } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

let db = useFirestore();
let auth = getAuth();
let user = ref(null);
let todos = ref([]);
let contenidoNota = ref("");

onAuthStateChanged(auth, (authUser) => {
  user.value = authUser;
  if (user.value) {
    const notasQuery = query(collection(db, `todos_${user.value.uid}`));
    todos.value = useCollection(notasQuery);

    onSnapshot(notasQuery, (snapshot) => {
      todos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  } else {
    todos.value = [];
  }
});

function altaNota() {
  if (!user.value) {
    console.error('Usuario no autenticado');
    return;
  }

  console.log(contenidoNota.value);
  addDoc(collection(db, `todos_${user.value.uid}`), {
    texto: contenidoNota.value,
    prioridad: "baja",
    completada: false,
  }).then((docRef) => {
    // No necesitas hacer nada aquí, ya que onSnapshot se encarga de actualizar la lista
    contenidoNota.value = ""; // Limpiar el campo después de agregar la nota
  }).catch(error => console.error("Error al añadir nota:", error));
}


function eliminarNota(id) {
  if (!user.value) {
    console.error('Usuario no autenticado');
    return;
  }

  console.log(id);
  deleteDoc(doc(db, `todos_${user.value.uid}`, id));
  // Eliminar el elemento de la lista local
  todos.value = todos.value.filter(todo => todo.id !== id);
}

function actualizarPrioridadNota(value, id) {
  if (!user.value) {
    console.error('Usuario no autenticado');
    return;
  }

  const actualizarNota = doc(db, `todos_${user.value.uid}`, id);

  updateDoc(actualizarNota, {
    prioridad: value
  });
}

function completarTarea(e, id) {
  if (!user.value) {
    console.error('Usuario no autenticado');
    return;
  }

  const actualizarNota = doc(db, `todos_${user.value.uid}`, id);

  if (e.target.checked) {
    updateDoc(actualizarNota, {
      completada: true
    });
  } else {
    updateDoc(actualizarNota, {
      completada: false
    });
  }
}

</script>

<template>
  <div>
    <h1>Privada</h1>
    <input type="text" name="" id="" v-model="contenidoNota">
    <button @click="altaNota">Añadir Nota</button>

    <ul>
  <li v-if="todos && todos.length" v-for="todo in todos" :key="todo.id">
    <input type="checkbox" v-model="todo.completada" @click="completarTarea($event, todo.id)" id="checkbox">
    <span :class="{ 'completada': todo.completada }" id="contenido">Texto: {{ todo.texto }} Prioridad: {{ todo.prioridad }}</span>
    <button @click="eliminarNota(todo.id)">Eliminar nota</button>
    <select v-model="todo.prioridad" @change="actualizarPrioridadNota($event.target.value, todo.id)">
      <option value="baja">Prioridad baja</option>
      <option value="media">Prioridad media</option>
      <option value="alta">Prioridad alta</option>
    </select>
  </li>
  <li v-else>No hay notas disponibles</li>
</ul>
  </div>
</template>

<style scoped>
  .completada {
    text-decoration: line-through;
    text-shadow: 0 0 5px red;
  }
</style>


 

