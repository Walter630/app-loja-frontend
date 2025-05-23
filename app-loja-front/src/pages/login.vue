<template>
  <v-container
    class="pa-0 d-flex align-center justify-center fill-height"
    fluid
    style="
      background: url('./login.png') no-repeat center center / cover;
      min-height: 100vh;
    "
  >
    <v-card
      class="pa-6 rounded-xl ma-5"
      width="400"
      elevation="4"
      style="
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      "
    >
      <v-card-title class="text-center">
        <h2 class="text-black">Login</h2>
      </v-card-title>

      <v-form @submit.prevent="login">
        <v-text-field
          v-model="cpf"
          label="cpf"
          type="cpf"
          prepend-icon="mdi-account"
          class="mb-4"
          style="--v-theme-on-surface: black; color: black"
          required
        ></v-text-field>

        <v-text-field
          v-model="senha"
          label="Senha"
          type="password"
          prepend-icon="mdi-lock"
          class="mb-4"
          style="--v-theme-on-surface: black; color: black"
          required
        ></v-text-field>

        <v-alert v-if="mensagem" :type="mensagemTipo" dense class="mb-4">
          {{ mensagem }}
        </v-alert>

        <v-btn color="primary" block type="submit">Acessar</v-btn>

        <p class="mt-3 text-center">
          <router-link to="/cadastro">Não tem conta? Cadastre-se</router-link>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUserStore();

const cpf = ref("");
const senha = ref("");
const mensagem = ref("");
const mensagemTipo = ref<"error" | "success">("error");

const login = async () => {
  if (cpf.value === "" || senha.value === "") {
    mensagem.value = "Preencha todos os campos";
    mensagemTipo.value = "error";
    return;
  }
  user
    .login(cpf.value, senha.value)

    .then(() => {
      router.push("/Home");
    })
    .catch((error) => {
      mensagem.value = error.response.data.message;
      mensagemTipo.value = "error";
    });
};
</script>

<style scoped>
.v-container {
  padding: 0;
}

h2 {
  font-weight: 600;
}

.v-card {
  max-width: 100%;
}

a {
  text-decoration: none;
  color: #000000;
}
</style>
