

var H5ComponentRingAll = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    var h = cfg.height;
    var w = cfg.width;
    var textPad = $('<div class="textPad">');
    var r = w/2;
    var lineWidth = 20;
    textPad.appendTo(component);
    
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = cxt.width = w ;
    canvas.height =  cxt.height = h ;
    $(cxt).css('zIndex',1)
    component.append(canvas);  //component是jquery元素，canvas是dom元素

    
    // //  1.加入底图层
    // cxt.strokeStyle ='#fff';
    // cxt.fillStyle = '#fff';
    // cxt.beginPath();
    // cxt.arc(r,r,r,0,Math.PI*2);
    // cxt.closePath();
    // cxt.stroke();
    // cxt.fill();

    // 2.绘制数据层
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = cxt.width = w ;
    canvas.height = cxt.height = h ;
    component.append(canvas); 
    $('canvas').css('zIndex',2)
    
    var step = cfg.data.length;
    var sAngle = -Math.PI/2;
    var aAngle = Math.PI * 2;
    var eAngle = 0;
    var colors = ['purple','yellow','blue','green','orange','red']
    for(var i=0 ; i<step; i++){
        var item = cfg.data[i];
        eAngle = sAngle +  item[1] * aAngle;
        var color = colors.pop();

        cxt.beginPath();
        cxt.fillStyle = item[2] || color; //pop 后进先出
        cxt.moveTo(r,r);
        cxt.arc(r,r,r-2,sAngle,eAngle);
        cxt.fill();
        sAngle = eAngle;

        // 绘制数据
        var text = $('<div class="text">');
        var pre = $('<div class="pre">');
        var item = cfg.data[i];
        text.text(item[0]).append(pre);
        pre.text(item[1]*100+'%');
        
        x = r + r * Math.cos(sAngle);
        y = r + r * Math.sin(sAngle);
        
        if(x > w/2){
            text.css('left',x/2 );
        }else{
            text.css('right',(w-x)/2 +10)
        }
        if(y > h/2){
            text.css('top',y/2 );
        }else{
            text.css('bottom',(h-y)/2 + 5)
        }
        text.css({
            color:color,
            transition:'all ease .6s ' + i*.1 + 's',
            opacity:0
        })

        text.appendTo(textPad);
    }

    // 3.中央白色区域
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = w ;
    canvas.height = h ;
    $('canvas').css('zIndex',3);
    component.append(canvas);
    cxt.fillStyle = '#fff';  
    cxt.beginPath();
    cxt.moveTo(r,r);
    cxt.arc(r,r,r-lineWidth,0,Math.PI*2);
    cxt.fill();
 
    // 4.动画 蒙版层
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = w ;
    canvas.height = h ;
    $('canvas').css('zIndex',3);
    component.append(canvas);  
 
    var draw = function(per){

        if(per >= 1){
            component.find('.text').css('opacity',1);
        }else{
            component.find('.text').css('opacity',0)
        }
        cxt.clearRect(0,0,w,h);
        cxt.beginPath();
        
        // cxt.moveTo(r,r); 
        cxt.lineWidth = lineWidth + 2;
        cxt.strokeStyle = '#e4e3e1';
        if( per <= 0 ){
            cxt.arc(r,r,r-cxt.lineWidth/2,0,aAngle);
        }else{
            cxt.arc(r,r,r-cxt.lineWidth/2,sAngle,sAngle + aAngle * per,true);
        }
        cxt.stroke();
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