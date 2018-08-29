<template>
  <div id="app" role="main">
    <h1>Keep or Sweep</h1>
    <div class="container">
      <vue-swing
        @throwoutleft="next(true)"
        @throwoutright="next(false)"
        :config="config"
        class="card-container"
        ref="cardstack"
      >
        <Cards
          v-if="element"
          v-for="element in elements"
          :element="element"
          :key="element.id"
          />
      </vue-swing>
      <div class="card-empty">
        <button class="refresh" @click="refresh" aria-label="Refresh"></button>
        <h2>All done!</h2>
        <p>Refresh to keep or sweep again!</p>
      </div>
    </div>
    <Actions @keep="keep" @sweep="sweep" />
  </div>
</template>


<script>
import VueSwing from 'vue-swing';
import Cards from './components/Cards';
import Actions from './components/Actions';

export default {
  name: 'App',
  components: {
    Cards,
    Actions,
  },
  data() {
    return {
      // TODO: Show icons over card, x for sweep etc
      config: {
        allowedDirections: [
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT,
        ],
        // Higher swipe sensitivity, thanks to https://github.com/goweiwen/vue-swing/issues/10
        isThrowOut(xOffset, yOffset, element, throwOutConfidence) {
          return throwOutConfidence > 0.5;
        },
      },
    };
  },
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // TODO: Reduce animation speed
    keep() {
      const cards = this.$refs.cardstack.cards;
      if (cards.length > 0) {
        cards[cards.length - 1].throwOut(1, 0);
      }
    },
    sweep() {
      const cards = this.$refs.cardstack.cards;
      if (cards.length > 0) {
        cards[cards.length - 1].throwOut(-1, 0);
      }
    },
    next(remove) {
      if (remove) {
        this.delete();
      }
      this.elements.pop();
    },
    delete() {
      // TODO: Actually delete the element
    },
    // TODO: Not just refresh the page, but source elements again and show
    refresh() {
      location.reload();
    },
    // Keyboard shortcuts thanks to https://vuejsdevelopers.com/2017/05/01/vue-js-cant-help-head-body/
    keyListener(evt) {
      // Keep: Space, →, Enter
      if (evt.keyCode === 32 || evt.keyCode === 39 || evt.keyCode === 13) {
        this.keep();
      }
      // Sweep: Delete, ←
      if (evt.keyCode === 46 || evt.keyCode === 37) {
        this.sweep();
      }
    },
  },
  created() {
    // Add listener for keyboard shortcuts
    document.addEventListener('keyup', this.keyListener);
  },
  destroyed() {
    // Remove listener for keyboard shortcuts
    document.removeEventListener('keyup', this.keyListener);
  },
};
</script>


<style>
html,
body,
p,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3 {
  font-size: 100%;
  font-weight: normal;
}

button,
input {
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

img,
embed,
iframe,
object,
audio,
video {
  height: auto;
  max-width: 100vw;
}

@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: normal;
  src: local('Nunito Regular'), local('Nunito-Regular'), url('assets/Nunito-Regular.ttf');
}

@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: bold;
  src: local('Nunito Bold'), local('Nunito-Bold'), url('assets/Nunito-Bold.ttf');
}

body {
  position: absolute;
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: hidden;
}

body,
button {
  /* For some reason the button needs to know this specifically */
  font-family: 'Nunito', 'Open Sans', Frutiger, Calibri, 'Myriad Pro', Myriad, sans-serif;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container {
  height: 90vh;
  padding-top: 5vh;
}

h1 {
  visibility: hidden;
  position: absolute;
}

h2 {
  font-size: 5vh;
  font-weight: bold;
}

p {
  font-size: 3vh;
  color: hsla(0, 0%, 0%, 0.7);
}

.card-empty {
  color: hsla(0, 0%, 0%, 0.7);
  text-align: center;
  padding-top: 20vh;
  width: 50vh;
  max-height: 70vh;
}

.refresh {
  width: 20vh;
  height: 20vh;
  padding: 0;
  margin-bottom: 2vh;
  color: hsla(0, 0%, 100%, 1);
  font-size: 5vh;
  font-weight: bold;
  background-image: url('https://uploads.codesandbox.io/uploads/user/825c1616-7d14-4df9-bbaf-74faf1494186/-Hbm-icon.svg');
  background-size: cover;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none !important;
  transition: all .03s ease-in-out;
}
</style>
