import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import NotificationsIcon from '@material-ui/icons/Notifications'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useRef } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setShowModal,
  stateSelector,
  setOwner,
} from '../features/redux/slicers'
import { useDispatch } from 'react-redux'
import { storage } from '../utils/Storage'

function NavBar(props) {
  const state = useSelector(stateSelector)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const data = storage('user')
    dispatch(setOwner(data.isOwner))
  })
  return (
    <div style={{ marginBottom: '70px' }}>
      <AppBar>
        <Toolbar>
          <Typography
            id='head-text'
            onClick={() => history.push('/home')}
            variant='h6'
            noWrap
            style={{ flexGrow: 1 }}
          ></Typography>
          {state.isOwner ? (
            <>
              <IconButton
                color='inherit'
                onClick={() =>
                  dispatch(setShowModal({ show: true, newRoom: true }))
                }
              >
                <AddIcon />
              </IconButton>
              <IconButton color='inherit' onClick={() => history.push('/cart')}>
                <Badge badgeContent={1} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </>
          ) : null}

          <IconButton color='inherit' onClick={() => history.push('/user')}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
