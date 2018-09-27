<template>
  <div class="card">
    <div class="preview" :style="{ backgroundImage: 'url(' + element.preview + ')' }"></div>
    <h2 class="name">{{ element.name }}</h2>
    <p class="detail">
        <a :href="element.link" target="_blank" rel="noopener">
            <img class="source" :src="element.source" alt="🔗" />
        </a>
        {{ element.detail }}
    </p>
  </div>
</template>


<script>
export default {
  name: 'Cards',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
};
</script>


<style scoped>
.card {
  position: absolute;
  background-color: hsla(0, 0%, 100%, 1);
  max-width: 100vw;
  max-height: 70vh;
  border-radius: 3vh;
  display: none;
  /* Show cards above action buttons */
  z-index: 1;
}

/* Only show and apply shadow to 5 top cards for performance */
.card:nth-last-child(-n+5) {
  display: inline-block;
  /* filter: drop-shadow is very laggy on mobile */
  box-shadow: 0 .3vh 4vh hsla(0, 0%, 10%, .1);
}

.card:nth-child(odd) {
  transform: rotate(-3deg);
}

.card:nth-child(3n) {
  transform: rotate(4deg);
}

.preview {
  height: 50vh;
  width: 50vh;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  /* overflow: hidden; on .card clips the drop-shadow on Safari */
  /* so the radius needs to be applied to the preview instead */
  border-top-left-radius: 3vh;
  border-top-right-radius: 3vh;
}

.name,
.detail {
  margin: 0;
  padding: 2vh;
  width: 50vh;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.name {
  padding-bottom: 0;
}
.detail {
  padding-top: 0;
}

.source {
  width: 7vh;
  padding: 2vh;
  margin: -2vh;
  vertical-align: sub;
}
</style>
