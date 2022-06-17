<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <!-- NO DATA -->
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl">Look Empty here...</h1>
      <router-link :to="{ name: 'Create' }" class="btn-primary self-center"
        >Create Workout</router-link
      >
    </div>

    <!-- DATA -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        :to="{ name: 'ViewWorkout', params: { workoutId: workout.id } }"
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        v-for="(workout, index) in data"
        :key="index"
      >
        <!-- Cardio Img -->
        <img
          v-if="workout.workoutType === 'cardio'"
          src="../assets/images/running-light-green.png"
          alt="cardio-img"
          class="h-24 w-auto"
        />

        <!-- Strength Img -->
        <img
          v-if="workout.workoutType === 'strength'"
          src="../assets/images/dumbbell-light-green.png"
          alt="dumbbell-img"
          class="h-24 w-auto"
        />

        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg"
        >
          {{ workout.workoutType }}
        </p>
        <h3 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ workout.workoutName }}
        </h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/index";
export default {
  name: "HomeC",
  setup() {
    //= Create data / vars
    const data = ref([]);
    const dataLoaded = ref(null);

    //= Get data
    const getData = async () => {
      try {
        const { data: worlouts, error } = await supabase
          .from("worlouts")
          .select("*");

        if (error) throw error;

        data.value = worlouts;
        dataLoaded.value = true;
      } catch (error) {
        console.log("Error at Home.vue");
        console.warn(error.messgage);
      }
    };

    //= Run data function
    getData();

    return {
      data,
      dataLoaded,
    };
  },
};
</script>

<style></style>
