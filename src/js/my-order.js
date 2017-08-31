require('../libs/imgPrev.js')
require('weui')

$('.up-delete').click(function(){
    alert('删除！')
})

$('#edit-remark').click(function(){
    weui.dialog({
        //title: '编辑备注',
        content: '<textarea style="width:100%;min-height:150px;" id="conText"></textarea>',
        buttons: [{
            label: '取消',
            type: 'default',
            onClick: function() { 
                
            }
        }, {
            label: '确定',
            type: 'primary',
            onClick: function() {
                alert($('#conText').val())
            }
        }]
    })
})