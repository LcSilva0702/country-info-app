import { useState, useEffect, useMemo} from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function Countries() {
    const api = useMemo(() => new useApi(), [])
    const navigate = useNavigate()
    const [address, setAddress] = useState()

    useEffect(() => {
      const handleGetAddres = async () => {
          try {
            const response = await api.getCountries();
            if (response?.status === 200) {
              const allCountry = response.data || [];
              setAddress(allCountry);
            } else if (response?.status === 404) {
              console.log("error")
              }
      
          } catch (e) {
              console.log(e.message)
          }
      }
      
      handleGetAddres()   
  }, [api, setAddress])

  const handleClickCountry = (countryCode) => {
    navigate(`/countries/${countryCode}`)
  }

    return (
      <main>
      { address ?
        (
         <div>
            <h1>Countries</h1>
              {Array.isArray(address) && address.map((item, index) => (
                <div key={index}>
                  <button onClick={() => handleClickCountry(item.countryCode)}>{item.name}</button>
                </div>
               ))}
            </div>
          ) : (<h1>Not Found</h1>)
        }
      </main>
    )
}