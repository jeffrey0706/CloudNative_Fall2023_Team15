// import logo from './logo.svg';
import './App.css';
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Button color="danger">Test Button!<FaCarSide/></Button>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {

  const [collapsed, setCollapsed] = useState(true);
  var togglerClicked = () => setCollapsed(!collapsed);

  return (
    // <div className='home-page' style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: "16px 24px", gap: "12px" }}>
    //   <FaCarSide size={20}/>
    //   <div style={{ fontSize: "16px", fontFamily: "DM Sans", fontStyle: 'normal', fontWeight: 700, lineHeight: "18px" }}>Quick<br/>Parking</div>
    // </div>
    <Navbar light expand="md">
      <NavbarBrand style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: "16px 24px", gap: "12px" }}>
        <FaCarSide size={20}/>
        <div style={{ fontSize: "16px", fontFamily: ["DM", "Sans"], fontStyle: 'normal', fontWeight: 700, lineHeight: "18px" }}>Quick<br/>Parking</div>
      </NavbarBrand>
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
    </Navbar>
  );
}

export default App;
