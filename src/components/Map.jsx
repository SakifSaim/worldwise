import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form')
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat ? `${lat} ,` : ''} {lng}{' '}
      </h1>
      {lat ? (
        <button
          onClick={() => {
            setSearchParams({ lat: 50, lng: 33 })
          }}
        >
          {' '}
          Change Position{' '}
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Map
