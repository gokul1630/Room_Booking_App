import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import '../styles/form.css'
import { SIGN_IN } from '../utils/constants'

function SignIn(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const submit = (event) => {
    event.preventDefault()
    dispatch({ type: SIGN_IN, user, history })
  }

  return (
    <div className='forms'>
      <Form className='bs-form' onSubmit={submit}>
        <h2>Sign In</h2>
        <Form.Group className='mb-1' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type='email'
            placeholder='Enter email'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Log In
        </Button>
        <p>
          Don't have an account?{' '}
          <Link className='signup-link' to='/signup'>
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignIn
