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

  ]

  $("#whatever").prepend("<div class='responsive'>" + "<div class='gallery' id='image'>" + "<div class='desc'>" + `${this.name}` + `(${this.date_delivered})`+ "<br>" + `${this.description}` + "</div></div></div>")



  const randomNum=Math.floor(Math.random()*images.length)
  const img = document.createElement("img");
  img.src = images[randomNum];
  const src = document.getElementById("image");
  const image = src.appendChild(img);











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
