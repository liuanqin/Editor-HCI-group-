function init()
{
document.getElementById('myTextArea').focus();
hideKeyboard();
setCaretPosition(document.getElementById('myTextArea'),totalChar);
//  hideKeyboard();
console.log(editorwidth);
console.log(editorheight);

var str = "";
for (var i=0; i<editorwidth-2;i++){
str = str.concat(" ");
}

for(var j = 0; j<editorheight-20;j++){
insertText(str);
insertText("\n");
};
setCaretPosition(document.getElementById('myTextArea'),0);

var s =
        "It was the best of times, it was the worst of times,                 \n"
         + "It was the age of wis dom, it was the age of foolishness,         \n"
         + "it was the epoch of belief, it was the epoch of incredulity,      \n"
         + "it was the season of Light, it was the of Darkness,               \n"
         + "it was the spring of hope, it was the winter of despair,          \n"
         + "we had everything before us, we had nothing before us             \n"
         + "we were all going direct to Heaven, we were all going             \n"
         + "direct indirect the other way-in short, the period was so far     \n"
         + "like the present period, that some of its noisiest authorities    \n"
         + "insisted on its beoing received, for good or for evil,            \n"
         + "in the superlative degree of coparison only.                      \n"
         +  "There were a king with a large jaw and a queen with              \n"
         +  "a plain face, on the throne of England; there were               \n"
         +  "a king with a large jaw and a queen with a fair face,            \n"
         +  "on the throne of France.  it was                                 \n"
         +  "clearer than crystal to the lords of the State preserves         \n"
         +  "of loaves and fishes, that things in general were settled        \n"
         +  "forever.                                                         \n"
         +  "By Charles Dickens                                               \n";

  insertText(s);}
  /*var s =    "It was the best of times, it was the worst of times,                     "
           + "It was the age of wis dom, it was the age of foolishness,                "
           + "it was the epoch of belief, it was the epoch of incredulity,             "
           + "it was the season of Light, it was the of Darkness,                      "
           + "it was the spring of hope, it was the winter of despair,                 "
           + "we had everything before us, we had nothing before us                    "
           + "we were all going direct to Heaven, we were all going                    "
           + "direct indirect the other way-in short, the period was so far            "
           + "like the present period, that some of its noisiest authorities           "
           + "insisted on its beoing received, for good or for evil,                   "
           + "in the superlative degree of coparison only.                             "
           + "There were a king with a large jaw and a queen with                      "
           + "a plain face, on the throne of England; there were                       "
           + "a king with a large jaw and a queen with a fair face,                    "
           + "on the throne of France.  it was                                         "
           + "clearer than crystal to the lords of the State preserves                 "
           + "of loaves and fishes, that things in general were settled                "
           + "forever.                                                                 "
           + "1234567890123456789012345678901234567890123456789012345678901234567890123"
           + "By Charles Dickens                                                       ";

    insertText(s);
    insertText("Theirs was a true love, thought Tony, one to stand the test of time. Eva, his soul-mate, was somehow even more beautiful than the day they first met, he realized. And even though she always seemed to say something interesting, it ultimately didn't matter, as he was happy just to hear her soft, melodic voice. Someday soon, he imagined, they would have children together, and their love would blossom as a family. These wonderful thoughts made him feel warm and tingly inside. Suddenly, without warning, Tony was yanked from his daydream by the doorbell. He let out a long sigh, realizing that that would be the courier with the divorce papers.");
  }*/
/*
  Keeps keyboard from poping us
*/
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

//highlight the range of text for deletion

function highlightRange(el, start, end) {
  var text = el.value;
  var selected = text.substring(start, end)

    console.log("selected text is  :"+ selected);
    //console.log("text is  " + text);
}

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

  // delete the text within next 'length' number of char
         function deleteText(length) {
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
           var back = (input.value).substring(pos+length, input.value.length);

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



         function insertNewlines(e)
       {
           // Get the number of cols defined (where we will insert breaks manually
           var rowMaxChars = textarea.attr('cols');

           // Calculate the row we were on as newlines + 1
           var rowNum = (textarea.val().match(/\n/g) != null) ? textarea.val().match(/\n/g).length + 1 : 1;

           // If the chars in textarea are greater than rowMaxChars * rowNum then insert newline
           if( textarea.val().length > rowMaxChars*rowNum && e.keyCode != 8 )
           {
               textarea.val( textarea.val() + "\n" );
           }
         }
