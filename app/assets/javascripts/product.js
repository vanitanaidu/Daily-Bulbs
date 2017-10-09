

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

  $.ajax({
    type: "POST",
    url: "/line_products",
    data: formData,
    success: function(response){

        quantity = response["quantity"]
        price =  response["product"]["price"]
        grandTotal = quantity * price

        yourCart = "Your Cart"

          $("#display_cart").html(`<h3> Quantity: ${quantity}` + " " + "|" + " " + `Price:  $${price}` + " " + "|" + " " + `Grand Total: $${grandTotal}</h3>` + "<br></br>")
          $("#textbox").remove()
          $("#todays_pick").remove()
          $("#cart_heading").html(`<h1> ${yourCart} <h1>`)
          var b = $('<input type="submit" name="delete" value="Delete"/>');
        $("#append_button").append(b);


  <%= button_to 'Empty Cart', cart_path(@cart), method: :delete, :data => {:confirm => 'This will empty everything in your cart. Are you sure?'} %>



    }
    , error: function(error){
      var errors = error["responseJSON"]["errors"]
      errors.forEach(function(each){
        $("#error_msg").html(each)
      })
    }
  })

  // $.post("/line_products", formData).success(function(response) {
  //
  //   quantity = response["quantity"]
  //   price =  response["product"]["price"]
  //   grandTotal = quantity * price
  //
  //     $("#display_cart").text("Your Cart")
  //     $("#display_cart").html(`<h3> Quantity: ${quantity}` + " " + "|" + " " + `Price:  $${price}` + " " + "|" + " " + `Grand Total: $${grandTotal}</h3>` + "<br></br>")
  //     $("#textbox").remove()
  //  })



  // .fail(function() {
  //   $(document).ajaxError(function() {
  //
  //   })
  // })

}
