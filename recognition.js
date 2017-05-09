function doRecognition() {

            if (!inkManager.isEmpty()) {


                var inputUnit = new MyScript.TextInputUnit();
                inputUnit.setComponents(inkManager.getStrokes());
                textRenderer.clear(context);
                inkManager.clear();
                var units = [inputUnit];
                var counter = 0;
                firstTouch= true;
                textRecognizer.doSimpleRecognition(applicationKey, instanceId, units, hmacKey).then(
                        function (data) {
                            if (!instanceId) {
                                instanceId = data.getInstanceId();
                            } else if (instanceId !== data.getInstanceId()) {
                                return;
                            }
                            result.innerHTML = data.getTextDocument().getTextSegmentResult().getSelectedCandidate().getLabel();
                            var resultLength = result.innerHTML.length;

                            firstTouch = true;
                            console.log(result.innerHTML+"END");
                            // insertion case
                          if (insertion){
                              insertText(result.innerHTML);
                              instanceId = undefined;
                              while (insertCounter>0){
                                deleteText(15);
                                insertCounter--;
                              }
                              //console.log("insertion result length is:" + resultLength);
                              result.innerHTML = '';
                              //console.log("deleted 15 chars" + resultLength);
                              insertion = false;
                              wrapFunction();

                            }
                            // insertion situation
                          else if ((result.innerHTML == "^")){
                               //setCaretPosition(document.getElementById('myTextArea'),totalChar);
                               insertion = true;
                               console.log("insert");
                               setCaretPosition(document.getElementById('myTextArea'), totalCharInsDown);
                               insertText("                "); // 15 spaces
                               insertCounter++;
                               totalChar = totalCharInsDown;
                               hideKeyboard();
                               result.innerHTML = '';
                            }

                          else if ((result.innerHTML ==  "v") || (escape(result.innerHTML) ==  "%u2714")|| (escape(result.innerHTML) ==  "%u2713") || (result.innerHTML ==  "V")){
                               //setCaretPosition(document.getElementById('myTextArea'),totalChar);
                               insertion = true;
                               console.log("insert");
                               setCaretPosition(document.getElementById('myTextArea'),totalCharIns);

                               insertText("                "); // 15 spaces
                               insertCounter++;
                               totalChar = totalCharIns;
                               //console.log("after insertion, char is:" + totalChar);

                               hideKeyboard();
                               result.innerHTML = '';
                               //console.log("insertion" + totalChar);
                            }


                            //delete situation
                          else  if ((result.innerHTML == "_") ||(result.innerHTML ==  "-") || (result.innerHTML ==  ".")||(result.innerHTML ==  "\\")||(result.innerHTML ==  "/")){
                              var selected = null;
                              var dashlength=Math.round((finalX-startX)/13);//length of dash
                              selected = lastFocused.value.substring(totalCharDel,(totalCharDel+dashlength));
                              //console.log("chatlength is:" + dashlength);
                              //console.log("select del totalchat :"+totalCharDel);


                              console.log("selected text is  :"+ selected+"END");
                              setCaretPosition(document.getElementById('myTextArea'),totalCharDel);
                              deleteText(dashlength);

                              hideKeyboard();

                              //highlightRange(lastFocused, totalChar, totalChar+dashlength);
                              result.innerHTML = '';
                              //console.log("totallength :" + lastFocused.value.length);

                            }

                            insertText(result.innerHTML);
                            if(result.innerHTML!=''){
                            wrapFunction();
                          }


                            instanceId = undefined;

                            result.innerHTML = '';
                        }
                );
            }
        }

// After pen is down,  if nothing happens in one second, then do recognition. If
//user keeps writing, then do not do recognition. 
function onClickCheck() {
    var timeNow = (new Date()).getTime();
    if (timeNow > (timer + 1000)) {

      doRecognition();

    }};
