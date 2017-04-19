require('../less/radio.less')
alert(navigator.userAgent)

$('input[type="checkbox"]').change(function(){
    if(this.checked){
        $(this).siblings('label').addClass('selected')
    }else{
        $(this).siblings('label').removeClass('selected')
    }
})
$('input[type="radio"]').change(function(){
    if(this.checked){
        console.dir($(this).siblings('label'))
        $(this).parents('.timepick-radio').find('label').removeClass('selected')
        $(this).siblings('label').addClass('selected')
    }
})