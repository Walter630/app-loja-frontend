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
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props"
          ><v-avatar v-if="user.isAutenticate" color="primary">
            <v-img alt="John" src="./login.png"></v-img> </v-avatar
        ></v-btn>
      </template>
      <v-list style="background-color: #111; color: white; text-align: center">
        <v-list-item v-if="user.isAutenticate">
          <v-card style="border: 20px; background-color: #111; text-align: center">
            <v-avatar size="avatarSize" color="red">
              <img src="./login.png" alt="alt" />
            </v-avatar>
            <v-list-item-title>{{ user.usuarioLogado?.nome }}</v-list-item-title>
          </v-card>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="user.isAutenticate">
          <v-btn prepend-icon="mdi-account" color="#111">
            <v-list-item-title>Conta</v-list-item-title>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="user.isAutenticate">
          <v-btn prepend-icon="mdi-cart-variant" color="#111">
            <v-list-item-title>Carrinho</v-list-item-title>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="user.isAutenticate">
          <v-btn color="success" @click="logout">Sair</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-if="user.isAutenticate" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn class="botao" v-if="!user.isAutenticate" @click="irParaLogin">Login</v-btn>
    <v-btn class="botao" v-if="!user.isAutenticate" @click="irParaCadastro"
      >Cadastro</v-btn
    >
  </v-app-bar>

  <v-main>
    <ListarRoupas />
    <v-card>
      <v-btn color="success" @click="logout">Sair</v-btn>
    </v-card>
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
      <router-link to="/configs"><v-icon>mdi-account</v-icon></router-link>
    </v-btn>
    <v-btn elevation-6 style="color: #111">
      <router-link><v-icon>mdi-cog</v-icon></router-link>
    </v-btn>
    <v-btn elevation-6 style="color: #111">
      <router-link to="/Carrinho"><v-icon>mdi-cart-outline</v-icon></router-link>
    </v-btn>
  </v-footer>
</template>

<script>
import { onMounted } from "vue";
import ListarRoupas from "./ListarRoupas.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

export default {
  components: { ListarRoupas },
  setup() {
    const router = useRouter();
    const user = useUserStore();

    const admin = () => {
      router.push("/AdminRota/Admin");
    };

    onMounted(() => {
      user.verificarToken();
    });

    const irParaLogin = () => {
      router.push("/login");
    };

    const irParaCadastro = () => {
      router.push("/Cadastro");
    };

    const logout = () => {
      user.logout();
    };

    return {
      admin,
      logout,
      user,
      irParaCadastro,
      irParaLogin,
    };
  },
};
</script>

<style>
.botao {
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
}
.botao::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.botao:hover {
  color: aqua;
  pointer-events: visible;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3 ease;
}
.botao:hover {
  background-color: #111;
  color: cyan;
}
.botao:hover::after {
  opacity: 1;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.botao:hover {
  animation: pulse 0.3s ease-in-out;
}
</style>
