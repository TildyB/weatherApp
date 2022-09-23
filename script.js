let inputElement = document.createElement('input')
inputElement.setAttribute('list',"cityList")
inputElement.id = "cityInput"
document.getElementById('root').append(inputElement)

let dataList = document.createElement('datalist')
dataList.id = "cityList"
let country="";
document.getElementById('root').append(dataList)
var source="";

let container = document.createElement('div')
container.id = "container"
document.getElementById('root').append(container)
let videoTag = document.createElement('video')
document.getElementById('root').insertAdjacentHTML("beforebegin",`<video id='videoTest' autoplay loop muted><source src='${source}'></video>`)
let header1 = document.createElement('h2')
container.append(header1)
let temperatureCelsius = document.createElement('h1')
container.append(temperatureCelsius)
let feelsLike = document.createElement('h3')
container.append(feelsLike)
let conditionDiv = document.createElement('div')
conditionDiv.id = "conditionDiv"
container.append(conditionDiv)
let iconImages = document.createElement('img')
conditionDiv.append(iconImages)
let conditionText = document.createElement('p')
conditionDiv.append(conditionText)
let details = document.createElement('div')
details.id = "details"
container.append(details)
let subDetails = document.createElement('div')
subDetails.classList.add("subDetails")
details.append(subDetails)
let windSpeed = document.createElement('p')
subDetails.append(windSpeed)
let windDirection = document.createElement('p')
subDetails.append(windDirection)
let subDetails2 = document.createElement('div')
subDetails2.classList.add("subDetails")
details.append(subDetails2)
let humidity = document.createElement('p')
subDetails2.append(humidity)
let uv = document.createElement('p')
subDetails2.append(uv)
let lastUpdated = document.createElement('p')
container.append(lastUpdated)

let fetchData = (e) => {
    let inputValue = e.target.value;
    if(inputValue.length>=3){
        country = inputValue;
        request();
    }
}

let test;

let request = async () => {
    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${country}`)
    let data = await response.json()
    let cities = data.results
    test = cities;
    dataList.replaceChildren(fillOptions)
    fillOptions(cities)
}

 let inputClickListener = (e)=>{

    if(e.type ==="input" && e.inputType !=="insertReplacementText"){
        return
    }

    let options = e.target.list.options
    container.style.opacity = 1
    console.log(e.target.list)
    temperatureCelsius.classList.add("h1anim")
    container.classList.add('contani')
    for (let i=0; i<options.length; i++){
        // console.log(e.target.list.options[i])
        if(options[i].value==inputElement.value){
            // console.log(inputElement.value)
            var longitude=test[i].longitude;
            var latitude=test[i].latitude;

                let get = async () => {
                let response2 = await fetch(`https://api.weatherapi.com/v1/current.json?key=79e68d44611f403c93d81318221909&q=${latitude},${longitude}&aqi=no`)
                let data2 = await response2.json()
                console.log(data2)
                    console.log(test[i])
                header1.innerText = test[i].name
                temperatureCelsius.innerText = Math.floor(data2.current.temp_c)
                feelsLike.innerText ="Feels like " + data2.current.feelslike_c
                iconImages.src = data2.current.condition.icon
                conditionText.innerText = data2.current.condition.text
                windSpeed.innerText = "💨 " + data2.current.wind_kph+ " km/h"
                windDirection.innerText = "🧭 " +data2.current.wind_degree+" "+data2.current.wind_dir
                humidity.innerText ="💧 "+ data2.current.humidity+ " %"
                uv.innerText = "☀️ " +data2.current.uv +" uv"
                lastUpdated.innerText ="Updated at: " +data2.current.last_updated

                let icon = data2.current.condition.icon
                icon = icon.substring(icon.length-7, icon.length-4)
                icon = +icon
                changeBackgroundImg(icon)


                let time = data2.current.last_updated
                time = time.substring(time.length-5, time.length-3)
                time = +time
                darkMode(time)
                
                if ( time>5 && time< 19 ) {
                iconImages.src = `./imgs/day/${icon}.svg`
                } else {
                iconImages.src = `./imgs/night/${icon}.svg`
            }
            }
            get();
            inputElement.value = "";
        }
    }
}

let darkMode = (time) => {
    if( time>5 && time< 19 ){
        container.style.backgroundColor = "#5db6ff"
        container.style.color = "#333333"
        iconImages.style.filter = "invert(17%) sepia(1%) saturate(0%) hue-rotate(229deg) brightness(95%) contrast(89%)"
        document.body.style.background = "linear-gradient(0deg, #7BB3EB, #AFCDEB)"

    } else {
        container.style.backgroundColor ="#081929"
        container.style.color = "#fafafa"
        iconImages.style.filter = "invert(1)"
        document.body.style.background = "linear-gradient(0deg, #617991 ,#47586A)"
    }
}

let changeBackgroundImg = (icon) => {
    // clear
    if ( icon == 113 ) {
        container.style.background = "url(./imgs/01.png) center -0.5rem no-repeat"
        source ="./video/sunny.mov"
    }
    // cloud
    if ( icon == 116 || icon == 119 ) {
            container.style.background = "url(./imgs/02.png) center -0.5rem no-repeat"
            source ="./video/clouds.mov"
    }
    // cloud 2
    if ( icon == 122 ) {
        container.style.background = "url(./imgs/03.png) center -0.5rem no-repeat"
        source ="./video/clouds.mov"
    }
    // mist
    if ( icon == 143 || icon == 248 || icon == 260 || icon == 284 || icon == 311 || icon == 314 ) {
        container.style.background = "url(./imgs/07.png) center -0.5rem no-repeat"
        source ="./video/fog.mov"
    }
    // rain
    if ( icon > 263 && icon < 320 || icon > 353 && icon < 365 || icon == 176 || icon == 182 ) {
        container.style.background = "url(./imgs/04.png) center -0.5rem no-repeat"
        source ="./video/rain.mov"
    }
    // snow
    if ( icon > 179 && icon < 230 || icon > 323 && icon < 350 || icon > 368 && icon < 377 ) {
        container.style.background = "url(./imgs/06.png) center -0.5rem no-repeat"
        source ="./video/snow.mov"
    }
    // thunder
    if ( icon > 386 && icon < 395 || icon == 200 ) {
        container.style.background = "url(./imgs/05.png) center -0.5rem no-repeat"
        source ="./video/thunder.mov"
    }
    console.log(source)
    document.getElementById('videoTest').remove();
    document.getElementById('root').insertAdjacentHTML("beforebegin",`<video id='videoTest' autoplay loop muted><source src='${source}'></video>`)
}

let fillOptions = (cities) =>{
    if(cities !== undefined){
    for ( let i=0; i<cities.length; i++ ) {
        let opt = document.createElement("option")
        opt.value = cities[i].name + " (lat: " + cities[i].latitude.toFixed(1) + ", long: " + cities[i].longitude.toFixed(1) +")";
        // console.log(opt.value)
        opt.id=cities[i].id;
        opt.innerText = cities[i].name + ", " + cities[i].country
        dataList.append(opt)
        // console.log(opt)
        }
    }
    temperatureCelsius.classList.remove("h1anim")
    container.classList.remove('contani')
}


inputElement.addEventListener('change',inputClickListener)
// inputElement.addEventListener('input',inputClickListener)
inputElement.addEventListener('keyup',fetchData)
