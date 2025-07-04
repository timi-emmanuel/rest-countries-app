import { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import fallbackData from "../data/data.json";
import { useCountryStore } from '../store/useCountryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react';

// Normalize country data structure
const normalizeCountries = (data) =>
  data.map((country) => ({
    name: country.name?.common || country.name,
    flag: country.flags?.svg || country.flag,
    population: country.population,
    region: country.region,
    capital: Array.isArray(country.capital) ? country.capital[0] : country.capital,
    code: country.cca3 || country.alpha3Code,
  }));

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <svg
      className="animate-spin h-8 w-8 text-customBlue-900 dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
);

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const CountryList = () => {
  const countries = useCountryStore((state) => state.countries);
  const setCountries = useCountryStore((state) => state.setCountries);
  const search = useCountryStore((state) => state.search);
  const region = useCountryStore((state) => state.region);
  const searchBy = useCountryStore((state) => state.searchBy || 'name');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        setCountries(normalizeCountries(data));
      } catch (err) {
        console.warn('⚠️ Using local fallback:', err);
        setCountries(normalizeCountries(fallbackData));
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [setCountries]);

  const filtered = countries.filter((country) => {
    const target = country[searchBy]?.toLowerCase?.() || '';
    const matchesSearch = target.includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  if (loading) return <Spinner />;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 w-full text-center dark:text-white">
        <div className="flex items-center justify-center w-16 h-16 mb-4">
          <SearchX className="w-12 h-12 text-customGrey-400 dark:text-customGrey-400" />
        </div>
        <p className="text-lg font-semibold mb-2">No countries found</p>
        <p className="text-customGrey-400">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 py-4 w-4/5 md:w-[90%] mx-auto"
    >
      {filtered.map((country) => (
     <motion.div
        key={country.code}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        layout
>
    <CountryCard country={country} />
    </motion.div>

    ))}

    </motion.div>
  );
};

export default CountryList;
