var H5ComponentRing = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);


    var h = cfg.height/2 - 30;
    var w = cfg.width/2 - 50;
    var step = cfg.data.length;
    var baseFloor = $('<div class="baseFloor">');
    var foreFloor = $('<div class="foreFloor">');
    component.append(baseFloor).append(foreFloor);

    // 底色层
    for(var i = 0 ; i <step ; i++){
        var item = cfg.data[i];
        var [cwidth,cheight] = [w/3,h/3];

        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        canvas.width = cwidth ;
        canvas.height = cheight ;
        baseFloor.append(canvas); 

        var x = $(canvas).offset().left + cwidth/2;
        var y = $(canvas).offset().top + cheight/2;
        
        var color ='#e0e0df';
        
        cxt.strokeStyle = color;
        cxt.lineWidth = 10;
        var r = cwidth/2 - cxt.lineWidth/2;
        var color = item[2] || '#abcdef';
        
        cxt.arc(x,y,r,0,Math.PI*2)
        cxt.stroke();
    }

    // 动画层 
    var per = 0;
    for(var i = 0 ; i <step ; i++){
        var item = cfg.data[i];
        var [cwidth,cheight] = [w/3,h/3];
    
        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        canvas.width = cwidth ;
        canvas.height = cheight ;
        foreFloor.append(canvas); 
    
        var x = $(canvas).offset().left + cwidth/2;
        var y = $(canvas).offset().top + cheight/2;

        cxt.font = 'bolder 13px Arial';
        cxt.fillStyle = color;
        cxt.textAlign = 'center';
        cxt.fillText(item[0],x,y-10);
        cxt.fillText(item[1]*100+'%',x,y+10)
        
        draw(cxt,per)

    }

    
    
   function draw(cxt,per){
        var ringLen = item[1] * per;
        var Sangel = -Math.PI/2;
        var Eangel = Sangel + ringLen*2*Math.PI;
        var color = item[2] || '#abcdef';
        
        cxt.strokeStyle = color;
        cxt.lineWidth = 10;
        var r = cwidth/2 - cxt.lineWidth/2;
        
        cxt.arc(x,y,r,Sangel,Eangel)
        cxt.stroke();

    }
    
    // 动画
    component.on('onLoad',function(){
        var s = 0;
        for(var i = 0 ; i < 10 ; i++){
            setTimeout(() => {
                             console.log(s)
                s+=.1
                per = s;
                // debugger
            }, 500 + 100*i);
             
            
        };
    });

    return component;
}