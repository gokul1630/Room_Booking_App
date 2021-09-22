import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { stateSelector } from '../features/redux/slicers'
import '../styles/form.css'

import { SIGN_UP } from '../utils/constants'
function SignUp(props) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [userData, setUser] = useState({
    user: '',
    email: '',
    password: '',
    mobileNumber: 0,
    isOwner: false,
  })
  const navigateToHome = () => {
    if (userData.isOwner) {
    history.push('/home/owner')
    } else {
      history.push('/user/home')
  }
}
  const submit = (event) => {
    event.preventDefault()
    dispatch({ type: SIGN_UP, userData, navigateToHome })
  }
  return (
    <div className='forms'>
      <Form className='bs-form' onSubmit={submit}>
        <h2>Sign Up</h2>
        <Form.Group className='mb-1' controlId='formUserName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...userData, user: e.target.value })}
            type='text'
            placeholder='Name'
            required
          />
        </Form.Group>
        <Form.Group className='mb-1' controlId='formUserNumber'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            onChange={(e) =>
              setUser({ ...userData, mobileNumber: e.target.value })
            }
            type='number'
            placeholder='Mobile Number'
            required
          />
        </Form.Group>
        <Form.Group className='mb-1' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...userData, email: e.target.value })}
            type='email'
            placeholder='email'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...userData, password: e.target.value })}
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>
        <Form.Check
          checked={userData.isOwner}
          onChange={() => setUser({ ...userData, isOwner: !userData.isOwner })}
          label='Check for Owner SignUp'
        />
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
        <p>
          Already have an account?{' '}
          <Link className='signup-link' to='/signin'>
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
