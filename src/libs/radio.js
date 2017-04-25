require('../less/radio.less')

var checked = {}

$('input[type="checkbox"]').change(function(){
    var parentId = $(this).parents('.timepick-radio')[0].id
    if(this.checked){
        if($.inArray('disabled',$(this).siblings('label')[0].className.split(' '))=='-1'){
            $(this).siblings('label').addClass('selected')
            checked[parentId] = $(this).parents('.timepick-radio').find('input[type="checkbox"]:checked')
        }
    }else{
        $(this).siblings('label').removeClass('selected')
    }
})

$('.timepick-radio').on('change','input[type="radio"]',function(){
    var parentId = $(this).parents('.timepick-radio')[0].id
    if(this.checked){
        $(this).parents('.timepick-radio').find('label').removeClass('selected')
        $(this).siblings('label').addClass('selected')
        checked[parentId] = $(this).parents('.timepick-radio').find('input[type="radio"]:checked')
    }
})

module.exports = checked;