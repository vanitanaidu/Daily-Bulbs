$(document).on('turbolinks:load', function() {
  click()
})

function click() {
  $("#edit_user_1").on("submit", function(e) {
    submitAddress(this)
    e.preventDefault()
  })
}

// displaying the form via AJAX on the addresses new page
function submitAddress(form) {

  var url = form["action"]
  var formData = $(form).serialize();
  var address_url = this["location"]["href"]

  $.ajax({
  type: "POST",
  url: url,
  data: formData,
  success: function(response){
    
    var response = response

    $("#address_form").html(response)

    $(".edit_user").hide()
  }
  ,error: function(error){

    var errors = error["responseJSON"]
    errors["errors"].forEach(function(each) {
      $("#address_error_msg").html(each)

    })
  }
  })
}
