import WeatherService from "@/service/WeatherService";

export default {
  namespaced: true,
  state: {
    currentWeather: null,
    forecast: null,
  },
  getters: {
    currentWeather(state) {
      return state.currentWeather;
    },
    forecast(state) {
      return state.forecast;
    },
  },
  mutations: {
    setCurrentWeather(state, value) {
      state.currentWeather = value;
    },
  },
  actions: {
    async getCurrentWeatherByCityName({ commit }, cityName) {
      try {
        // const { getCountry } = require("about-countries");
        const currentWeather = await WeatherService.getCurrentWeatherByCityName(
          cityName
        );
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        const counrtyName = regionNames.of(currentWeather.sys.country); // "
        currentWeather.counrtyName = counrtyName;
        commit("setCurrentWeather", currentWeather);
        return currentWeather;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getSevenDaysForecastByCityName({ commit }, cityName) {
      try {
        // const { getCountry } = require("about-countries");
        const currentWeather =
          await WeatherService.getSevenDaysForecastByCityName(cityName);
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        const counrtyName = regionNames.of(currentWeather.sys.country); // "
        currentWeather.counrtyName = counrtyName;
        commit("setCurrentWeather", currentWeather);
        return currentWeather;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
