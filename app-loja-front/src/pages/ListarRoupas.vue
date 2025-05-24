<template>
  <v-row class="mt-2" align="center" justify="space-between" no-gutters>
    <v-col class="d-flex align-center" cols="auto">
      <v-card-title primary-title> Home </v-card-title>
    </v-col>
  </v-row>
  <v-row class="mt-2" align="center" justify="space-between" no-gutters>
    <v-col class="d-flex align-center" cols="auto">
      <v-card-title primary-title>
        <v-icon color="pink">mdi-tshirt-crew</v-icon>
        Roupas
        <v-icon color="pink">mdi-tshirt-crew</v-icon>
      </v-card-title>
    </v-col>
    <v-col class="d-flex justify-end" cols="auto">
      <v-card-subtitle class="text-h6">
        <router-link class="ver-tudo" to="/roupasGeral">Ver tudo...</router-link>
      </v-card-subtitle>
    </v-col>
  </v-row>

  <v-divider></v-divider>

  <v-row wrap="wrap" justify="space-between" no-gutters>
    <v-col
      v-if="itemsCarrinho.items"
      v-for="(roupa, index) in itemsRoupa.roupas"
      :key="index"
      cols="6"
      sm="6"
      md="3"
      lg="2"
      xl="2"
      style="cursor: pointer"
    >
      <v-card color="#FFF4F4" class="ma-1 pa-2" height="220" style="border-radius: 10px">
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
                <v-icon color="pink">mdi-currency-brl</v-icon>
                {{ roupa.props.valor }}
              </v-col>
              <v-col class="d-flex justify-end" cols="auto">
                <v-btn
                  size="35px"
                  icon
                  @click="adicionarAoCarrinho(roupa.props)"
                  color="pink"
                  variant="elevated"
                >
                  <v-icon color="#D283A0">mdi-cart-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </div>

        <div class="d-flex fill-height align-center justify-center">
          <v-scale-transition>
            <v-icon
              v-if="itemJaNoCarrinho(roupa.props.id)"
              @click="removerDoCarrinho(roupa.props.id)"
              color="#D283A0"
              icon="mdi-close-circle-outline"
              size="48"
            ></v-icon>
          </v-scale-transition>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoupasStore } from "@/stores/UseRoupasStore";
import { useCarrinhoStore } from "@/stores/CarrinhoStore";
import { useUserStore } from "@/stores/UserStore";

const itemsRoupa = useRoupasStore();
const itemsCarrinho = useCarrinhoStore();
const userStore = useUserStore();

const userId = userStore.usuarioLogado?.id;

const $emit = defineEmits<{
  (e: "add-to-cart", roupa: any): void;
}>();

onMounted(() => {
  itemsRoupa.fetchRoupas();

  if (userStore.usuarioLogado?.id) {
    itemsCarrinho.CarregarCarrinho();
  }
});

function itemJaNoCarrinho(roupaId: string) {
  return (
    Array.isArray(itemsCarrinho.items) &&
    itemsCarrinho.items.some((item) => item.produtoId === roupaId)
  );
}

type Roupa = {
  id: string;
  nome: string;
  imagem: string;
  valor: number;
};

function adicionarAoCarrinho(roupa: Roupa) {
  if (userStore.usuarioLogado?.id) {
    itemsCarrinho.AdicionarItem(roupa.id, 1);
  } else {
    console.warn("Usuário não logado.");
  }
}

function removerDoCarrinho(roupaId: string) {
  const item = itemsCarrinho.items.find((item) => item.produtoId === roupaId);
  if (item) {
    itemsCarrinho.removerItem(item.id);
  } else {
    console.warn("Item não encontrado no carrinho.");
  }
}
</script>

<style>
.images {
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
}

.images:hover {
  transform: scale(1.1);
  border-radius: 20px;
  box-shadow: 0 6px 8px rgba(250, 0, 196, 0.452);
}

.ver-tudo {
  color: #f3f1f1;
  text-decoration: none;
}

.ver-tudo:hover {
  color: #dd0606;
  text-decoration: none;
}
</style>
