let rate = require('../libs/rate.js')

let api = 'api'

var getErrorMsg  = (d) => {
    return d.data.errors[Object.keys(d.data.errors)[0]][0].err_msg
}

$('.btn').click(function(){
    if(!rate.star) weui.alert('请给老师评个分吧～')
    let info = $('#info').val()
    
    $.ajax(api,{
        data:{
            star: rate.star,
            info: info
        },
        'type': 'POST',
        'success': function(data){
            let d = JSON.parse(data)
            if(d.code == 0){
                window.location.href = d.data.href
            }else{
                weui.alert(getErrorMsg(d))
            }
        },
        'error': function(){
            weui.alert('评分失败！请检查网络环境是否良好')
        }
    })
})