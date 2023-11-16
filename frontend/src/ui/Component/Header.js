import './Header.css';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import React, { useState, useLayoutEffect } from 'react';
import { FaCarSide } from 'react-icons/fa';
import { RxExit } from "react-icons/rx";

export const TOGGLER_TYPE = {
  COLLAPSE: 0,
  EXIT: 1,
};

function Header({togglerType=TOGGLER_TYPE.COLLAPSE}) {

  const [collapsed, setCollapsed] = useState(true);
  const togglerClicked = () => setCollapsed(!collapsed);

  useLayoutEffect(() => {
    const toggler = document.getElementsByClassName('navbar-toggler')[0];
    const collapse = document.getElementsByClassName('navbar-collapse')[0];
    const navItems = document.getElementsByClassName('nav-item');
    if (toggler && toggler.style.display !== 'none') {
      for (let item of navItems) {
        collapse.style.marginTop = '0px';
        item.style.paddingLeft = '30px';
      }
    }
  })

  const render = (togglerType) => {
    switch (togglerType) {
      case TOGGLER_TYPE.COLLAPSE:
        return (
          <>
            <NavbarToggler onClick={togglerClicked} className="me-2" />
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
          </>
        )
      case TOGGLER_TYPE.EXIT:
        return (
          <Button color='none' className='exit-btn'>
            <RxExit size={20}/>
          </Button>
        )
      default:
        return (<></>)
    }
  }

  return (
    <Navbar light expand="md" className='header-nav'>
      <NavbarBrand>
        <FaCarSide size={20}/>
        <div className='home-nav'>Quick<br/>Parking</div>
      </NavbarBrand>
      {render(togglerType)}
    </Navbar>
  );
}

export default Header;
