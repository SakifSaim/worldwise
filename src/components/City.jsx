import { useParams } from 'react-router-dom'
import styles from './City.module.css'
import { useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext'
import Spinner from './Spinner'
import BackButton from './BackButton'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))

function City() {
  // {useParams is used for get id of specific item/page for creating param in page rout ex: loaclhost:3000/app/city:123456}
  const { id } = useParams()

  console.log(id)

  const { getCity, currentCity, isLoading } = useCities()

  useEffect(
    function () {
      getCity(id)
    },
    [id]
  )

  const { cityName, emoji, date, notes } = currentCity

  if (isLoading) return <Spinner />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>🟢 {cityName}</h3>
        <h6>You Went to {cityName} on </h6>
        <p> {date} </p>

        <h6>Your notes </h6>
        <p> {notes} </p>
        <h6>Learn More </h6>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  )
}

export default City
