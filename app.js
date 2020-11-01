window.addEventListener('load', ()=>{
    let long;
    let lat;
    let api_key = ''
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`; 

            fetch(api)
            .then(response => {
                return response.json();                
            })
            .then(data => {
                console.log(data);
                const {temp, humidity, feels_like} =  data.main;
                const {weather} = data;
                const {icon} = weather[0];
                const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                console.log(icon);
                timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                // Set DOM elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = weather[0]['description'];
                locationTimezone.textContent = timezone
                // Formula for converting Celcius to Farenheit and vice versa.
                let farenheit = (temp * 9/5) + 32
                console.log(farenheit)
                weatherIcon.src = icon_url
                // change temperature to Celcius/Farenheit
                temperatureSection.addEventListener('click', () =>{
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temp;
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = farenheit;
                    }
                });

            });             
        });   
    }
});