//we are `proxing` the `metaweather` to avoid the CROS
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const APPID = "2858360d69efa635b0cff2286c2ddf7f";
const currentWeather = (city) => `${baseUrl}/weather?q=${city}&appid=${APPID}`;
const sevenDaysForecast = (city) =>
  `${baseUrl}/forecast?q=${city}&appid=${APPID}`;

export default class WeatherService {
  static async getCurrentWeatherByCityName(cityName) {
    try {
      const rawData = await fetch(currentWeather(cityName), {
        method: "GET",
      });

      const res = await rawData.json();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getSevenDaysForecastByCityName(cityName) {
    try {
      const rawData = await fetch(sevenDaysForecast(cityName), {
        method: "GET",
      });

      const res = await rawData.json();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
