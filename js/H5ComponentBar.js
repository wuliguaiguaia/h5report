var H5ComponentBar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    var base = cfg.data[0][1];
    $.each(cfg.data,function(idx,item){
        var line = $('<div class="line"></div>');
        var name = $('<div class="name"></div>');
        var pre = $('<div class="pre"></div>');
        var desc = $('<div class="desc"></div>');
        var prebg = $('<div class="prebg"></div>')

        name.text(item[0]);
        desc.text(item[1]*100 + '%');
        pre.width(item[1]/base * 100 ); 

        item[2] && prebg.css('backgroundColor',item[2])
        
        pre.append(prebg);
        line.append(name).append(pre).append(desc)
        line.appendTo(component);
    })
    
    
    
    
    
    return component;
}