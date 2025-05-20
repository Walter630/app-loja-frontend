<template>
  <v-container
    class="pa-0 d-flex align-center justify-center fill-height"
    fluid
    style="
      background: url('./login.png') no-repeat center center / cover;
      min-height: 100vh;
    "
  >
    <v-card class="card pa-6 rounded-xl ma-5" width="400" elevation="4">
      <v-card-title style="text-align: center">
        <h1>Cadastro</h1>
      </v-card-title>

      <v-form @submit.prevent="login">
        <h4>Nome:</h4>
        <v-text-field
          v-model="nome"
          label="Seu Nome"
          prepend-icon="mdi-account"
          type="email"
          required
        />
        <h4>Email:</h4>
        <v-text-field
          v-model="email"
          label="Seu e-mail"
          prepend-icon="mdi-account"
          type="email"
          required
        />

        <h4>Senha:</h4>
        <v-text-field
          v-model="senha"
          label="Sua senha"
          type="password"
          prepend-icon="mdi-lock"
          variant="outlined"
          required
        />

        <v-btn
          color="#6c63ff"
          block
          class="white--text mt-2"
          type="submit"
          @click="Acesso"
        >
          Acessar
        </v-btn>

        <v-alert
          v-if="mensagem"
          :type="mensagemTipo"
          class="mt-3"
          density="compact"
          border="start"
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
import axios from "axios";

const router = useRouter();
const email = ref("");
const senha = ref("");
const nome = ref("");
const mensagem = ref("");
const mensagemTipo = ref<"success" | "error">("error");

const Acesso = async () => {
  router.push("/Home");
};
const login = async () => {
  mensagem.value = "";

  if (!email.value || !senha.value || !nome.value) {
    mensagem.value = "Preencha todos os campos.";
    mensagemTipo.value = "error";
    return;
  }

  try {
    const response = await axios.post("http://localhost:4000/user/login", {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    });

    if (response.data.usuario) {
      localStorage.setItem("token", response.data.token);
      mensagem.value = "Login realizado com sucesso!";
      mensagemTipo.value = "success";

      // redirecionar para outra rota, como /perfil
      router.push("/home");
    } else {
      mensagem.value = response.data.message || "Erro ao fazer login";
      mensagemTipo.value = "error";
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      mensagem.value = error.response.data.message;
    } else {
      mensagem.value = "Erro interno ao fazer login. Tente novamente.";
    }
    mensagemTipo.value = "error";
  }
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
