<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useUserStore } from "./stores/UserStore";

//
const userStore = useUserStore();
userStore.verificarToken();
</script>
