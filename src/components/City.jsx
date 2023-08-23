import { useParams, useSearchParams } from 'react-router-dom'
import styles from './City.module.css'
import { useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext'

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

  const { getCity, currentCity } = useCities()

  useEffect(
    function () {
      getCity(id)
    },
    [id]
  )

  // // {searchParams is used for adding addtinal search option in a routing ex: loaclhost:3000/app/city:123456?let:15545&lan:44455 }
  // const [searchParams, setSearchParams] = useSearchParams()

  // const lat = searchParams.get('lat')
  // const lng = searchParams.get('lng')

  return (
    <>
      <h1 className={styles.city}>city {id} </h1>
      <p>
        Position: {lat ? `${lat} ,` : ''} {lng}{' '}
      </p>
    </>
  )
}

export default City
