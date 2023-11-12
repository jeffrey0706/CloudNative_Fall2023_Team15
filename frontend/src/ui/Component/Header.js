import './Header.css';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import React, { useState } from 'react';
import { FaCarSide } from 'react-icons/fa';

function Header() {

  const [collapsed, setCollapsed] = useState(true);
  var togglerClicked = () => setCollapsed(!collapsed);

  return (
    <Navbar light expand="md" className='header-nav'>
      <NavbarBrand>
        <FaCarSide size={20}/>
        <div className='home-nav'>Quick<br/>Parking</div>
      </NavbarBrand>
      <NavbarToggler onClick={togglerClicked} className="me-2" />
      {/* This place should be updated after deciding what to put */}
      <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
  );
}

export default Header;
