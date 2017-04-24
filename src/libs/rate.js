let rate = {}

$('.f-star i').click(function(){
    let id = this.id,
        stars = $('.f-star i')

    stars.removeClass('star')

    rate['star'] = id

    for(let i = 0; i < this.id; i++){
        $(stars[i]).addClass('star')
    }
})

module.exports = rate