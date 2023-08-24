import { useNavigate } from 'react-router-dom'
import Button from './Button'

function BackButton() {
  // {usenavigate is used for navigating into a link wich is a prgramable link or not present in fontend but present in routing mainy used on form submission or page redirect based on a action}
  const navigate = useNavigate()
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}
    >
      &larr; Back
    </Button>
  )
}

export default BackButton
