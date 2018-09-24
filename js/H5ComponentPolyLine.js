 var H5ComponentPolyLine = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    var h = cfg.height;
    var w = cfg.width;
    var textPad = $('<div class="textPad">')
    textPad.appendTo(component);
    

    // 创建画布 [网格线背景] 添加横向数据
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = w ;
    canvas.height = h ;
    component.append(canvas);  //component是jquery元素，canvas是dom元素
    
    cxt.beginPath();
    // 水平
    var step = 10;
    cxt.strokeStyle = '#333';
    for(var i = 0 ; i < step+1 ; i++){
        cxt.moveTo(0,i*h/step);
        cxt.lineTo(w,i*h/step);
    }
    
    // 垂直
    step = cfg.data.length + 1;
    for(var i = 0 ; i < step+1 ; i++){
        cxt.moveTo(i*w/step,0);
        cxt.lineTo(i*w/step,h);

        if(cfg.data[i]){
            var text = $('<div class="text">');
            text.appendTo(textPad);

            text.text(cfg.data[i][0]);
            text.css({
                left:w/(cfg.data.length+1) * i /2,
                width:w/(cfg.data.length+1),
                transition: 'all .6s ' + i * .1 + 's',
            })
        }
    }
    cxt.stroke();


    // 创建画布 
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = w ;
    canvas.height = h ;
    component.append(canvas);  //component是jquery元素，canvas是dom元素
    
    
    // 动画
    var draw = function(per){

        if(per >= 1){
            component.find('.text').css('opacity',1);
        }else{
            component.find('.text').css('opacity',0)
        }
        cxt.clearRect(0,0,w,h);
        cxt.strokeStyle = '#ff7787'
        cxt.fillStyle = 'rgba(255,119,135,0.54)'
        cxt.lineWidth = 5;
        cxt.beginPath();
        var [x,y] = [0,0];
    
        // 加点
        var row_w = w/(cfg.data.length+1);
        for(var i = 0 ; i < cfg.data.length ; i++){
            var point = cfg.data[i];
            x = row_w * i + row_w;
            y = h*(1-point[1]*per);
            cxt.moveTo(row_w + row_w * i,h*(1-point[1]*per));
            cxt.arc(x,y,5,0,Math.PI*2);
        }
        // 加线
        cxt.moveTo(row_w,h*(1-cfg.data[0][1]*per));
        for(var i = 0 ; i < cfg.data.length ; i++){
            var point = cfg.data[i];
            x = row_w * i + row_w;
            y = h*(1-point[1]*per);
            cxt.lineTo(x,y);
        }
        
        cxt.stroke();
        
        cxt.lineTo(x,h); //追踪画笔位置，保留最后一次的
        cxt.lineTo(row_w,h);
        cxt.lineTo(row_w,h*(1-cfg.data[0][1]));
        cxt.fill();
        
        // 加per
        // setTimeout(() => {
            // for(var i = 0 ; i < cfg.data.length ; i++){
            //     var point = cfg.data[i];
            //     var x = row_w * i + row_w;
            //     var y = h*(1-point[1]*per);
            //     cxt.fillStyle = point[2]?point[2]:'#333';
            //     cxt.fillText(point[1]*100+'%',x-10,y-15);
            // }
        // }, '2s');   //不管用
        
        
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

        setTimeout(() => {
            var row_w = w/(cfg.data.length+1);
            cxt.font = '15px Arial';
            for(var i = 0 ; i < cfg.data.length ; i++){
                
                var point = cfg.data[i];
                var x = row_w * i + row_w;
                var y = h*(1-point[1]);
                cxt.fillStyle = point[2]?point[2]:'#333';
                cxt.fillText(point[1]*100+'%',x-10,y-15);
                // $('.text').fadeIn();
            }
        }, 1800);

        // $('.textPad').stop(true,true).delay(1500).animate({
        //     width:'100%',
        // },1500)

         
    });
    
    component.on('onLeave',function(){
        var s = 1;
        for(var i = 0 ; i < 5 ; i++){
            setTimeout(() => {
                s -= .2;
                draw(s);
            }, 200*i);
        }
        // $('.textPad').stop(true,true).animate({
        //     width:'0',
        // })

        // $('.text').fadeOut();
    });
     
     
     
     return component;
 }