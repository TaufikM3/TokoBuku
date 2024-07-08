<template>
  <Header/>
</template>

<script setup>
import Header from './layout/appHeader.vue';
import custemFetch from "./api";
import { onMounted } from 'vue';


const getData = async()=> {
  const res = await custemFetch.get('/test');
  console.log(res)
};

onMounted(()=> {
  getData();
});
</script>


