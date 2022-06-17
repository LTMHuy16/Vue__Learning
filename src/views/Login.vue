<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- ERROR HANDLING -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- LOGIN -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green"
          >Email</label
        >
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green"
          >Password</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <button
        type="submit"
        class="btn-primary"
      >
        Login
      </button>

      <router-link class="mt-6 text-sm text-center" :to="{ name: 'Register' }"
        >Don't have an account ?
        <span class="text-at-light-green">Register</span></router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/index";
import { useRouter } from "vue-router";

export default {
  name: "LoginC",
  setup() {
    //= CREATE DATA / VARS
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);

    //= LOGIN FUNCTION]
    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      email,
      password,
      errorMsg,
      login,
    };
  },
};
</script>

<style></style>
