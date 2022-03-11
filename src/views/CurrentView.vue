<template>
  <div>
    <div v-if="currentWeather">
      <p @click="isDialogOpen = true" style="cursor: pointer">
        {{ city.name }}
      </p>
      <p>
        {{ city.countryName }}
      </p>
      <img :src="icon" />
      <p>{{ currentWeather.main.temp }} °C</p>

      <p>{{ currentWeather.weather[0].main }}</p>
    </div>
    <!-- The Modal -->
    <div :class="$style.modal" v-if="isDialogOpen" ref="dialog">
      <div :class="$style.modalContent">
        <div style="padding: 8px">
          <p>Sunrise: {{ handleDate(currentWeather.sys.sunrise) }}</p>
          <p>Sunset: {{ handleDate(currentWeather.sys.sunset) }}</p>
        </div>
        <span :class="$style.close" @click="isDialogOpen = false">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "",
      isDialogOpen: false,
    };
  },
  computed: {
    ...mapGetters("Weather", ["currentWeather", "city"]),
  },
  methods: {
    handleDate(date) {
      return new Date(date * 1000).toLocaleString().split(",")[1];
    },
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

<style scoped module lang="less">
@import "@/assets/styles.less";
.modal {
  display: hidden;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modalContent {
  .bordered(dotted);
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 250px;
  display: flex;
  justify-content: center;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
