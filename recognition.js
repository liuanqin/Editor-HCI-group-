      function doRecognition() {

            if (inkManager.isEmpty()) {
                result.innerHTML = '';
            } else {

                var inputUnit = new MyScript.TextInputUnit();
                inputUnit.setComponents(inkManager.getStrokes());
                textRenderer.clear(context);
                inkManager.clear();
                var units = [inputUnit];

                textRecognizer.doSimpleRecognition(applicationKey, instanceId, units, hmacKey).then(
                        function (data) {
                            if (!instanceId) {
                                instanceId = data.getInstanceId();
                            } else if (instanceId !== data.getInstanceId()) {
                                return;
                            }
                            result.innerHTML = data.getTextDocument().getTextSegmentResult().getSelectedCandidate().getLabel()+" ";



                            //insertAtCursor(myTextArea, result.innerHTML);
                            insertText(result.innerHTML);
                            //console.log("insertion is " + insertion);
                            //console.log(result.innerHTML);
                            //console.log(myTextArea.value);

                            instanceId = undefined;

                            result.innerHTML = '';
                            if (insertion == true){
                               insertion = false;
                               deleteText();
                            }

                            //insertAtCaret('editor',result.innerHTML);
                            hideKeyboard();


                        }
                );
            }
        }


function onClickCheck() {
    var timeNow = (new Date()).getTime();
    if (timeNow > (timer + 800)) {

      doRecognition();
    }};
