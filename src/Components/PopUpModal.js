import { CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setModalData,
  setPhotoUrl,
  setProgress,
  setShowModal,
  stateSelector,
} from '../features/redux/slicers'
import {
  ADD_ROOM,
  DEFAULT_IMAGE,
  UPDATE_ROOM,
  UPLOAD_IMAGE,
} from '../utils/constants'

function PopupModal() {
  const dispatch = useDispatch()
  const state = useSelector(stateSelector)
  const submitData = (e) => {
    e.preventDefault()
    state.showModal.newRoom
      ? dispatch({
          type: ADD_ROOM,
          data: {
            ...state.modalData,
            photos: state.photos.length !== 0 ? state.photos : DEFAULT_IMAGE,
          },
        })
      : dispatch({
          type: UPDATE_ROOM,
          data: {
            ...state.modalData,
            photos:
              state.photos.length !== 0
                ? state.modalData.photos.concat(state.photos)
                : state.modalData.photos,
          },
        })
  }

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      backdrop='static'
      show={state.showModal.show}
      onHide={() => {
        dispatch(setModalData(''))
        dispatch(setPhotoUrl(true))
        dispatch(setProgress(0))
      }}
    >
      <Form className='bs-form' onSubmit={submitData}>
        <Form.Group controlId='formFileMultiple' className='mb-3'>
          <Form.Control
            onChange={(event) => {
              const image = event.target.files
              dispatch({ type: UPLOAD_IMAGE, image, dispatch })
            }}
            type='file'
            accept='image/x-png,image/jpeg,webp'
            multiple
          />
          {state.progress === 0 ? null : state.progress === 100 ? (
            <Typography> Uploaded</Typography>
          ) : (
            <Typography>{state.progress}% Please wait uploading...</Typography>
          )}
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Control
            value={state.modalData.name ? state.modalData.name : ''}
            onChange={(e) =>
              dispatch(
                setModalData({ ...state.modalData, name: e.target.value })
              )
            }
            type='text'
            placeholder='Name'
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Control
            value={
              state.modalData.description ? state.modalData.description : ''
            }
            onChange={(e) =>
              dispatch(
                setModalData({
                  ...state.modalData,
                  description: e.target.value,
                })
              )
            }
            type='text'
            placeholder='Description'
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Control
            value={state.modalData.price ? state.modalData.price : ''}
            onChange={(e) =>
              dispatch(
                setModalData({ ...state.modalData, price: e.target.value })
              )
            }
            type='number'
            placeholder='Price'
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Control
            value={state.modalData.address ? state.modalData.address : ''}
            onChange={(e) =>
              dispatch(
                setModalData({ ...state.modalData, address: e.target.value })
              )
            }
            type='text'
            placeholder='Address'
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            label='Booked?'
            checked={state.modalData.booked ? state.modalData.booked : false}
            onChange={() =>
              dispatch(
                setModalData({
                  ...state.modalData,
                  booked: !state.modalData.booked,
                })
              )
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Minimum Stay</Form.Label>
          <DatePicker
            id='datepicker'
            selected={
              state.modalData.minStay
                ? Date.parse(state.modalData.minStay)
                : new Date()
            }
            onChange={(e) =>
              dispatch(setModalData({ ...state.modalData, minStay: e }))
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Max Stay</Form.Label>
          <DatePicker
            id='datepicker'
            selected={
              state.modalData.maxStay
                ? Date.parse(state.modalData.maxStay)
                : new Date()
            }
            onChange={(e) =>
              dispatch(setModalData({ ...state.modalData, maxStay: e }))
            }
          />
        </Form.Group>
        <Button
          style={{ fontSize: '0.8rem', margin: '0.5rem' }}
          variant='primary'
          type='submit'
        >
          Submit
        </Button>
        <Button
          style={{ fontSize: '0.8rem', margin: '0.5rem' }}
          variant='primary'
          onClick={() => {
            dispatch(setShowModal({ ...state.showModal, show: false }))
            dispatch(setModalData(''))
            dispatch(setPhotoUrl(true))
          }}
        >
          Close
        </Button>
      </Form>
    </Modal>
  )
}

export default PopupModal
