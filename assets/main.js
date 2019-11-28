$(document).ready(function () {



  // WEEK CODE 
  function registerFirstWeek(id) {

    // firbase database reference 
    var database = firebase.database();
    var f = new Date();
    // mes actual ([])
    var month = f.getMonth();
    // dias del mes actual
    let numDaysMonth = monthDays[month].num
    // dia actual
    var dia = f.getDate();
    // nombre del primer dia del mes 
    let firstNumDay = monthDays[month].firstNameDay
    // numero de semanas del mes actual
    let resto = 7 - firstNumDay
    let numWeeksActualMonth = parseInt((numDaysMonth - resto) / 7) + 1

    //semana al que pertenece el dia actual 
    for (var i = 1; i <= parseInt((numDaysMonth - resto) / 7); i++) {
      if (((7 * i) + resto) > dia) {
        // agregar el codifo de la semana a firebase 
        let weekCode = (i + 1) + '_' + (month + 1) + '_' + 19
        return weekCode;
      }
    }
  }

  // OBSERVADOR
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $('.init').hide()
      $('.dashboard').show()

      let userId = user.uid
      var database = firebase.database();
      let actualWeekCode = registerFirstWeek(userId)


      // mostrar datos 
      database.ref('users/' + userId).on('value', function (datasnapshot) {
        let user_name = datasnapshot.child('username').val()
        let user_email = datasnapshot.child('email').val()
        $('#user_name').text(user_name)
        $('#user_email').text(user_email)

      })

      // mostrar tareas

      database.ref('users/' + userId + '/_tasks').on("child_added", function (datasnapshot) {
        var taskList = datasnapshot.val()
        console.log('tasks', taskList)
      });


      // agregar tareas

      let userId_created_moment = userId + '_' +

        function addTask(userId) {
          database.ref('users/' + userId + '/_tasks').push().set({
            codeWeek: actualWeekCode,
            month: "",
            year: "",
            day: "",
            time: "",
            content: "jjjjjjjaaaaaaaaaa",
            status: "1",
            dia: "",
            id: userId_created_moment
          })
        }

      addTask(userId)

      // modificar tareas



      // borrar tareas 

    } else {
      $('.init').show()
      $('.dashboard').hide()
    }
  });

  // GUARDAR DATOS EN LA BASE DATOS DURANTE EL REGISTRO 
  function saveDataOnRegister(newUser) {
    // firbase database reference 
    var database = firebase.database();

    let id = newUser.uid;
    let email = newUser.email;
    let name = $('#reg_name').val();
    let password = $('#reg_password').val();

    database.ref('users/' + id).set({
      username: name,
      email: email,
      password: password
    })




  }

  // REGISTRO
  function registOnFirebase() {
    let email = $('#reg_email').val()
    let password = $('#reg_password').val()

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('firebase error', errorCode, errorMessage)

    }).then(function (data) {
      // REGISTRAR LOS DATOS EN LA BD
      saveDataOnRegister(data.user)
    });
  }
  // validar registro
  $('#reg_form').on('submit', function (e) {
    e.preventDefault()
    $("#reg_form").validate({
      rules: {
        reg_name: {
          required: true
        },
        reg_email: {
          required: true,
          email: true
        },
        reg_password: {
          required: true,
          minlength: 6
        },
      },
      messages: {
        reg_name: "Ingresa tu nombre",
        reg_email: "Correo electrónico inválido",
        reg_password: "Tu contraseña debe al menos 6 caracteres ctm"
      },

      // go to firebase
      submitHandler: registOnFirebase
    });

  })
  // LOGIN
  function logOnFirebase() {
    let email = $('#log_email').val()
    let password = $('#log_password').val()

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        alert(errorMessage);
      }
    }).then(function (data) {
      console.log('usuario loggeado', data.user.uid)
    });
  }
  // validar login
  $('#log_form').on('submit', function (e) {
    e.preventDefault()
    // validar
    $("#log_form").validate({
      rules: {
        log_email: {
          required: true,
          email: true
        },
        log_password: {
          required: true,
          minlength: 6
        },
      },
      messages: {
        log_email: "Correo electrónico inválido",
        log_password: "Tu contraseña debe al menos 6 caracteres ctm"
      },

      // go to firebase
      submitHandler: logOnFirebase
    });

  })
  // LOGOUT
  $('#logout').on('click', function () {
    firebase.auth().signOut().then(function () {
      console.log('saliste');
    });
  })








})