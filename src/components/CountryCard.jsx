import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const CountryCard = ({ country }) => {
 const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/country/${country.name}`)}
      className="cursor-pointer bg-white dark:bg-customBlue-900 rounded-md overflow-hidden shadow transition"
    >
      <motion.img
        src={country.flag}
        alt={`${country.name} flag`}
        className="h-48 w-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14 }}
      />
      <div className="p-4 text-black dark:text-white">
        <h2 className="font-bold text-lg mb-2">{country.name}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital}</p>
      </div>
    </div>
  );
};

export default CountryCard;
