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
      class="card pa-6 rounded-xl ma-5"
      width="400"
      elevation="4"
      style="
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      "
    >
      <v-card-title style="text-align: center; color: black">
        <h1>Cadastro</h1>
      </v-card-title>

      <v-form @submit.prevent="cadastrar">
        <v-text-field
          v-model="nome"
          label="Seu Nome"
          prepend-icon="mdi-account"
          type="cpf"
          style="--v-theme-on-surface: black; color: black"
          required
        />

        <v-text-field
          v-model="cpf"
          label="Seu cpf"
          prepend-icon="mdi-account"
          style="--v-theme-on-surface: black; color: black"
          type="cpf"
          required
        />

        <v-text-field
          v-model="senha"
          label="Sua senha"
          type="password"
          prepend-icon="mdi-lock"
          style="--v-theme-on-surface: black; color: black"
          required
        />

        <v-btn color="#6c63ff" block class="white--text mt-2 rounded-pill" type="submit">
          Acessar
        </v-btn>

        <v-alert
          v-if="mensagem"
          :type="mensagemTipo"
          class="mt-3"
          density="compact"
          border="start"
          color="red"
        >
          {{ mensagem }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

const router = useRouter();
const cpf = ref("");
const senha = ref("");
const nome = ref("");
const mensagem = ref("");
const mensagemTipo = ref<"success" | "error">("error");
const userS = useUserStore();

const cadastrar = async () => {
  await userS.cadastrar(nome.value, cpf.value, senha.value);
  await userS
    .login(cpf.value, senha.value)
    .then(() => {
      router.push("/home");
    })
    .catch((error) => {
      mensagem.value = error.response.data.message;
      mensagemTipo.value = "error";
    });
};
</script>

<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0.85);
}
.v-container {
  padding: 0;
}
</style>
