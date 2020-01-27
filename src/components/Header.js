import React from 'react';
import SearchForm from './SearchForm';
import Navigaton from './Navigation';

 const Header=(props)=>(
     <header>
     <SearchForm search={props.search}/>
     <Navigaton />
     </header>

 );
export default Header;

