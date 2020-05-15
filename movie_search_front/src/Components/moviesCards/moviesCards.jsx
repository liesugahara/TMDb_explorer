import React, { Component } from 'react';
import '../moviesCards/moviesCards.css';
// import booking from '../Booking/booking.js'
import NewMovie from '../newMovie/newMovie.jsx';

class MoviesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
    this.filter = this.filter.bind(this);
    window.MyVar = this
  }


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/movies')
      .then(results => {
        return results.json()
      })
      .then(data => {
        this.setState({ movies: data })
      })
      .catch(error => console.log(error))
  }

  filter = () => {
    $('#date-filter').daterangepicker({
      opens: 'left',
      autoApply: true
    }, function (start, end, label) {
      start = start.format('YYYY-MM-DD')
      end = end.format('YYYY-MM-DD')
      fetch('http://localhost:3000/api/v1/movies/date_filter?start_date=' + start + '&end_date=' + end)
      .then(results => {
        return results.json()
      })
      .then(data => {
        window.MyVar.start_date = start
        window.MyVar.end_date = end
        window.MyVar.setState({ movies: data })
      })
      .catch(error => console.log(error))
    });
  }

  radioButton = () => {
    $('#radioBtn a').on('click', function(){
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#'+tog).prop('value', sel);
      $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
      $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
  })
  }

OnRadioCustom = () => {
    $("#fechaDiv").removeClass('hidden');
  }

  OnRadioOther = () => {
    $("#fechaDiv").addClass('hidden');
    var filter_by = $("#date_filter").val()
    if (filter_by != "A"){
    fetch('http://localhost:3000/api/v1/movies/date_filter?filter=' + filter_by)
      .then(results => {
        return results.json()
      })
      .then(data => {
        // window.MyVar.start_date = start
        // window.MyVar.end_date = end
        window.MyVar.setState({ movies: data })
      })
      .catch(error => console.log(error))
    } else {
      window.location.reload();
    }
  }

  onDropdownSearch = (e) => {
    var filter_by = e
    var filter = $('#search_box').val()
    function isInt(number){
      var er = /^-?[0-9]+$/;
      return er.test(number);
    }
    if (filter_by == "vote_count" && !isInt(filter)){
      $.alert('Use only integers for vote count')
    } else {
      fetch('http://localhost:3000/api/v1/movies/movie_filter?filter='+ filter +'&filter_by=' + filter_by)
      .then(results => {
        return results.json()
      })
      .then(data => {
        // window.MyVar.start_date = start
        // window.MyVar.end_date = end
        window.MyVar.setState({ movies: data })
      })
      .catch(error => console.log(error))
    }
  
    
    
  }



  render() {
    const movies = this.state.movies
    return (
      <div className="movies-content">
        <NewMovie />
        <div className="date-row">
          <form action="" class="date-form" id="dateform">
<div>
<div className="form-group">

<div className="col40">
<input className="search" type="text" name="search" id="search_box" placeholder="Search.."/>

</div>
<br/>

<div className="col40">
<div class="dropdown">
  <button class="dropbtn">Search Criteria</button>
  <div class="dropdown-content">
    <a href="#" id="name" onClick={e => this.onDropdownSearch(e.target.id)}>By Name</a>
    <a href="#" id="overview" onClick={e => this.onDropdownSearch(e.target.id)}>By Overview</a>
    <a href="#" id="vote_count" onClick={e => this.onDropdownSearch(e.target.id)}>By Vote Count</a>
  </div>
</div>
<br/>
<br/>
</div>
    		<div className="col40">
    			<div className="input-group"> 
    				<div id="radioBtn" className="btn-group">
            <a className="btn btn-primary btn-sm active" data-toggle="date_filter" data-title="A"  onClick={this.OnRadioOther}>All</a>
    					<a className="btn btn-primary btn-sm notActive" data-toggle="date_filter" data-title="tomorrow" onClick={this.OnRadioOther}>Tomorrow</a>
              <a className="btn btn-primary btn-sm notActive" data-toggle="date_filter" data-title="next_week" onClick={this.OnRadioOther}>Next Week</a>
    					<a className="btn btn-primary btn-sm notActive" data-toggle="date_filter" data-title="next_month" onClick={this.OnRadioOther}>Next Month</a>
              <a className="btn btn-primary btn-sm notActive" data-toggle="date_filter" data-title="C" onClick={this.OnRadioCustom}>Custom</a>
    				</div>
    				<input type="hidden" name="fun" id="date_filter" />
    			</div>
    		</div>
    	</div>
      {this.radioButton()}
</div>


            
            <div id="fechaDiv" class="selectDate hidden">

            

              <label>Fechas</label>
              {this.filter()}
              <input type="text" name="daterange" id="date-filter" required />
              <button id= "reset" onClick={window.location.reload}>Reset</button>
            </div>
          </form>
        </div>

        {movies.map(function (movie, key) {
          
          return (
            <div className="movie-card background-image" style={{ background: "url(https://image.tmdb.org/t/p/original/" + movie.poster_path + ")"}}>
              <div className="movie-header">
              </div>
              <div className="movie-content">
                <div className="movie-content-header">
                  <a href="#">
                    <h3 id={movie.id} className="movie-title">{movie.name}</h3>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
    // })
  }
}

export default MoviesCard