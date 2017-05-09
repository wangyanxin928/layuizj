/**
 * Created by sanghuina on 17/3/28.
 * 具体的业务实现js文件,在页面总需要用layui注入引用此业务js,在业务js最终必须要exports输出
 */
    layui.use(['form', 'layedit', 'laydate','jquery'], function (exports) {
        var form = layui.form()
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate
            ,$=layui.jquery;

        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');

        //自定义验证规则
        form.verify({
            title: function (value) {
                if (value.length < 5) {
                    return '标题至少得5个字符啊';
                }
            }
            , pass: [/(.+){6,12}$/, '密码必须6到12位']
            , content: function (value) {
                layedit.sync(editIndex);
            }
        });

        //监听指定开关
        form.on('switch(switchTest)', function (data) {
            layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
                offset: '6px'
            });
            layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
        });

        //监听提交
        form.on('submit(demo1)', function (data) {
            layer.alert(JSON.stringify(data.field), {
                title: '最终的提交信息'
            })
            return false;
        });
        //exports('input', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致

        /*范围日期事件start*/
        var start = {
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };

        var end = {
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };

        document.getElementById('LAY_demorange_s').onclick = function(){
            start.elem = this;
            laydate(start);
        }
        document.getElementById('LAY_demorange_e').onclick = function(){
            end.elem = this
            laydate(end);
        }
        /*范围日期事件end*/

        /*自定义编辑器start*/
        layedit.build('LAY_demo2', {
            tool: ['face', 'image']
            ,height: 100
        });
        /*自定义编辑器end*/



    /* 自定义当用户获取输入框焦点的时候文字定位到边框上部 star*/
    $('.dataInput').focus(function () {
        var inputTxt=$(this).attr('placeholder');
        var inputHeader = $(this).parent().prev();
        inputHeader.html("");
        inputHeader.append(inputTxt);


        console.log(inputTxt);
        console.log(inputHeader);


    });



    /* 自定义当用户获取输入框焦点的时候文字定位到边框上部 end*/

    });