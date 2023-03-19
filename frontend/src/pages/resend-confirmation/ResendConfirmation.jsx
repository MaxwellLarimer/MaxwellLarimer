import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { api } from '../../components/api';
import './style.css';
import Button from '@mui/material/Button';


const schema = yup.object({
  email: yup.string().email().required(),
});

const ResendConfirmationForm = ({email, onFormSubmit}) => (
  <Formik
    validationSchema={schema}
    onSubmit={onFormSubmit}
    validateOnChange={false}
    initialValues={{email: email }}
  >
    {({
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      touched,
      isValid,
      errors,
    }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='validationFormik01'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={values.email}
            onChange={handleChange}
            isValid={touched.email && !errors.email}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
        </Form.Group>
        
        <Button variant='primary' type='submit'>
          Send Confirmation Email
        </Button>
      </Form>
    )}
  </Formik>
)

export class ResendConfirmation extends Component {
  state = {
    email: '',
    success: false,
    failure: false,
  }
  
  onFormSubmit = (values, formikBag) => {
    api.post('/users/resend-confirmation', values).then(result => {
      console.log(result);
      this.setState({ success: true });
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
  
  render() {
    const { email, password, success } = this.state;
    
    if (success) {
      return <Redirect to='/check-email' />
    }
    return(
      <div className='default-container'>
        <ResendConfirmationForm email={email} onFormSubmit={this.onFormSubmit}/>
      </div>
    )
  }
}