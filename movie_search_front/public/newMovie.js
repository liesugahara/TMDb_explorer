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
      
        ' <div class="autocomplete" style="width:300px;">'+
        '<label>Movie</label>' +
        '<input id="myInput" type="text" name="myCountry">'+
        '</div>'+

        '</form>',
        buttons: {
            formSubmit: {
                text: '<span class="material-icons small valign">add</span>Create New Movie</button>',
                btnClass: 'button btn-blue',
                action: function () {
                    var name = this.$content.find('#myInput').val();
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
                    } else if (name){
                        let newMovie = {"name": name}
                        axios({
                            method: 'post',
                            url: 'http://localhost:3000/api/v1/movies',
                            data: newMovie
                        })
                        .then(
                            data =>{
                                alert("Movie created successfully")
                                window.location.reload();
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

            autocomplete(document.getElementById("myInput"));



            // autocomplete(document.getElementById("myInput"), movies);
        }
    });
}

function autocomplete(inp) {

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/v1/movies/titles?name='+ val ,
        })
        .then(
            data =>{
                arr = data.data
                // console.log(movies)
                // autocomplete(document.getElementById("myInput"), movies);
        })
        .catch(error=>{console.log(error)
        })
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val || val.length < 3) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
       
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }


