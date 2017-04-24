require('../less/reset.less')
require('../less/common.less')
require('weui')
require('../libs/uploader.js')
wx.config({
    debug: true
});
let checked = require('../libs/radio.js')

$('.btn').click(function(){
    console.log(checked)
})