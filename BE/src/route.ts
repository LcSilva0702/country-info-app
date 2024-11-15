import { Router } from 'express'
import { getCountries, getCountry } from './controller/countriesController'
const route = Router()


route.get('/', getCountries)
route.get('/:countryCode', getCountry)

export default route