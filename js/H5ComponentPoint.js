// 散点图表组件对象

var H5ComponentPoint = function(name,cfg){
    // 散点图以 图文组件为基础
    var component = new H5ComponentBase(name,cfg);
    // component.text('test');

    // 以第一个为基准
    var base =  cfg.data[0][1];
    $.each(cfg.data,function(idx,item){
        var point = $('<div class="point point_'+ idx +'"></div>');
        var name = $('<div class="name">' + item[0] + '</div>');
        var pre = $('<div class="pre">' + item[1]*100 + '%</div>');
        name.append(pre).appendTo(point);
        // *****
        var pre = (item[1] / base * 100) + '%';
        point.width(pre).height(pre);

        if(item[2]){
            point.css('backgroundColor',item[2]);
        }
        if(item[3] !== undefined && item[4] !== undefined){
            point.css({'top':item[4],'left':item[3]})
        }
             
        point.appendTo(component);
    })
    return component;
}