import Home from "./pages/Home"
import Detail from "./pages/Detail"
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useCountryStore } from './store/useCountryStore'
import { useEffect } from "react";
import fallbackData from "./data/data.json"

const normalizeCountries = (data) =>
  data.map((country) => ({
    name: country.name?.common || country.name,
    flag: country.flags?.svg || country.flag,
    population: country.population,
    region: country.region,
    capital: Array.isArray(country.capital)
      ? country.capital[0]
      : country.capital,
    code: country.cca3 || country.alpha3Code,
  }))




function App() { 
  useEffect(() => {
  const { setCountries, countries } = useCountryStore.getState()
  if (countries.length === 0) {
    setCountries(normalizeCountries(fallbackData))
  }
}, [])

  return (    
    <div className="bg-white dark:bg-customBlue-950 min-h-screen">    
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Detail />} />
      </Routes>        
    </div>
  );
}

export default App
