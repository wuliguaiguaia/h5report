var H5ComponentRadar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);
    var h = cfg.height;
    var w = cfg.width;
    // var textPad = $('<div class="textPad">')
    // textPad.appendTo(component);
    

    // 创建画布 绘制背景
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    component.append(canvas);   
    
    var r = w/2;
    var step = cfg.data.length ;
    // cxt.translate(w/2,h/2);
     

    // 绘制网格背景，分面绘制十份
    var isBlue = false;
    for(var j = 10 ; j > 0 ; j--){ //减减先画大的
        cxt.beginPath();
        for(var i = 0 ; i < step; i++){ 
            var rad = (2*Math.PI/360) * (360/step) * i;
            var x = r + Math.sin( rad ) * r*j/10;
            var y = r + Math.cos( rad ) * r*j/10 ;  
            cxt.lineTo(x,y);
        }
        // cxt.closePath();
        cxt.fillStyle = (isBlue = !isBlue)? '#99c0ff' : '#f1f9ff';  //两种状态的切换
        cxt.fill();
    }

    // 绘制伞骨
    cxt.beginPath();
    for(var i = 0 ; i < step ; i++){
        var rad = (2*Math.PI/360) * (360/step) * i;
        var x = r + Math.sin( rad ) * r;
        var y = r + Math.cos( rad ) * r;
        cxt.moveTo(r,r);
        cxt.lineTo(x,y);

        // 添加数据
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        text.css('transition', 'all .5s ' + i * .1 + 's')  //加空格
       
        if(x > w/2){
            text.css('left',x/2)
        }else{
            text.css('right',(w-x)/2)
        }
        if(y > h/2){
            text.css('top',y/2)
        }else{
            text.css('bottom',(h-y)/2)
        }

        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }
        text.css('opacity',0);
        text.appendTo(component);
        
    }
    cxt.strokeStyle = '#e0e0e0';
    cxt.stroke();

    // cxt.beginPath();
    // cxt.font = '15px Arial';
    // for(var i = 0 ; i < cfg.data.length ; i++){
    //     var rad = (2*Math.PI/360) * (360/step) * i;
    //     var x =r +  Math.cos( rad ) * (r + 10);
    //     var y =r +  Math.sin( rad ) * (r + 10);
    //     cxt.fillStyle = '#333';
    //     cxt.fillText(cfg.data[i][0],x-10,y+8);
    // }

      
    // 动画 画布
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = w ;
    canvas.height = h ;
    component.append(canvas);  //component是jquery元素，canvas是dom元素
    // cxt.translate(w/2,h/2);
    
    
    // 动画
    var draw = function(per){

        if(per >= 1){
            component.find('.text').css('opacity',1);
        }else{
            component.find('.text').css('opacity',0)
        }
        cxt.clearRect(0,0,w,h);
        cxt.beginPath();
        for(var i = 0 ; i < step ; i++){
            var rad = (2*Math.PI/360) * (360/step) * i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin( rad ) * r * rate;
            var y = r + Math.cos( rad ) * r * rate;
            cxt.lineTo(x,y);
        }
        cxt.closePath();
        cxt.strokeStyle = '#e91e63'
        cxt.stroke();
        
        cxt.fillStyle = '#e91e63';
        for(var i = 0 ; i < step ; i++){
            var rad = (2*Math.PI/360) * (360/step) * i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin( rad ) * r * rate;
            var y = r + Math.cos( rad ) * r * rate;
            cxt.beginPath();  //必须写在里面
            cxt.arc(x,y,5,0,Math.PI*2);
            cxt.fill();
            cxt.closePath();
        }
        
    }
    draw(0)
 
    //  生长动画
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
        for(var i = 0 ; i < 5 ; i++){
            setTimeout(() => {
                s -= .2;
                draw(s);
            }, 200*i);
        }

    });
     
    return component;
}