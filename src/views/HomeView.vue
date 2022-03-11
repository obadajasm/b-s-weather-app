<template>
  <div>
    <div :class="$style.inputSearch">
      <form @submit.prevent="submitHandler" :class="$style.inputSearch">
        <input v-model="cityName" type="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    </div>
    <div style="margin: 30px 0px; padding: 10px">
      <nav>
        <router-link
          :class="{ [$style.selectedTab]: this.$route.path == '/' }"
          :disabled="canNavigate"
          to="/"
          >CURRENT</router-link
        >
        <router-link
          :class="{ [$style.selectedTab]: this.$route.path == '/forecast' }"
          :disabled="canNavigate"
          to="/forecast"
        >
          SEVEN DAYS FORECAST</router-link
        >
      </nav>
    </div>
    <p v-if="errorMsg">
      {{ errorMsg }}
    </p>
    <router-view v-else :key="$router.route" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { debounce } from "@/helpers";
export default {
  data() {
    return {
      cityName: "",
      canNavigate: false,
      showCurrent: true,
    };
  },
  computed: {
    ...mapGetters("Weather", ["errorMsg"]),
  },

  watch: {
    cityName: debounce(function () {
      if (this.cityName.length > 2) {
        this.submitHandler();
      }
    }, 500),
  },
  methods: {
    ...mapActions("Weather", [
      "getCurrentWeatherByCityName",
      "getSevenDaysForecastByCityName",
    ]),
    async submitHandler() {
      this.canNavigate = true;
      const res = await this.getCurrentWeatherByCityName(this.cityName);
      if (res) {
        this.getSevenDaysForecastByCityName(res.coord);
      }
    },
    debounce(func, delay) {
      let debounceTimer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    },
  },
};
</script>

<style scoped module lang="less">
@import "@/assets/styles.less";

.inputSearch {
  display: flex;
  justify-content: center;
}
.selectedTab {
  padding: 10px;
  margin: 0px 10px;
  .bordered(solid);
}
a {
  color: #000;
  text-decoration: none;
}
form {
  color: #555;
  display: flex;
  padding: 2px;
  .bordered(solid);
}
input[type="search"] {
  border: none;
  background: transparent;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}

input[type="search"]::placeholder {
  color: #bbb;
}
button[type="submit"] {
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
  opacity: 0.7;
}

button[type="submit"]:hover {
  opacity: 1;
}
button[type="submit"]:focus,
input[type="search"]:focus {
  box-shadow: 0 0 3px 0 #b2b4b6;
  border-color: #b2b4b6;
  outline: none;
}
</style>
