$(document).on('turbolinks:load', function() {
  attachListeners()
})

function attachListeners() {
  $(".js-more_flowers").on("click", function() { moreFlowers() })
  $(".js-click_to_order").on("click", function(e) { order()
    e.preventDefault()
  })

}

function moreFlowers() {
  $.getJSON("/products", function(response) {
    response.forEach(function(eachArray){
      name = eachArray["name"]
      description = eachArray["description"]
      date = eachArray["date_delivered"]

    $("#past_flowers").append("<br>" + `${name}` + ` (${date})`+ "<br>" + `${description}` + "<br></br>")
    $(".js-more_flowers").remove()
    })
  })
}
//
function order() {

  $.get("/line_products/new", function(response) {

  $("#textbox").html(response)

   $(".js-click_to_order").remove()
})
}
