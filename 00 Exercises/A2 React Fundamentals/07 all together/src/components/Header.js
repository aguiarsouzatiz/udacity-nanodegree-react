import React from 'react';
import logo from './../assets/logo.svg';
import './../assets/app.css';

const Header = () => (
    <header className="h2 flex justify-center items-center bg-near-black b--white-10">
		  <img src={logo} className="logo w2" alt="logo" />
		  <h3 className="f6 fw3 white">ReactND - Coding Practice</h3>
	  </header>
)

export default Header;