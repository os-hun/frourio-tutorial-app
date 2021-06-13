import axios from 'axios'
import aspida from '@aspida/axios'
import api from '~/server/api/$api'

axios.defaults.withCredentials = true

export const apiClient = api(aspida(axios))
