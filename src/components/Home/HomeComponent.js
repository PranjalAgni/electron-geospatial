import React, { useGlobal } from 'reactn';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import EnhancedForms from '../Form/FormComponent';
export default function HomeComponent() {
  const [point] = useGlobal('points');
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand>Geospatial</NavbarBrand>
      </Navbar>
      {point ? <h2>Hello World</h2> : <EnhancedForms />}
    </div>
  );
}
