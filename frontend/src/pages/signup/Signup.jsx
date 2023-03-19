import React, { Component, useState } from 'react';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { api } from '../../components/api';
import normalizeEmail from 'normalize-email';
import './style.css';


const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  password2: yup.string().required('Must re-enter password')
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignupForm = ({name, email, password, password2, onFormSubmit, handleClose}) => {
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  return (
  <Formik
    validationSchema={schema}
    onSubmit={onFormSubmit}
    validateOnChange={true}
    initialValues={{name: name, email: email,  password: password, password2: password2}}
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
      <DialogTitle sx={{ padding: '0 0 30px 0', fontSize: 40, fontWeight: 'bold'}}>Sign Up</DialogTitle>
      <DialogContentText>
        Already have an account? <Link onClick={() => {
          handleClose();
          setTimeout(() => history.push({pathname: '/login', state: { background: location.state.background }}), 100)
        }}>Log in here.</Link>
        </DialogContentText>

      <Form onSubmit={handleSubmit} className='form-stack'>
          <Field
            type='text'
            placeholder='Enter name'
            name='name'
            component={TextField}
            value={values.name}
            onChange={handleChange}
          />
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
          <Field
            type='password'
            placeholder='Re-enter password'
            name='password2'
            component={TextField}
            value={values.password2}
            onChange={handleChange}
          />
          <DialogActions>
            <Button color='inherit' onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained'>Sign Up</Button>
          </DialogActions>
      </Form>
      </DialogContent>
    )}
  </Formik>
  )
}

// export class Signup extends Component {
  
//   render() {
//     const { name, email, password, password2, success } = this.state;
    
//     if (success) {
//       return <Redirect to='/check-email' />
//     }
    
//     return(
//       <div className='default-container' style={{flex: 1}}>
//         <div>
//         <h1>Sign up.</h1>
//         <SignupForm name={name} email={email} password={password} password2={password2} onFormSubmit={this.onFormSubmit}/>
//         </div>
//       </div>
//     )
//   }
// }





export const Signup = ({ }) => {
  let history = useHistory();
  const [success, setSuccess] = useState(false);
  const [name] = useState('');
  const [failure, setFailure] = useState(false);
  const [email] = useState('');
  const [password] = useState('');
  const [password2] = useState('');

  let handleClose = e => {
    // e.stopPropagation();
    history.goBack();
  };
  
  const onFormSubmit = (values, formikBag) => {
    var user = values;
    user.email = normalizeEmail(user.email);
    
    // signup the user
    api.post('/auth/signup', user).then(() => {
      setSuccess(true);
    }).catch(result => {
      console.log(result);
      console.log(result.response);
      // get errors and optional redirect path from server
      const { redirect, message, ...errors } = result.response.data;
      
      // if redirect exists, grab the first error and set it to the redirect link.
      // BUG: if there's multiple errors, this will only set the link to the first one, which may not match. will need to standardize.
      if (redirect) {
        errors[Object.keys(errors)[0]] = <div>{errors[Object.keys(errors)[0]]} <Link to={'/' + redirect}>{message}</Link></div>;
      }
      
      formikBag.setErrors(errors);
      formikBag.setValues(user);
    });
  }
  return (
    success ? <Redirect to='/check-email' />
    : (
      <Dialog fullWidth='true' maxWidth='xs' open={true} onClose={handleClose}>

      <SignupForm name={name} email={email} password={password} password2={password2} onFormSubmit={onFormSubmit} handleClose={handleClose}/>
    </Dialog>
    )
  );
}