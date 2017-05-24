;(function(){
    var html = '<div class="img-prev-con"><span class="img-prev"></span></div>'

    $('.img-con').on('click','.img-item',function(){
        var thisImgSrc = $(this).children('img')[0].src

        if($('.img-prev-con').length <= 0){
            $('body').append(html)
        }

        $('.img-prev').attr('style','background-image: url('+thisImgSrc+')')

        $('.img-prev-con').fadeIn()
    })

    $('body').on('click','.img-prev-con',function(){
        $(this).fadeOut()
    })
})()