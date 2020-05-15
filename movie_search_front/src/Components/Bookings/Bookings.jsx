import React, { Component } from 'react';
import '../Bookings/Bookings.css';
//import {bookingTable} from '../../../public/Bookings.js';
import { withRouter } from 'react-router';

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    }
    this.filter = this.filter.bind(this);
    window.MyVar = this
  }


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/bookings')
      .then(results => {
        return results.json()
      })
      .then(data => {
        this.setState({ bookings: data })
      })
      .catch(error => console.log(error))
  }

  filter = () => {
    $('#booking-filter').daterangepicker({
      opens: 'left',
      autoApply: true
    }, function (start, end, label) {
      window.MyVar.setState({ bookings: [] })
      start = start.format('DD-MM-YYYY')
      end = end.format('DD-MM-YYYY')
      fetch('http://localhost:3000/api/v1/bookings/booking_filter?start_date=' + start + '&end_date=' + end)
        .then(results => {
          return results.json()
        })
        .then(data => {
          window.MyVar.setState({ bookings: data })
        })
        .catch(error => console.log(error))
    });
  }


  render() {
    const bookings = this.state.bookings

    return (
      

<div className="tabledata-content">
<div id="fechaDiv" class="selectDate">
        <label>Fechas</label>
        {this.filter()}
        <input type="text" name="daterange" id="booking-filter" required />
      </div>
      <div className="fresh-table toolbar-color-azure" >
         
        <table id="fresh-table" className="table">
<thead>
          <th  data-field="movie">Película</th>
          <th  data-field="name" data-sortable="true">Nombre Reservante</th>
          <th  data-field="email" data-sortable="true">Correo</th>
          <th  data-field="id" data-sortable="true">Cédula</th>
          <th  data-field="mobile">Celular</th>
          <th  data-field="actions" className="align-start"> Fecha de Reserva </th>
</thead>
<tbody>
        {bookings.map(function (booking, key) {
          return (
          <tr>
            <td data-label="movie">{booking.movie.name}</td>
            <td data-label="name">{booking.name}</td>
            <td data-label="email">{booking.email}</td>
            <td data-label="id">{booking.id_number}</td>
            <td data-label="mobile">{booking.mobile_phone}</td>
            <td data-label="actions">{booking.date}</td>
          </tr>
          )
        })}
</tbody>
        </table>
      
      </div>
</div>
    )


  }
}

export default withRouter(Bookings)