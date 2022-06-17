<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import { supabase } from "./supabase/index";
import store from "./store/index";

export default {
  name: "App",
  components: { Navigation },
  setup() {
    const appReady = ref(null);

    const user = supabase.auth.user();

    if (!user) {
      appReady.value = true;
    }

    //= RUN WHEN THERE IS A AUTH STATE CHANGE
    //= IF USER LOGGED IN, THIS WILL FIRE
    supabase.auth.onAuthStateChange((event, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    });

    return {
      appReady,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
