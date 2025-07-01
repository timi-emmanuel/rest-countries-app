import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fallbackData from '../data/data.json'
// Placeholder for detailed country info
const CountryDetail = () => {
  const { name } = useParams(); // gets the name from URL
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        setCountry(data[0]); // get the actual country object
      } catch (err) {
        console.warn('Falling back to local JSON', err);
        const fallback = fallbackData.find(
          (c) => c.name.toLowerCase() === name.toLowerCase()
        );
        setCountry(fallback);
      }
    };

    fetchCountry();
  }, [name]);

  if (!country) return <div>Country not found.</div>;

  // Handle both API and fallback data structures
  const flag =
    country.flags?.png ||
    country.flags?.svg ||
    country.flag ||
    '';
  const countryName =
    country.name?.common ||
    country.name ||
    '';
  const nativeName =
    country.name?.nativeName
      ? Object.values(country.name.nativeName)[0]?.common
      : country.nativeName || '';
  const population = country.population || 0;
  const region = country.region || '';
  const subregion = country.subregion || '';
  const capital =
    Array.isArray(country.capital)
      ? country.capital.join(', ')
      : country.capital || '';
  const topLevelDomain =
    country.tld?.join(', ') ||
    (country.topLevelDomain?.join(', ') || '');
  const currencies =
    country.currencies
      ? Array.isArray(country.currencies)
        ? country.currencies.map((c) => c.name).join(', ')
        : Object.values(country.currencies)
            .map((c) => c.name)
            .join(', ')
      : '';
  const languages =
    country.languages
      ? Array.isArray(country.languages)
        ? country.languages.map((l) => l.name).join(', ')
        : Object.values(country.languages).join(', ')
      : '';

  return (
    <div className="p-4 bg-customWhite rounded shadow font-nunito">
      <img src={flag} alt={countryName + ' flag'} className="w-full max-w-md h-60 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{countryName}</h2>
      <p><strong>Native Name:</strong> {nativeName}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Sub Region:</strong> {subregion}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Top Level Domain:</strong> {topLevelDomain}</p>
      <p><strong>Currencies:</strong> {currencies}</p>
      <p><strong>Languages:</strong> {languages}</p>
      {/* Add border countries, etc. as needed */}
    </div>
  );
};

export default CountryDetail;

// src/components/CountryDetail.jsx









