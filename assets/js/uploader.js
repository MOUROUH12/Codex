  // header upload file 
  $('.uploadBtn').click(function () {
    $('.uploadBoxWrapper').addClass('grid').fadeIn();

  })

  //Drag drop upload box 

  $("input").on('dragenter', function (e) {

    $(".drop").css({
      "border": "1px dotted #5606FF",
     
    });
   
  }).on('dragleave', function (e) {
    if ($("#list span").length == 0) {
      $('.cont').removeClass('full');
    }
   
  }).on('dragenter dragend drop', function (e) {
    $('.cont').addClass('full');

  })

  $('.drop').on("dragenter dragend drop", function () {
    console.log($("#list span").length);
    if ($("#list span").length > 30) {
      $('.drop').css('overflow-y', 'scroll');
    }
  })

  // Add scroll to upload box 

  $('#files').on('change',function(evt){
    var files = evt.target.files; // FileList object
    if (files.length > 48) {
      $('.drop').css('overflow-y', 'scroll');
    }
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
            '" title="', escape(theFile.name), '"/>'
          ].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  })