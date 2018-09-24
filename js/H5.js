// 内容管理对象
var H5 = function(){
     
    // 创建H5容器
    this.id = ('H5_Page_' + Math.random()).replace('.','_');
    this.el = $('<div class="h5"'  + '></div>').hide()
            .appendTo($('body'));
    this.page = [];

    // 添加 H5 页面
    this.addPage = function(name,text){
        var page = $('<div class="H5_page section" id=' + this.id +'></div>')

        if(name != undefined){
            page.addClass('H5_page_' + name);
        }
        if(text != undefined){
            page.text(text);
        }

        this.page.push(page);
        page.appendTo(this.el);

        // debugger
        if(typeof this.whenAddPage === 'function'){
             this.whenAddPage();
        }

        return this;
    }

    // 添加 H5 基本图文组件
    this.addComponent = function(name,cfg){

        // 初始化对象
        var cfg = cfg || {};

        // 添加必要属性,
        cfg = $.extend({
            type:'base'
        },cfg);

        var component; //定义一个变量，存储 组件元素
        switch(cfg.type){
            case 'base':
                component = new H5ComponentBase(name,cfg);
            break;
            case 'point':
                component = new H5ComponentPoint(name,cfg);
            break;
            case 'polyLine':
                component = new H5ComponentPolyLine(name,cfg);
            break;
            case 'pie':
                component = new H5ComponentPie(name,cfg);
            break;
            case 'ring':
                component = new H5ComponentRing(name,cfg);
            break;
            case 'bar':
                component = new H5ComponentBar(name,cfg);
            break;
            case 'radar':
                component = new H5ComponentRadar(name,cfg);
            break;
            case 'ringAll':
                component = new H5ComponentRingAll(name,cfg);
            break;
            default:
        }

        var page = this.page.slice(-1)[0];
        component.appendTo(page);
        return this;
    }

    // H5对象初始化呈现
    this.loader = function(page){
        this.el.show()
            .fullpage({
                loopBottom: true,
                onLeave:function(index,nextIndex,direction){
                    $(this).find('.H5_component').trigger('onLeave');
                },
                afterLoad:function(anchorLink,index){
                    $(this).find('.H5_component').trigger('onLoad');
                }
           }) 
        this.el.find('.H5_page').eq(0).find('.H5_component').trigger('onLoad');
        if(page){
            $.fn.fullpage.moveTo(page);
        }

    }
}







