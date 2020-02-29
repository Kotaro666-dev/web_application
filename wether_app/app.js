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
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Set DOM Elements from the API
          temperatureDegree.textContent = Math.floor(celsius);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // Change bgcolor
          setBackground(temperature);

          // Change temperature to Celsius / Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            }
          });
        });
    });
  } else {
    h1.textContent = "Hey, this is not working becasue of some reasons.";
  }

  // SETTING  ICON
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  // SETTING THE BACKGROUND COLOR BY THE TEMPERATURE
  function setBackground(temperature) {
    let colorValue = "#E6A9EC";
    let gradient = document.getElementById("gradient");

    // Variation of colours according to temperature(Farenheit)
    if (temperature < 0)
      colorValue =
        "linear-gradient(to right top, #002863, #2a2f7b, #4e3490, #7434a1, #9c2fae)";
    else if (temperature >= 1 && temperature < 10)
      colorValue =
        "linear-gradient(to right top, #663fb4, #5c46b5, #524cb5, #4951b4, #4055b2)";
    else if (temperature >= 10 && temperature < 20)
      colorValue =
        "linear-gradient(to right top, #4055b2, #465ec3, #4c68d4, #5272e5, #587cf7)";
    else if (temperature >= 20 && temperature < 30)
      colorValue =
        "linear-gradient(to right top, #587cf7, #3b8afa, #1d96f9, #07a0f6, #1daaf1)";
    else if (temperature >= 30 && temperature < 40)
      colorValue =
        "linear-gradient(to right top, #1daaf1, #00b0eb, #00b5e3, #00b9da, #1ebdd0)";
    else if (temperature >= 40 && temperature < 50)
      colorValue =
        "linear-gradient(to right top, #1ebdd0, #0fb3be, #08a9ac, #0d9f9a, #159588)";
    else if (temperature >= 50 && temperature < 60)
      colorValue =
        "linear-gradient(to right top, #159588, #00987a, #009a66, #009a4d, #2d9a2d)";
    else if (temperature >= 60 && temperature < 70)
      colorValue =
        "linear-gradient(to right top, #159588, #00987a, #009a66, #009a4d, #2d9a2d)";
    else if (temperature >= 70 && temperature < 80)
      colorValue =
        "linear-gradient(to right top, #8cc051, #a7c343, #c3c437, #e0c32f, #fdc12f)";
    else if (temperature >= 80 && temperature < 90)
      colorValue =
        "linear-gradient(to right top, #fdc12f, #feb72b, #feac29, #fea228, #fd9728)";
    else if (temperature >= 90 && temperature < 100)
      colorValue =
        "linear-gradient(to right top, #fd9728, #fd8827, #fd7928, #fd692b, #fb582f)";
    else if (temperature >= 100)
      colorValue =
        "linear-gradient(to right top, #fb582f, #e8542f, #d6502e, #c34b2e, #b1472d)";

    // document.bgColor = colorValue;
    gradient.style.backgroundImage = colorValue;
  }
});
