require('../less/reset.less')
require('../less/common.less')
require('../less/index.less')
require('../libs/jquery.scroll.js')
require('weui')

//Common state define
var form = {
    'name': '',
    'mobile': '',
    'code': ''
}
var state = {
    name: 0,
    mobile: 0,
    code: 0
}
var reg = {
    name: /^[a-zA-Z\u4e00-\u9fa5]{1,20}$/,
    mobile: /^1\d{10}$/,
    code: /^\d{6}$/
}
var isSentVcode = false,
    isCheckVcode = false,
    isChangePhone = false;
var isCounting = false,
    countDown = 60,
    t;
var signupApi = '/weixin/auth/signup',
    // vcodeApi = '../../api/1.0/send_vcode',
    vcodeApi = '/weixin/auth/send_validate_code',
    checkVcodeApi = '../../api/1.0/check_vcode';

var url = './result.html';

var setTime = function(val){//vcode count
    if(isCounting){
        val.attr('disabled','disabled');
        val.addClass('btn-disabled');
        val.html('剩余'+countDown+'秒');
        countDown--;
        if(countDown<0){
            isCounting = false;
            countDown = 60;
        }
    }else{
        val.removeAttr('disabled');
        val.removeClass('btn-disabled');
        val.html('获取验证码');
        clearTimeout(t);
        return false;
    }
    t = setTimeout(function(){
        setTime(val);
    },1050);
}
//send vcode event
$('#sendVcode').on('click',function(e){
    var mobile = $('#mobile').val();
    if(reg['mobile'].test(mobile)){
        var data = {
            'mobile': mobile
        }
        $.ajax(vcodeApi,{
            'data': data,
            'type': 'POST',
            'success': function(d){
                if(d.request_result.code == 0){
                    weui.toast('发送成功',2000);
                    isCounting = true;
                    setTime($('#sendVcode'));
                    isSentVcode = true;
                    isChangePhone = false;
                }else{
                    weui.alert(d.request_result.display_message)
                }
            },
            'error': function(){
                weui.alert('发送失败！请检查网络环境是否良好')
            }
        });
    }else{
        weui.alert('请输入正确的手机号');
        return false;
    }
})
//Change phone after send vcode event
$('#phone').on('keyup',function(){
    if(isSentVcode){
        isChangePhone = true;
    }
})
//Confirm event
$('#confirm').on('click',function(e){
    var allStates = 0;
    //get form and verify form with reg
    for(var i in form){
        form[i] = $('#'+i).val();
        if(reg[i].test(form[i])){
            state[i] = 1;
            allStates += 1;
        }
        else state[i] = 0;
    }

    if(!isChangePhone){
        console.log(form)
        $.ajax(signupApi,{
            'data': {
                name: $('#name').val(),
                mobile: $('#mobile').val(),
                code: $('#code').val()
            },
            'type': 'POST',
            'success': function(d){
                if(d.code == 0){
                    window.location.href = url;
                }else{
                    weui.alert(d.data);
                }
            },
            'error': function(){
                weui.alert('验证失败！请检查网络环境是否良好')
            }
        });
    }else{
        if(isChangePhone){
            weui.alert('请输入手机号对应的验证码')
        }else{
            for(var i in state){
                if(state[i]==0){
                    switch(i){
                        case 'name': weui.alert('请输入正确的姓名');break;
                        case 'mobile': weui.alert('请输入正确的手机号');break;
                        case 'code': weui.alert('请输入正确的验证码');break;
                        default: weui.alert('错误！请重新打开页面');break;
                    }
                }
            }
        }
    }
})