//we are `proxing` the `metaweather` to avoid the CROS
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const APPID = "53f20b1a592186db6edef1438ba8e759";
const currentWeather = (city) => `${baseUrl}/weather?q=${city}&appid=${APPID}`;
const sevenDaysForecast = (lat, lon) =>
  `${baseUrl}onecall?lat=${lat}&lon=${lon}&appid=${APPID}`;

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
  static async getSevenDaysForecastByCityName(lat, lon) {
    try {
      const rawData = await fetch(sevenDaysForecast(lat, lon), {
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
