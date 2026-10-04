import { useMemo } from 'react'
import api from '../services/axios.js'

export default function useApi() {
    return useMemo(() => api, [])
}
