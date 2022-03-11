<template>
  <div>
    <div v-if="forecast">
      <p>
        {{ city.name }}
      </p>
      <p>
        {{ city.countryName }}
      </p>
      <div :class="$style.container">
        <div
          v-for="item in handleForecastList(forecast.daily)"
          :key="item.dt"
          :class="$style.items"
        >
          <WeatherItem :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WeatherItem from "@/components/WeatherItem.vue";

export default {
  computed: {
    ...mapGetters("Weather", ["forecast", "city"]),
  },
  components: {
    WeatherItem,
  },
  methods: {
    handleForecastList(list) {
      return list.slice(0, 7);
    },
  },
};
</script>

<style scoped module lang="less">
@import "@/assets/styles.less";
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.items {
  margin: 5px;
  padding: 30px;
  .bordered(dotted);
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
