const apiKey = "b758d7fb43901d0db7e9c906f2f46b5f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let city = "Patna";
const findCity = () => {
  const success = (position) => {
    // LATITUDE & LONGITUDE
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoAPIurl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(geoAPIurl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        city = data.city;
      });
  };
  const error = () => {
    console.log("unable to fetch location");
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Weather data not available for this city.");
    }
    const data = await response.json();

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  findCity();
  console.log(city);
  checkWeather(city);
});
