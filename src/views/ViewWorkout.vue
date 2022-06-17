<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- APP MESSAGE -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- WORKOUT INFOMATION -->
    <div
      v-if="dataLoaded"
      class="relative flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey"
    >
      <!-- GENERAL WORKOUT -->
      <div v-if="user" class="absolute left-2 top-2 flex gap-x-2">
        <div
          class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          @click="editMode"
        >
          <img
            class="h-3.5 w-auto"
            src="../assets/images/pencil-light.png"
            alt="edit-icon"
          />
        </div>
        <div
          class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          @click="deleteWorkout"
        >
          <img
            class="h-3.5 w-auto"
            src="../assets/images/trash-light.png"
            alt="delete-icon"
          />
        </div>
      </div>

      <img
        v-if="data.workoutType === 'cardio'"
        class="h-24 w-auto"
        src="../assets/images/running-light-green.png"
        alt="workout-icon"
      />

      <img
        v-if="data.workoutType === 'strength'"
        class="h-24 w-auto"
        src="../assets/images/running-light-green.png"
        alt="workout-icon"
      />

      <span
        class="mt-6 py-1.5 px-5 text-sm text-white bg-at-light-green rounded-lg shadow-md capitalize"
      >
        {{ data.workoutType }}
      </span>

      <div class="w-full mt-6">
        <input
          v-if="isEditMode"
          type="text"
          class="p-2 w-full text-gray-500 focus:outline-none"
          v-model="data.workoutName"
        />
        <h1 v-else class="text-at-light-green text-xl text-center">
          {{ data.workoutName }}
        </h1>
      </div>
    </div>

    <!-- EXERCISES -->
    <div
      class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md"
    >
      <!-- STRENGTH TRAINING -->
      <div
        v-if="data.workoutType === 'strength'"
        class="flex flex-col gap-y-4 w-full"
      >
        <div
          class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
          v-for="(item, index) in data.exercises"
          :key="index"
        >
          <div class="flex flex-2 flex-col md:w-1/3">
            <label for="exercises" class="mb-1 text-sm text-at-light-green">
              Exercise
            </label>
            <input
              type="text"
              id="exercises"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.exercise"
            />
            <p v-else>{{ item.exercise }}</p>
          </div>
          <div class="flex flex-1 flex-col">
            <label for="sets" class="mb-1 text-sm text-at-light-green">
              Sets
            </label>
            <input
              type="text"
              id="sets"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.sets"
            />
            <p v-else>{{ item.sets }}</p>
          </div>
          <div class="flex flex-1 flex-col">
            <label for="reps" class="mb-1 text-sm text-at-light-green">
              Reps
            </label>
            <input
              type="text"
              id="sets"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.reps"
            />
            <p v-else>{{ item.reps }}</p>
          </div>
          <div class="flex flex-1 flex-col">
            <label for="weight" class="mb-1 text-sm text-at-light-green">
              Weight
            </label>
            <input
              type="text"
              id="sets"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.weight"
            />
            <p v-else>{{ item.weight }}</p>
          </div>

          <img
            v-if="isEditMode"
            @click="deleteExrcise(item.id)"
            class="absolute -left-5 h-4 w-auto cursor-pointer"
            src="../assets/images/trash-light-green.png"
            alt="delete-icon"
          />
        </div>
        <button
          v-if="isEditMode"
          @click="addExercise"
          type="button"
          class="btn-primary"
        >
          Add Exercise
        </button>
      </div>

      <!-- CARDIO TRAINING -->
      <div
        v-if="data.workoutType === 'cardio'"
        class="flex flex-col gap-y-4 w-full"
      >
        <div
          class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
          v-for="(item, index) in data.exercises"
          :key="index"
        >
          <div class="flex flex-2 flex-col md:w-1/3">
            <label for="cardio-type" class="mb-1 text-sm text-at-light-green">
              Type
            </label>
            <select
              id="cardio-type"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.cardioType"
            >
              <option value="select-workout">Select Workout</option>
              <option value="strength">Strength Training</option>
              <option value="cardio">Cardio Training</option>
            </select>
            <p v-else>{{ item.cardioType }}</p>
          </div>
          <div class="flex flex-1 flex-col">
            <label for="distance" class="mb-1 text-sm text-at-light-green">
              Distance
            </label>
            <input
              type="text"
              id="distance"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.distance"
            />
            <p v-else>{{ item.distance }}</p>
          </div>
          <div class="flex flex-1 flex-col">
            <label for="duration" class="mb-1 text-sm text-at-light-green">
              Duration
            </label>
            <input
              type="text"
              id="sets"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.duration"
            />
            <p v-else>{{ item.duration }}</p>
          </div>
          <div class="flex flex-1 flex-col">
            <label for="pace" class="mb-1 text-sm text-at-light-green">
              Pace
            </label>
            <input
              type="text"
              id="sets"
              class="w-full p-2 text-gray-500 focus:outline-none"
              v-if="isEditMode"
              v-model="item.pace"
            />
            <p v-else>{{ item.pace }}</p>
          </div>

          <img
            v-if="isEditMode"
            @click="deleteExrcise(item.id)"
            class="absolute -left-5 h-4 w-auto cursor-pointer"
            src="../assets/images/trash-light-green.png"
            alt="delete-icon"
          />
        </div>
        <button v-if="isEditMode" type="button" class="btn-primary">
          Add Exercise
        </button>
      </div>

      <!-- UPDATAE -->
      <button
        v-if="isEditMode"
        @click="updateWorkout"
        type="button"
        class="btn-primary"
      >
        Update Workout
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/index";
import { useRoute, useRouter } from "vue-router";
import store from "../store/index";
import { uid } from "uid";
export default {
  name: "ViewWorkout",
  setup() {
    //= Create data / vars
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);

    const route = useRoute();
    const router = useRouter();
    const user = computed(() => store.state.user);

    //= Get current id of route
    const currentId = route.params.workoutId;

    //= Get workout data
    const getData = async () => {
      try {
        const { data: worlouts, error } = await supabase
          .from("worlouts")
          .select("*")
          .eq("id", currentId);

        if (error) throw error;

        data.value = worlouts[0];
        dataLoaded.value = true;
        console.log(data.value);
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          error.value = null;
        }, 5000);
      }
    };

    //= Run getData
    getData();

    //= Delete workout
    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from("worlouts")
          .delete()
          .eq("id", currentId);

        if (error) throw error;

        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    //= Edit mode
    const isEditMode = ref(null);

    const editMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    //= Add exercise
    const addExercise = () => {
      if (data.value.workoutType === "strength") {
        data.value.exercises.push({
          id: uid(),
          exercises: "",
          sets: "",
          reps: "",
          weight: "",
        });
        return;
      }

      // cardio object
      data.value.exercises.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    //= Delete exercise
    const deleteExrcise = (id) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter((e) => e.id !== id);
        return;
      }
      errorMsg.value =
        "Error: Cantnot remove, need to at least havae one exercise";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };

    //= Update Workout
    const updateWorkout = async () => {
      try {
        const { error } = await supabase
          .from("worlouts")
          .update({
            workoutName: data.value.workoutName,
            exercises: data.value.exercises,
          })
          .eq("id", currentId);

        if (error) throw error;

        isEditMode.value = false;
        statusMsg.value = "Updata completed !!!";
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      statusMsg,
      dataLoaded,
      errorMsg,
      data,
      isEditMode,
      editMode,
      user,
      deleteWorkout,
      addExercise,
      deleteExrcise,
      updateWorkout,
    };
  },
};
</script>

<style></style>
