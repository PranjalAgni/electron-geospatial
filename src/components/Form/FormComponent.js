import { Field, useField, withFormik } from 'formik';
import trueRandom from 'random-number-csprng';
import { Alert, Button, Container, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import React, { useDispatch, useGlobal } from 'reactn';
import * as Yup from 'yup';

const generateRandomPoint = async (to, from, fixed) => {
  const val = await trueRandom(from, to);
  return val.toFixed(fixed);
};

const genratePoints = async () => {
  const obj = {
    latitude: await generateRandomPoint(90, -90, 3),
    longitude: await generateRandomPoint(180, -180, 3)
  };
  console.log(obj);
  return obj;
};

const EnhancedTextField = props => {
  const [field] = useField(props);

  return <Field {...field} {...props} />;
};

const SweetAlert = props => {
  const { touched, smsg, errors } = props;
  let { fmsg = 'Oh snap! You got' } = props;
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
  const valueStatus = values.latitude || values.longitude || false;
  const errorsStatus = Object.keys(errors).length > 0;
  const touchedStatus = Object.keys(touched).length > 0;
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
            size="sm"
            className="ml-1"
            disabled={!valueStatus || (touchedStatus && errorsStatus)}
            onClick={() => setPoints(values)}
          >
            Show Map{' '}
            <span aria-label="pizza" role="img">
              🍕
            </span>
          </Button>

          <Button
            variant="outline-primary"
            size="sm"
            className="ml-2"
            onClick={() => genratePoints().then(val => setPoints(val))}
          >
            Random{' '}
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
