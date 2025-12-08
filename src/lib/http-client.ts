import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://managex-o.netlify.app'

export const httpClient = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
})

httpClient.interceptors.request.use(
   (config) => {
      if (typeof window !== 'undefined') {
         const token = localStorage.getItem('auth_token')
         if (token) {
            config.headers.Authorization = `Bearer ${token}`
         }
      }
      return config
   },
   (error) => {
      return Promise.reject(error)
   }
)

httpClient.interceptors.response.use(
   (response) => response,
   (error) => {
      if (typeof window !== 'undefined' && error.response?.status === 401) {
         // Only redirect if we are not already on the login page to avoid loops
         if (!window.location.pathname.includes('/login')) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            window.location.href = '/login'
         }
      }
      return Promise.reject(error)
   }
)
