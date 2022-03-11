<template>
  <div class="home">
    <div v-if="currentWeather">
      <p>
        {{ currentWeather.name }}
      </p>
      {{ currentWeather.counrtyName }}
    </div>
    <img :src="icon" />
    <p>{{ currentWeather.main.temp }}</p>
    <p>{{ currentWeather.weather[0].main }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "",
    };
  },
  computed: {
    ...mapGetters("Weather", ["currentWeather"]),
  },
  watch: {
    currentWeather: {
      handler(newV) {
        this.icon = `http://openweathermap.org/img/wn/${newV.weather[0].icon}@2x.png`;
      },
      immediate: true,
    },
  },
};
</script>
