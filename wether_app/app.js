// Getting information of longitude and latitude by using build-in javascript
window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  // if navigator find the location successfully
  if (navigator.geolocation) {
    // get the data of longitude and latitude
    navigator.geolocation.getCurrentPosition(positon => {
      //   console.log(positon);
      long = positon.coords.longitude;
      lat = positon.coords.latitude;

      // cors-anywhere enables to access the dakrsky information through local host
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/5bb0baa81861d00ef27088ba488cb559/${lat},${long}`;

      // When you get the information through api website
      fetch(api)
        // Then do it down below
        .then(response => {
          return response.json();
        })
        .then(data => {
          //   console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // Change temperature to Celsius / Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Hey, this is not working becasue of some reasons.";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
