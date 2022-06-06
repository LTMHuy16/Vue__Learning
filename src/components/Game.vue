<template lang="">
  <div>
    <h1>Game</h1>
    <PokeCard
      v-for="(valueCard, index) in cards"
      :key="index"
      :ref="`card-${index}`"
      :cardInfo="{ index, valueCard }"
      @onCheckTwoCards="handleCheckTwoCards"
    />
  </div>
</template>
<script>
import PokeCard from "./PokeCard.vue";
export default {
  name: "GameC",
  components: {
    PokeCard,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      twoCardsFlipped: [],
    };
  },
  methods: {
    handleCheckTwoCards(cardInfo) {
      if (this.twoCardsFlipped.length <= 1) {
        this.twoCardsFlipped.push(cardInfo);
      }

      const firstCard = this.twoCardsFlipped[0];
      const secondCard = this.twoCardsFlipped[1];

      if (this.twoCardsFlipped.length === 2) {
        if (firstCard.valueCard === secondCard.valueCard) {
          console.log("Right");
          // add class 'disable' in PokemonCard
          this.$refs[`card-${firstCard.index}`][0].onDisable();
          this.$refs[`card-${secondCard.index}`][0].onDisable();

          //
          const disableElements = document.querySelectorAll(
            ".screen .card.disable"
          );

          console.log(disableElements);
        }

        if (firstCard.valueCard !== secondCard.valueCard) {
          setTimeout(() => {
            console.log("Wrong");

            this.$refs[`card-${firstCard.index}`][0].flippedBackCard();
            this.$refs[`card-${secondCard.index}`][0].flippedBackCard();

            this.twoCardsFlipped = [];
          }, 800);
        }
      } else return false;
    },
  },
};
</script>
<style lang=""></style>
