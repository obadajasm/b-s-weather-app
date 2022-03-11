<template>
  <div>
    <div v-if="forecast">
      <p>
        {{ city.name }}
      </p>
      <p>
        {{ city.countryName }}
      </p>
      <div class="container">
        <div
          v-for="item in handleForecastList(forecast.daily)"
          :key="item.dt_txt"
          class="item"
        >
          <div>
            <img :src="handleIcon(item.weather[0].icon)" />
            <p>{{ item.weather[0].main }}</p>
            <p>{{ item.temp.max }}</p>
            <p>{{ item.weather[0].description }}</p>
            <p>{{ handleDate(item.dt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("Weather", ["forecast", "city"]),
  },
  methods: {
    handleIcon(iconName) {
      return `http://openweathermap.org/img/wn/${iconName}@2x.png`;
    },
    handleDate(date) {
      return new Date(date * 1000).toLocaleString().split(",")[0];
    },
    handleForecastList(list) {
      return list.slice(0, 7);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.item {
  margin: 5px;
  padding: 30px;
  border: 1px dotted rgb(238, 235, 235);
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: left;
  padding: 8px;
}
</style>
