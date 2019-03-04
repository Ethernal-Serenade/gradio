$(".input_image").click(function (e) {
  $(this).parent().find(".hidden_upload").click();
})

$(".hidden_upload").on("change", function() {
  var files = !!this.files ? this.files : []
  if (!files.length || !window.FileReader) {
    return
  }
  if (/^image/.test(files[0].type)) {
    var ReaderObj = new FileReader()
    ReaderObj.readAsDataURL(files[0])
    ReaderObj.onloadend = function() {
      $(".input_caption").hide()
      $(".input_image img").attr("src", this.result)
    }
  } else {
    alert("Invalid input")
  }
})

$('body').on('click', '.submit', function(e) {
  var src = $('.input_image img').attr('src');
  ws.send(src, function(e) {
    notifyError(e)
  })
})

$('body').on('click', '.clear', function(e) {
  $(".input_caption").show()
  $(".input_image img").removeAttr("src");
})