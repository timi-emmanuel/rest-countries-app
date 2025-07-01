import { Search } from 'lucide-react';

const SearchFilterBar = () => {
  return (   
   <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 pt-8 w-[90%] mx-auto">
    {/* Search input with icon */}
    <div className="relative w-full md:w-[400px] ">
     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-customGrey-400">
     <Search size={16} className="dark:text-white " />
     </span>
     <input
     type="text"
     placeholder="Search for a country..."
     className="pl-10 p-3 rounded shadow w-full dark:bg-customBlue-900 dark:text-white outline-none placeholder:text-customGrey-400 dark:placeholder:text-white
     transition-colors duration-200"
     />
    </div>

    <div className="relative w-full md:w-auto">
      <select
        className="appearance-none outline-none pr-8 pl-3 py-3 rounded shadow w-full md:w-auto
                   dark:bg-customBlue-900 dark:text-white
                   dark:focus:ring-white
                   transition-colors duration-200"
                   
      >
        <option value="" selected>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black dark:text-white transition-colors duration-200"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
   </div>
  );
}
 
export default SearchFilterBar;