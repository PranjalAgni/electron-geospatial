import React, { useGlobal } from 'reactn';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import EnhancedForms from '../Form/FormComponent';
import MapComponent from '../Map/MapComponent';
export default function HomeComponent() {
  const [point] = useGlobal('points');
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand>Geospatial</NavbarBrand>
      </Navbar>
      {point ? <MapComponent /> : <EnhancedForms />}
    </div>
  );
}
