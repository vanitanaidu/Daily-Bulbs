$(document).on('turbolinks:load', function() {
  attachListeners()
})

function attachListeners() {
  $(".js-add_to_cart").on("click", function(e) {
    addToCart()
  })
}


function addToCart() {
  $.post("/line_products", function(response) {
    debugger
    $("#add_to_cart").html(response)
     $(".js-add_to_cart").remove()

  })

}
