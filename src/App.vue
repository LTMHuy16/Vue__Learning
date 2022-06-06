<template>
  <div>
    <Home v-if="statusMatch === 'default'" @onStart="selectMode" />
    <Game v-if="statusMatch === 'match'" :cards="settings.cardContext" />
    <Result v-if="statusMatch === 'result'" />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Game from "./components/Game.vue";
import Result from "./components/Result.vue";
import { shuffleArray } from "./utils/randomArray";
export default {
  name: "App",
  components: {
    Home,
    Game,
    Result,
  },
  data() {
    return {
      statusMatch: "default",
      settings: {
        totalCards: 0,
        cardContext: [],
        playingTime: null,
      },
    };
  },
  methods: {
    selectMode(config) {
      this.settings.totalCards = config.totalCards;

      const firstCards = Array.from(
        { length: this.settings.totalCards / 2 },
        (_, i) => i + 1
      );

      const secondCards = [...firstCards];

      const cards = [...firstCards, ...secondCards];

      this.settings.cardContext = shuffleArray(
        shuffleArray(shuffleArray(cards))
      );

      this.settings.playingTime = new Date().getTime();

      // render cards following above configs
      this.statusMatch = "match";
    },
  },
};
</script>

<style lang="css">
.app {
}
</style>
