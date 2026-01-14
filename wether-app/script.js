    const apikey = 'APPLY YOUR API KEY HERE';
    const apiurl = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const searchbox = document.querySelector('.search input');
    const searchbtn = document.querySelector('.search button'); 

    async function fetchwether(city){
        try {
            const response = await fetch(apiurl + city + '&units=metric&appid=' + apikey);
            if (!response.ok) {
                console.error('Weather API error', response.status);
                return;
            }
            const data = await response.json();
            console.log(data);

            const temp = document.querySelector('.temp');
            const cityname = document.querySelector('.city');
            const humidity = document.querySelector('.humidity');
            const wind = document.querySelector('.wind');
            const icon = document.querySelector('.wether-icon');

            temp.innerHTML = Math.round(data.main.temp) + '°';
            cityname.innerHTML = data.name;     
            humidity.innerHTML = data.main.humidity + '%';
            wind.innerHTML = data.wind.speed + ' km/h';

            
            const mainCond = (data.weather && data.weather[0] && data.weather[0].main) ? data.weather[0].main.toLowerCase() : '';
            let iconSrc = 'images/rain.png'; 
            switch(mainCond) {
                case 'clear':
                    iconSrc = 'images/clear.png';
                    break;
                case 'clouds':
                    iconSrc = 'images/clouds.png';
                    break;
                case 'rain':
                case 'drizzle':
                    iconSrc = 'images/drizzle.png';
                    break;
                case 'snow':
                    iconSrc = 'images/snow.png';
                    break;
                case 'mist':
                    iconSrc = 'images/mist.png';
                    break;
                default:
                    iconSrc = 'images/rain.png';
            }
            if (icon) {
                icon.src = iconSrc;
                icon.alt = data.weather && data.weather[0] ? data.weather[0].description : 'weather icon';
            }
        } catch (err) {
            console.error('Fetch failed', err);
        }
        document.querySelector('.wether').style.display = 'block';
        
    }

    
    searchbtn.addEventListener('click', ()=>{
        const city = searchbox.value.trim();
        if (city) fetchwether(city);
    });

    fetchwether();
