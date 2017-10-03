

$(document).ready(function() {
  $(".js-more_flowers").on("click", function() {
    moreFlowers()
  })
})

function moreFlowers() {
  $.getJSON("/products", function(response) {
    response.forEach(function(eachArray){
      name = eachArray["name"]
      description = eachArray["description"]
      date = new Date(eachArray["date_delivered"])
    $("#past_flowers").append("<br>" + `${name}` + ` (${date})`+ "<br>" + `${description}` + "<br></br>")
    })
  })
}
