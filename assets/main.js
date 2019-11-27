$(document).ready(function () {

  // OBSERVADOR
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $('.init').hide()
      $('.dashboard').show()

      let userId = user.uid
      var database = firebase.database();

      database.ref('users/').child(userId).on('value', function (datasnapshot) {
        let user_name = datasnapshot.child('username').val()
        $('#user_name').text(user_name)

      })

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