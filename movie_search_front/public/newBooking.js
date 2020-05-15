function newBooking (e){
    var movie_id = e.target.id
    $.confirm({
        columnClass: 'small',
        smoothContent: true,
        title: 'Reservar',
        content: '' +
        '<form action="" class="bookings-form" id="bookingsform">' +
        '<label>Nombre Completo</label>' +
        '<input type="text" id="name" required />' +
        '</div>' +
        '<div>' +
        '<label>Celular</label>' +
        '<input type="text" id="mobile_phone" required />' +
        '</div>' +
        '<div>' +
        '<label>Cédula</label>' +
        '<input type="text" id="id_number" required />' +
        '</div>' +
        '<div id="fechaDiv" class="fechaDiv">' +
        '<label>Correo Electrónico</label>' +
        '<input type="text" id="email" required />' +
        '</div>' +
        '<div id="fechaDiv" class="fechaDiv">' +
        '<label>Fechas</label>' +
        '<input type="text" name="birthday" id="reserve-date" required />' +
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Reservar ahora',
                btnClass: 'btn-blue',
                action: function () {
                    function validIdNumber(str) {
                        var pattern = new RegExp('/^\d+$/'); // fragment locator
                        return !pattern.test(str);
                      }
                      function validPhoneNumber(str) {
                        var pattern = new RegExp('/^\d{10}$/'); // fragment locator
                        return !pattern.test(str);
                      }
                      function validEmail(str) {
                        var pattern = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'); // fragment locator
                        return !pattern.test(str);
                      }
                    var name = this.$content.find('#name').val();
                    var mobile_phone = this.$content.find('#mobile_phone').val();
                    var id_number = this.$content.find('#id_number').val();
                    var email = this.$content.find('#email').val();
                    var date_range = $('#reserve-date').data('daterangepicker');
                    var date = date_range.startDate.format('DD-MM-YYYY'); 
                    if(!name || !mobile_phone || !id_number || !email || !date){
                        $.alert('Por favor llena todos los campos');
                        return false;
                    }
                    if(!validIdNumber(id_number)){
                        $.alert('Por favor ingresa un número de cédula válido');
                        return false;
                    }
                    if(!validPhoneNumber(mobile_phone)){
                        $.alert('Por favor ingrese un número de celular válido');
                        return false;
                    }
                    if(!validEmail(email)){
                        $.alert('Por favor ingrese un email válido');
                        return false;
                    }

                    
                    let newBooking = {"name": name, "mobile_phone": mobile_phone, "id_number": id_number, "email": email, "movie_id": movie_id, "date": date}
                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/api/v1/movies/'+ movie_id +'/bookings',
                        data: newBooking
                    })
                    .then(data=>console.log(data))
                    .catch(err=> alert(err))
                    alert("Reserva creada satisfactioriamente")
                    window.location.reload();
                    return newBooking
                }
            },
            cancel: function () {
                window.location.reload();
            },
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                console.log(newMovie)
                jc.$$formSubmit.trigger('click'); // reference the button and click it
                
            });
            $('input[name="birthday"]').daterangepicker({
                singleDatePicker: true,
                parentEl: '.jconfirm-row',
                autoApply: true,
                showDropdowns: true,
                minYear: 2010,
                maxYear: parseInt(moment().format('YYYY'),10)
            }, function(start, end, label) {
                var years = moment().diff(start, 'years');
                // console.log(start._d)
            });
        }
    });
}


