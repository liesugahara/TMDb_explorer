import React from 'react';
import Sidebar from './Components/SideBar/sideBar.jsx';
//import Content from './Components/Content/content.jsx';
import MoviesCard from './Components/moviesCards/moviesCards.jsx';
import Bookings from './Components/Bookings/Bookings.jsx';
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";

import './App.css';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={MoviesCard} /> 
          <Route exact path="/reservas" component={Bookings} />
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;
