import { useState } from "react";
import {frtchWeather} from "./api/fetchWeather"
import styles from "./Search.module.css"
const App = ()=>{
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState("")
  const search = async (e)=>{
     if(e.key === "Enter" ){
      const data = await frtchWeather(query)
      setWeather(data);
      setQuery("")
     }
  }
    return(
       <div >
           <input className={styles.search}  value={query} onKeyPress={search} onChange={e => setQuery(e.target.value)}/>
            {weather.main && (
              <div className={styles.card}>
              <div className={styles.card_header}>
                <h1 className={styles.title}>{weather.name}</h1>
              </div>
              <div className={styles.card_body}>
                  <span className={styles.temp}>{Math.round(weather.main.temp)}
                  <sup>&deg;C</sup>
                  </span>
                 
              </div>
              <div className={styles.footer}>
                 <p className={styles.description}>{weather.weather[0].description}</p>
              </div>
            </div>
            )}
       </div>
    )
}

export default App