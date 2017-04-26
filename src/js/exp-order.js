require('../less/reset.less')
require('../less/common.less')
require('weui')
let imgs = require('../libs/uploader.js')
let checked = require('../libs/radio.js')

let dateCount = 8

let times = []
let weeks = {
    '1': '星期一',
    '2': '星期二',
    '3': '星期三',
    '4': '星期四',
    '5': '星期五',
    '6': '星期六',
    '0': '星期日'
}

let api = '/weixin/learning/make_appointment/free_course'
let url = './exp-result.html'

var getErrorMsg  = (d) => {
    return d.data.errors[Object.keys(d.data.errors)[0]][0].err_msg
}

for(let i = 0; i < dateCount; i++){ //get date for 7 days
    let date = new Date()
    let oneday = {
        year: '',
        month: '',
        day: '',
        week: ''
    }
    date.setDate(date.getDate()+i+2)
    oneday.year = date.getFullYear()
    oneday.month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1):(date.getMonth()+1)
    oneday.day = date.getDate() < 10 ? '0'+date.getDate():date.getDate()
    oneday.week = weeks[date.getDay()]
    times.push(oneday)
}
for(let i = 0; i < times.length; i++){//append date
    let value = times[i].year + '-' + times[i].month + '-' + times[i].day
    let cDate = times[i].month + '月' + times[i].day + '日'
    let html = '<div class="line-four"><input type="radio" name="date" value="'+value+'" id="'+value+'"><label class="default" for="'+value+'"><p>'+times[i].week+'</p><p>'+cDate+'</p></label></div>'

    $('#date').append(html)
}

$('#confirm').click(function(){
    let date,time,images,description
    if(!checked.date) return weui.alert('请选择日期')
    if(!checked.time) return weui.alert('请选择时间')
    date = checked.date[0].value
    time = checked.time[0].value
    images = imgs.imgs
    description = $('#description')[0].value
    $.ajax(api,{
        data:{
            date: date,
            time: time,
            wximgid: images,
            description: description
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
            weui.alert('预约失败！请检查网络环境是否良好')
        }
    })
})