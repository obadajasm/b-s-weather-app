import WeatherService from "@/service/WeatherService";

export default {
  namespaced: true,
  state: {
    currentWeather: null,
    forecast: null,
    city: null,
  },
  getters: {
    currentWeather(state) {
      return state.currentWeather;
    },
    forecast(state) {
      return state.forecast;
    },
    city(state) {
      return state.city;
    },
  },
  mutations: {
    setCurrentWeather(state, value) {
      state.currentWeather = value;
    },
    setForecast(state, value) {
      state.forecast = value;
    },
    setCity(state, value) {
      state.city = value;
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
        commit("setCity", {
          name: currentWeather.name,
          countryName: counrtyName,
        });
        return currentWeather;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getSevenDaysForecastByCityName({ commit }, { lat, lon }) {
      try {
        // const { getCountry } = require("about-countries");
        const forecastData =
          await WeatherService.getSevenDaysForecastByCityName(lat, lon);
        // for (const item of forecastData.daily) {
        // }
        // var dayname = new Date(value.dt * 1000).toLocaleDateString('en', { weekday:'long', });
        // let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        // const counrtyName = regionNames.of(forecastData.city.country);
        // const takenDays = new Set();
        // const filterdDaysWeather = forecastData.list.filter((e) => {
        //   const date = e.dt_txt.split(" ")[0];
        //   const hasIt = takenDays.has(date);
        //   if (!hasIt) {
        //     takenDays.add(date);
        //   }
        //   return !hasIt;
        // });
        // console.log("asdas", takenDays, filterdDaysWeather.length);
        // forecastData.counrtyName = counrtyName;
        commit("setForecast", forecastData);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
