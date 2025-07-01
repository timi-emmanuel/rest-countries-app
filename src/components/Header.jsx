import { Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <header className="bg-white dark:bg-customBlue-900 shadow p-4 mb-2">
     <div className='flex justify-between items-center mx-auto w-[90%]'>
      <h1 className="font-bold text-xl dark:text-white text-black transition-colors duration-200">Where in the world?</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 text-sm font-medium dark:text-white"
      >
        <Moon
          size={20}
          className={`transition-all ${
            darkMode ? 'stroke-white fill-white' : 'stroke-customBlue-900'
          }`}
        />
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
     </div>
    </header>
  )
}
