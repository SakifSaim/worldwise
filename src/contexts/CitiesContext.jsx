/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000'

const initial

function reducer(state, action) {}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useReducer

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()

        setCities(data)
      } catch {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  // for fatching current city data from fake Api

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)

      if (!res) throw new Error('error')
      const data = await res.json()
      if (!data) throw new Error('data error')
      setCurrentCity(data)
      console.log(data)
    } catch {
      //alert('There was an error loading data...')
      console.log('error')
    } finally {
      setIsLoading(false)
    }
  }

  // for adding data into city list
  async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      // sync data to application
      setCities((cities) => [...cities, data])
    } catch {
      alert('There was an error  Adding data...')
      console.log('Error')
    } finally {
      setIsLoading(false)
    }
  }

  // for Removing / deleteing data
  async function deleteCity(id) {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      // sync data to application
      setCities((cities) => cities.filter((city) => city.id !== id))
    } catch {
      //alert('There was an error Deleteing data...')
      console.log('Error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error('CitisContext was used outside the CitiesProvider')
  return context
}

export { CitiesProvider, useCities }
