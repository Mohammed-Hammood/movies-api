import React from 'react';
import {Link } from 'react-router-dom';

const style = {
    display:"grid",
    justifyContent: 'center',
    justifyItems:'center',
}

const NotFound = ()=> (

    <div style={style}>
        <h1>Page not found!</h1><p></p>
       <div>
           <Link to="/"  style={{textDecoration:'none', color:'black', fontSize:'14px'}}>Go to home page
            </Link>
       </div>
    </div>
    );


export default NotFound;