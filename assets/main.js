

$(document).ready(function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $('.init').hide()
      $('.dashboard').show()

      let userId = user.uid
      var database = firebase.database();

      function closeModals() {
        // vaciar valores 




        $('.modal_add_task').addClass('opacity-0')
        $('.modal_edit_task').addClass('opacity-0')
        setTimeout(function () {
          $('.modal_add_task').addClass('display-none')
          $('.modal_edit_task').addClass('display-none')
        }, 500)
      }



      $('#modal_add_task').click(function (e) {
        //if clicked element is not your element and parents aren't your div
        if (e.target.id != 'modal_add_task_box' && $(e.target).parents('#modal_add_task_box').length == 0 || e.target.id == 'add_task' || e.target.id == 'add_cross_close') {
          closeModals();
        }
      });

      $('#modal_edit_task').click(function (e) {
        //if clicked element is not your element and parents aren't your div
        if (e.target.id != 'modal_edit_task_box' && $(e.target).parents('#modal_edit_task_box').length == 0 || e.target.id == 'edit_task' || e.target.id == 'edit_cross_close') {
          closeModals();
        }
      });


      // MOSTRAR DATOS 
      database.ref('users/' + userId).on('value', function (datasnapshot) {
        let user_name = datasnapshot.child('username').val()
        let user_email = datasnapshot.child('email').val()
        $('#user_name').text(user_name)
        $('#user_email').text(user_email)

      })

      // AGREGAR TAREA 
      $('.btn_open_add_task').on('click', function () {
        $('.modal_add_task').removeClass('display-none')
        setTimeout(function () {
          $('.modal_add_task').removeClass('opacity-0')
        }, 50)
      })

      $('#add_task').on('click', function () {

        let content = $('#new_task_content').val()
        let status = $('#new_task_status').val()
        let tipo = $('#new_task_tipo').val()
        let day = $('#new_task_day').val()
        let g = new Date()

        let id_task = g.getFullYear() + '_' + (g.getMonth() + 1) + '_' + g.getDate() + '_' + g.getHours() + '_' + g.getMinutes() + '_' + g.getSeconds() + '_' + g.getMilliseconds()
        database.ref('users/' + userId + '/_tasks/' + day + '').push().set({
          content: content,
          status: status,
          num_order: 1,
          tipo: tipo,
          id: id_task,
        })

      })


      // MOSTRAR TAREAS
      function showAllActualsTask() {
        let array_days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
        for (var i = 0; i < array_days.length; i++) {

          let array_days_item = array_days[i]
          database.ref('users/' + userId + '/_tasks/' + array_days_item + '').on("child_added", function (datasnapshot) {
            var taskDay_item = datasnapshot.val()
            let task_plantilla = '<li class="task ' + taskDay_item.tipo + '" data-tipo="' + taskDay_item.tipo + '" data-status="' + taskDay_item.status + '" data-day="' + array_days_item + '" data-id="' + taskDay_item.id + '"> <span class="content">' + taskDay_item.content + '</span> <span class="cross">X</span><span class="edit">Z</span></li>'


            if (!$('.day_body li[data-id="' + taskDay_item.id + '"]').length) {
              $('.' + array_days_item + ' .day_body').append(task_plantilla)
            } else {

            }
          });

        }

      }
      showAllActualsTask()

      database.ref('users/' + userId + '/_tasks').on("child_added", function (snapshot) {
        showAllActualsTask()
      });

      database.ref('users/' + userId + '/_tasks').on("child_removed", function (snapshot) {
        $('.day_body li').remove();
        showAllActualsTask()

      });

      database.ref('users/' + userId + '/_tasks').on("child_changed", function (snapshot) {
        $('.day_body li').remove();
        showAllActualsTask()
      });


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
        let task_tipo = $(this).parent().attr('data-tipo')
        let task_status = $(this).parent().attr('data-status')
        let task_content = $(this).parent().find('.content').text();

        let text_day = $('#edit_task_day option[value="' + task_day + '"]').text()
        let text_tipo = $('#edit_task_tipo option[value="' + task_tipo + '"]').text()
        let text_status = $('#edit_task_status option[value="' + task_status + '"]').text()



        $('.modal_edit_task').removeClass('display-none')
        $('.modal_edit_task_box').attr('data-id', task_id)
        $('.modal_edit_task_box').attr('data-old-day', task_day)


        $('.modal_edit_task #edit_task_day').val(task_day)
        $('.modal_edit_task #edit_task_tipo').val(task_tipo)
        $('.modal_edit_task #edit_task_status').val(task_status)
        $('.modal_edit_task #edit_task_content').val(task_content)


        $('.modal_edit_task .dia .fake_select_head').text(text_day)
        $('.modal_edit_task .tipo .fake_select_head').text(text_tipo)
        $('.modal_edit_task .status .fake_select_head').text(text_status)




        setTimeout(function () {
          $('.modal_edit_task').removeClass('opacity-0')
        }, 50)

      })

      $('#edit_task').on('click', function () {

        let task_id = $('.modal_edit_task_box').attr('data-id')
        let task_day = $('.modal_edit_task #edit_task_day').val()
        let task_old_day = $('.modal_edit_task_box').attr('data-old-day')


        let content = $('#edit_task_content').val()
        let status = $('#edit_task_status').val()
        let tipo = $('#edit_task_tipo').val()



        if (task_day == task_old_day) {

          database.ref('users/' + userId + '/_tasks/' + task_old_day).on('child_added', function (datasnapshot) {
            let task = datasnapshot.val()
            let task_key = datasnapshot.key


            if (task.id == task_id) {
              database.ref('users/' + userId + '/_tasks/' + task_old_day + '/' + task_key).set({
                content: content,
                status: status,
                num_order: 1,
                tipo: tipo,
                id: task_id,
              })

              return false
            }

          })

        } else {
          database.ref('users/' + userId + '/_tasks/' + task_old_day).on('child_added', function (datasnapshot) {
            let task = datasnapshot.val()
            let task_key = datasnapshot.key


            if (task.id == task_id) {
              database.ref('users/' + userId + '/_tasks/' + task_old_day + '/' + task_key).remove()
              // borar en html 
              $('.day_body li[data-id="' + task_id + '"]').hide()
              return false
            }

          })
          console.log('diaididiaa', task_day, userId)


          setTimeout(function () {
            database.ref('users/' + userId + '/_tasks/' + task_day).push().set({
              content: content,
              status: status,
              num_order: 1,
              tipo: tipo,
              id: task_id,
            })

          }, 200)
        }

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
      console.log('usuario logeado', data.user.uid)
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


// select 
$('.select_base').each(function () {
  let template = $(this).attr('data-title')
  let container = $(this).parent().find('.fake_select_head')
  container.append(template)

  $(this).find('option').each(function () {
    let template = $('<div class="fake_option" data-value="' + $(this).val() + '"  >' + $(this).text() + '<div>')
    let container = $(this).parent().parent().find('.fake_select_body')
    container.append(template)
  })
})


$('.fake_select_head').on('click', function () {
  $(this).parent().find('.fake_select_body ').toggleClass('closed')
})

$('.fake_select_body .fake_option').on('click', function () {
  let newText = $(this).text()
  let newValue = $(this).attr('data-value')
  $(this).parent().addClass('closed')
  $(this).parent().parent().find('.fake_select_head').text(newText)
  $(this).parent().parent().find('select').val(newValue)
})



