import { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import fallbackData from "../data/data.json"
import { useCountryStore } from '../store/useCountryStore';
import { motion, AnimatePresence } from 'framer-motion';

const normalizeCountries = (data) =>
  data.map((country) => ({
    name: country.name?.common || country.name,
    flag: country.flags?.svg || country.flag,
    population: country.population,
    region: country.region,
    capital: Array.isArray(country.capital) ? country.capital[0] : country.capital,
    code: country.cca3 || country.alpha3Code,
  }))

const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <svg className="animate-spin h-8 w-8 text-customBlue-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
)

const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 60, damping: 16 } },
}

const CountryList = () => {
 const countries = useCountryStore((state) => state.countries)
 const setCountries = useCountryStore((state) => state.setCountries)
  const search = useCountryStore((state) => state.search)
  const region = useCountryStore((state) => state.region)
  const searchBy = useCountryStore((state) => state.searchBy)
 
 const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCountries(normalizeCountries(fallbackData));
    setLoading(false);
  }, [setCountries]);

  const filtered = countries.filter((country) => {
  const targetField = country[searchBy]?.toLowerCase?.() || ''
  const matchesSearch = targetField.includes(search.toLowerCase())
  const matchesRegion = region ? country.region === region : true
  return matchesSearch && matchesRegion
})

  if (loading) return <Spinner />

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 py-4 w-[90%] mx-auto"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filtered.map((country) => (
          <motion.div key={country.code} variants={cardVariants}>
            <CountryCard country={country} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CountryList;