const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');


searchForm.addEventListener("submit", e => {
    e.preventDefault();
    let valueName = cityValue.value.trim();
    GetRequestCity(valueName)
    .then(data => {
        SetCityWeather(data);
    })
})

const GetCalcTemp = (kelvin) => 
{
    return Math.round(kelvin - 273.15);
}
const isDay = (imageName) => {
    if (imageName.includes('d')) return true;
    return false;
}
const SetCityWeather = (data) => {
    const imageName = data.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.innerHTML = `${data.name}`;
    console.log(data);
    cardBody.innerHTML = 
    `
        <div class="card-mid row">
            <div class="col-8 text-center temp">
            <span>${GetCalcTemp(data.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
            <p class="condition">${data.weather[0].description}</p>
            <p class="high">${GetCalcTemp(data.main.temp_max)}&deg;C</p>
            <p class="low">${GetCalcTemp(data.main.temp_min)}&deg;C</p>
            </div>
            </div>
            <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
            </div>
            <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
            <p>${GetCalcTemp(data.main.feels_like)}&deg;C</p>
            <span>Feels Like</span>
            </div>
            <div class="col text-center">
            <p>${data.main.humidity}%</p>
            <span>Humidity</span>
            </div>
        </div>
    `

    if (isDay(imageName)) {
        timeImage.setAttribute('src', './assets/images/day_image.svg');
        cityName.classList.remove('text-white');
        cityName.classList.add('text-black');

    } else {
        timeImage.setAttribute('src', './assets/images/night_image.svg');
        cityName.classList.remove('text-black');
        cityName.classList.add('text-white');
    }

    cardInfo.classList.remove("d-none");
}
