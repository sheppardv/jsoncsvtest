var textArea = document.getElementById('content');
var saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', saveAsFile);

document.getElementById('sampleFill').addEventListener('click', function () {
    textArea.value = JSON.stringify(sampledata);
    var event = new Event('input');
    textArea.dispatchEvent(event);
});

textArea.addEventListener("input", function(){
    var text = textArea.value;
    try{
        var jsonData = JSON.parse(text);
        setValidity(true);
        var results = jsonData.results[0];
        var data = results.data;
        var firstRow = data[0];

        var header = ['created_at', 'session_id', 'minute', 'value'];

        outputstr = header.join(',') + '\n';
        var tmp = [results.createdAt, results.session_id, firstRow.minute, firstRow.value];
        outputstr += tmp.join(',') + '\n';

        for(var i = 1, len = data.length; i < len; i++){
            outputstr += ['', '', data[i].minute, data[i].value].join(',') + '\n';
        }

        document.getElementById('pre').innerHTML = outputstr;

    } catch(e){
        setValidity(false);
        throw e;
    }
});

function saveAsFile(){
    var blob = new Blob([outputstr], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "test.csv");
}

function setValidity(isValid){
    document.getElementById('save').style.display = isValid ? '' : 'none';
    document.getElementById('pre').innerHTML = isValid ? '' : 'Not valid json!';
}