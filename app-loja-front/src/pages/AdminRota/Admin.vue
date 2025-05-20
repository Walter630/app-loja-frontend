<template>
  <v-app-bar
    elevation="2"
    scroll-behavior="elevate fade-image collapse hide"
    scroll-threshold="519"
  >
    <template v-slot:prepend>
      <v-app-nav-bar></v-app-nav-bar>
    </template>
    <v-app-bar-title>Site</v-app-bar-title>

    <v-avatar color="primary">
      <v-img alt="John" src="./login.png"></v-img>
    </v-avatar>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <v-container>
    <v-btn color="primary" dark @click="dialog = true"> Cadastrar Produtos </v-btn>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="text-h5">Cadastrar Produto</v-card-title>
        <v-card-text>
          <v-text-field label="Nome do Produto" v-model="produto.nome" />
          <v-text-field label="Preço" v-model="produto.preco" type="number" />
          <v-text-field label="Descrição" v-model="produto.descricao" />
          <v-text-field label="Categoria" v-model="produto.categoria" />
          <v-text-field label="Imagem (URL)" v-model="produto.imagem" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" text @click="enviarProduto">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const dialog = ref(false);

    const produto = ref({
      nome: "",
      preco: "",
      descricao: "",
      categoria: "",
      imagem: "",
    });

    const enviarProduto = () => {
      console.log("Produto a enviar:", produto.value);
      // Aqui você faz o POST para o backend com axios depois
      dialog.value = false;
    };
    return {
      enviarProduto,
      produto,
      dialog,
    };
  },
};
</script>
