/*

caretposition.js

Copyright (c) 2012- Hiroki Akiyama http://akiroom.com/
caretposition.js is free software distributed under the terms of the MIT license.
*/


function setCaretPosition(elem, caretPos) {
		var range;
		//elem.preventDefault();


		if (elem.createTextRange) {
				range = elem.createTextRange();
				range.move('character', caretPos);
				range.select();
		} else {
				elem.focus();
				if (elem.selectionStart !== undefined) {
						elem.setSelectionRange(caretPos, caretPos);
				}
	}
	hideKeyboard();
};


// count number of characters before cursor. arrayOfLines[i].length" will return total characters in one line.
// parameter is current position of lines
		  var lastlineChar = 0;
			var textHeight = 0;
      var longline = 0;  //long lines before chosen point
      var longboolean = false;
			var arrayOfLines =null;
			var longEnd = false;
			var hasLong = false;


			function wrapFunction() {
				var textArea = document.getElementById("myTextArea");

						 var tempchar = 0;
						 arrayOfLines = textArea.value.split("\n");


						//console.log("text height" + textHeight);
						 for(var i = 0;i <= 30;i++){
							 console.log(arrayOfLines[i]);
						 if(arrayOfLines[i].trim().length>=editorwidth-2){
							 var templeng=arrayOfLines[i].length;

							 var counter=editorwidth-2;
							 while(arrayOfLines[i].charAt(counter)!=' '){
								 counter --;
							 }
							 textArea.value = textArea.value.substring(0,tempchar+templeng)+textArea.value.substring(tempchar+templeng+1);
							 //console.log("first:"+ textArea.value.substring(0,tempchar+counter)+'\n'+textArea.value.substring(tempchar+counter+1));
							 textArea.value=textArea.value.substring(0,tempchar+counter)+'\n'+textArea.value.substring(tempchar+counter);
							 //console.log("last:"+ textArea.value);



					 arrayOfLines = textArea.value.split("\n");



						 }
						 tempchar += arrayOfLines[i].length;
						 //console.log(i+"line :"+arrayOfLines[i].length);
						 tempchar++;
						 longboolean = false;

					 }

				 }

  /*
		This function will calculate the char position based on the x and y info.
	*/
			function calculate(chosenRow) {
				var textArea = document.getElementById("myTextArea");

						 var totalChar = 0;
						 //ApplyLineBreaks(textArea);
		         arrayOfLines = textArea.value.split("\n");


						 //arrayOfLines = textArea.value.match(/.{73}/g)
						 textHeight = arrayOfLines.length;

						 if (textHeight >= chosenRow){
		         for(var i = 0;i < chosenRow-1;i++){


             totalChar += arrayOfLines[i].length;
             totalChar++;
             longboolean = false;

           }

					 lastlineChar = arrayOfLines[chosenRow-1].length;

             longline = 0;

						 return totalChar;
		     }
			 	else{
					return -1;
				}}

Measurement = new function() {
	this.caretPos = function(textarea, mode) {
		var targetElement = textarea;
		if (typeof jQuery != 'undefined') {
			if (textarea instanceof jQuery) {
				targetElement = textarea.get(0);
			}
		}
		// HTML Sanitizer
		var escapeHTML = function (s) {
			var obj = document.createElement('pre');
			obj[typeof obj.textContent != 'undefined'?'textContent':'innerText'] = s;
			return obj.innerHTML;
  		};

		// Get caret character position.
		var getCaretPosition = function (element) {
			var CaretPos = 0;
			var startpos = -1;
			var endpos = -1;
			if (document.selection) {
				// IE Support(not yet)
				var docRange = document.selection.createRange();
				var textRange = document.body.createTextRange();
				textRange.moveToElementText(element);

				var range = textRange.duplicate();
				range.setEndPoint('EndToStart', docRange);
				startpos = range.text.length;

				var range = textRange.duplicate();
				range.setEndPoint('EndToEnd', docRange);
				endpos = range.text.length;
			} else if (element.selectionStart || element.selectionStart == '0') {
				// Firefox support
				startpos = element.selectionStart;
				endpos = element.selectionEnd;
			}
			return {start: startpos, end: endpos};
		};

		// Get element css style.
		var getStyle = function (element) {
			var style = element.currentStyle || document.defaultView.getComputedStyle(element, '');
			return style;
		};

		// Get element absolute position
		var getElementPosition = function (element) {
			// Get scroll amount.
			var html = document.documentElement;
			var body = document.body;
			var scrollLeft = (body.scrollLeft || html.scrollLeft);
			var scrollTop  = (body.scrollTop || html.scrollTop);

			// Adjust "IE 2px bugfix" and scroll amount.
			var rect = element.getBoundingClientRect();
			var left = rect.left - html.clientLeft + scrollLeft;
			var top = rect.top - html.clientTop + scrollTop;
			var right = rect.right - html.clientLeft + scrollLeft;
			var bottom = rect.bottom - html.clientTop + scrollTop;
			return {left: parseInt(left), top: parseInt(top),
					right: parseInt(right), bottom:parseInt(bottom)};
		};

		/***************************\
		* Main function start here! *
		\***************************/

		var undefined;
		var salt = "salt.akiroom.com";
		var textAreaPosition = getElementPosition(targetElement);
		var dummyName = targetElement.id + "_dummy";
		var dummyTextArea = document.getElementById(dummyName);
		if (!dummyTextArea) {
			// Generate dummy textarea.
			dummyTextArea = document.createElement("div");
			dummyTextArea.id = dummyName;
			var textAreaStyle = getStyle(targetElement)
			dummyTextArea.style.cssText = textAreaStyle.cssText;

			// Fix for browser differece.
			var isWordWrap = false;
			if (targetElement.wrap == "off") {
				// chrome, firefox wordwrap=off
				dummyTextArea.style.overflow = "auto";
				dummyTextArea.style.whiteSpace = "pre";
				isWordWrap = false;
			} else if (targetElement.wrap == undefined) {
				if (textAreaStyle.wordWrap == "break-word")
					// safari, wordwrap=on
					isWordWrap = true;
				else
					// safari, wordwrap=off
					isWordWrap = false;
			} else {
				// firefox wordwrap=on
				dummyTextArea.style.overflowY = "auto";
				isWordWrap = true;
			}
			dummyTextArea.style.visibility = 'hidden';
			dummyTextArea.style.position = 'absolute';
			dummyTextArea.style.top = '0px';
			dummyTextArea.style.left = '0px';

			// Firefox Support
			dummyTextArea.style.width = textAreaStyle.width;
			dummyTextArea.style.height = textAreaStyle.height;
			dummyTextArea.style.fontSize = textAreaStyle.fontSize;
			dummyTextArea.style.maxWidth = textAreaStyle.width;
			dummyTextArea.style.backgroundColor = textAreaStyle.backgroundColor;
			dummyTextArea.style.fontFamily = textAreaStyle.fontFamily;
			dummyTextArea.style.padding = textAreaStyle.padding;
			dummyTextArea.style.paddingTop = textAreaStyle.paddingTop;
			dummyTextArea.style.paddingRight = textAreaStyle.paddingRight;
			dummyTextArea.style.paddingBottom = textAreaStyle.paddingBottom;
			dummyTextArea.style.paddingLeft = textAreaStyle.paddingLeft;


			targetElement.parentNode.appendChild(dummyTextArea);
		}

		// Set scroll amount to dummy textarea.
		dummyTextArea.scrollLeft = targetElement.scrollLeft;
		dummyTextArea.scrollTop = targetElement.scrollTop;

		// Set code strings.
		var codeStr = targetElement.value;

		// Get caret character position.
		var selPos = getCaretPosition(targetElement);
		var leftText = codeStr.slice(0, selPos.start);
		var selText = codeStr.slice(selPos.start, selPos.end);
		var rightText = codeStr.slice(selPos.end, codeStr.length);
		if (selText == '') selText = "a";

		// Set keyed text.
		var processText = function (text) {
			// Get array of [Character reference] or [Character] or [NewLine].
			var m = escapeHTML(text).match(/((&amp;|&lt;|&gt;|&#34;|&#39;)|.|\n)/g);
			if (m)
				return m.join('<wbr>').replace(/\n/g, '<br>');
			else
				return '';
		};

		// Set calculation text for in dummy text area.
		dummyTextArea.innerHTML = (processText(leftText) +
								  '<wbr><span id="' + dummyName + '_i">' + processText(selText) + '</span><wbr>' +
								  processText(rightText));

		// Get caret absolutely pixel position.
		var dummyTextAreaPos = getElementPosition(dummyTextArea);
		var caretPos = getElementPosition(document.getElementById(dummyName+"_i"));
		switch (mode) {
			case 'self':
				// Return absolutely pixel position - (0,0) is most top-left of TEXTAREA.
				return {left: caretPos.left-dummyTextAreaPos.left, top: caretPos.top-dummyTextAreaPos.top};
			case 'body':
			case 'screen':
			case 'stage':
			case 'page':
			default:
				// Return absolutely pixel position - (0,0) is most top-left of PAGE.
				return {left: textAreaPosition.left+caretPos.left-dummyTextAreaPos.left, top: textAreaPosition.top+caretPos.top-dummyTextAreaPos.top};
		}
	};
};
