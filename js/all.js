// 基本图文组件
var H5ComponentBase = function(name,cfg){
    
    // name用于自定义组件名，用于附加样式
    var cfg = cfg || {};
    var id = ;
    this.id = ;
    // this.id 和 var id 的区别是什么
    var cls = ;
    // 新建
    var component = $("< h5_component h5_component_name_myname  + cls(类型)><>");
    // 初始化
    width,height,bg,text,css
    // 事件 添加动画 渐隐渐出
    component.on("load leave",function(){})
    return component
}

// 向body添加页和组件，并有动画 链式操作{返回当前对象}
var H5 = function(){

    // 整体容器
    this.el = $('<h5><>').hide()
                         .appendTo($('body'));
    this.page = [];
    this.addPage = function(name){
        var page = $('<h5_page  id=随机><>')
        if(name != undefined){
            page.addClass('内容相关class')
        }
        this.page.push(page);
        page.appendTo(this.el);
        return this;
    }

    this.addComponent = function(name,cfg){
        var cfg = cfg || {};
        // 扩展对象
        cfg.extend({
            type:'base'
        },cfg);

        var component;
        switch(cfg.type){
            case 'base':
                component = new H5ComponentBase(name,cfg);
            break;
        }

        var  page = this.page.slice(-1)[0];
        component.appendTo(page);
        return this;
    }

    // fullPage 和 动画操作 初始化
    this.loader = function(){
        this.el.show()
               .fullpage({
                   afterLoad:function(index,nextIndex,direction){
                        this.el.find().trigger('')
                   },
                   onLeave:function(){
                       this.el.find().trigger('')
                   }
               })

        // 初始化
        this.el.find('page').eq(0).find('').trigger('load')
    }
    

}

var H5ComponentPoint = function(name,cfg){
    
}





// 最终调用创建页面，链式操作
var h5 = new H5();
h5.addPage('face')
  .addComponent('logo',{
      type:'base',
      text:'logo',
      css:{
        width:100,
        height:100,
        backgroundImage:'url()',
        left:50,
        top:50,
      },
      animateIn:{},
      animateOut:{},
      center:true
    })
  .addComponent('slogan'),{type:'base'}
.addPage('desc')
  .addComponent('logo',{type:'base'})
  .addComponent('slogan'),{type:'base'}
.addPage('page-3')
  .addComponent('logo',{type:'base'})
  .addComponent('slogan'),{type:'base'}
.loader();
