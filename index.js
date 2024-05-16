var weather_form = document.getElementById('weather_form')
var city_name = document.getElementById('city_name')
var submit_btn = document.getElementById('submit_btn')

var city_name_value = document.getElementById('city_name_value')
var temp = document.getElementById('temp')
var humidty = document.getElementById('hum')
var pressure = document.getElementById('press')
var description = document.getElementById('description')

submit_btn.addEventListener('click', () => {
    name_of_city = city_name.value
    if (name_of_city === '') {
        return show_error_message('Please enter the name of city')
    }

    city_name_value.innerHTML = name_of_city

     call_weather_api(name_of_city).then((data) => {
        let tempt_units =  '°C'
        let pressure_units = 'hPa'
        let weather_data = data;

        let temp_in_cel = convert_kelvin_to_celcius(weather_data.main.temp);
        // display the data
        let tempature = temp_in_cel + tempt_units
        let weather_description = weather_data.weather[0].description

        temp.innerHTML = tempature
        humidty.innerHTML = weather_data.main.humidity + '%'
        pressure.innerHTML = weather_data.main.pressure + pressure_units
        description.innerHTML = weather_description
    });
});

convert_kelvin_to_celcius = (temp) => {
    return temp - 273.15
}

async function call_weather_api(city_name) {
    let api_key = get_key("WEATHER_API_KEY");
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`)
    let data = await response.json()
    return data
}

function get_key(key) {
    return "";
}

function show_error_message(message) {
    let warning_box = document.getElementById('warning_div');
    while (warning_box.firstChild) {
        warning_box.removeChild(warning_box.firstChild);
    }

    let interval = setInterval(() => {
        warning_box.classList.remove('hidden')
        warning_box.innerHTML = message
        clearInterval(interval)
    }, 1000)
}