import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { stateSelector } from '../features/redux/slicers'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useDispatch } from 'react-redux'
import { FETCH_ROOMS } from '../utils/constants'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Button from '@material-ui/core/Button'

const RoomContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
`

const RoomFlex1 = styled.div`
  flex: 1;
  max-width: 30rem;
  margin: 1rem;
`
const RoomFlex2 = styled.div`
  text-align: left;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
`
const RoomFlex3 = styled.div`
  text-align: center;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`
function RoomDescription(props) {
  const id = props.match.params.id
  const state = useSelector(stateSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: FETCH_ROOMS })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {state.rooms.map((rooms) =>
        rooms._id === id ? (
          <RoomContainer>
            <RoomFlex1>
              {rooms.photos.length !== 0 && (
                <Splide
                  options={{
                    type: 'loop',
                    gap: '1',
                    autoplay: true,
                    pauseOnHover: false,
                    resetProgress: false,
                    perPage: 1,
                  }}
                  key={rooms._id}
                >
                  {rooms.photos.map((roomList) => (
                    <SplideSlide key={roomList}>
                      <img
                        className='description-img'
                        src={roomList}
                        alt={roomList}
                      />
                    </SplideSlide>
                  ))}
                </Splide>
              )}
            </RoomFlex1>
            <RoomFlex2>
              <p className='room-name'>{rooms.name}</p>
              <p className='room-desc'>{rooms.description}</p>
              <p className='room-desc'>{rooms.address}</p>
              <p className='room-desc-price'>Price: {rooms.price}</p>
              {!state.isOwner ? (
                <Button
                  variant='contained'
                  style={{
                    fontSize: '0.8rem',
                    margin: '0.5rem',
                  }}
                  color='primary'
                >
                  Book Now
                </Button>
              ) : null}
            </RoomFlex2>
            <RoomFlex3>
              <h5>Check Availability</h5>
              <Calendar
                minDate={new Date(rooms.minStay)}
                maxDate={new Date(rooms.maxStay)}
              />
            </RoomFlex3>
          </RoomContainer>
        ) : null
      )}
    </>
  )
}

export default RoomDescription
