import React, {useState} from 'react'

const api = {
  key: "55fad99b4a7166b4fa2af2ba428d5f10",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = e => {
    if(e.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
       .then(result => [setWeather(result), setQuery('')])
    }}


  const dateBuilder = (d) =>{
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                     'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    let days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date} de ${month}, ${year} `
  }

 

  return (
    <div className={
      (typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app': 'app cold') : 'app' }>
        <main>
          <div className="search-box">
            <input type="text" className='search-bar' placeholder='Digite o nome da cidade...'
             onChange={e => setQuery(e.target.value)}
             value={query} onKeyPress={search}/>
          </div>
          {(typeof weather.main !== "undefined") ?(
            <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
          ):('')}
      </main>

    </div>
  );
}

export default App;
