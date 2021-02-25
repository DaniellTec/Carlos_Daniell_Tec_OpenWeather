
let weather = {
  apiKey: "d57ac2f28f81ffcd11d058e58480ea65",

  fetchWeather: function (city) {

    const name = document.querySelector(".gettername"); //Nombre
    const ciudad = document.querySelector(".getterciudad"); //Ciudad
    const pais = document.querySelector(".getterpais"); //País
   
    //Error Al No Escribir Nombre & País

      if(name.value !='' && ciudad.value !=''  && pais.value !='' ){
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" 
          + city
          + "&units=metric&appid=" 
          + this.apiKey
        ) //Se Muestra El Alert
        .then((response) => {
          if (!response.ok) {
            Swal.fire({
              title: 'Ciudad No Existente',
              text: 'Error, Ciudad No Existente',
              icon: 'error',
               showConfirmButton: false,
                timer: 2100
            })
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
      }
      else{
        if(name.value === ''){
          name.style.borderColor = "red";
        }
        if(ciudad.value === ''){
          pais.style.borderColor = "red";
        }
        if(pais.value === ''){
          ciudad.style.borderColor = "red";
        }
        Swal.fire({
          title: 'Faltan Datos',
          text: 'Error, Rellena Los Campos Erroneos/Vacíos',
          icon: 'error',
           showConfirmButton: false,
              timer: 2100
        })    
      }
  },
  displayWeather: function (data) {

    const { name } = data;
    const { country } = data.sys;
    const { icon} = data.weather[0];
    const {temp, temp_max, temp_min} = data.main;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".city").innerText = "Tiempo En: " + name + " (" + country + ")";
    document.querySelector(".temp").innerText = "Temperatura Es: " + temp + "°C";
    document.querySelector(".temp_max").innerText = "Temperatura Máxima: " + temp_max + "°C";
    document.querySelector(".temp_min").innerText = "Temperatura Mínima: " +  temp_min + "°C";
  },
  buscar: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.buscar();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.buscar();
    }
  });

function styleChange(valores) {

  console.log(valores);
  
  if(valores === "name"){
    document.querySelector(".gettername").style.borderColor = "#8d1aff";
  }
  if(valores === "ciudad"){
    document.querySelector(".getterpais").style.borderColor = "#8d1aff";
  }
  if(valores === "pais"){
    document.querySelector(".getterciudad").style.borderColor = "#8d1aff";
  }
}
