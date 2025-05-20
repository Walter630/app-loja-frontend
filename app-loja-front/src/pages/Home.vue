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

    <v-btn color="white" @click="admin"> Admin </v-btn>
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

  <v-main>
    <v-col cols="12" md="4">
      <v-card style="padding: 10px; width: 30rem">
        <v-img>
          <v-card-text> sad </v-card-text>
        </v-img>
      </v-card>
    </v-col>
  </v-main>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const admin = () => {
      router.push("/AdminRota/Admin");
    };

    return {
      admin,
    };
  },
};
</script>
