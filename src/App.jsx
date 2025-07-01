import Home from "./pages/Home"
import Detail from "./pages/Detail"
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";


function App() { 
  return (    
    <div className="bg-white dark:bg-customBlue-950">    
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Detail />} />
      </Routes>        
    </div>
  );
}

export default App
