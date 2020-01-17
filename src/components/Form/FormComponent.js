import { Field, useField, withFormik } from 'formik';
import { Alert, Button, Container, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import React, { useDispatch, useGlobal } from 'reactn';
import * as Yup from 'yup';
const EnhancedTextField = props => {
  const [field, meta] = useField(props);
  console.log('Field:  ', field);
  console.log('Meta:  ', meta);

  return <Field {...field} {...props} />;
};

const SweetAlert = props => {
  const { touched, smsg, errors } = props;
  let { fmsg = 'Oh snap! You got' } = props;
  console.log(touched);
  const errorsInfo = Object.values(errors);
  const touchedInfo = Object.values(touched);
  if (!touchedInfo.length) return null;
  const hasErrors = errorsInfo.length > 0;
  fmsg += errorsInfo.length > 1 ? ' errors!' : ' an error!';
  const variant = hasErrors ? 'danger' : 'success';
  return hasErrors ? (
    <Alert variant={variant}>
      <Alert.Heading>{fmsg}</Alert.Heading>
      {Object.values(errors).map((err, idx) => (
        <p key={`p-${idx}`}>{err}</p>
      ))}
    </Alert>
  ) : (
    <Alert variant={variant}>
      <Alert.Heading>{smsg}</Alert.Heading>
      <p> You got it right </p>
    </Alert>
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
      <Row className="pt-2 justify-content-md-center">
        <SweetAlert
          touched={touched}
          errors={errors}
          smsg="Hey, nice to see you"
        />
      </Row>
      <Form className="mt-3">
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
    latitude: '',
    longitude: ''
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

export default withRouter(EnhancedForms);
