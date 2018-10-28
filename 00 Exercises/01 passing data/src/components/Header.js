import React from 'react';
import Logo from './Logo';

const Header = () => (
  <header className="uk-grid uk-flex-center uk-background-secondary uk-light">
  	<Logo />
  	<h2 className="uk-text-small uk-margin-small-bottom uk-margin-small-top ux-flex-middle uk-padding-remove-left">
  		ReactND - Coding Practice
  	</h2>
  </header>
)

export default Header;