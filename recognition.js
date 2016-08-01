      function doRecognition() {

            if (inkManager.isEmpty()) {
                result.innerHTML = '';
            } else {

                var inputUnit = new MyScript.TextInputUnit();
                inputUnit.setComponents(inkManager.getStrokes());
                textRenderer.clear(context);
                inkManager.clear();
                var units = [inputUnit];
                var counter = 0;

                textRecognizer.doSimpleRecognition(applicationKey, instanceId, units, hmacKey).then(
                        function (data) {
                            if (!instanceId) {
                                instanceId = data.getInstanceId();
                            } else if (instanceId !== data.getInstanceId()) {
                                return;
                            }
                            result.innerHTML = data.getTextDocument().getTextSegmentResult().getSelectedCandidate().getLabel();
                            var resultLength = result.innerHTML.length;
                            for (var i =0; i<resultLength;i++){
                              if (arrayOfLines[Math.round(tempY/29)-1][Math.round(tempX/13)+i] != " "){
                                break;
                              }
                              deleteText(1);
                              counter++;
                            }
                            firstTouch = true;
                            insertText(result.innerHTML);
                            console.log(result.innerHTML);

                            instanceId = undefined;

                            result.innerHTML = '';
                            if (insertion == true){
                               insertion = false;
                               deleteText(15-counter);
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
