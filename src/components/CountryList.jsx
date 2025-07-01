import CountryCard from './CountryCard';
import fallbackData from "../data/data.json"
import { useCountryStore } from '../store/useCountryStore';
import { useEffect } from 'react';


const normalizeCountries = (data) =>
  data.map((country) => ({
    name: country.name?.common || country.name,
    flag: country.flags?.svg || country.flag,
    population: country.population,
    region: country.region,
    capital: Array.isArray(country.capital) ? country.capital[0] : country.capital,
    code: country.cca3 || country.alpha3Code,
  }))

const CountryList = () => {
 const countries = useCountryStore((state) => state.countries)
 const setCountries = useCountryStore((state) => state.setCountries)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        if (!res.ok) throw new Error('API response not ok')
        const data = await res.json()
        setCountries(normalizeCountries(data))
        console.log('✅ Fetched from API')
      } catch (err) {
        console.warn('⚠️ API failed, using fallback data:', err)
        setCountries(normalizeCountries(fallbackData))
      }
    }

    fetchCountries()
  }, [])

  return (    
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 py-4 w-[90%] mx-auto">
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
     </div>       
  );
};

export default CountryList;