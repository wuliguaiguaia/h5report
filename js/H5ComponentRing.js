var H5ComponentRing = function(name,cfg){

    var component = new H5ComponentBase(name,cfg);
    var h = cfg.height;
    var w = cfg.width;
    var r = w/2;
    var lineWidth = 20;
    
    // 1.底图层
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = cxt.width = w ;
    canvas.height = cxt.height = h ;
    component.append(canvas);
    cxt.fillStyle = '#fff';
    cxt.beginPath();
    cxt.arc(r,r,r-2.5*lineWidth,0,Math.PI*2);
    cxt.fill(); 
    
    // 2.环形图层
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = cxt.width = w ;
    canvas.height = cxt.height = h ;
    component.append(canvas); 
    // 添加文字
    var text = $('<div class="text">');
    text.text(cfg.data[0]);
    text.appendTo(component);
    text.css({
        'width':r,
        'margin-top':h/4 - 30,
        'color':cfg.data[2],
        'font-size':'15px',
    })
    
    var text = $('<div class="text">');
    text.text(cfg.data[1]*100+'%');
    text.appendTo(component);
    text.css({
        'width':r,
        'margin-top':h/4,
        'color':cfg.data[2],
    })

    // 3.环形图
    var sAngle = -Math.PI/2;
    var eAngle = sAngle + cfg.data[1] * Math.PI * 2;

    var draw = function(per){
      
        cxt.clearRect(0,0,w,h);
        cxt.beginPath();
        cxt.lineWidth = lineWidth;

        cxt.strokeStyle =  'red'
        cxt.arc(r,r,r-2*lineWidth,sAngle,sAngle + cfg.data[1] * Math.PI * 2 * per);
        cxt.stroke();
  
        if(per >= 1){
            component.find('.text').fadeIn();
        }else{
            component.find('.text').fadeOut();
        }
    }
    draw(0);
    

    // 生长动画
    component.on('onLoad',function(){
        var s = 0;
        for(var i = 0 ; i < 100 ; i++){
            setTimeout(() => {
                s+=.01
                draw(s);
            }, 500 + 10*i);
             
            
        };
    });
    
    component.on('onLeave',function(){
        var s = 1;
        for(var i = 0 ; i < 100 ; i++){
            setTimeout(() => {
                s -= .01;
                draw(s);
            }, 500 + 10*i);
        }
        
    });
      
     return component;
}