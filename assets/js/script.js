let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = getCookie("theme");
if(!dark && theme === 'light'){
  $('body,header,main,.uploadBoxWrapper,.addElementModal,.loader-wrapper,.profil-wrapper,.advancedSearch').removeClass('dark');
  console.log("light theme")
}

if(theme === 'light') {
  $('body,header,main,.uploadBoxWrapper,.addElementModal,.profil-wrapper,.advancedSearch,.loader-wrapper').removeClass('dark');
}

// $('body,header,main,.uploadBoxWrapper,.addElementModal,.loader-wrapper,.profil-wrapper,.advancedSearch').addClass('dark');


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).ready(() => {
    // $("body").on("click",function(e){
    //   if(e.target != $(".search-btn")) {
    //     $('.search-btn i').removeClass('fa-caret-up')
    //     $('.search-btn .tooltiptext').slideUp()
    //   }
    // })

  $('.go-back-btn').click(function(){
    history.go(-1);
  });
  $('.go-forward-btn').click(function(){
    history.forward();
  });
  $('.closeAdvancedSearch,.advancedSearchOverlay,.addElementBtn, .siteListBtn, .logOutBtn,.uploadBtn,.prfileBtn').on('click',function(){
    $('.advancedSearch').fadeOut()
    $('.search-bar').css('pointer-events','all')
  })
  $('.search-btn i').on('click',function(){
    $('.search-btn .tooltiptext').slideToggle()
    $(this).toggleClass('fa-caret-up')
   
  })
  $('.search-btn .tooltiptext').on('click',function(){
    $(this).fadeOut();
    $('.search-btn i').removeClass('fa-caret-up')
    $('.advancedSearch').css('display','flex').fadeIn()
    $('.search-bar').css('pointer-events','none')
  })

  $(window).on("load",function(){
    setTimeout(function(){
      $(".loader-wrapper").fadeOut()
    },1500)
  })

  // change theme 
  $('.changeThemeBtn').on('click', function () {
    $('body,header,main,.uploadBoxWrapper,.addElementModal,.profil-wrapper,.advancedSearch').toggleClass('dark');
    if($('body').hasClass('dark')){
      setCookie('theme','dark')
    }else{
      setCookie('theme','light')

    }
  })
// open/close profil 

$('.prfileBtn').click(function(){
    $('.profil-wrapper').addClass('active')
})
  
$('.profilOverlay').click(function(){
    $('.profil-wrapper').removeClass('active')
})
  
$('.addElementBtn, .siteListBtn, .logOutBtn,.uploadBtn').click(function (e) {
  $('.profil-wrapper').removeClass('active');
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
  $('#dtBasicExample_wrapper .row')[0]?.remove()
  $('#dtBasicExample_wrapper > div:nth-child(2) > div.col-sm-12.col-md-5')[0]?.remove()
  $('tfoot tr td:last-child').append($('div.dataTables_wrapper div.dataTables_paginate ul.pagination'))
  $('#dtBasicExample_wrapper > div:nth-child(2)').remove()

  $("#dtBasicExample_previous").removeClass('disabled')
  // Costumize next & previous buttons
  $("#dtBasicExample_previous > a").empty().append('<i title="précédent" class="fa-solid fa-arrow-left"></i>')
  $("#dtBasicExample_next > a").empty().append('<i title="suivant" class="fa-solid fa-arrow-right"></i>')

  // select files or folder checkbox
  $('#check-all').on('change', function () {
    $('.item-check').each(function (idx, item) {

      $(this).attr('checked', $('#check-all').prop('checked'))
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
  $('.overlay,.addElementBtn,.prfileBtn, .siteListBtn, .logOutBtn').click(function (e) {
    $('.uploadBoxWrapper').removeClass('active');
  })
  $(window).on('load', function () {
    // $('.filepond--root .filepond--drop-label label').html('Glisser & Déposer des fichiers ou <span class="filepond--label-action">Parcourir</span>');
    $('.filepond--root .filepond--drop-label label').html('');
  })


  //Drag drop upload box 

  $(".filepond").on('dragenter', function (e) {

    $(" .cont i").css({
      // "border": "1px dotted #5606FF",
      "background-color": "#5606FF",
      "transform": "translateY(-20px)"
    });

  }).on('dragleave', function (e) {
    $(" .cont i").css({
      // "border": "1px dotted #5606FF",
      "background-color": "rgba(78, 78, 78, 0.2)",
      "transform": "none"
    });

  }).on('drop', function (e) {
    $(" .cont i").css({
      // "border": "1px dotted #5606FF",
      "background-color": "rgba(78, 78, 78, 0.2)",
      "transform": "none"
    });

  })

  $('.drop').on("dragenter dragend drop", function () {
    console.log($("#list span").length);
    if ($("#list span").length > 30) {
      $('.drop').css('overflow-y', 'scroll');
    }
  })
  // modifier le nom d'un fichier/dossier modal

  $('.closeAddElemModalBoxBtn , .cancelBtn , .addElemModalOverlay, .uploadBtn, .prfileBtn, .siteListBtn, .logOutBtn').on('click', function () {
    $('.addElementModal').fadeOut()
  })
  $('.addElementBtn').on('click', function () {
    $('.addElementModal').css('display','flex').fadeIn()
  })

  // validation de nom de fichier/dossier entré par  l'utilisateur 👱🏽‍♂️ | 👱🏽‍♀️
 
  const errors = {
    name: ''
  }

  function validateName(name) {
    const regexp = new RegExp(/^[a-zA-Z0-9.\-_]+$/); //regular expression of file | folder
    let isValid = false;
    if (!regexp.test(name)) {
      errors.name = 'Veuillez entrer un nom valide'; //message de validation
    } else {
      errors.name = '';
      isValid = true;
    }
    return isValid;
  }

  $('.createFileBtn').on('click', function () {
    if (!$('#inputEelemName').val() || $('#inputEelemName').val().trim().length == 0) {
      $('.fileNameValidation').text('Veuillez enter un nom')
    } else if (!validateName($('#inputEelemName').val())) {
      $('.fileNameValidation').text(errors.name)

    }
  })
  $('#inputEelemName').on('input', function () {
    if (!$('#inputEelemName').val() || $('#inputEelemName').val().trim().length == 0) {
      $('.fileNameValidation').text('Veuillez enter un nom')
    } else if (!validateName($(this).val())) {
      $('.fileNameValidation').text(errors.name)

    } else {
      $('.fileNameValidation').text('')
    }
  })

  // 
   $('#fileOption1').on('change',function(){
      if($(this).prop('checked')){
        $('.samp2').removeClass('checked')
        $('.samp1').addClass('checked')
        console.log('checked1')
      } 
     
   })
   $('#folderOptio2').on('change',function(){
      if($(this).prop('checked')){
        $('.samp1').removeClass('checked')
        $('.samp2').addClass('checked')
      } 
     
   })

})



// initialisation de filepond 
FilePond.registerPlugin(

  // encodes the file as base64 data
  FilePondPluginFileEncode,

  // validates the size of the file
  FilePondPluginFileValidateSize,

  // corrects mobile image orientation
  FilePondPluginImageExifOrientation,

  // previews dropped images
  FilePondPluginImagePreview,




);




FilePond.create(
  document.querySelector('.filepond'), {
    imageEditorAfterWriteImage: (res) => {
      return res.dest;
    },
  });



  // Animation
  anime({
    targets: '#codex path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: 500,
    direction: 'alternate',
    loop: true
});


