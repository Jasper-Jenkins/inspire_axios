import Weather from "../../models/weather.js";

// @ts-ignore
/*function cityWeather(city) {

    let weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    let cityApi = "boise"
    let appId = "&&APPID=bd82255fd0a21fa1238699b9eda2ee35"

    let weatherBaseUrl = weatherApiUrl + cityApi + appId

    console.log("weather api url: ", weatherBaseUrl)*/

    const weatherApi = axios.create({
        //baseURL: "//bcw-sandbox.herokuapp.com/api/weather",
        baseURL: "http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35",
      //  baseUrl: weatherBaseUrl,
        timeout: 3000
    });
/*
    return weatherApi
}*/
 
/*
const weatherApi = axios.create({
	//baseURL: "//bcw-sandbox.herokuapp.com/api/weather",
    baseURL: "http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35",
    timeout: 3000 
});
*/

let _state = {
	weather: {}
}

let _subscribers = {
	weather: []
}

function _setState(prop, data) {
	_state[prop] = data
    _subscribers[prop].forEach(fn => fn());
}

export default class WeatherService {
	get Weather() {
		return _state.weather
	}

	addSubscriber(prop, fn) {
		_subscribers[prop].push(fn)
	}

    getWeather() {
      //  let cityName = "boise"
      //  const weatherApi = cityWeather(cityName)
     //   console.log("weather api: ", weatherApi)
		console.log('Calling the Weatherman')
        weatherApi.get()
            .then(res => {
			_setState('weather', new Weather(res.data))
		})
    }

    getWeatherCityOfChoice(city) {

        console.log
        let weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q="
        let cityApi = city.city
        let appId = "&&APPID=bd82255fd0a21fa1238699b9eda2ee35"

        let weatherBaseUrl = weatherApiUrl + cityApi + appId

        console.log("weather api url: ", weatherBaseUrl)
        weatherApi.get(weatherBaseUrl).then(res => {
            _setState('weather', new Weather(res.data))
        })
    }
}
