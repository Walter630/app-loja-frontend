<template>
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
          height="200"
          width="190"
          @click="toggle"
          style="border-radius: 10px"
        >
          <div class="d-flex flex-column flex-ms-row">
            <v-img
              class="images align-end"
              :src="`${roupa.props.imagem}`"
              height="200"
              contain
              style="cursor: pointer"
              ><v-card-title class="white--text">
                {{ roupa.props.nome }}
              </v-card-title>

              <v-card-text class="white--text">
                {{ roupa.props.descricao }}
              </v-card-text></v-img
            >
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
</style>
