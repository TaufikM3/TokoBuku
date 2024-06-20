<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <v-app-bar :elevation="3" rounded>
      <v-app-bar-title>BookuHub</v-app-bar-title>
      <v-text-field
      variant="outlined"
      hide-details="auto"
      density="comfortable"
      label="search"
      append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-app-bar> 
  </v-layout>
</template>