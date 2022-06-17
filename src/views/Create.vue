<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status Message -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-light-grey rounded-md"
    >
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form
        @submit.prevent="createWorkout"
        class="flex flex-col gap-y-5 w-full"
      >
        <h1 class="text-2xl text-at-light-green">Record workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green"
            >Workout Name</label
          >
          <input
            type="text"
            required
            class="p-2 text-green-500 focus:outline-none"
            id="workout-name"
            v-model="workoutName"
          />
        </div>

        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green"
            >Workout Type</label
          >
          <select
            id="workout-type"
            required
            class="p-2 text-green-500 focus:outline-none"
            v-model="workoutType"
            @change="workoutChange"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!-- Strength Training Input -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="exercises" class="mb-1 text-sm text-at-light-green"
                >Exercise</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green"
                >Sets</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green"
                >Reps</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.reps"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green"
                >Weight (LB's)</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.weight"
              />
            </div>

            <img
              @click="deleteExrcise(item.id)"
              src="@/assets/images/trash-light-green.png"
              alt="delete-icon"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
            />
          </div>
          <button @click="addExercise" type="button" class="btn-primary">
            Add Exercise
          </button>
        </div>

        <!-- Cardio Training Input -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-green"
                >Type</label
              >
              <select
                id="cardioType"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.cardioType"
              >
                <option value="#">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green"
                >Distance</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green"
                >Duration</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green"
                >Pace</label
              >
              <input
                type="text"
                required
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.pace"
              />
            </div>

            <img
              @click="deleteExrcise(item.id)"
              src="@/assets/images/trash-light-green.png"
              alt="delete-icon"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
            />
          </div>
          <button @click="addExercise" type="button" class="btn-primary">
            Add Exercise
          </button>
        </div>

        <button type="submit" class="btn-primary">Record Workout</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase/index";
export default {
  name: "CreateC",
  setup() {
    //= Create data
    const workoutName = ref("");
    const workoutType = ref("Select workout"); // [strength, cardio]
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    //= Add exercises
    const addExercise = () => {
      if (workoutType.value === "strength") {
        exercises.value.push({
          id: uid(),
          exercises: "",
          sets: "",
          reps: "",
          weight: "",
        });
        return;
      }

      // cardio object
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    //= Delete exercises
    const deleteExrcise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter((e) => e.id !== id);
        return;
      }
      errorMsg.value =
        "Error: Cantnot remove, need to at least havae one exercise";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };

    //= Listen for changing of workout type input
    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    //= Create workout
    const createWorkout = async () => {
      try {
        const { error } = await supabase.from("worlouts").insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value,
          },
        ]);

        if (error) throw error;

        //= Anounce and reset value
        statusMsg.value = "Success: Worlout Created !";
        workoutName.value = null;
        workoutType.value = "Select workout";
        exercises.value = [];
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);
      } catch (error) {
        errorMsg.value = `Error: ${error.messgae}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,

      addExercise,
      workoutChange,
      deleteExrcise,
      createWorkout,
    };
  },
};
</script>

<style></style>
