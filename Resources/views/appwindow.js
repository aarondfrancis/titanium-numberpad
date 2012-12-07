var AppWindow = function(){
	var instance = Ti.UI.createWindow({
		backgroundColor: '#eeeeee',
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});
	
	var button1 = Ti.UI.createButton({
		width: 150,
		height: 30,
		top: 200,
		title: 'Open Numberpad 1'
	});
	button1.addEventListener('click',function(){
		numberpad1.open();
	})
	instance.add(button1);
	
	var button2 = Ti.UI.createButton({
		width: 150,
		height: 30,
		top: 250,
		title: 'Open Numberpad 2'
	});
	button2.addEventListener('click',function(){
		numberpad2.open();
	})
	instance.add(button2);
	
	var NumberPad = require('views/numpad');
	
	var numberpad1 = NumberPad.createNumberPad({
		draggable: true,
		closebutton: true,
		imagedir: 'images/',
		spacing: 4,
		buttonWidth: 75,
		buttonHeight: 75,
		rows: [
			['7','8','9'],
			['4','5','6'],
			['1','2','3'],
			['0','.',{text:'delete', image:'delete.png'}]
		]
	});
	numberpad1.addEventListener('close',function(){
		Ti.API.info('Numberpad closed');
	})
	
	numberpad1.addEventListener('keypress',function(e){
		Ti.API.info(e.key);
	});
	
	
	var numberpad2 = NumberPad.createNumberPad({
		draggable: false,
		closebutton: true,
		imagedir: 'images/',
		spacing: 4,
		buttonWidth: 60,
		buttonHeight: 60,
		rows: [
			['(',')',{text:'delete', image:'delete.png',colspan:2}],
			['7','8','9','+'],
			['4','5','6','-'],
			['1','2','3',{text:'/', image:'divide.png'}],
			[{text: '0', colspan: 2},'.',{text:'*', image:'multiply.png'}],
		]
	});
	numberpad2.addEventListener('close',function(){
		Ti.API.info('Numberpad closed');
	})
	
	numberpad2.addEventListener('keypress',function(e){
		Ti.API.info(e.key);
	});
	
	
	
	return instance;
}


exports = AppWindow;