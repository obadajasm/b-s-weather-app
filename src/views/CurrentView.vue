<template>
  <div class="home">
    <div v-if="currentWeather">
      <p>
        {{ city.name }}
      </p>
      <p>
        {{ city.countryName }}
      </p>
      <img :src="icon" />
      <p>{{ currentWeather.main.temp }}</p>
      <p>{{ currentWeather.weather[0].main }}</p>
    </div>
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
    ...mapGetters("Weather", ["currentWeather", "city"]),
  },
  watch: {
    currentWeather: {
      handler() {
        if (!this.currentWeather) {
          return;
        }
        this.icon = `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`;
      },
      immediate: true,
    },
  },
};
</script>
