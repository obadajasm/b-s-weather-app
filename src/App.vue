<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script>
import HomeView from "@/views/HomeView.vue";

export default {
  name: "App",
  components: {
    HomeView,
  },
};
</script>
<style lang="less">
@full: 100%;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: @full;
  height: @full;
}

body,
html {
  width: @full;
  height: @full;
}
</style>
