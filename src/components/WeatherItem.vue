<template>
  <div>
    <img :src="handleIcon(item.weather[0].icon)" />
    <p>{{ item.weather[0].main }}</p>
    <p>{{ item.temp.day }} °C</p>
    <p>{{ item.weather[0].description }}</p>
    <p>{{ handleDate(item.dt) }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    handleDate(date) {
      return new Date(date * 1000).toLocaleString().split(",")[0];
    },
    handleIcon(iconName) {
      return `http://openweathermap.org/img/wn/${iconName}@2x.png`;
    },
  },
};
</script>

<style></style>
