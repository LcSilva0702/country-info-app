import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useMemo } from "react";
import { useApi } from "../../../hooks/useApi";
import "./page.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function CountryCode(){
    const {countryCode} = useParams()

    const api = useMemo(() => new useApi(), [])
    const navigate = useNavigate()

    const [country, setcountry] = useState()
    useEffect(() => {
        const handleGetAddres = async () => {
              const response = await api.getCountriesInfo(countryCode);
              if (response?.status === 200) {
                const allCountry = response.data || [];
                setcountry(allCountry);
              } else if (response?.status === 404) {
                console.log("error")
            }
        }
        
        handleGetAddres()   
    }, [countryCode, api])
    

    console.log('country:' + country)
    const handleClickCountry = (countryCode) => {
        navigate(`/countries/${countryCode}`)
    }

    const renderLineChart = (
        <LineChart width={600} height={300} data={country ? country.populationData : []}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="year" />
                <YAxis dataKey="value"/>
        </LineChart>
    );

    return (
        <main>
            {country ? (
                <div>
                <Link to="/">Go back</Link>
                <h1>{country.nameCountry}<img src={country.flag} className="country-flag"></img></h1>
                <h2>Population Charts</h2>
                    {country ? renderLineChart : <></>}                
                <h3>Border Countries</h3>
                  {Array.isArray(country.borderCountries) && country.borderCountries.map((item, index) => (
                    <div key={index}>
                      <button onClick={() => handleClickCountry(item.countryCode)}>{item.commonName}</button>
                    </div>
                   ))}
                </div>
            ) : (
                <div>
                    <h1>Detalhes do País</h1>
                    <p>Código do País: Nenhum pais encontrado</p>
                </div>
            ) }
        </main>
    )
}