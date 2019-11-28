$(document).ready(function () {



  // WEEK CODE 
  function registerFirstWeek(id) {

    // firbase database reference 
    var database = firebase.database();
    var f = new Date();
    // año actual 
    var year = f.getFullYear();
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
        let weekCode = (i + 1) + '_' + (month + 1) + '_' + year
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
        let task_plantilla = '<li>' + taskList.content + '</li>'
        console.log('plantilaaa', task_plantilla)

      });


      // agregar tareas

      var f = new Date();
      let month = f.getMonth() + 1;
      let year = f.getFullYear();;
      let day = f.getDate();;
      let time = f.getHours() + '-' + f.getMinutes() + '-' + f.getSeconds();
      let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
      let date = new Date(year + '-' + month + '-' + day).getDay();
      let dayName = dias[date];
      let userId_created_moment = userId + "_" + day + "_" + month + "_" + year + "_" + time



      function addTask(userId, task_content) {
        database.ref('users/' + userId + '/_tasks').push().set({
          codeWeek: actualWeekCode,
          month: month,
          year: year,
          day: day,
          time: time,
          dayName: dayName,
          content: task_content,
          status: "1",
          id: userId_created_moment
        })
      }


      $('.addTaskBlock  input').on('focusout', function () {
        // console.log('user id ddd', userId, 'dd', user.uid)
        let task_content = $(this).val()
        addTask(user.uid, task_content)

      })


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




  // open add task block 

  $('.open_addTaskBlock').on('click', function () {
    $(this).next().show()
  })





})