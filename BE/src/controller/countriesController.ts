import {Request, Response} from 'express'
import axios from 'axios'

export async function getCountries(req: Request, res: Response){
    const countries = await axios.get("https://date.nager.at/api/v3/AvailableCountries")

    res.json(countries.data)
}


export async function getCountry(req: Request, res: Response){
    try{
        const {countryCode} = req.params

        const country = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)

        const nameCountry = (country.data.commonName).toLowerCase()

        const populationData = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {country: nameCountry})

        const flag = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {country: nameCountry})

        const countryInfo = {
            nameCountry: nameCountry.charAt(0).toUpperCase() + nameCountry.slice(1),
            borderCountries: country.data.borders,
            populationData: populationData.data.data.populationCounts,
            flag: flag.data.data.flag
        }

        res.json(countryInfo)
    } catch(e){
        console.error("Data not Found")
    }
}