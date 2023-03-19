import React, { Component, useState } from 'react';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { api } from '../../components/api';
import './style.css';


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const LoginForm = ({ email, password, onFormSubmit, handleClose}) => {
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  return (
  <Formik
    validationSchema={schema}
    onSubmit={onFormSubmit}
    validateOnChange={false}
    initialValues={{email: email,  password: password}}
  >
    {({
      handleSubmit,
      handleChange,
      values,
      touched,
      errors,
    }) => (
      <DialogContent>
      <img src='/static/logo-dark.png' className='logo' />
      <DialogTitle sx={{ padding: '0 0 30px 0', fontSize: 40, fontWeight: 'bold'}}>Log In</DialogTitle>
      <DialogContentText>
        New to RapidFire? <Link onClick={() => {
          handleClose();
          setTimeout(() => history.push({pathname: '/signup', state: { background: location.state.background }}), 100)
        }}>Create an account.</Link>
        </DialogContentText>
      <Form onSubmit={handleSubmit} className='form-stack'>
          <Field
            type='email'
            placeholder='Enter email'
            name='email'
            component={TextField}
            value={values.email}
            onChange={handleChange}
          />
          <Field
            type='password'
            placeholder='Password'
            name='password'
            component={TextField}
            value={values.password}
            onChange={handleChange}
          />
          <DialogActions>
            <Button color='inherit' onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained'>Log In</Button>
          </DialogActions>
      </Form>
      </DialogContent>
    )}
  </Formik>
  )
}

export const Login = ({ location, onChange }) => {
  let history = useHistory();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(location);
  let handleClose = e => {
    // e.stopPropagation();
    history.goBack();
  };

  const onFormSubmit = (values, formikBag) => {
    const user = values;
    console.log(user);
    api.post('/auth/login', user).then(result => {
      const { auth_token } = result.data;
      if (auth_token) {
        localStorage.setItem('token', auth_token);
        onChange(auth_token);
      }
      setSuccess(Boolean(auth_token));
    }).catch(result => {
      console.log(result);
      // get errors and optional redirect path from server
      const { redirect, message, ...errors } = result.response.data;
      
      // if redirect exists, grab the first error and set it to the redirect link.
      // BUG: if there's multiple errors, this will only set the link to the first one, which may not match. will need to standardize.
      if (redirect) {
        errors[Object.keys(errors)[0]] = <div>{errors[Object.keys(errors)[0]]} <Link to={'/' + redirect}>{message}</Link></div>;
      }
      
      formikBag.setErrors(errors);
    });
  }

  return (
    success ? <Redirect to='/dashboard' />
    : (
      <Dialog fullWidth='true' maxWidth='xs' open={true} onClose={handleClose}>

      <LoginForm email={email} password={password} onFormSubmit={onFormSubmit} handleClose={handleClose}/>
    </Dialog>
    )
  );
}


// export default Modal;