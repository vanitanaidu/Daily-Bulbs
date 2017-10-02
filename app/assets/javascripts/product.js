function attachListeners() {
  $("#more_flowers").click(function() {
    alert("Hello.. this is working")
  })

}

function moreFlowers() {

  $.get("/products", function(response) {
    response

  })
}
