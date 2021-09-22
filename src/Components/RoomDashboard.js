import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  setModalData,
  setRooms,
  setShowModal,
  stateSelector,
} from '../features/redux/slicers'
import { DELETE_ROOM, FETCH_ROOMS } from '../utils/constants'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { Link } from 'react-router-dom'
import '../styles/roomDashboard.scss'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'
import { Modal } from 'react-bootstrap'
import PopupModal from './PopUpModal'

const RoomDiv = styled.div`
  max-width: 15rem;
  max-height: 30rem;
  margin: 1.5rem;
  padding: 10px;
  text-align: center;
  box-shadow: 1px 1px 8px 1px #afafaf;
  border-radius: 10px;
  cursor: pointer;
`
const RoomContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
`

function RoomDashboard(props) {
  const dispatch = useDispatch()
  const state = useSelector(stateSelector)

  useEffect(() => {
    dispatch({ type: FETCH_ROOMS })
  }, [dispatch, state.modalData])
  return (
    <RoomContainer>
      <PopupModal />
      {state &&
        state.rooms.map((room) => (
          <RoomDiv>
            {room.photos.length !== 0 && (
              <Splide
                options={{
                  type: 'loop',
                  gap: '1',
                  autoplay: true,
                  pauseOnHover: false,
                  resetProgress: false,
                  perPage: 1,
                }}
                key={room._id}
              >
                {room.photos.map((roomList) => (
                  <SplideSlide key={roomList}>
                    <a className='name-link' href={`#/room/${room._id}`}>
                      <img className='room-img' src={roomList} alt={roomList} />
                    </a>
                  </SplideSlide>
                ))}
              </Splide>
            )}
            <a className='name-link' href={`#/room/${room._id}`}>
              {room.name}
            </a>
            <p className='room-price'>Rent starts at Rs: {room.price}</p>
            {state.isOwner ? (
              <>
                <Button
                  variant='contained'
                  style={{ fontSize: '0.8rem', margin: '0.5rem' }}
                  color='primary'
                  onClick={() => {
                    dispatch(setModalData(room))
                    dispatch(setShowModal({ show: true, newRoom: false }))
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant='contained'
                  style={{ fontSize: '0.8rem', margin: '0.5rem' }}
                  color='secondary'
                  onClick={() => {
                    dispatch(
                      setRooms(
                        state.rooms.filter((key) => key._id !== room._id)
                      )
                    )
                    dispatch({ type: DELETE_ROOM, data: room })
                  }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <></>
            )}
          </RoomDiv>
        ))}
    </RoomContainer>
  )
}

export default RoomDashboard
