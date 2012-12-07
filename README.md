##Titanium Number Pad
A tiny little module that mimics a calculator input.


![Numberpad 1](https://github.com/aarondfrancis/titanium-numberpad/blob/master/Resources/documentation-images/numberpad1.png?raw=true)

![Numberpad 2](https://github.com/aarondfrancis/titanium-numberpad/blob/master/Resources/documentation-images/numberpad2.png?raw=true)

###Import the module

    var NumberPad = require('views/numpad');

 
###Create a numberpad

    ...	
	var numberpad = NumberPad.createNumberPad({
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
    ...
    
####Parameters
-----

`draggable (bool)` - adds a drag handle.

`closebutton (bool` - adds an "x" close button

`imagedir (string)` - the directory that your images are in

`spacing (int)` - spacing for your keys

`buttonWidth (int)` - button width

`buttonHeight (int)` - button height

`rows (array)` - an array of arrays. each array is a row full of keys.

Keys can be strings (ex: `"0"` or `"("`) or objects

    {
        text: '/',
        image: 'divide.png',
        colspan: 2
    }

Available properties are: `text`, `image`, `colspan`, `rowspan`

###Listeners
`close` and `keypress`


	numberpad.addEventListener('close',function(){
		Ti.API.info('Numberpad closed');
	})
	
	numberpad.addEventListener('keypress',function(e){
		Ti.API.info(e.key);
	});