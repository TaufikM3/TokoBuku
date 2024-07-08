<template>
  <header class="navbar">
    <div class="navbar-brand">
      <h1>BookHub</h1>
    </div>
    <div class="search-container">
      <input type="text" placeholder="Search..." class="search-input" />
      <button class="search-button">
        <i class="pi pi-search"></i>
      </button>
    </div>
    <nav class="navbar-menu">
      <ul>
        <li>
          <div class="card flex justify-content-center">
            <Button  label="Login"
                    icon="pi pi-user" 
                    @click="dialog = true" 
                    class="login-button" />
  

          </div>
        </li>
      </ul>
    </nav>
  </header>
  <FormAuthComponents v-model:visible="dialog" />
</template>

<script setup>
import { ref } from 'vue';
import FormAuthComponents from '@/components/FormAuthComponents.vue';
import Button from 'primevue/button';
import { storeToRefs } from 'pinia';
import { useAuthStores } from '@/stores/authStores';

const authStores = useAuthStores();
const { dialog } = storeToRefs(authStores);

</script>

<style scoped>
.login-button:hover {
  background-color: rgb(0, 0, 3);
}

.login-btn:active {
  background-color: rgb(40, 40, 245);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #d1d6d2;
  color: #16aacf;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.search-button {
  background-color: #3498db;
  color: #1d1b1b;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #2980b9;
}

.navbar-menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-menu li {
  margin-left: 20px;
}

.navbar-menu a {
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.navbar-menu a:hover {
  background-color: #e6e9e6;
}
</style>
