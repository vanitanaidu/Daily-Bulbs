
var products = []

function Product(name, description, date_delivered) {
  this.name = name
  this.description = description
  this.date_delivered = date_delivered
}

Product.prototype.render = function() {
  $("#past_flowers").append("<br>" + `${this.name}` + ` (${this.date_delivered})`+ "<br>" + `${this.description}` + "<br></br>")
  $(".js-more_flowers").remove()
}

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

      var product = new Product(name, description, new_date)
      products.push(product)
    })
  })
  products.forEach(function(product) {

    product.render()
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
      e.preventDefault()
      submitForm(this)
    })
  })
}

function submitForm(form) {

  formData = $(form).serialize();

  $.ajax({
    type: "POST",
    url: "/line_products",
    data: formData,
    success: function(response){

        id = response["cart"]["id"]
         cartButtons(id)
           $("#textbox").remove()
       }
    ,error: function(error){
      var errors = error["responseJSON"]["errors"]
      errors.forEach(function(each){
        $("#error_msg").html(each)
      })
     }
  })
      order()
}


function cartButtons(id) {
  $("#error_msg").remove()
  $.get(`/carts/${id}`, function(response){
    $("#form").html(response)
  })
}
