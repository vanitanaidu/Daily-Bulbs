
function Product(name, date_delivered, description) {
  this.name = name
  this.description = description
  this.date_delivered = date_delivered
}


Product.prototype.render = function() {

  var images = [
  "https://i.imgur.com/14yyQ0K.jpg",
  "https://i.imgur.com/ahDvbBG.jpg",
  "https://i.imgur.com/RV80uWc.jpg",
  "https://i.imgur.com/8skqGbu.jpg",
  "https://i.imgur.com/8skqGbu.jpg",
  "https://i.imgur.com/UhG6hXs.jpg",
  "https://i.imgur.com/bB8UWhW.jpg",
  "https://i.imgur.com/Aj9jTRJ.jpg",
  "https://i.imgur.com/wZRNCvB.jpg",
  "https://i.imgur.com/Q0uRigi.jpg",
  "https://i.imgur.com/WJY6VG8.jpg",
  "https://i.imgur.com/98NwoxC.jpg",
  ]

  $("#more_flowers").prepend("<div class='responsive'>" + "<div class='gallery' id='image'>" + "<div class='desc'>" + "<h3>" + `${this.name}` + ` (${this.date_delivered})`+ "<br></br>" + `${this.description.slice(0,30)}` + "</h3>" + "</div></div></div>")

  const randomNum = Math.floor(Math.random()*(images.length))
  const img = document.createElement("img");
  img.src = images[randomNum];
  const src = document.getElementById("image");
  const image = src.prepend(img);

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

    for(var i = 0; i < products.length; i++)
      if (i && (i / 1 !== 1)) {
        const months = new Array("January", "February", "March",
                      "April", "May", "June", "July", "August", "September",
                      "October", "November", "December");

        const sortedProducts = products.sort((a, b) => a.date_delivered - b.date_delivered);

        const date = new Date(sortedProducts[i].date_delivered);
        const currentDate = date.getUTCDate();
        const currentMonth = date.getUTCMonth();
        const currentYear = date.getUTCFullYear();
        const formattedDate = (months[currentMonth] + " " + currentDate + "," + " " + currentYear);

        const product = new Product(products[i].name, formattedDate, products[i].description)
        product.render()
      }
  })
}


// loading the form via AJAX on the product show page
function order() {
  $.get("/line_products/new", function(response) {
    $("#textbox").html(response)
    $("label[for=line_product_quantity]").remove()
    $("#line_product_quantity").attr("placeholder", "Quantity");
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
      $("#product_details").remove()
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
  $.getJSON(`/carts/${cartID}`, function(response){
        for(var i = 0; i < response.length; i++) {
          const line_product = response[i]
          const name = line_product.product.name
          const upperName = name[0].toUpperCase() + name.slice(1);
          const price = line_product.product.price
          const quantity = line_product.quantity
          const grand_total = price * quantity
          const id = line_product.cart.id

           $("#form").html("<a>" + "<div id='cart_ajax'>"  + "</div></a>")
           $("#cart_ajax").append(upperName + " " + "|" + " " + `$${price}`+ " " + "|" + " " + "Quantity: " + quantity + "<br></br>")


           $("#my_cart_button").html("<a>" + "<button>" + "My Cart" + "</button>" + "</a>")
           $('a').attr('href', `/carts/${id}`)

           $('#daily_pick_title').html("Order Summary")
        }

  })
}
