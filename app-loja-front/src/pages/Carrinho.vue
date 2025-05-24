<template>
  <v-app-bar
    color="#F9D7D7"
    style="text-align: center; align-items: center; display: flex"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Bella Fitnnes</v-app-bar-title>
  </v-app-bar>
  <v-main>
    <v-row class="mt-2" align="center" justify="space-between" no-gutters>
      <v-col class="d-flex align-center" cols="auto">
        <v-card-title primary-title> Carrinho </v-card-title>
      </v-col>
    </v-row>
    <v-card>
      <v-btn color="success" @click="listarCarrinho">Atualizar</v-btn>
    </v-card>

    <v-row wrap="wrap" justify="space-between" no-gutters>
      <v-col
        v-for="(roupa, index) in itemsCarrinho.items"
        :key="index"
        cols="6"
        sm="6"
        md="3"
        lg="2"
        xl="2"
        style="cursor: pointer"
      >
        <v-card
          color="#FFF4F4"
          class="ma-1 pa-2"
          height="220"
          style="border-radius: 10px"
        >
          <div class="d-flex flex-column flex-ms-row">
            <v-img
              class="images align-end"
              :src="roupa.props.imagem"
              height="120"
              contain
              style="cursor: pointer"
            ></v-img>
            <v-card-title class="text-subtitle-1 font-weight-bold pa-3">
              {{ roupa.props.nome }}
            </v-card-title>
            <v-card-text class="white--text">
              <v-row class="mt-2" align="center" justify="space-between" no-gutters>
                <v-col class="d-flex align-center text-h6" cols="auto">
                  <v-icon color="#111">mdi-currency-brl</v-icon>
                  {{ roupa.props.valor }}
                </v-col>
                <v-col class="d-flex justify-end" cols="auto">
                  <v-btn
                    size="35px"
                    icon
                    @click.prevent.stop="$emit('removerRoupa', roupa)"
                    color="#111"
                    variant="elevated"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <router-link to="/Home">Voltar</router-link>
  </v-main>
</template>

<script>
import { useUserStore } from "@/stores/UserStore";
import { useCarrinhoStore } from "@/stores/CarrinhoStore";
import { useRouter } from "vue-router";
import { useRoupasStore } from "@/stores/UseRoupasStore";

export default {
  setup() {
    const router = useRouter();
    const carrinhoStore = useCarrinhoStore();
    const userStore = useUserStore();
    const roupasStore = useRoupasStore();
    const userId = userStore.usuarioLogado?.id;

    const listarCarrinho = () => {
      if (userId) {
        carrinhoStore.CarregarCarrinho();
      }
    };

    return {
      listarCarrinho,
      userStore,
      roupasStore,
      carrinhoStore,
      userId,
      router,
    };
  },
};
</script>
