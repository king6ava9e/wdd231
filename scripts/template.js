// Grabing the ids
const hometown = document.getElementById("town");
const graphic = document.getElementById("graphic");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");

// create required info for the url
const myKey = "df2fd27f9683c0ca0f4d576d4872b2fb";
const myLatitude = "6.6674";
const myLongitude = "-1.6188";

// constructing a full path using template literals
const myURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLatitude}&lon=${myLongitude}&appid=${myKey}&units=metric`;
// Trying to grab weather date
async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
       displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

// displaying the json data to the web'
function displayResults(data){
    console.log("hello!");
    hometown.innerHTML= data.city.name;
    description.innerHTML=data.list[0].weather[0].description;
    temperature.innerHTML= `${data.list[0].main.temp}&deg;C`;
  iconsrc =`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  graphic.setAttribute("src",iconsrc);
  graphic.setAttribute("alt", data.list[0].weather[0].description);

    displayThreeDayForecast(data);
}


const main = document.getElementById("main");
main.classList.add("weather-widget");

document.getElementById("town").classList.add("town-title");
document.getElementById("graphic").classList.add("weather-icon");
document.getElementById("temperature").classList.add("temperature");
document.getElementById("description").classList.add("description");


function displayThreeDayForecast(data) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

  // Get today's date
  const today = new Date().getDate();
  let daysFound = 0;
  let lastDay = null;

  // Loop through the forecast list
  for (let i = 0; i < data.list.length && daysFound < 3; i++) {
    const item = data.list[i];
    const date = new Date(item.dt_txt);
    const day = date.getDate();

    // Only pick one forecast per new day (skip today)
    if (day !== today && day !== lastDay) {
      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <strong>${date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</strong>: 
          ${item.main.temp}&deg;C
        </div>
      `;
      lastDay = day;
      daysFound++;
    }
  }
}




apiFetch();