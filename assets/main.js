

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
          // console.log('diaididiaa', task_day, userId)


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


// mostar el dia actual en mobile 

let array_days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
let g = new Date()

let i_today = g.getDay()
let i_yesterday = g.getDay() - 1 < 0 ? array_days.length : g.getDay() - 1
let i_tomorrow = g.getDay() + 1 > array_days.length ? 0 : g.getDay() + 1

let yesterday = array_days[i_yesterday]
let today = array_days[i_today]
let tomorrow = array_days[i_tomorrow]

// console.log('todayyyyy', yesterday, today, tomorrow)

$('.day.' + today + '').addClass('actual')
$('.day.' + yesterday + '').addClass('yesterday')
$('.day.' + tomorrow + '').addClass('tomorrow')



for (var i = 0; i < array_days.length; i++) {
  if (i < i_today) {
    $('.day.' + array_days[i] + '').addClass('before')
    $('.day.' + array_days[i] + '').attr('data-position', [i])

  } else if (i > i_today) {
    $('.day.' + array_days[i] + '').addClass('after')
    $('.day.' + array_days[i] + '').attr('data-position', [i])

  } else {
    $('.day.' + array_days[i] + '').attr('data-position', [i])
  }

}

//  hacer movimiento con fhecha entre dias  mobile

$('.week_item_back').on('click', function () {
  let yesterday_position = parseInt($('.day.yesterday').attr('data-position'))
  let tomorrow_position = parseInt($('.day.tomorrow').attr('data-position'))
  let today_position = parseInt($('.day.actual').attr('data-position'))

  let new_yesterday_position = yesterday_position - 1 < 0 ? array_days.length - 1 : yesterday_position - 1
  let new_today_position = today_position - 1 < 0 ? array_days.length - 1 : today_position - 1
  let new_tomorrow_position = tomorrow_position - 1


  if (today_position == 0) {

    $('.day').removeClass('before after yesterday tomorrow actual')
    $('.day').addClass('before')
    $('.day[data-position="5"]').addClass('yesterday')
    $('.day[data-position="6"]').addClass('actual')
    $('.day[data-position="0"]').addClass('tomorrow after')

    $('.day[data-position="6"]').removeClass('before')
    $('.day[data-position="0"]').removeClass('before')

  } else {

    if (today_position == 1) {
      $('.day[data-position="6"]').addClass('yesterday')
    }

    if (today_position == 6) {
      $('.day[data-position="6"]').removeClass('actual')
      $('.day[data-position="6"]').addClass('tomorrow after')
    }
    $('.day[data-position="' + new_yesterday_position + '"]').removeClass('before after')
    $('.day[data-position="' + new_yesterday_position + '"]').addClass('yesterday before')
    $('.day[data-position="' + new_today_position + '"]').removeClass('yesterday before after')
    $('.day[data-position="' + new_today_position + '"]').addClass('actual')
    $('.day[data-position="' + new_tomorrow_position + '"]').removeClass('actual before after')
    $('.day[data-position="' + new_tomorrow_position + '"]').addClass('tomorrow after')
    $('.day[data-position="' + tomorrow_position + '"]').removeClass('tomorrow')

    // console.log('dddddpppppp', new_yesterday_position)
  }

})

$('.week_item_next').on('click', function () {
  let yesterday_position = parseInt($('.day.yesterday').attr('data-position'))
  let tomorrow_position = parseInt($('.day.tomorrow').attr('data-position'))
  let today_position = parseInt($('.day.actual').attr('data-position'))

  let new_yesterday_position = yesterday_position + 1 > array_days.length - 1 ? 0 : yesterday_position + 1
  let new_today_position = today_position + 1 > array_days.length - 1 ? 0 : today_position + 1
  let new_tomorrow_position = tomorrow_position + 1


  if (today_position == array_days.length) {
    // console.log('asdhsdhs', today_position)

    $('.day').removeClass('before after actual tomorrow yesterday')
    $('.day').addClass('after')

  } else {

    if (today_position == 5) {
      $('.day[data-position="0"]').addClass('tomorrow after')
      $('.day[data-position="0"]').removeClass('before')
      // console.log('jjhjjjj')
    }

    if (today_position == 1) {
      $('.day[data-position="6"]').removeClass('tomorrow')
      $('.day[data-position="6"]').addClass('after')
      $('.day[data-position="0"]').removeClass('actual')
      // console.log('jjhjjjj')
    }

    $('.day[data-position="' + yesterday_position + '"]').removeClass('yesterday')
    $('.day[data-position="' + new_yesterday_position + '"]').removeClass('actual')
    $('.day[data-position="' + new_yesterday_position + '"]').addClass('yesterday before')
    $('.day[data-position="' + new_today_position + '"]').removeClass('tomorrow before after')
    $('.day[data-position="' + new_today_position + '"]').addClass('actual')
    $('.day[data-position="' + new_tomorrow_position + '"]').removeClass('before')
    $('.day[data-position="' + new_tomorrow_position + '"]').addClass('tomorrow after')

    // console.log('coparration', yesterday_position, new_yesterday_position, today_position)
    console.log('')




  }
})


$('#show_login').on('click', function () {
  $('#show_login').addClass('display-none')
  $('#show_register').removeClass('display-none')

  $('#log_form').removeClass('display-none')
  $('#reg_form').addClass('display-none')


})

$('#show_register').on('click', function () {

  $('#show_register').addClass('display-none')
  $('#show_login').removeClass('display-none')

  $('#reg_form').removeClass('display-none')
  $('#log_form').addClass('display-none')



})







