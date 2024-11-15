import api from "../service/app";
import { AxiosResponse } from "axios";

export class useApi {
    public async getCountries(){
        try {
            const response = await api.get(`${import.meta.env.VITE_API_URL}`)
            
            return response
        } catch (error) {
            console.log('error')
        }
    }

    public async getCountriesInfo(countryCode){
        try {
            const response = await api.get(`${import.meta.env.VITE_API_URL}${countryCode}`)
            
            return response
        } catch (error) {
            console.log('error')
        }
    }
}