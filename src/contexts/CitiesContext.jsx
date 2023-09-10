/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000'

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      }

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      }

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      throw new Error('Unknow action type check reducer')
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  )

  // Data loading section
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()

        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading Cities',
        })
      }
    }
    fetchCities()
  }, [])

  // for fatching current city data from fake Api

  async function getCity(id) {
    if (Number(id) === currentCity.id) return
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)

      if (!res) throw new Error('error')
      const data = await res.json()

      dispatch({ type: 'city/loaded', payload: data })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading City',
      })
    }
  }

  // for adding data into city list
  async function createCity(newCity) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      // sync data to application
      dispatch({ type: 'city/created', payload: data })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error adding/creating City',
      })
    }
  }

  // for Removing / deleteing data
  async function deleteCity(id) {
    dispatch({ type: 'loading' })
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      // sync data to application
      dispatch({ type: 'city/deleted', payload: id })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleteing City',
      })
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
