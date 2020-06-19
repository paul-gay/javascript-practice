// JS has built in location method
window.addEventListener('load', () => {
    let longitutde;
    let latitude;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const weatherIconContainer = document.querySelector('.weather-icon-container');
    const temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    /* 
    Navigator.geolocation read-only property returns a Geolocation object 
    that gives Web content access to the location of the device. 
    This allows a Web site or app to offer customized results 
    based on the user's location

    .getCurrentPostion() method is used to get the current position of the device
    */
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            longitutde = position.coords.longitude;
            latitude = position.coords.latitude;

            // const api = `http://api.weatherstack.com/current?access_key=6656450d36d66eaa4c0ef0d228774805&query=40.7831,-73.9712`;
            const api = `http://api.weatherstack.com/current?access_key=6656450d36d66eaa4c0ef0d228774805&query=${latitude},-${longitutde}`;
            console.log(api);

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                // {} pulls out all the data from current object
                // shorthand for: data.currently.temperature
                const {temperature, weather_descriptions, weather_icons} = data.current;

                // set DOM elements from returned data
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = weather_descriptions;
                locationTimezone.textContent = data.location.timezone_id;

                // formula for celsius degrees
                let farenheight = ((temperature / 5) * 9) + 32;
                

                const setIcon = weather_icons[0];
                // console.log(setIcon);
                weatherIconContainer.innerHTML = `
                    <img src="${setIcon}" />
                `

                // toggle from F/C
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temperature;
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(farenheight);
                    }
                })

            })

        });
    }
    
});