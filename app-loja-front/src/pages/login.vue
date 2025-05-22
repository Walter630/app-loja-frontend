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

        <v-btn color="primary" block type="submit" @click="Acesso">Acessar</v-btn>

        <p class="mt-3 text-center">
          <router-link to="/cadastro">Não tem conta? Cadastre-se</router-link>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const cpf = ref("");
const senha = ref("");
const mensagem = ref("");
const mensagemTipo = ref<"error" | "success">("error");

const Acesso = async () => {
  router.push("/Home");
};
const login = async () => {
  mensagem.value = "";

  if (!cpf.value || !senha.value) {
    mensagem.value = "Preencha todos os campos.";
    mensagemTipo.value = "error";
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/user/login", {
      cpf: cpf.value,
      senha: senha.value,
    });

    if (response.data.usuario && response.data.token) {
      localStorage.setItem("token", response.data.token);
      mensagem.value = "Login realizado com sucesso!";
      mensagemTipo.value = "success";

      // Redireciona, por exemplo, para a página inicial
      router.push("/home");
    } else {
      mensagem.value = response.data.message || "Erro ao fazer login";
      mensagemTipo.value = "error";
    }
  } catch (error: any) {
    mensagem.value = error?.response?.data?.message || "Erro interno. Tente novamente.";
    mensagemTipo.value = "error";
  }
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
