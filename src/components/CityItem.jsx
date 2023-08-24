import { Link } from 'react-router-dom'
import styles from '../components/CityItem.module.css'
import { useCities } from '../contexts/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))

function CityItem({ city }) {
  const { currentCity } = useCities()
  const { cityName, date, id, position } = city
  if (!cityName) return ''
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        } `}
        //{this a searchParams initialization}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}> ✨ </span>
        <h3 className={styles.name}> {cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times; </button>
      </Link>
    </li>
  )
}

export default CityItem
