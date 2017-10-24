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
  $.getJSON("/products", function(products) {

    // create a variable caslled sorted produts that contains products sorted by their date delivered

    // const sortedProducts = products.sort((a, b) => a.date_delivered - b.date_delivered);

    for( var i = 0; i < products.length; i++)
      if (i && (i / 1 !== 1)) {
        var months = new Array("January", "February", "March",
                      "April", "May", "June", "July", "August", "September",
                      "October", "November", "December");

        const sortedProducts = products.sort((a, b) => a.date_delivered - b.date_delivered);

        var date = new Date(sortedProducts[i].date_delivered);
        var currentDate = date.getUTCDate();
        var currentMonth = date.getUTCMonth();
        var currentYear = date.getUTCFullYear();
        var formattedDate = (months[currentMonth] + " " + currentDate + "," + " " + currentYear);
        var product = new Product(products[i].name, products[i].description, formattedDate)
        product.render()
      }
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
      var cartID = response["cart"]["id"]
      cartButtons(cartID)
      $("#textbox").remove()
    },
    error: function(failure){
      failure.responseJSON.errors.forEach(function(error){
        $("#error_msg").html(error)
      })
    }
  })
  order()
}

function cartButtons(cartID) {
  $("#error_msg").remove()
  $.get(`/carts/${cartID}`, function(response){
    $("#form").html(response)
  })
}
