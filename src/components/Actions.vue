<template>
  <div class="actions">
    <button class="sweep" @click="sweep">{{ randomLabel.sweep }}</button>
    <button class="keep" @click="keep">{{ randomLabel.keep }}</button>
  </div>
</template>


<script>
import shuffle from 'lodash.shuffle';

export default {
  name: 'Actions',
  data() {
    return {
      actions: [
        {
          keep: 'Keep',
          sweep: 'Sweep',
        },
        {
          keep: 'Neat',
          sweep: 'Delete',
        },
        {
          keep: 'Shantay',
          sweep: 'Sashay',
        },
        {
          keep: 'Love',
          sweep: 'Shove',
        },
      ],
    };
  },
  methods: {
    keep() {
      this.$emit('keep');
    },
    sweep() {
      this.$emit('sweep');
    },
  },
  computed: {
    randomLabel() {
      return shuffle(this.actions)[0];
    },
  },
};
</script>


<style scoped>
.actions {
  margin-bottom: 5vh;
}

.sweep,
.keep {
  width: 20vh;
  height: 20vh;
  padding: 0;
  padding-top: 8vh;
  /* !important is needed to prevent Nextcloud from overriding button styles */
  color: hsla(0, 0%, 100%, 1) !important;
  font-size: 5vh;
  font-weight: bold;
  background-size: 10vh;
  background-position: center 2vh;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: none;
  filter: drop-shadow(0 1vh 2vh hsla(0, 0%, 40%, 0.5));
  cursor: pointer;
  transition: all .03s ease-in-out;
  /* TODO: Find out why this does not remove the outlines */
  outline: none !important;
}

.sweep {
  background-color: hsla(2, 81%, 55%, 1) !important;
  border-color: hsla(2, 81%, 55%, 1);
  box-shadow: 0 1vh 0 hsla(2, 81%, 36%, 1);
  background-image: url('../assets/close-white.svg?v=1');
}

.keep {
  background-color: hsla(201, 100%, 39%, 1) !important;
  border-color: hsla(201, 100%, 39%, 1);
  box-shadow: 0 1vh 0 hsla(201, 100%, 25%, 1);
  margin-left: 5vh;
  background-image: url('../assets/checkmark-white.svg?v=1');
}

.sweep:hover,
.sweep:focus,
.keep:hover,
.keep:focus {
  filter: drop-shadow(0 1vh 2vh hsla(0, 0%, 40%, 0.5));
  text-shadow: 0 0 1vh hsla(0, 0%, 100%, 0.5);
}

.sweep:active,
.keep:active {
  box-shadow: 0 .5vh 0 hsla(2, 81%, 36%, 1);
  transform: translate(0, .5vh);
  filter: drop-shadow(0 1vh 1vh hsla(0, 0%, 40%, 0.5));
}
.keep:active {
  box-shadow: 0 .5vh 0 hsla(201, 100%, 25%, 1);
}
</style>
