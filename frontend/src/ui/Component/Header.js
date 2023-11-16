import './Header.css';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FaCarSide } from 'react-icons/fa';
import { RxExit } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export const TOGGLER_TYPE = {
  COLLAPSE: 0,
  EXIT: 1,
};

function Header({togglerType=TOGGLER_TYPE.COLLAPSE}) {

  const [modal, setModal] = useState(false);
  const togglerClicked = () => {
    console.log('Cl', modal);
    setModal(!modal);
  }
  const lowerBackground = () => {
    const modalItem = document.getElementsByClassName('header-modal')[0];
    const back = modalItem.parentElement;
    if (back) {
      back.style.top = '110px';
    }
  }
  const showCloseBtn = () => {
    if (modal) {
      return (
        <Button color='none' className='close-btn' onClick={togglerClicked}>
          <IoMdClose size={32}/>
        </Button>
      )
    }
    else {
      return (<NavbarToggler onClick={togglerClicked} className="me-2" />)
    }
  } // TODO: Consider the web version

  const render = (togglerType) => {
    switch (togglerType) {
      case TOGGLER_TYPE.COLLAPSE:
        return (
          <>
            {showCloseBtn()}
            <Modal fullscreen onOpened={lowerBackground} isOpen={modal} toggle={togglerClicked} backdrop={false} className='header-modal'>
              <Nav navbar>
                <NavItem>
                  <NavLink href="#Home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#MyCar">My Car</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#MyReservation">My Reservation</NavLink>
                </NavItem>
              </Nav>
            </Modal>
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
// TODO: Speed up the animation of the modal
