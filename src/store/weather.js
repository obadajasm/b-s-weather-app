import WeatherService from "@/service/WeatherService";

export default {
  namespaced: true,
  state: {
    currentWeather: null,
    forecast: null,
    city: null,
    errorMsg: null,
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
    errorMsg(state) {
      return state.errorMsg;
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
    setErrorMsg(state, value) {
      state.errorMsg = value;
    },
  },
  actions: {
    async getCurrentWeatherByCityName({ commit }, cityName) {
      try {
        const currentWeather = await WeatherService.getCurrentWeatherByCityName(
          cityName
        );
        if (currentWeather.cod != 200) {
          commit(
            "setErrorMsg",
            currentWeather?.message ?? "Something went wrong"
          );
          return;
        }
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        const counrtyName = regionNames.of(currentWeather.sys.country); // "
        currentWeather.counrtyName = counrtyName;
        commit("setCurrentWeather", currentWeather);
        commit("setCity", {
          name: currentWeather.name,
          countryName: counrtyName,
        });
        commit("setErrorMsg", null);
        return currentWeather;
      } catch (error) {
        console.log(error);
        commit("setErrorMsg", error);
        throw error;
      }
    },
    async getSevenDaysForecastByCityName({ commit }, { lat, lon }) {
      try {
        const forecastData =
          await WeatherService.getSevenDaysForecastByCityName(lat, lon);

        commit("setForecast", forecastData);
        commit("setErrorMsg", null);
      } catch (error) {
        commit("setErrorMsg", error);

        console.log(error);
        throw error;
      }
    },
  },
};
