import React from 'react';
import '../SideBar/sideBar.css';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
// import Booking from '../Booking/booking';
import Bookings from '../Bookings/Bookings.jsx';
import App from '../../App';

function SideBar() {
    return (
        <div className="sidebar">
            <h1 className="logo">
                <a href="#"><span id="title">T <br/> M <br/> D <br/> b <br/> </span>Explorer</a>
            </h1>

           
            
        </div>



    );
}

export default SideBar;