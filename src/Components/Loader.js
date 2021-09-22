import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { stateSelector } from '../features/redux/slicers'
import '../styles/loader.css'
import { storage } from '../utils/Storage'
import LoaderIcon from './LoaderIcon'
function Loader(props) {
  const history = useHistory()
  useEffect(() => {
    const data = storage('user')
    if (data) {
      if (data.isOwner) {
        history.push('/owner/home')
      } else if (!data.isOwner) {
        history.push('/user/home')
      } else {
        history.push('/signup')
      }
    } else {
      // dispatch({ type:  })
      history.push('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='loader'>
      <LoaderIcon />
    </div>
  )
}

export default Loader
