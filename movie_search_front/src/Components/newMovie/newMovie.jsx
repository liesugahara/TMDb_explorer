import React, { Component } from 'react';
// import '../SideBar/sideBar.css';

class NewMovie extends Component{
  render(){
    function call_button() {
      var movie_params = newMovie()
    }
    return (
      <div className="button-row">
        <button onClick={ call_button} id="btn-new-movie" class = "button btn-new right">
          <span class="material-icons small valign">add</span>Crear Nueva Película</button>
      </div>



  )};
}

export default NewMovie;