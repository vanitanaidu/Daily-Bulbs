

$(document).on('turbolinks:load', function() {
  attachListeners()
})

function attachListeners() {
  $(".js-more_flowers").on("click", function() { moreFlowers() })
  $(".js-click_to_order").on("click", function(e) { order() // loading the form via AJAX on the product show page
    e.preventDefault()
  })

}

function moreFlowers() {
  $.getJSON("/products", function(response) {
    response.forEach(function(eachArray){
      name = eachArray["name"]
      description = eachArray["description"]
      date = eachArray["date_delivered"]
      new_date = new Date(date)

      $("#past_flowers").append("<br>" + `${name}` + ` (${new_date})`+ "<br>" + `${description}` + "<br></br>")
      $(".js-more_flowers").remove()
    })
  })
}

  // loading the form via AJAX on the product show page
function order() {
  $.get("/line_products/new", function(response) {
    $("#textbox").html(response)
    $(".js-click_to_order").remove()
  }).done(function() {
    document.getElementById("new_line_product")
    $("#new_line_product").on('submit', function(e) {
      submitForm(this)
      e.preventDefault()
    })
  })
}


function submitForm(form) {
  formData = $(form).serialize();
  $.post("/line_products", formData).success(function(response) {

    quantity = response["quantity"]
    price =  response["product"]["price"]
    grandTotal = quantity * price

      $("#display_cart").append("<h3>" + "Your Cart" + "</h3>")
      $("#display_cart").html(`<h3> Quantity: ${quantity}` + " " + "|" + " " + `Price:  $${price}` + " " + "|" + " " + `Grand Total: $${grandTotal}</h3>` + "<br></br>")
      $("#textbox").remove()
  })

}
