import './Header.css';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
} from 'reactstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarSide } from 'react-icons/fa';
import { RxExit } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { NavLink as Link } from 'react-router-dom';
import { logout } from '../store';
import { useDispatch } from 'react-redux';
import { UserStatusTransfer } from '../Constants';

export const TOGGLER_TYPE = {
  COLLAPSE: 0,
  EXIT: 1,
  COLLAPSE_GUARD: 2,
};

function Header({ togglerType = TOGGLER_TYPE.COLLAPSE, userStatus = 0, currPage = '' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const togglerClicked = () => {
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
          <IoMdClose size={24} />
        </Button>
      )
    }
    else {
      return (<NavbarToggler onClick={togglerClicked} className="me-2" />)
    }
  } // TODO: Consider the web version

  const showCarOrReservation = (userStatus) => {
    switch (UserStatusTransfer(userStatus)) {
      case 'PARKED':
        return (<NavLink to={'/mycar'} tag={Link}>My Car</NavLink>)
      case 'RESERVED':
      case 'EXPIRED':
        return (<NavLink to={'/reservation'} tag={Link}>My Reservation</NavLink>)
      default:
        return (<></>)
    }
  }

  const render = (togglerType) => {
    switch (togglerType) {
      case TOGGLER_TYPE.COLLAPSE:
        return (
          <>
            {showCloseBtn()}
            <Modal fullscreen onOpened={lowerBackground} isOpen={modal} toggle={togglerClicked} backdrop={false} className='header-modal'>
              <Nav navbar>
                <NavItem>
                  <NavLink exact="true" to="/" tag={Link}>Home</NavLink>
                </NavItem>
                <NavItem>
                  {showCarOrReservation(userStatus)}
                </NavItem>
                <NavItem>
                  <NavLink to={'/login'} tag={Link} onClick={() => dispatch(logout())}>Logout</NavLink>
                </NavItem>
              </Nav>
            </Modal>
          </>
        )
      case TOGGLER_TYPE.EXIT:
        return (
          <Button color='none' className='exit-btn' onClick={() => { dispatch(logout()); navigate('/login') }}>
            <RxExit size={20} />
          </Button>
        )
      case TOGGLER_TYPE.COLLAPSE_GUARD:
        return (
          <>
            {showCloseBtn()}
            <Modal fullscreen onOpened={lowerBackground} isOpen={modal} toggle={togglerClicked} backdrop={false} className='header-modal'>
              <Nav navbar>
                <NavItem>
                  <NavLink className={`${currPage === 'notification' ? 'override_active' : ''}`} exact="true" to="/guard" tag={Link}>Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={'/guard/notification'} tag={Link} >Notification</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={'/login'} tag={Link} onClick={() => dispatch(logout())}>Logout</NavLink>
                </NavItem>
              </Nav>
            </Modal >
          </>
        )
      default:
        return (<></>)
    }
  }

  return (
    <Navbar light expand="md" className='header-nav'>
      <NavbarBrand onClick={() => navigate('/')}>
        <FaCarSide size={20} />
        <div className='home-nav'>Quick Parking</div>
      </NavbarBrand>
      {render(togglerType)}
    </Navbar>
  );
}

export default Header;
// TODO: Speed up the animation of the modal
