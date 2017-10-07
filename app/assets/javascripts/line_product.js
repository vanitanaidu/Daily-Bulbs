// submitting the form via AJAX on the product show page

$(document).on('turbolinks:load', function() {
  attachListeners()
})

function attachListeners() {
  $(".js-new_line_product").on("submit", function(e) { submitForm()
    e.preventDefault()
  })
}


function submitForm() {
debugger
}
