import WeatherService from "./weather-service.js";

var _weatherService = new WeatherService()

function drawWeather() {
    console.log("THE WEATHER MAN SAYS:", _weatherService.Weather)
    let weather = _weatherService.Weather;

    var template = '';

    template += `
		<p> location: <span>${weather.city}</span></p>
		<p> temp: <span>K ${weather.kelvin}</span></p>
        <p> temp: <span>F ${weather.fahrenheit.toFixed(2)}</span></p>
        <p> temp: <span>C ${weather.celsius}</span></p>
        <p> Sky: <span>${weather.weather}</span><img src="https://openweathermap.org/img/w/${weather.icon}.png"></p>
    		`
    document.getElementById('weather').innerHTML = template;
}


 export default class WeatherController {

	constructor() {
		_weatherService.addSubscriber('weather', drawWeather)
		_weatherService.getWeather()
	}

}
