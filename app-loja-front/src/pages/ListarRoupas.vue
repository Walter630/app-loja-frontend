<template>
  <v-row class="mt-2" align="center" justify="space-between" no-gutters>
    <v-col class="d-flex align-center" cols="auto"
      ><v-card-title primary-title
        ><v-icon color="pink">mdi-tshirt-crew</v-icon>
        Roupas
        <v-icon color="pink">mdi-tshirt-crew</v-icon>
      </v-card-title></v-col
    >
    <v-col class="d-flex justify-end" cols="auto">
      <v-card-subtitle class="text-h6"
        ><router-link class="ver-tudo" to="/roupasGeral">ver Tudo...</router-link>
      </v-card-subtitle></v-col
    >
  </v-row>
  <v-sheet class="mx-auto fundo" elevation="8" max-width="2000">
    <v-slide-group class="pa-4" center-active show-arrows>
      <v-slide-group-item
        v-for="(roupa, index) in itemsRoupa.roupas"
        :key="index"
        v-slot="{ isSelected, toggle }"
      >
        <v-card
          :color="isSelected ? 'primary' : 'black'"
          class="ma-1"
          height="315"
          width="220"
          @click="toggle"
          style="border-radius: 10px"
        >
          <div class="d-flex flex-column flex-ms-row">
            <v-img
              class="images align-end"
              :src="roupa.props.imagem"
              height="200"
              contain
              style="cursor: pointer"
            ></v-img>
            <v-card-title class="white--text">
              {{ roupa.props.nome }}
            </v-card-title>
            <v-card-text class="white--text">
              {{ roupa.props.descricao }}
              <v-row class="mt-2" align="center" justify="space-between" no-gutters>
                <v-col class="d-flex align-center" cols="auto">
                  <v-icon color="pink">mdi-currency-usd</v-icon>
                  {{ roupa.props.valor }}
                  <v-icon color="pink">mdi-currency-usd</v-icon>
                </v-col>
                <v-col class="d-flex justify-end" cols="auto">
                  <v-btn
                    style=""
                    size="35px"
                    icon
                    @click.stop="$emit('add-to-cart', roupa)"
                    ><v-icon color="pink">mdi-cart-plus</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </div>

          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import { useRoupasStore } from "@/stores/UseRoupasStore";

export default {
  nome: "roupaList",
  props: {
    roupa: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const itemsRoupa = useRoupasStore();

    onMounted(() => {
      itemsRoupa.fetchRoupas();
    });
    return {
      itemsRoupa,
    };
  },
};
</script>

<style>
.images {
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
}

.images:hover {
  transform: scale(1.1);
  border-radius: 20px;
  box-shadow: 0 6px 8px rgba(243, 1, 252, 0.3);
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
