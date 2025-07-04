import { Search } from 'lucide-react'
import { useCountryStore } from '../store/useCountryStore'
import { motion } from 'framer-motion'

const barVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 60 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 60 },
  }),
}

const SearchFilterBar = () => {
  const search = useCountryStore((state) => state.search)
  const setSearch = useCountryStore((state) => state.setSearch)
  const region = useCountryStore((state) => state.region)
  const setRegion = useCountryStore((state) => state.setRegion)
  const searchBy = useCountryStore((state) => state.searchBy)
  const setSearchBy = useCountryStore((state) => state.setSearchBy)

  return (
    <motion.div
      className="flex flex-col md:flex-row justify-between mb-8 gap-4 pt-8 w-[90%] mx-auto"
      variants={barVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 🔍 Search Bar */}
      <motion.div className="relative w-full md:w-[400px]" variants={itemVariants} custom={0}>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-customGrey-400">
          <Search size={16} className="dark:text-white" />
        </span>
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 p-3 rounded shadow w-full dark:bg-customBlue-900 dark:text-white outline-none placeholder:text-customGrey-400 dark:placeholder:text-white transition-colors duration-200"
        />
      </motion.div>

      <div className='flex flex-row gap-6 lg:gap-36'>
         {/* 🔽 Search By Field Selector */}
        <motion.div className="relative w-2/5 md:w-[200px]" variants={itemVariants} custom={1}>
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="appearance-none outline-none pr-8 pl-3 py-3 rounded shadow w-full dark:bg-customBlue-900 dark:text-white transition-colors duration-200"
          >
            <option value="name">Name</option>
            <option value="capital">Capital</option>
            <option value="region">Region</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black dark:text-white"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>

         {/* 🌍 Region Filter (as before) */}
        <motion.div className="relative w-3/5 md:w-[200px]" variants={itemVariants} custom={2}>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="appearance-none outline-none pr-8 pl-3 py-3 rounded shadow w-full dark:bg-customBlue-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black dark:text-white"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </div>   
     
    </motion.div>
  )
}

export default SearchFilterBar
