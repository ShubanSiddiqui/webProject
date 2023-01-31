const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const data_hide = document.querySelector('middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === '') {
        city_name.innerText = 'Plz write the name before search'
        data_hide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=806e3c3460d303115c0102022e4a4729`;
            const res = await fetch(url);
            const data = await res.json();
            const arrData = [data];
            console.log(data);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;

            const tempMod = arrData[0].weather[0].main;
            // condition check cloudy, sunny,clear

            if (tempMod === 'Clear') {
                temp_status.innerHTML = "<i class='fa-regular fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMod === 'Clouds') {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud' style='color: #f1f1f6;'></i>";
            } else if (tempMod === 'Rain') {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else if (tempMod === 'Fog' || tempMod === 'Smoke') {
                temp_status.innerHTML = "<i class='fa-solid fa-smog' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fa-regular fa-sun' style='color: #eccc68;'></i>";
            }

            data_hide.classList.remove('data_hide');
        } catch {
            city_name.innerrText = 'Plz Enter the proper city Name'
            data_hide.classList.add('data_hide');
        }
    }
    // alert('Now Look');
}

submitBtn.addEventListener('click', getInfo);
