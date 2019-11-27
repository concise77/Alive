/*************     aLive.js     ***************/
/*
********           CopyRight by concisenet.cn 
********    简约程序开发，简约建站服务，稳定，高效，简约，轻便。
 */
function aLive(name){
    this.name = name;               //操作对象类名
    this.item = Array();
    this.init =function(){}             //文档加载完成初始化事件
    this.ready =function(){};           //资源准备完成初始化事件
    this.resize =function(){};          //窗口大小改变事件
    this.change =function(){};          //文档发生改变事件
    this.paint =function(){};           //文档重绘事件
    this.unload =function(){};          //窗口卸载事件
    this.core = function(e){
        var lis = document.getElementsByClassName(this.name);
        try{
            if(e){
                if(e.target.getAttribute('class')==this.name){
                    var li = e.target;
                    var itime = li.getAttribute('alive-itime')?li.getAttribute('alive-itime'):0;
                    var otime = li.getAttribute('alive-otime')?li.getAttribute('alive-otime'):0;
                    time = parseInt(li.getAttribute('alive-time'))+parseInt(itime)+parseInt(otime);
                    distory(li,time);
                }
            }else{
                var length = lis.length?lis.length:0;
                for(i=0;i<length;i++){
                    item = lis[i];
                    time = lis[i].getAttribute('alive-time');
                    distory(item,time);
                }
            }
        }catch(e){
            console.log("error:"+e);
        }
        function distory(i,t){
            if(i.parentNode!==null){
                i.addEventListener("webkitAnimationEnd", function(){
                    i.style.animationDelay=i.getAttribute('alive-time')/1000+'s';
                    i.style.animationDuration=i.getAttribute('alive-otime')/1000+'s';
                    i.style.animationName=i.getAttribute('alive-eanimate')?i.getAttribute('alive-eanimate'):"none";
                });
                setTimeout(function(){i.parentNode?i.parentNode.removeChild(i):0;},t);
            }
        }
    };
    that = this;
    document.onreadystatechange=function(e){
    	if(document.raadyState=="interactive"){
    		that.init();
    		that.paint();
            that.core();
    	}
    	if(document.readyState=="complete"){
        	that.ready();
        	that.paint();
        }
    }
    document.addEventListener("DOMNodeInserted",function(e){that.paint();that.change(e);that.core(e);});
    window.onresize = function(){that.resize();that.paint();}
    window.onunload =function(){that.unload();}
}
