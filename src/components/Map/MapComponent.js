import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Container, Row, Spinner } from 'react-bootstrap';
import React, { lazy, Suspense, useGlobal, useState } from 'reactn';
const ReactMapGL = lazy(() => import('react-map-gl'));

const redirectListener = setPoint => {
  setPoint(null);
};
function MapComponent() {
  const [point, setPoint] = useGlobal('points');

  const { latitude, longitude } = point;
  const [viewPort, setViewPort] = useState({
    width: '100%',
    height: 500,
    latitude: +latitude,
    longitude: +longitude,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });
  return (
    <Container>
      <Row>
        <Button
          onClick={() => redirectListener(setPoint)}
          variant="outline-secondary"
          style={{
            margin: '0px',
            left: 0,
            border: 0,
            backgroundColor: '#fff'
          }}
        >
          <span style={{ fontSize: '2em' }} role="img" aria-label="back">
            👈
          </span>
        </Button>
      </Row>
      <Row className="justify-content-md-center flex-grow-1">
        <Suspense fallback={<Spinner animation="border" />}>
          <ReactMapGL
            {...viewPort}
            onViewportChange={setViewPort}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API_TOKEN}
          />
        </Suspense>
      </Row>
    </Container>
  );
}

export default MapComponent;
