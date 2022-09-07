import axios from 'axios'
import { BASE_URL } from '@/config/api'

export default axios.create({
  baseURL:BASE_URL
})