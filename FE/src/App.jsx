import './App.css'
import CountryCode from './pages/countries/[countryCode]/page'
import GetAddres from './pages/countries/page'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetAddres />} />
        <Route path="/countries/:countryCode" element={<CountryCode />} />
      </Routes>
    </Router>
  )
}

export default App
