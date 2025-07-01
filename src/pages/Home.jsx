import CountryList from '../components/CountryList';
import SearchFilterBar from '../components/SearchFilterBar';

// Placeholder Home page
const Home = () => {
  return (
    <main className="  min-h-screen">
     <SearchFilterBar/>
      <CountryList />
    </main>
  );
};

export default Home;
