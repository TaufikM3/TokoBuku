<template>
    <Message severity="error" class="error-message">{{ message }}</Message>
  </template>
  
  <script setup>
  import Message from 'primevue/message';
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .error-message {
    background-color: red;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  