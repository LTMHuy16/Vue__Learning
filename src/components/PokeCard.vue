<template>
  <div class="card" :class="{ disable: isDisable }">
    <div
      class="card__inner"
      :class="{ 'is-flipped': isFlipped }"
      @click="toggleFlippedCard"
    >
      <div class="card__face card__face--front">
        <div class="card__content"></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{
            backgroundImage: `url(${require(`../assets/images/${cardInfo.valueCard}.png`)})`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PokemonCard",
  props: {
    cardInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDisable: false,
      isFlipped: false,
    };
  },
  methods: {
    toggleFlippedCard() {
      if (this.isDisable) return false;

      this.isFlipped = !this.isFlipped;
      if (this.isFlipped) {
        this.$emit("onCheckTwoCards", this.cardInfo);
      }
    },
    flippedBackCard() {
      this.isFlipped = false;
    },
    onDisable() {
      this.isDisable = true;
    },
  },
};
</script>
<style lang="css" scoped>
.card {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 90px;
  height: 120px;
}

.card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  cursor: pointer;
}

.card.disable .card__inner {
  cursor: default;
}

.card__face {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 3px 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.card__inner.is-flipped {
  transform: rotateY(-180deg);
}

.card__face--front {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__face .card__content {
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.card__face--front .card__content {
  background: url(../assets/images/icon_back.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.card__face--back {
  background-color: var(--light);
  transform: rotateY(180deg);
}

.card__face--back .card__content img {
  width: 100%;
  height: 100%;
}
</style>
