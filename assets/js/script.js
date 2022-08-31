// Query Dom elem
const body = document.body;
const header = document.querySelector('header');
const main = document.querySelector('main');
const uploadBoxWrapper = document.querySelector('.uploadBoxWrapper');
const actionBtns = document.querySelectorAll('.action-btn');


const classToggle = () => {
    body.classList.toggle('dark');
    header.classList.toggle('dark');
    main.classList.toggle('dark');
    uploadBoxWrapper.classList.toggle('dark');
};


actionBtns[0].addEventListener('click',function(){
    classToggle();
   
})



$(document).ready(() => {

	$('.search-bar').append(
		$('#dtBasicExample_filter > label > input')
		.addClass('search-input')
		.removeClass('form-control form-control-sm')
		.attr('placeholder','Recherche')
		)
	$('.row-1  label').append($('#dtBasicExample_length > label > select'))
	$('.row-1  label').prepend('Afficher')
	$('.row-1  label').append('entrées')
	$('#dtBasicExample_wrapper .row')[0].remove()
	$('#dtBasicExample_wrapper > div:nth-child(2) > div.col-sm-12.col-md-5')[0].remove()
	$('tfoot tr td:last-child').append($('div.dataTables_wrapper div.dataTables_paginate ul.pagination'))
	$('#dtBasicExample_wrapper > div:nth-child(2)').remove()


	$('#check-all').on('change',function(){
		$('.item-check').each(function(idx,item){

			$(item).attr('checked',$('#check-all').prop('checked'))
		})
	})
	

// Upload
	$('.uploadBtn').click(function(){
			$('.uploadBoxWrapper').addClass('grid').fadeToggle();

	})

	var drop = $("input");

drop.on('dragenter', function (e) {
	
  $(".drop").css({
    "border": "1px dotted #5606FF",
    // "background": "rgba(0, 153, 255, .05)"
  });
//   $(".cont").css({
//     "color": "#09f"
//   });
}).on('dragleave', function (e) {
  if($("#list span").length == 0){
    $('.cont').removeClass('full');	
}

//   $(".drop").css({
//     "border": "2px solid #DADFE3",
//     "background": "transparent"
//   });
//   $(".cont").css({
//     "color": "#8E99A5"
//   });
}).on('dragenter dragend drop', function (e) {
	$('.cont').addClass('full');

})

$('.drop').on("dragenter dragend drop",function(){
  console.log($("#list span").length);
  if($("#list span").length > 30){
    $('.drop').css('overflow-y','scroll');
}
})



function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
	if(files.length > 48){
			$('.drop').css('overflow-y','scroll');
	}
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

$('#files').change(handleFileSelect);

$('.overlay').click(function(e){
  $('.uploadBoxWrapper').fadeOut();
})

// $.fn.dataTableExt.oStdClasses.sPageButtonStaticDisabled = "paginate_button_disabled";

 
    $("#dtBasicExample_previous").removeClass('disabled')

})


