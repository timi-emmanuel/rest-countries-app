import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fallbackData from '../data/data.json'
import { ArrowLeft } from 'lucide-react'
import { useCountryStore } from '../store/useCountryStore'
import { motion } from 'framer-motion'

const detailVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 60 } },
}

const CountryDetail = () => {
  const allCountries = useCountryStore((state) => state.countries)
  const { name } = useParams()
  const [country, setCountry] = useState(null)
  const navigate = useNavigate()

  const getBorderNames = (codes = []) =>
    codes
      .map((code) => {
        const match = allCountries.find(
          (c) => c.code === code || c.cca3 === code || c.alpha3Code === code
        )
        return match?.name?.common || match?.name || code
      })
      .filter(Boolean)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        if (!res.ok) throw new Error('API failed')
        const data = await res.json()
        setCountry(data[0])
      } catch (err) {
        const fallback = fallbackData.find(
          (c) => c.name.toLowerCase() === name.toLowerCase()
        )
        setCountry(fallback)
      }
    }
    fetchCountry()
  }, [name])

  if (!country)
    return (
      <motion.div className="w-[88%] mx-auto py-16 text-center text-lg dark:text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Country not found.
      </motion.div>
    )

  // Handle both API and fallback data structures
  const flag = country.flags?.svg || country.flags?.png || country.flag || ''
  const countryName = country.name?.common || country.name || ''
  const nativeName =
    country.name?.nativeName
      ? Object.values(country.name.nativeName)[0]?.common
      : country.nativeName || ''
  const population = country.population || 'Unknown'
  const region = country.region || ''
  const subregion = country.subregion || ''
  const capital = Array.isArray(country.capital)
    ? country.capital.join(', ')
    : country.capital || ''
  const topLevelDomain =
    country.tld?.join(', ') ||
    (country.topLevelDomain?.join(', ') || '')
  const currencies =
    country.currencies
      ? Array.isArray(country.currencies)
        ? country.currencies.map((c) => c.name).join(', ')
        : Object.values(country.currencies)
            .map((c) => c.name)
            .join(', ')
      : ''
  const languages =
    country.languages
      ? Array.isArray(country.languages)
        ? country.languages.map((l) => l.name).join(', ')
        : Object.values(country.languages).join(', ')
      : ''
  const borders = country.borders || []
  const borderCountryNames = getBorderNames(borders)

  return (
    <motion.div className="w-[90%] mx-auto py-8 dark:text-white" variants={detailVariants} initial="hidden" animate="visible">
      <button
        className="shadow bg-white dark:bg-customBlue-900 flex items-center gap-2 rounded px-6 py-2 cursor-pointer mb-12 text-customGrey-950 dark:text-gray-200 transition-colors"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        <motion.div className="w-full max-w-md mx-auto lg:mx-0 flex-shrink-0" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <img
            src={flag}
            alt={countryName + ' flag'}
            className="w-full h-64 object-cover rounded shadow"
          />
        </motion.div>

        <motion.div className="flex-1 w-full" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-3xl font-bold mb-6">{countryName}</h2>
          <div className="flex flex-col md:flex-row md:gap-16 gap-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{' '}
                <span className="text-customGrey-400 dark:text-customGrey-400">{nativeName || '-'}</span>
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                <span className="text-customGrey-400 ">{population.toLocaleString()}</span>
              </p>
              <p>
                <span className="font-semibold">Region:</span>{' '}
                <span className="text-customGrey-400 ">{region}</span>
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{' '}
                <span className="text-customGrey-400 ">{subregion}</span>
              </p>              <p>
                <span className="font-semibold">Capital:</span>{' '}
                <span className="text-customGrey-400">{capital}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{' '}
                <span className="text-customGrey-400">{topLevelDomain}</span>
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                <span className="text-customGrey-400">{currencies}</span>
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                <span className="text-customGrey-400">{languages}</span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row  gap-4">
            <span className="font-semibold">Border Countries:</span>
            <ul className="flex flex-wrap gap-3">
              {borderCountryNames.length > 0 ? (
                borderCountryNames.map((name) => (
                  <li key={name}>
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-block' }}>
                      <Link
                        to={`/country/${name}`}
                        className="px-3  py-1 bg-white dark:bg-customBlue-900 shadow text-sm rounded transition-colors border border-customGrey-50 dark:border-customBlue-950 hover:bg-customGrey-50 dark:hover:bg-customBlue-950 dark:text-gray-400"
                      >
                        {name}
                      </Link>
                    </motion.div>
                  </li>
                ))
              ) : (
                <li className="text-customGrey-400">No border countries</li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CountryDetail

// src/components/CountryDetail.jsx









