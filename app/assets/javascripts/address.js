$(document).on('turbolinks:load', function() {
  click()
})

function click() {
  $("#edit_user_1").on("submit", function(e) { submitAddress(this)
    e.preventDefault()
  })
}

function submitAddress(form) {

  url = form["action"]
  formData = $(form).serialize();

  $.ajax({
  type: "POST",
  url: url,
  data: formData,
  success: function(response){

    $("#address_form").html(response)
    $("#edit_user_1").hide()
  }
  ,error: function(error){
    // debugger
    // var errors = error["responseJSON"]["errors"]
    // errors.forEach(function(each){
    //   $("#address_error_msg").html(each)
    // })
    }
  })
}
