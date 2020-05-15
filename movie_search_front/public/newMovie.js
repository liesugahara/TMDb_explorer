var newMovie;
function newMovie (){
    $.confirm({
        columnClass: 'small',
        smoothContent: true,
        title: 'Add Movie',
        content: '' +
        '<form action="" class="movies-form" id="moviesform">' +
        '<div>' + 
        '<label>ID</label>' +
        '<input type="text" id="mdb_id" required />' +
        '</div>' +
        '<div>' +
        '<label>Name</label>' +
        '<input type="text" id="name" required />' +
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: '<span class="material-icons small valign">add</span>Create New Movie</button>',
                btnClass: 'button btn-blue',
                action: function () {
                    var name = this.$content.find('#name').val();
                    var mdb_id = this.$content.find('#mdb_id').val();

                    if(!name && !mdb_id){
                        $.alert('Please fill in movie id or name');
                        return false;
                    }
                    if(name && mdb_id){
                        $.alert('Please fill only movie id or name');
                        return false;
                    }
                    if(mdb_id) {
                        let newMovie = {"mdb_id": mdb_id}
                        axios({
                            method: 'post',
                            url: 'http://localhost:3000/api/v1/movies',
                            data: newMovie
                        })
                        .then(
                            data =>{
                            if (data.status==200){
                                alert("Movie created successfully")
                                window.location.reload();
                            }
                        })
                        .catch(error=>{
                            if (error.response.status == 409){
                                alert("The movie already exists")
                            } else if (error.response.status == 404){
                                alert("The movie does not exist in our database")
                            } else {
                                alert("The movie was not created, please try again later")
                            }
                        })
                    } else if (name) {
                        let newMovie = {"name": name}
                        axios({
                            method: 'post',
                            url: 'http://localhost:3000/api/v1/movies',
                            data: newMovie
                        })
                        .then(
                            data =>{console.log(data.data)
                        })
                        .catch(error=>{console.log(error)
                        })
                    }
                    
                    return newMovie
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
                jc.$$formSubmit.trigger('click'); // reference the button and click it
                
            });
        }
    });
}


