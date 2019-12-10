

$(document).ready(function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $('.init').hide()
      $('.dashboard').show()

      let userId = user.uid
      var database = firebase.database();

      // mostrar datos 
      database.ref('users/' + userId).on('value', function (datasnapshot) {
        let user_name = datasnapshot.child('username').val()
        let user_email = datasnapshot.child('email').val()
        $('#user_name').text(user_name)
        $('#user_email').text(user_email)

      })


      // AGREGAR TAREA 

      $('.day_button button').on('click', function () {
        let g = new Date()
        let id = $(this).attr('id').replace('add_', '');
        let id_task = g.getFullYear() + '_' + (g.getMonth() + 1) + '_' + g.getDate() + '_' + g.getHours() + '_' + g.getMinutes() + '_' + g.getSeconds() + '_' + g.getMilliseconds()

        database.ref('users/' + userId + '/_tasks/' + id + '').push().set({
          content: "aaaaahhh grtgdkfjgkj dgkdkflgdf ldkfglkdfglkfg dkljgdlkgfdgk",
          status: 'hacer',
          num_order: 1,
          tipo: 'siempre',
          id: id_task,
        })


      })

      // MOSTRAR TAREAS

      let array_days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
      for (var i = 0; i < array_days.length; i++) {

        let array_days_item = array_days[i]

        database.ref('users/' + userId + '/_tasks/' + array_days_item + '').on("child_added", function (datasnapshot) {
          var taskDay_item = datasnapshot.val()
          let task_plantilla = '<li class="task " data-day="' + array_days_item + '" data-id="' + taskDay_item.id + '"> <span class="content">' + taskDay_item.content + '</span> <span class="cross">X</span><span class="edit">Z</span></li>'
          console.log('plantilaaa', task_plantilla)
          $('.' + array_days_item + ' .day_body').append(task_plantilla)
        });


      }

      // BORRAR TAREA 

      $('.day_body').on('click', '.task .cross', function () {

        let task_day = $(this).parent().attr('data-day')
        let task_id = $(this).parent().attr('data-id')
        $(this).parent().hide()

        database.ref('users/' + userId + '/_tasks/' + task_day).on('child_added', function (datasnapshot) {
          let task = datasnapshot.val()
          let task_key = datasnapshot.key
          if (task.id == task_id) {
            database.ref('users/' + userId + '/_tasks/' + task_day + '/' + task_key).remove()
          }
        })
      })


      // EDITAR TAREA 

      $('.day_body').on('click', '.task .edit', function () {
        let task_day = $(this).parent().attr('data-day')
        let task_id = $(this).parent().attr('data-id')

        $(this).parent().find('.content').text('new content 222')


        database.ref('users/' + userId + '/_tasks/' + task_day).on('child_added', function (datasnapshot) {
          let task = datasnapshot.val()
          let task_key = datasnapshot.key
          if (task.id == task_id) {
            database.ref('users/' + userId + '/_tasks/' + task_day + '/' + task_key).set({
              content: "new content 222",
              status: 'hacer',
              num_order: 1,
              tipo: 'siempre',
              id: task_id,
            })
          }
        })

      })



    } else {
      $('.init').show()
      $('.dashboard').hide()
    }
  })




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




// ui 

// levantar los iconos del edit y deleted en hove 
// delted y otras opciones estan en un mini submenu 
// hay una opcion de copiar la tarjeta 
// editar abre un minimodal  
// agregar es un unico boton para todos 

