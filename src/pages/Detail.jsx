import React from 'react';
import CountryDetail from '../components/CountryDetail';

// Placeholder Detail page
const Detail = ({ country }) => {
  return (
    <main className="bg-customGrey-50 min-h-screen">
      <CountryDetail country={country} />
    </main>
  );
};

export default Detail;
