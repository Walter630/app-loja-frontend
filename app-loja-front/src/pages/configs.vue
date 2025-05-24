<template>
  <v-app-bar
    elevation="2"
    scroll-behavior="elevate fade-image collapse hide"
    scroll-threshold="519"
    color="#F9D7D7"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Bella Fitnnes</v-app-bar-title>

    <!-- <v-btn v-if="user.isAutenticate" color="white" @click="admin"> Admin </v-btn> -->

    <v-btn v-if="user.isAutenticate" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="4" offset-md="4" style="text-align: center">
          <v-card>
            <v-card-text>
              <v-avatar size="100" color="red">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.in3ikDi0A9xg75PJCel2FgHaEU&pid=Api&P=0&h=180"
                  alt="alt"
                />
              </v-avatar>
              <h3>{{ user.nome }}</h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" offset-md="4">
          <v-card
            style="display: flex; align-items: center; justify-content: space-between"
          >
            <v-card-title>Editar perfil</v-card-title>
            <v-menu offset-y z-index="1000">
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props"><v-icon>mdi-chevron-right</v-icon></v-btn>
              </template>
              <v-list style="background-color: #f9d7d7; color: black; text-align: center">
                <v-list-item>
                  <v-btn color="#f9d7d7">
                    <v-list-item-title>Editar</v-list-item-title>
                  </v-btn>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-btn color="#f9d7d7">
                    <v-list-item-title>Excluir</v-list-item-title>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" offset-md="4">
          <v-card
            style="display: flex; align-items: center; justify-content: space-between"
          >
            <v-card-title>notificaçao</v-card-title>
            <input
              v-model="user.notificacoes"
              type="checkbox"
              color="pink"
              class="ma-2"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" offset-md="4">
          <v-card
            style="display: flex; align-items: center; justify-content: space-between"
          >
            <v-card-title>Privacidade</v-card-title>
            <v-icon>mdi-chevron-right</v-icon>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" offset-md="4">
          <v-card
            style="display: flex; align-items: center; justify-content: space-between"
          >
            <v-card-title>Segurança</v-card-title>
            <v-icon>mdi-chevron-right</v-icon>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" offset-md="4">
          <v-card
            style="display: flex; align-items: center; justify-content: space-between"
          >
            <v-card-title>Ajuda</v-card-title>
            <v-icon>mdi-chevron-right</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <v-footer
    style="
      text-align: center;
      align-items: center;
      display: flex;
      justify-content: space-evenly;
    "
    color="#F9D7D7"
  >
    <v-btn elevation-6 style="color: #111">
      <router-link to="/Home"><v-icon>mdi-account</v-icon></router-link>
    </v-btn>
    <v-btn elevation-6 style="color: #111">
      <router-link to="configs"><v-icon>mdi-cog</v-icon></router-link>
    </v-btn>
    <v-btn elevation-6 style="color: #111">
      <router-link>...</router-link>
    </v-btn>
  </v-footer>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const user = userStore.usuarioLogado;
</script>
