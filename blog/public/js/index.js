/**
*	index  ppt
*/

var ppt={
	obj:{},
	init:function(){
		var obj=ppt.obj;
		
		obj.box=T.g("ppt");
		obj.ppts=obj.box.children[0];
		obj.doBox=obj.box.children[1];
		obj.marHiden=null;
		obj.marShow=null;
		obj.speed=0.1;
		obj.setTim=20;
		obj.showOk=true;
		obj.hidenOk=true;
		obj.pptCount=0;
		obj.pptIndex=0;
		obj.pptMar=null;
		obj.pptSetTim=3000;
		
		obj.doBox.onclick=ppt.onDoBox;
		obj.doBox.onmouseover=ppt.onDoBox;
		obj.box.onmouseover=ppt.onBox;
		obj.box.onmouseout=ppt.outBox;
		
		var odc=obj.doBox.children;
		obj.pptCount=odc.length;
		
		for(var i=0;i<odc.length;i++){
			odc[i].i=i;
			odc[i].setAttribute("opac","0");
		}
		odc[0].setAttribute("opac","1");
		
		obj.pptMar=setInterval(function(){ ppt.zd();},ppt.obj.pptSetTim);
	},
	onDoBox:function(e){
		if(!ppt.obj.showOk || !ppt.obj.hidenOk)return;
		
		e=e||window.event;
		var target=e.target||e.srcElement;
		if(target.href=="javascript:;"){
			var odc=ppt.obj.doBox.children;
			if(odc[target.i].getAttribute("opac")=="1")return;
			
			for(var i=0;i<odc.length;i++){
				odc[i].className="";
			}
			target.className="sele";
			ppt.showppt(target.i);
		}
	},
	onBox:function(){
		clearInterval(ppt.obj.pptMar);
	},
	outBox:function(){
		ppt.obj.pptMar=setInterval(function(){ ppt.zd();},ppt.obj.pptSetTim);
	},
	showppt:function(showIndex){
		var opc=ppt.obj.ppts.children;
		for(var i=0;i<opc.length;i++){
			if(ppt.obj.doBox.children[i].getAttribute("opac")=="1"){
				ppt.obj.doBox.children[i].setAttribute("opac","0");
				ppt.hiden(opc[i]);
			}
		}
		ppt.obj.doBox.children[showIndex].setAttribute("opac","1");
		ppt.obj.pptIndex=showIndex;
		ppt.show(opc[showIndex]);
	},
	hiden:function(obj){
		ppt.obj.hidenOk=false;
		var opac=1;
		obj.style.filter="alpha(opacity="+opac*100+")";
		obj.style.MozOpacity=opac;
		obj.style.opacity=opac;
		ppt.obj.marHiden=setInterval(function(){a();},ppt.obj.setTim);
		function a(){
			opac-=ppt.obj.speed;
			obj.style.filter="alpha(opacity="+opac*100+")";
			obj.style.MozOpacity=opac;
			obj.style.opacity=opac;
			if(opac<=0){
				obj.style.filter="alpha(opacity=0)";
				obj.style.MozOpacity=0;
				obj.style.opacity=0;
				clearInterval(ppt.obj.marHiden);
				obj.style.display="none";
				ppt.obj.hidenOk=true;
			}
		}
	},
	show:function(obj){
		ppt.obj.showOk=false;
		var opac=0;
		obj.style.filter="alpha(opacity="+opac+")";
		obj.style.MozOpacity=opac;
		obj.style.opacity=opac;
		obj.style.display="";
		ppt.obj.marShow=setInterval(function(){a();},ppt.obj.setTim);
		function a(){
			opac+=ppt.obj.speed;
			obj.style.filter="alpha(opacity="+opac*100+")";
			obj.style.MozOpacity=opac;
			obj.style.opacity=opac;
			if(opac>=1){
				obj.style.filter="alpha(opacity=100)";
				obj.style.MozOpacity=1;
				obj.style.opacity=1;
				clearInterval(ppt.obj.marShow);
				ppt.obj.showOk=true;
			}
		}
	},
	zd:function(){
		ppt.obj.pptIndex++;
		if(ppt.obj.pptIndex>=ppt.obj.pptCount) ppt.obj.pptIndex=0;
		if(document.all)   
        {
               //   IE里面触发
				ppt.obj.doBox.children[ppt.obj.pptIndex].click();            
        }        
        else 
        { 
              //   firefox 里面触发
               var event = document.createEvent("MouseEvents");  
               event.initEvent("click",true,true); 
               ppt.obj.doBox.children[ppt.obj.pptIndex].dispatchEvent(event); 
         }   
		
	}
		
};
	
ppt.init();
