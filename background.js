function init()
{
document.getElementById('myTextArea').focus();
hideKeyboard();

};

var hideKeyboard = function() {
 document.activeElement.blur();
 var inputs = document.querySelectorAll('input');
 for(var i=0; i < inputs.length; i++) {
  inputs[i].blur();
 }
};

function moveCaretToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}


//$('#myTextArea').on('focus', 'input', function() { $(this).blur(); });



function reset(id)
{
    document.getElementById(id).style.zIndex = '0';
}

function up(id)
{
    document.getElementById(id).style.zIndex = '1';
}




         //http://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery
         function insertText(text) {
           var input = lastFocused;
           //console.log(input);
           if (input == undefined) { return; }
           var scrollPos = input.scrollTop;
           var pos = 0;
           var browser = ((input.selectionStart || input.selectionStart == "0") ?
             "ff" : (document.selection ? "ie" : false ) );
           if (browser == "ie") {
             input.focus();
             var range = document.selection.createRange();
             range.moveStart ("character", -input.value.length);
             pos = range.text.length;
           }
           else if (browser == "ff") { pos = input.selectionStart };

           var front = (input.value).substring(0, pos);
           var back = (input.value).substring(pos, input.value.length);
           input.value = front+text+back;
           pos = pos + text.length;
           if (browser == "ie") {
             input.focus();
             var range = document.selection.createRange();
             range.moveStart ("character", -input.value.length);
             range.moveStart ("character", pos);
             range.moveEnd ("character", 0);
             range.select();
           }
           else if (browser == "ff") {
             input.selectionStart = pos;
             input.selectionEnd = pos;
             input.focus();
           }
           input.scrollTop = scrollPos;
         }
         function deleteText() {
           var input = lastFocused;
           //console.log(input);
           if (input == undefined) { return; }
           var scrollPos = input.scrollTop;
           var pos = 0;
           var browser = ((input.selectionStart || input.selectionStart == "0") ?
             "ff" : (document.selection ? "ie" : false ) );
           if (browser == "ie") {
             input.focus();
             var range = document.selection.createRange();
             range.moveStart ("character", -input.value.length);
             pos = 10;
           }
           else if (browser == "ff") { pos = input.selectionStart };
           //console.log(pos);
           //console.log(input.value);

           var front = (input.value).substring(0, pos);
            //pos=pos+10;
           var back = (input.value).substring(pos+15, input.value.length);
           //console.log(pos);
          // console.log(front);
           //.log(back);
           input.value = front+back;
           //console.log(input.value);
           //pos = 10;
           if (browser == "ie") {
             input.focus();
             var range = document.selection.createRange();
             range.moveStart ("character", -input.value.length);
             range.moveStart ("character", pos);
             range.moveEnd ("character", 0);
             range.select();
           }
           else if (browser == "ff") {
             input.selectionStart = pos;
             input.selectionEnd = pos;
             input.focus();
           }
           input.scrollTop = scrollPos;
         }
