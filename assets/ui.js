$(document).ready(function () {




})



// $(document).ready(function () {



//   // WEEK CODE 
//   function registerFirstWeek(id) {

//     // firbase database reference 
//     var database = firebase.database();
//     var f = new Date();
//     // año actual 
//     var year = f.getFullYear();
//     // mes actual ([])
//     var month = f.getMonth();
//     // dias del mes actual
//     // let numDaysMonth = monthDays[month].num
//     // dia actual
//     var dia = f.getDate();
//     // nombre del primer dia del mes 
//     let firstNumDay = year_2019[month].firstNameDay
//     // numero de semanas del mes actual
//     let resto = 7 - firstNumDay

//     let numDaysMonth = year_2019[month].numDays
//     // let numWeeksActualMonth = parseInt((numDaysMonth - resto) / 7) + 1

//     //semana al que pertenece el dia actual 
//     for (var i = 1; i <= parseInt((numDaysMonth - resto) / 7); i++) {
//       if (((7 * i) + resto) > dia) {
//         // agregar el codifo de la semana a firebase 
//         let weekCode = (i + 1)

//         console.log('actual week code', weekCode)
//         return weekCode;
//       }
//     }
//   }



//   // // OBSERVADOR
//   // firebase.auth().onAuthStateChanged(function (user) {
//   //   if (user) {
//   //     $('.init').hide()
//   //     $('.dashboard').show()

//   //     let userId = user.uid
//   //     var database = firebase.database();
//   //     let actualWeekCode = registerFirstWeek(userId)


//   //     // mostrar datos 
//   //     database.ref('users/' + userId).on('value', function (datasnapshot) {
//   //       let user_name = datasnapshot.child('username').val()
//   //       let user_email = datasnapshot.child('email').val()
//   //       $('#user_name').text(user_name)
//   //       $('#user_email').text(user_email)

//   //     })

//   //     // mostrar tareas

//   //     database.ref('users/' + userId + '/_tasks').on("child_added", function (datasnapshot) {
//   //       var taskList = datasnapshot.val()
//   //       console.log('tasks', taskList)
//   //       let task_plantilla = '<li>' + taskList.content + '</li>'
//   //       console.log('plantilaaa', task_plantilla)

//   //     });


//   //     // agregar tareas



//   //     // // datos de fecha de creacion de la tarea 
//   //     // var f = new Date();
//   //     // let month = f.getMonth() + 1;
//   //     // let year = f.getFullYear();;
//   //     // let day = f.getDate();;
//   //     // let time = f.getHours() + '-' + f.getMinutes() + '-' + f.getSeconds();
//   //     // let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
//   //     // let date = new Date(year + '-' + month + '-' + day).getDay();
//   //     // // let dayName = dias[date];
//   //     // let userId_created_moment = userId + "_" + actualWeekCode + "_" + day + "_" + month + "_" + year + "_" + time;


//   //     // // datos para ubicar la tarea en el calendario
//   //     // let dayName = $(this).attr('data-days');
//   //     // let in_weekCode = in_weekCode;
//   //     // let in_month = in_month;
//   //     // let in_year = in_year;
//   //     // let in_day = in_day;
//   //     // let in_time = in_time;
//   //     // let dayName = dayName;




//   //     // function addTask(userId, task_content) {
//   //     //   database.ref('users/' + userId + '/_tasks').push().set({
//   //     //     codeWeek: in_weekCode,
//   //     //     month: in_month,
//   //     //     year: in_year,
//   //     //     day: in_day,
//   //     //     time: in_time,
//   //     //     dayName: in_dayName,
//   //     //     content: task_content,
//   //     //     status: "1",
//   //     //     id: userId_created_moment

//   //     //     // aumentar fecha en la cual sera asignada 
//   //     //   })
//   //     // }


//   //     $('.addTaskBlock  input').on('focusout', function () {
//   //       // console.log('user id ddd', userId, 'dd', user.uid)
//   //       let task_content = $(this).val()
//   //       addTask(user.uid, task_content)

//   //     })


//   //     // modificar tareas



//   //     // borrar tareas 

//   //   } else {
//   //     $('.init').show()
//   //     $('.dashboard').hide()
//   //   }
//   // });

//   // // GUARDAR DATOS EN LA BASE DATOS DURANTE EL REGISTRO 
//   // function saveDataOnRegister(newUser) {
//   //   // firbase database reference 
//   //   var database = firebase.database();

//   //   let id = newUser.uid;
//   //   let email = newUser.email;
//   //   let name = $('#reg_name').val();
//   //   let password = $('#reg_password').val();

//   //   database.ref('users/' + id).set({
//   //     username: name,
//   //     email: email,
//   //     password: password
//   //   })




//   // }

//   // // REGISTRO
//   // function registOnFirebase() {
//   //   let email = $('#reg_email').val()
//   //   let password = $('#reg_password').val()

//   //   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//   //     // Handle Errors here.
//   //     var errorCode = error.code;
//   //     var errorMessage = error.message;
//   //     console.log('firebase error', errorCode, errorMessage)

//   //   }).then(function (data) {
//   //     // REGISTRAR LOS DATOS EN LA BD
//   //     saveDataOnRegister(data.user)
//   //   });
//   // }
//   // // validar registro
//   // $('#reg_form').on('submit', function (e) {
//   //   e.preventDefault()
//   //   $("#reg_form").validate({
//   //     rules: {
//   //       reg_name: {
//   //         required: true
//   //       },
//   //       reg_email: {
//   //         required: true,
//   //         email: true
//   //       },
//   //       reg_password: {
//   //         required: true,
//   //         minlength: 6
//   //       },
//   //     },
//   //     messages: {
//   //       reg_name: "Ingresa tu nombre",
//   //       reg_email: "Correo electrónico inválido",
//   //       reg_password: "Tu contraseña debe al menos 6 caracteres ctm"
//   //     },

//   //     // go to firebase
//   //     submitHandler: registOnFirebase
//   //   });

//   // })
//   // // LOGIN
//   // function logOnFirebase() {
//   //   let email = $('#log_email').val()
//   //   let password = $('#log_password').val()

//   //   firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//   //     // Handle Errors here.
//   //     var errorCode = error.code;
//   //     var errorMessage = error.message;
//   //     if (errorCode) {
//   //       alert(errorMessage);
//   //     }
//   //   }).then(function (data) {
//   //     console.log('usuario loggeado', data.user.uid)
//   //   });
//   // }
//   // // validar login
//   // $('#log_form').on('submit', function (e) {
//   //   e.preventDefault()
//   //   // validar
//   //   $("#log_form").validate({
//   //     rules: {
//   //       log_email: {
//   //         required: true,
//   //         email: true
//   //       },
//   //       log_password: {
//   //         required: true,
//   //         minlength: 6
//   //       },
//   //     },
//   //     messages: {
//   //       log_email: "Correo electrónico inválido",
//   //       log_password: "Tu contraseña debe al menos 6 caracteres ctm"
//   //     },

//   //     // go to firebase
//   //     submitHandler: logOnFirebase
//   //   });

//   // })
//   // // LOGOUT
//   // $('#logout').on('click', function () {
//   //   firebase.auth().signOut().then(function () {
//   //     console.log('saliste');
//   //   });
//   // })




//   // // open add task block 

//   // $('.open_addTaskBlock').on('click', function () {
//   //   $(this).next().show()
//   // })



//   // año actual 
//   var f = new Date();
//   var actualYear = f.getFullYear();


//   // generar calendario
//   for (var i = 0; i < year_2019.length; i++) {
//     let container = $('.month_list')

//     let NumWeekPerMonth = Math.ceil((((year_2019[i].firstNameDay) - 1) + year_2019[i].numDays) / 7)
//     let prevMonth_position = i - 1 < 0 ? 11 : i - 1
//     console.log('xxxx', prevMonth_position)
//     let prevNumWeekPerMonth = Math.ceil((((year_2019[prevMonth_position].firstNameDay) - 1) + year_2019[i].numDays) / 7)
//     let is_last_week_full = ((year_2019[i].firstNameDay - 1) + year_2019[i].numDays) % 7 === 0 ? true : false

//     let month = $(`
//     <div id="month_`+ year_2019[i].name + `"data-prevMonthWeeks="` + prevNumWeekPerMonth + `" data-numWeeksPerMonth = ` + NumWeekPerMonth + ` data-order="` + (i + 1) + `" data_isLastWeekFull="` + is_last_week_full + `" class="month_item"> 
//     <h3 class="month_item_name">`+ year_2019[i].name + `</h3>
//     <ul class="month_item_head">
//           <li>LU</li>
//           <li>MA</li>
//           <li>MI</li>
//           <li>JU</li>
//           <li>VI</li>
//           <li>SA</li>
//             <li>DO</li>
//     </ul>
//     <ul class="month_item_body">
//     </ul>    
//     </div>`)

//     container.append(month)

//     let containerWeek = $('.week_list')
//     let weekGroup = $(`<div id="week_` + year_2019[i].name + `"  data-numWeeksPerMonth = ` + NumWeekPerMonth + ` data-monthposition="` + (i + 1) + `"  class="week_item">
//       <h3 class="month_item_name">`+ year_2019[i].name + `</h3>
//       <ul class="week_item_header">
//         <li>LU</li>
//         <li>MA</li>
//         <li>MI</li>
//         <li>JU</li>
//         <li>VI</li>
//         <li>SA</li>
//         <li>DO</li>
//       </ul>
//       <ul class="week_item_body">
//         <ul data-order="1" class="week">
//         </ul>
//         <ul data-order="2" class="week">
//         </ul>
//         <ul data-order="3" class="week">
//         </ul>
//         <ul data-order="4" class="week">
//         </ul>
//         <ul data-order="5" class="week">
//         </ul>
//         <ul  data-order="6" class="week">
//         </ul>
//       </ul>
//     </div>`)

//     containerWeek.append(weekGroup)


//     let container_days = $('#month_' + year_2019[i].name).find('.month_item_body')

//     let containerweek_days = $('#week_' + year_2019[i].name).find('.week_item_body')
//     // void days 
//     for (var k = 1; k < year_2019[i].firstNameDay; k++) {
//       let void_day = $('<li> </li>')
//       let void_day_for_week = $('<li> </li>')
//       container_days.append(void_day)
//       containerweek_days.find('.week:nth-child(1)').append(void_day_for_week)
//     }
//     // num days 
//     for (var j = 0; j < year_2019[i].numDays; j++) {
//       let codeWeek = Math.ceil((year_2019[i].firstNameDay + j) / 7)

//       let data_day = $('<li data-codedmy ="' + (j + 1) + "_" + (i + 1) + "_" + actualYear + '" data-weekNum=' + codeWeek + ' >' + (j + 1) + '</li>')
//       let data_day_for_week = $('<li data-codedmy ="' + (j + 1) + "_" + (i + 1) + "_" + actualYear + '" data-weekNum=' + codeWeek + ' >' + (j + 1) + '</li>')
//       //  filling month days 
//       container_days.append(data_day)





//       // filling week days 
//       if (codeWeek === 1) {
//         containerweek_days.find('.week:nth-child(1)').append(data_day_for_week)

//       } else if (codeWeek === 2) {
//         containerweek_days.find('.week:nth-child(2)').append(data_day_for_week)

//       } else if (codeWeek === 3) {
//         containerweek_days.find('.week:nth-child(3)').append(data_day_for_week)

//       } else if (codeWeek === 4) {
//         containerweek_days.find('.week:nth-child(4)').append(data_day_for_week)

//       } else if (codeWeek === 5) {
//         containerweek_days.find('.week:nth-child(5)').append(data_day_for_week)

//       } else if (codeWeek === 6) {
//         containerweek_days.find('.week:nth-child(6)').append(data_day_for_week)

//       }


//     }

//   }









//   // ocultar los meses pasados y futuros

//   var actualMonth = f.getMonth() + 1;
//   var actualDay = f.getDate();

//   console.log(actualMonth)

//   for (var i = 1; i <= 12; i++) {
//     if (i < actualMonth) {
//       $('.month_item:nth-child(' + i + ')').addClass('before')

//       $('.week_item:nth-child(' + i + ') ').addClass('before')
//       $('.week_item:nth-child(' + i + ') .week_item_body .week').addClass('before')

//       if (i == (actualMonth - 1)) {

//         let limit_week_prev_month = parseInt($('.month_item:nth-child(' + i + ')').attr('data-numweekspermonth'))
//         $('.month_item:nth-child(' + i + ')').addClass('prev')
//         $('.month_item:nth-child(' + i + ') .month_item_body li[data-weeknum="' + limit_week_prev_month + '"]').addClass('last_week_days')

//       }

//     } else if (i > actualMonth) {
//       $('.month_item:nth-child(' + i + ')').addClass('after')

//       $('.week_item:nth-child(' + i + ') ').addClass('after')
//       $('.week_item:nth-child(' + i + ') .week_item_body .week').addClass('after')

//       if (i == (actualMonth + 1)) {
//         $('.month_item:nth-child(' + i + ')').addClass('next limit_pre')
//         // let limit_week_actual_month = parseInt($('.month_item:nth-child(' + actualMonth + ')').attr('data-numweekspermonth'))

//         // $('.month_item:nth-child(' + i + ')').attr('data-actulimitnumweeks', limit_week_actual_month)
//       }

//     }
//     else if (i == actualMonth) {

//       let code_actual_week = registerFirstWeek('id')


//       $('.month_item:nth-child(' + i + ')').addClass('actual')
//       $('.week_item:nth-child(' + i + ') ').addClass('actual')

//       // numero de semana del mes 
//       let numsOfWeeks = parseInt($('.week_item:nth-child(' + i + ')').attr('data-numweekspermonth'))

//       for (var j = 1; j <= numsOfWeeks; j++) {
//         if (j < code_actual_week) {
//           $('.week_item:nth-child(' + i + ')').find('.week_item_body .week:nth-child(' + j + ')').addClass('before')




//         } else if (j > code_actual_week) {
//           $('.week_item:nth-child(' + i + ')').find('.week_item_body .week:nth-child(' + j + ')').addClass('after')




//         } else if (j == code_actual_week) {
//           $('.week_item:nth-child(' + i + ')').find('.week_item_body .week:nth-child(' + j + ')').addClass('actual')

//         }


//       }


//     }


//   }


//   // prev month button 

//   $('#minus').on('click', function () {

//     let num_order = parseInt($('.month_item.actual').attr('data-order'))
//     let prev_num_order = num_order - 1 < 1 ? 12 : num_order - 1
//     let new_prev_num_order = num_order - 2 < 1 ? 12 : num_order - 2
//     let actual_next_month = num_order + 1 > 12 ? 1 : num_order + 1

//     if (prev_num_order === 12) {
//       $('.month_item').removeClass('after actual')
//       $('.month_item').addClass('before')
//       $('.month_item:last-child').addClass('actual')
//       $('.month_item:last-child').removeClass('before')


//     } else {
//       $('.month_item:nth-child(' + num_order + ')').removeClass('actual')
//       $('.month_item:nth-child(' + num_order + ')').addClass('after next')
//       $('.month_item:nth-child(' + prev_num_order + ')').removeClass('before after prev')
//       $('.month_item:nth-child(' + prev_num_order + ') .month_item_body li').removeClass('last_week_days')
//       $('.month_item:nth-child(' + prev_num_order + ')').addClass('actual')

//       // let newactualmonthWeeks = $('.month_item:nth-child(' + prev_num_order + ')').attr('data-numweekspermonth')
//       // $('.month_item:nth-child(' + num_order + ')').attr('data-actulimitnumweeks', newactualmonthWeeks)
//       // console.log('aaaaaaaaaaaaaadddddddddddddddddd', newactualmonthWeeks)


//       $('.month_item:nth-child(' + actual_next_month + ')').removeClass('next')

//       // poner prev al nuevo mes anterior 

//       let limit_week_new_prev_num_order = parseInt($('.month_item:nth-child(' + new_prev_num_order + ')').attr("data-numweekspermonth"))
//       $('.month_item:nth-child(' + new_prev_num_order + ')').addClass('prev')

//       // determinar lo dias de us ultima semana poner le la clas esa

//       $('.month_item:nth-child(' + new_prev_num_order + ') .month_item_body li[data-weeknum="' + limit_week_new_prev_num_order + '"]').addClass('last_week_days')

//     }

//   })


//   // next month button 
//   $('#plus').on('click', function () {

//     let num_order = parseInt($('.month_item.actual').attr('data-order'))
//     let next_num_order = num_order + 1 > 12 ? 1 : num_order + 1
//     console.log('next', num_order, next_num_order)

//     if (next_num_order === 1) {
//       $('.month_item').removeClass('before actual')
//       $('.month_item').addClass('after')
//       $('.month_item:first-child').addClass('actual')
//       $('.month_item:first-child').removeClass('after')
//     } else {
//       $('.month_item:nth-child(' + num_order + ')').removeClass('actual')
//       $('.month_item:nth-child(' + num_order + ')').addClass('before')
//       $('.month_item:nth-child(' + next_num_order + ')').removeClass('after')
//       $('.month_item:nth-child(' + next_num_order + ')').removeClass('before')
//       $('.month_item:nth-child(' + next_num_order + ')').addClass('actual')


//     }
//   })



//   // next week 
//   $('#plus_week').on('click', function () {

//     // mes actual 
//     let actual_week_month = $('.week_item.actual')
//     let actual_week_month_position = parseInt($('.week_item.actual').attr('data-monthposition'))

//     let limit_weeks_month = parseInt(actual_week_month.attr('data-numweekspermonth'))


//     let num_order = parseInt($('.week_item:nth-child(' + actual_week_month_position + ')').find('.week.actual').attr('data-order'))
//     let next_num_order = num_order + 1 > limit_weeks_month ? 1 : num_order + 1
//     console.log('next_nummmmmmm looooooo febbb', next_num_order)


//     if (next_num_order == 1) {
//       // cambiar el mes 

//       let next_week_month_position = actual_week_month_position + 1 > 12 ? 1 : actual_week_month_position + 1

//       if (next_week_month_position == 1) {
//         $('.week_item').removeClass('before')
//         $('.week_item').addClass('after')
//         $('.week_item:nth-child(1)').addClass('actual')
//         $('.week_item:nth-child(1)').removeClass('after')

//         $('.week_item .week').removeClass('before')
//         $('.week_item .week').addClass('after')

//         $('.week_item:nth-child(1) .week:nth-child(1)').addClass('actual')
//         $('.week_item:nth-child(1) .week:nth-child(1)').removeClass('after')


//       } else {
//         // cambiara al siguiente mes 


//         $('.week_item:nth-child(' + actual_week_month_position + ')').removeClass('actual')
//         $('.week_item:nth-child(' + actual_week_month_position + ')').addClass('before')

//         $('.week_item:nth-child(' + next_week_month_position + ')').addClass('actual')
//         $('.week_item:nth-child(' + next_week_month_position + ')').removeClass('after')

//         // remueve el actual de la ultima semanand el mes anterior

//         $('.week_item:nth-child(' + actual_week_month_position + ') .week:last-child').removeClass('actual after')
//         $('.week_item:nth-child(' + actual_week_month_position + ') .week:nth-child(' + num_order + ')').removeClass('actual')
//         $('.week_item:nth-child(' + actual_week_month_position + ') .week:nth-child(' + num_order + ')').addClass('before')

//         $('.week_item:nth-child(' + next_week_month_position + ') .week:nth-child(1)').addClass('actual')
//         $('.week_item:nth-child(' + next_week_month_position + ') .week:nth-child(1)').removeClass('after')
//         console.log('itss heree', 'next ')

//       }


//     } else {
//       $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + num_order + ')').removeClass('actual')
//       $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + num_order + ')').addClass('before')
//       $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + next_num_order + ')').addClass('actual')
//       $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + next_num_order + ')').removeClass('after before')
//     }



//   })


//   // prev week 
//   $('#minus_week').on('click', function () {

//     // mes actual 
//     let actual_week_month = $('.week_item.actual')
//     let actual_week_month_position = parseInt($('.week_item.actual').attr('data-monthposition'))


//     let limit_prev_weeks_month = parseInt($('.week_item:nth-child(' + (actual_week_month_position - 1) + ')').attr('data-monthposition'))
//     // let limit_weeks_month = parseInt(actual_week_month.attr('data-numweekspermonth'))


//     // let num_order = parseInt($('.week_item:nth-child(' + actual_week_month_position + ')').find('.week.actual').attr('data-order'))
//     // let next_num_order = num_order - 1 < 1 ? limit_prev_weeks_month : num_order - 1
//     // console.log('next_nummmmmmm looooooo febbb', limit_prev_weeks_month, next_num_order)


//     // if (next_num_order == 1) {
//     //   // cambiar el mes 

//     //   let next_week_month_position = actual_week_month_position + 1 > 12 ? 1 : actual_week_month_position + 1

//     //   if (next_week_month_position == 1) {
//     //     $('.week_item').removeClass('before')
//     //     $('.week_item').addClass('after')
//     //     $('.week_item:nth-child(1)').addClass('actual')
//     //     $('.week_item:nth-child(1)').removeClass('after')

//     //     $('.week_item .week').removeClass('before')
//     //     $('.week_item .week').addClass('after')

//     //     $('.week_item:nth-child(1) .week:nth-child(1)').addClass('actual')
//     //     $('.week_item:nth-child(1) .week:nth-child(1)').removeClass('after')


//     //   } else {
//     //     // cambiara al siguiente mes 


//     //     $('.week_item:nth-child(' + actual_week_month_position + ')').removeClass('actual')
//     //     $('.week_item:nth-child(' + actual_week_month_position + ')').addClass('before')

//     //     $('.week_item:nth-child(' + next_week_month_position + ')').addClass('actual')
//     //     $('.week_item:nth-child(' + next_week_month_position + ')').removeClass('after')

//     //     // remueve el actual de la ultima semanand el mes anterior

//     //     $('.week_item:nth-child(' + actual_week_month_position + ') .week:last-child').removeClass('actual after')
//     //     $('.week_item:nth-child(' + actual_week_month_position + ') .week:nth-child(' + num_order + ')').removeClass('actual')
//     //     $('.week_item:nth-child(' + actual_week_month_position + ') .week:nth-child(' + num_order + ')').addClass('before')

//     //     $('.week_item:nth-child(' + next_week_month_position + ') .week:nth-child(1)').addClass('actual')
//     //     $('.week_item:nth-child(' + next_week_month_position + ') .week:nth-child(1)').removeClass('after')
//     //     console.log('itss heree', 'next ')

//     //   }


//     // } else {
//     //   $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + num_order + ')').removeClass('actual')
//     //   $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + num_order + ')').addClass('before')
//     //   $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + next_num_order + ')').addClass('actual')
//     //   $('.week_item:nth-child(' + actual_week_month_position + ')').find('.week:nth-child(' + next_num_order + ')').removeClass('after before')
//     // }


//   })


//   // prev week 
//   $('#minus_week').on('click', function () {

//     let num_order = parseInt($('.week.actual').attr('data-order'))
//     console.log('nextxt weaaaaek ', num_order)




//   })





//   // corner month 

//   var d = new Date()
//   var actual_year = d.getFullYear();
//   var actual_month = d.getMonth() + 1;

//   // recorrer años
//   for (var i = 0; i < years_used.length; i++) {
//     let year_name = years_used[i].year_num
//     let year_months = years_used[i].months

//     // recorrer meses 
//     for (var j = 0; j < year_months.length; j++) {

//       let code_month = (year_name) + "-" + (j + 1)
//       let name_month = year_months[j].name + ' del ' + year_name;
//       let order_month = j + 1;
//       let numDays_month = year_months[j].numDays;
//       let blur_firstDays = year_months[j].firstDayPosition - 1;
//       let numWeeks_month = Math.ceil((blur_firstDays + numDays_month) / 7);
//       let status_month = ''

//       if (year_name < actual_year) {
//         status_month = 'before'
//         if (actual_month == 1 && order_month == 12) {
//           status_month = 'before prev'
//         }

//       } else if (year_name > actual_year) {
//         status_month = 'after'

//         if (actual_month == 12 && order_month == 1) {
//           status_month = 'after next'
//         }


//       } else if (year_name == actual_year) {

//         if (order_month < actual_month) {
//           status_month = 'before'
//           if (order_month == (actual_month - 1) && (actual_month - 1) >= 1) {
//             status_month = 'before prev'
//           }

//         } else if (order_month > actual_month) {
//           status_month = 'after'

//           if (order_month == (actual_month + 1) && (actual_month - 1) <= 12) {

//             status_month = 'before next'
//           }


//         } else if (order_month == actual_month) {
//           status_month = 'actual'
//           $('.month_corner .month_item_name').text(name_month)

//         }

//       }

//       // llenar meses 
//       let plantilla = $('<div style="height:' + (numWeeks_month * 50) + 'px" class="month_item_body ' + status_month + '" data-id="' + code_month + '" data-year="' + year_name + '" data-order="' + order_month + '" data-nameMonth="' + name_month + ' "></div>')
//       $('.month_corner').append(plantilla)

//       // llenar dias
//       for (var k = 0; k < blur_firstDays; k++) {
//         let void_days = $('<li></li>')
//         $('.month_item_body[data-id="' + code_month + '"]').append(void_days)
//       }
//       for (var l = 0; l < numDays_month; l++) {
//         let code_day = code_month + '_' + (l + 1)
//         let full_days = $('<li data-codeDay="' + code_day + '">' + (l + 1) + '</li>')
//         $('.month_item_body[data-id="' + code_month + '"]').append(full_days)

//       }

//     }

//   }


//   $('.prev_month').on('click', function () {
//     let actual_month_id = $('.month_item_body.actual').attr('id')
//     let actual_month_order = parseInt($('.month_item_body.actual').attr('data-order'))
//     let actual_year_order = parseInt($('.month_item_body.actual').attr('data-year'))

//     let new_prev_month = actual_month_order - 2 < 1 ? 12 : actual_month_order - 1
//     let new_actual_month = actual_month_order - 2 < 1 ? 12 : actual_month_order - 1
//     let new_next_month = actual_month_order

//     let old_next_month = actual_month_order + 1

//     let new_month_name = $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + new_actual_month + '"]').attr('data-namemonth')


//     if (new_actual_month == 1) {

//     } else {
//       $('.month_corner .month_item_name').text(new_month_name)

//       $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + new_next_month + '"]').removeClass('actual')
//       $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + new_next_month + '"]').addClass('after next')

//       $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + new_actual_month + '"]').removeClass('before prev')
//       $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + new_actual_month + '"]').addClass('actual')

//       $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + new_prev_month + '"]').addClass('prev')

//       $('.month_item_body[data-year="' + actual_year_order + '"][data-order="' + old_next_month + '"]').removeClass('next')




//     }






//   })


// })