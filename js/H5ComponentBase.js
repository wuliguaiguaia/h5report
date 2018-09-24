var H5ComponentBase = function(name,cfg){
    var cfg = cfg || {};
    var type = cfg.type || 'base';
    var name = name || 'myname'
    var cls = 'H5_component_' + type;
    this.id = 'H5_c_' + Math.floor(Math.random() * 9 + 1);
    // var id ??

    var component = $('<div class="H5_component H5_component_name_' + name  + ' '+  cls +'"' + 'id=' + this.id + '></div>');

    cfg.width  && component.css('width',cfg.width/2);
    cfg.height && component.css('height',cfg.height/2);
    cfg.text   && component.text(cfg.text);
    cfg.bg     && component.css('backgroundImage','url(' + cfg.bg + ')');
    
    cfg.css    && component.css(cfg.css);

    if(cfg.center){
        component.css({
            left:'50%',
            marginLeft: -component.width()/2    
        })
    }
    
    if(typeof cfg.onclick === 'function'){
        component.on('click',cfg.onclick);
    }

    
    component.on('onLoad',function(e){

        setTimeout(() => {
            $(this).addClass(cls+'_Load').removeClass(cls + '_Leave');
            cfg.animateIn && $(this).css(cfg.animateIn);
        }, cfg.delay || 0);

        e.stopPropagation();
    })

    component.on('onLeave',function(e){

        setTimeout(() => {
            $(this).addClass(cls+'_Leave').removeClass(cls + '_Load');
            cfg.animateOut && $(this).css(cfg.animateOut);
        }, cfg.delay || 0);

        e.stopPropagation();

    })
    return component;
}