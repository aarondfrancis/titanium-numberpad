var exports = {
	createNumberPad: function(config){
		return new NumberPad(config);
	}
}

var gradView = function(colors){
	return Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		borderRadius: 6,
		top: 1,
		left: 1,
		right: 1,
		bottom: 1,
		backgroundGradient:{
			startPoint: { x: 0, y: '0%' },
      endPoint: { x: 0, y: '100%' },
			colors: colors
		}
	})
};

var NumberPad = function(config){
	var that = this;
	var instance = that.element = Ti.UI.createWindow({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
		
	});
	that.eventListeners = {
		'keypress':[],
		'close':[]
	};
	
	var outerBorder = gradView(['#333333','#27282c']);
	var innerBorder = gradView(['#bdbdbd','#5b5a6c']);
	var background = gradView(['#9d9ca7','#43444b']);
	background.layout = 'vertical';


	var rows = config.rows || [];
	var spacing = config.spacing || 2;
	var imagedir = config.imagedir || '';
	var buttonHeight = config.buttonHeight || 60;
	var buttonWidth = config.buttonWidth || 60;
	
	var buttons = Ti.UI.createView({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 0,
		bottom: spacing
	});
	for(var i=0;i<rows.length;i++){
		for(var n=0;n<rows[i].length;n++){
			var keyConf = rows[i][n];
			if(typeof keyConf !== 'object') keyConf = {text: keyConf};
			if(!keyConf.text) keyConf.text = "a";
			
			if(keyConf.colspan > 1){
				rows[i].splice(n+1,0, {
					empty: true,
					colspan: keyConf.colspan-1
				});
			} 
			
			if(keyConf.empty) continue;
			
			keyConf.width = keyConf.colspan ? (keyConf.colspan * buttonWidth) + ((keyConf.colspan-1) * spacing) : buttonWidth;
			keyConf.height = keyConf.rowspan ? (keyConf.rowspan * buttonHeight) + ((keyConf.rowspan-1) * spacing) : buttonHeight;
			
			keyConf.imagedir = config.imagedir;
			
			var key = new Key(keyConf, that);
			key.top = spacing + (buttonHeight*i) + ((spacing-1)*i);
			key.left = 	spacing + (buttonWidth*n) + ((spacing-1)*n);
			
			buttons.add(key);
			
			
		}
	}
	background.add(buttons);
	
	if(config.draggable || config.minimizeable || config.closebutton){
		var well = Ti.UI.createView({
			width: background.toImage().width - spacing,
			height: Ti.UI.SIZE,
			bottom: spacing,
			left: spacing
		});
		if(config.closebutton){
			var closebtn = Ti.UI.createButton({
				width: 20,
				height: 20,
				backgroundImage:imagedir + '/close.png',
				left: 0
			});
			closebtn.addEventListener('click',function(){
				that.close();
			})
			well.add(closebtn);
		}
		
		if(config.minimizeable && false){
			var minbtn = Ti.UI.createButton({
				width: 27,
				height: 21,
				backgroundImage: imagedir + '/minimize.png',
				left: config.closebutton ? spacing + 60 : spacing
			});
			minbtn.addEventListener('click',function(){
			})
			well.add(minbtn);
		}
		
		if(config.draggable){
			var dragbtn = Ti.UI.createView({
				width: 16,
				height: 14,
				backgroundImage: imagedir + '/move.png',
				right: 0
			});
			var curX, curY;
			var olt = Titanium.UI.create3DMatrix();
			dragbtn.addEventListener('touchstart',function(e){
				curX = e.x;
				curY = e.y;
			})
			dragbtn.addEventListener('touchmove',function(e){
			  var deltaX = e.x - curX,
			      deltaY = e.y - curY;
			  olt = olt.translate(deltaX,deltaY,0);
			  instance.animate({
					transform: olt, 
					duration: 1
				});				
			})
			well.add(dragbtn);
		}
		
		background.add(well);
	}
	
	instance.add(outerBorder);
	outerBorder.add(innerBorder);
	innerBorder.add(background);
	
}

NumberPad.prototype.addEventListener = function(name, _fn){
	if(!this.eventListeners[name]) return false;
	this.eventListeners[name].push(_fn);
}

NumberPad.prototype.removeEventListener = function(name, _fn){
	if(!this.eventListeners[name]) return false;
	for(var i = 0; i<this.eventListeners[name].length;i++){
		if(_fn === this.eventListeners[name][i]) delete this.eventListeners[name][i];
		break;
	}
}

NumberPad.prototype.removeAllListeners = function(name){
	for(var i = 0; i<this.eventListeners[name].length;i++){
		delete this.eventListeners[name][i];
	}
}

NumberPad.prototype.fireEvent = function(name, e){
	if(!this.eventListeners[name]) return false;
	for(var i = 0; i<this.eventListeners[name].length;i++){
		this.eventListeners[name][i](e);
	}
}

NumberPad.prototype.open = function(){
	this.element.open();
	this.element.show();
}

NumberPad.prototype.close = function(){
	this.fireEvent('close');
	this.element.close();
}

var Key = function(config, numberpad){
	var b2 = gradView(['#939398','#363639']);
	b2.backgroundGradient.startPoint = {x:0,y:0};
	b2.backgroundGradient.endPoint = {x:'100%',y:'100%'};
	b2.width = config.width;
	b2.height = config.height;
	
	var b3 = gradView([{
			color:'#FAFAFB',
			offset: 0.0
		},{
			color:'#B8B8B8',
			offset: 0.8
		},{
			color: '#B0B0B0',
			offset: 1.0
	}]);
	b3.right = 2;
	b3.bottom = 2;
	
	var b4 = gradView(['#d6d6d8','#B0B0B5']);
	b2.add(b3);
	b3.add(b4);
	b4.height = config.height - 5;
	b4.width = config.width - 5;

	if(config.text && !config.image){ 
		var lbl = Ti.UI.createLabel({
			text: config.text,
			font: {
				fontFamily: 'Helvetica Neue',
				fontSize: 23
			},
			shadowColor: '#ffffff',
			shadowOffset: {x:0,y:1},
			color: '#222222'
		});
		b4.add(lbl);
	}
	
	if(config.image){
		var img = Ti.UI.createImageView({
			image: config.imagedir + config.image
		});
		b4.add(img);
	}
	
	var highlight = Ti.UI.createView({
		top: 0,
		left: 0,
		width: config.width,
		height: config.height,
		borderRadius: 6,
		backgroundColor: '#007eff',
		opacity: .8,
		zIndex: 10,
		touchEnabled: false
	});
	highlight.hide();
	b2.add(highlight);
	
	b4.addEventListener('touchstart',function(){
		highlight.show();
		numberpad.fireEvent('keypress',{
			key: config.text  
		})
	})
	b4.addEventListener('touchend',function(){
		highlight.hide();
	})
	
		
	return b2;
}


