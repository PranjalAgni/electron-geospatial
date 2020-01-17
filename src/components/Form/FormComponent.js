import React, { useDispatch, useGlobal } from 'reactn';
import { Form, Container, Row, Button, Alert } from 'react-bootstrap';
import { Field, withFormik, useField } from 'formik';
import './form.css';
import * as Yup from 'yup';

const EnhancedTextField = props => {
  const [field, meta] = useField(props);
  console.log('Field:  ', field);
  console.log('Meta:  ', meta);
  const errorText = meta.touched && meta.error && (
    <Alert variant={'danger'}> {meta.error} </Alert>
  );
  return (
    <>
      {errorText}
      <Field {...field} {...props} />
    </>
  );
};
function FormComponent({ values, errors, touched }) {
  const [point] = useGlobal('points');
  const setPoints = useDispatch(
    (point, newPoint) => (point = newPoint),
    'points'
  );

  return (
    <Container className="justify-content-md-center">
      <Form className="mt-5">
        <Row className="justify-content-md-center">
          <Form.Group className="w-50 mt-5" controlId="formLat">
            <Row className="justify-content-md-center">
              <Form.Label>Latitude</Form.Label>
            </Row>

            <Row className="justify-content-md-center">
              <EnhancedTextField className="w-50" type="text" name="latitude" />
            </Row>
          </Form.Group>
        </Row>
        <Row className="justify-content-md-center">
          <Form.Group className="w-50" controlId="formLon">
            <Row className="justify-content-md-center">
              <Form.Label>Longitude</Form.Label>
            </Row>
            <Row className="justify-content-md-center">
              <EnhancedTextField
                className="w-50"
                type="text"
                name="longitude"
              />
            </Row>
          </Form.Group>
        </Row>
        <Row className="justify-content-md-center">
          <Button
            variant="outline-primary"
            size="md"
            disabled={touched && Object.keys(errors).length > 0}
            onClick={() => setPoints(values)}
          >
            Show Map{' '}
            <span aria-label="pizza" role="img">
              🍕
            </span>
          </Button>
        </Row>
      </Form>

      <pre className="mt-5">Values: {JSON.stringify(values, undefined, 2)}</pre>
      <pre>Error Object: {JSON.stringify(errors, undefined, 2)}</pre>
    </Container>
  );
}

const EnhancedForms = withFormik({
  mapPropsToValues: () => ({
    latitude: null,
    longitude: null
  }),
  validationSchema: Yup.object().shape({
    latitude: Yup.number()
      .typeError('lat must be a number')
      .required('Latitude is required'),

    longitude: Yup.number()
      .typeError('long must be a number')
      .required('Longitude is required')
  }),
  handleSubmit: values => {
    console.log('submitted', values);
  }
})(FormComponent);

export default EnhancedForms;
