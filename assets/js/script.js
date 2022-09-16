


$(document).ready(() => {


  // change theme 
  $('.changeThemeBtn').on('click', function () {
    $('body,header,main,.uploadBoxWrapper').toggleClass('dark');
  })


  // MDB table 
  $('#dtBasicExample').DataTable({
    "paging": true,
    "pagingType": "simple"
  });
  $('.dataTables_length').addClass('bs-select');

  // search bar
  $('.search-bar').append(
    $('#dtBasicExample_filter > label > input')
    .addClass('search-input')
    .removeClass('form-control form-control-sm')
    .attr('placeholder', 'Recherche')
  )
  // items numbers select
  $('.row-1  label').append($('#dtBasicExample_length > label > select'))
  $('.row-1  label').prepend('Afficher')
  $('.row-1  label').append('entrées')
  // customize MDB appearance
  $('#dtBasicExample_wrapper .row')[0].remove()
  $('#dtBasicExample_wrapper > div:nth-child(2) > div.col-sm-12.col-md-5')[0].remove()
  $('tfoot tr td:last-child').append($('div.dataTables_wrapper div.dataTables_paginate ul.pagination'))
  $('#dtBasicExample_wrapper > div:nth-child(2)').remove()

  $("#dtBasicExample_previous").removeClass('disabled')
  // Costumize next & previous buttons
  $("#dtBasicExample_previous > a").empty().append('<i title="précédent" class="fa-solid fa-arrow-left"></i>')
  $("#dtBasicExample_next > a").empty().append('<i title="suivant" class="fa-solid fa-arrow-right"></i>')

  // select files or folder checkbox
  $('#check-all').on('change', function () {
    $('.item-check').each(function (idx, item) {

      $(item).attr('checked', $('#check-all').prop('checked'))
    })
  })


  // header upload file 
  $('.uploadBtn').click(function () {
    $('.uploadBoxWrapper').toggleClass('active');
    $('.uploadBoxWrapper').css({
      "visibility": 'visible',
      "opacity": '1'
    });

  })
  // change label text en => fr 

  // fade out the upload box
  $('.overlay').click(function (e) {
    $('.uploadBoxWrapper').removeClass('active');
  })
  $(window).on('load',function(){
    // $('.filepond--root .filepond--drop-label label').html('Glisser & Déposer des fichiers ou <span class="filepond--label-action">Parcourir</span>');
    $('.filepond--root .filepond--drop-label label').html('');
  })


    //Drag drop upload box 

    $(".filepond").on('dragenter', function (e) {

      $(" .cont i").css({
        // "border": "1px dotted #5606FF",
        "background-color":"rgba(78, 78, 78, 0.5)",
        "transform":"translateY(-20px)"
      });
     
    }).on('dragleave', function (e) {
      $(" .cont i").css({
        // "border": "1px dotted #5606FF",
        "background-color":"rgba(78, 78, 78, 0.2)",
        "transform":"none"
      });
     
    }).on('drop', function (e) {
      $(" .cont i").css({
        // "border": "1px dotted #5606FF",
        "background-color":"rgba(78, 78, 78, 0.2)",
        "transform":"none"
      });
     
    })
  
    $('.drop').on("dragenter dragend drop", function () {
      console.log($("#list span").length);
      if ($("#list span").length > 30) {
        $('.drop').css('overflow-y', 'scroll');
      }
    })
})

/*
We want to preview images, so we need to register the Image Preview plugin
*/
FilePond.registerPlugin(
	
  // encodes the file as base64 data
  FilePondPluginFileEncode,
	
	// validates the size of the file
	FilePondPluginFileValidateSize,
	
	// corrects mobile image orientation
	FilePondPluginImageExifOrientation,
	
	// previews dropped images
  FilePondPluginImagePreview,

  // file edit 
  FilePondPluginImageEdit,


);

FilePond.create(
	document.querySelector('.filepond'),
  
);
FilePond.create(document.querySelector('input'), {
  imageEditorAfterWriteImage: (res) => {
      return res.dest;
  },
});

