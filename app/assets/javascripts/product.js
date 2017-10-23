
var products = []

function Product(name, description, date_delivered, image) {
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
  $(".js-click_to_order").on("click", function(e) {  // loading the form via AJAX on the product show page
    order()
    e.preventDefault()
  })
}

function moreFlowers() {
  $.getJSON("/products", function(response) {
    for( i=0; i < response.length; i++)
      if (i && (i / 1 !== 1)) {

        name = response[i]["name"]
        description = response[i]["description"]
        date = response[i]["date_delivered"]

        var m_names = new Array("January", "February", "March",
                      "April", "May", "June", "July", "August", "September",
                      "October", "November", "December");

        var d = new Date(date);
        var curr_date = d.getUTCDate();
        var curr_month = d.getUTCMonth();
        var curr_year = d.getUTCFullYear();
        new_date = (m_names[curr_month] + " " + curr_date + "," + " " + curr_year);
        var product = new Product(name, description, new_date)
        products.push(product)
      }
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

// displaying the form via AJAX on the product show page
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
