$(document).ready(function () {



  // // WEEK CODE 
  // function registerFirstWeek(id) {

  //   // firbase database reference 
  //   var database = firebase.database();
  //   var f = new Date();
  //   // año actual 
  //   var year = f.getFullYear();
  //   // mes actual ([])
  //   var month = f.getMonth();
  //   // dias del mes actual
  //   // let numDaysMonth = monthDays[month].num
  //   // dia actual
  //   var dia = f.getDate();
  //   // nombre del primer dia del mes 
  //   let firstNumDay = monthDays[month].firstNameDay
  //   // numero de semanas del mes actual
  //   let resto = 7 - firstNumDay
  //   let numWeeksActualMonth = parseInt((numDaysMonth - resto) / 7) + 1

  //   //semana al que pertenece el dia actual 
  //   for (var i = 1; i <= parseInt((numDaysMonth - resto) / 7); i++) {
  //     if (((7 * i) + resto) > dia) {
  //       // agregar el codifo de la semana a firebase 
  //       let weekCode = (i + 1) + '_' + (month + 1) + '_' + year
  //       return weekCode;
  //     }
  //   }
  // }

  // // OBSERVADOR
  // firebase.auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     $('.init').hide()
  //     $('.dashboard').show()

  //     let userId = user.uid
  //     var database = firebase.database();
  //     let actualWeekCode = registerFirstWeek(userId)


  //     // mostrar datos 
  //     database.ref('users/' + userId).on('value', function (datasnapshot) {
  //       let user_name = datasnapshot.child('username').val()
  //       let user_email = datasnapshot.child('email').val()
  //       $('#user_name').text(user_name)
  //       $('#user_email').text(user_email)

  //     })

  //     // mostrar tareas

  //     database.ref('users/' + userId + '/_tasks').on("child_added", function (datasnapshot) {
  //       var taskList = datasnapshot.val()
  //       console.log('tasks', taskList)
  //       let task_plantilla = '<li>' + taskList.content + '</li>'
  //       console.log('plantilaaa', task_plantilla)

  //     });


  //     // agregar tareas



  //     // // datos de fecha de creacion de la tarea 
  //     // var f = new Date();
  //     // let month = f.getMonth() + 1;
  //     // let year = f.getFullYear();;
  //     // let day = f.getDate();;
  //     // let time = f.getHours() + '-' + f.getMinutes() + '-' + f.getSeconds();
  //     // let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  //     // let date = new Date(year + '-' + month + '-' + day).getDay();
  //     // // let dayName = dias[date];
  //     // let userId_created_moment = userId + "_" + actualWeekCode + "_" + day + "_" + month + "_" + year + "_" + time;


  //     // // datos para ubicar la tarea en el calendario
  //     // let dayName = $(this).attr('data-days');
  //     // let in_weekCode = in_weekCode;
  //     // let in_month = in_month;
  //     // let in_year = in_year;
  //     // let in_day = in_day;
  //     // let in_time = in_time;
  //     // let dayName = dayName;




  //     // function addTask(userId, task_content) {
  //     //   database.ref('users/' + userId + '/_tasks').push().set({
  //     //     codeWeek: in_weekCode,
  //     //     month: in_month,
  //     //     year: in_year,
  //     //     day: in_day,
  //     //     time: in_time,
  //     //     dayName: in_dayName,
  //     //     content: task_content,
  //     //     status: "1",
  //     //     id: userId_created_moment

  //     //     // aumentar fecha en la cual sera asignada 
  //     //   })
  //     // }


  //     $('.addTaskBlock  input').on('focusout', function () {
  //       // console.log('user id ddd', userId, 'dd', user.uid)
  //       let task_content = $(this).val()
  //       addTask(user.uid, task_content)

  //     })


  //     // modificar tareas



  //     // borrar tareas 

  //   } else {
  //     $('.init').show()
  //     $('.dashboard').hide()
  //   }
  // });

  // // GUARDAR DATOS EN LA BASE DATOS DURANTE EL REGISTRO 
  // function saveDataOnRegister(newUser) {
  //   // firbase database reference 
  //   var database = firebase.database();

  //   let id = newUser.uid;
  //   let email = newUser.email;
  //   let name = $('#reg_name').val();
  //   let password = $('#reg_password').val();

  //   database.ref('users/' + id).set({
  //     username: name,
  //     email: email,
  //     password: password
  //   })




  // }

  // // REGISTRO
  // function registOnFirebase() {
  //   let email = $('#reg_email').val()
  //   let password = $('#reg_password').val()

  //   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log('firebase error', errorCode, errorMessage)

  //   }).then(function (data) {
  //     // REGISTRAR LOS DATOS EN LA BD
  //     saveDataOnRegister(data.user)
  //   });
  // }
  // // validar registro
  // $('#reg_form').on('submit', function (e) {
  //   e.preventDefault()
  //   $("#reg_form").validate({
  //     rules: {
  //       reg_name: {
  //         required: true
  //       },
  //       reg_email: {
  //         required: true,
  //         email: true
  //       },
  //       reg_password: {
  //         required: true,
  //         minlength: 6
  //       },
  //     },
  //     messages: {
  //       reg_name: "Ingresa tu nombre",
  //       reg_email: "Correo electrónico inválido",
  //       reg_password: "Tu contraseña debe al menos 6 caracteres ctm"
  //     },

  //     // go to firebase
  //     submitHandler: registOnFirebase
  //   });

  // })
  // // LOGIN
  // function logOnFirebase() {
  //   let email = $('#log_email').val()
  //   let password = $('#log_password').val()

  //   firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     if (errorCode) {
  //       alert(errorMessage);
  //     }
  //   }).then(function (data) {
  //     console.log('usuario loggeado', data.user.uid)
  //   });
  // }
  // // validar login
  // $('#log_form').on('submit', function (e) {
  //   e.preventDefault()
  //   // validar
  //   $("#log_form").validate({
  //     rules: {
  //       log_email: {
  //         required: true,
  //         email: true
  //       },
  //       log_password: {
  //         required: true,
  //         minlength: 6
  //       },
  //     },
  //     messages: {
  //       log_email: "Correo electrónico inválido",
  //       log_password: "Tu contraseña debe al menos 6 caracteres ctm"
  //     },

  //     // go to firebase
  //     submitHandler: logOnFirebase
  //   });

  // })
  // // LOGOUT
  // $('#logout').on('click', function () {
  //   firebase.auth().signOut().then(function () {
  //     console.log('saliste');
  //   });
  // })




  // // open add task block 

  // $('.open_addTaskBlock').on('click', function () {
  //   $(this).next().show()
  // })



  // generar calendario
  for (var i = 0; i < year_2019.length; i++) {
    let container = $('.month_list')
    let month = $(`
    <div id="month_`+ year_2019[i].name + `" class="month_item"> 
    <h3 class="month_item_name">`+ year_2019[i].name + `</h3>
    <ul class="month_item_head">
        
          <li>LU</li>
          <li>MA</li>
          <li>MI</li>
          <li>JU</li>
          <li>VI</li>
          <li>SA</li>
            <li>DO</li>
    </ul>
    <ul class="month_item_body">
    </ul>    
    </div>`)

    container.append(month)

    let container_days = $('#month_' + year_2019[i].name).find('.month_item_body')
    // void days 
    for (var k = 1; k < year_2019[i].firstNameDay; k++) {
      let void_day = $('<li> </li>')
      container_days.append(void_day)
    }
    // num days 
    for (var j = 0; j < year_2019[i].numDays; j++) {
      let codeWeek = Math.ceil((year_2019[i].firstNameDay + j) / 7)
      let data_day = $('<li data-weekNum=' + codeWeek + ' >' + (j + 1) + '</li>')
      container_days.append(data_day)
    }


    // click day  
    // take week code 
    // take month
    // tale year 


  }















})