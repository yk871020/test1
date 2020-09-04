
function getHistoryForCar() {
    // Important!!!
    document.querySelector("#form-fabcar-history").addEventListener("submit", function (e) {
        e.preventDefault();    //stop form from submitting
    }, false);
	
    // car number
    var key = document.getElementById("input-fabcar-key").value.trim();
    clearFabcarTable();
	
    var req = new XMLHttpRequest();
    var action = "/getHistoryForCar";
    var method = "POST";
    var url = window.location.protocol + "//" + window.location.host + action;
	
    req.open(method, url, true);
	
    req.onload = function () {
        var result = this.responseText;
        if (result.toLowerCase() == 'fail' || result.trim() == '') {
            alert('查詢失敗！');
            return
        }
		
        // 回傳結果範例：
        // 
		// [
		// {"TxId":"ff0555e1ee3492a40980145072d8d81e159ea25ef979ca4756646aaec64871a5", 
		// "Value":{"make":"Toyota",
		//		 "model":"Prius",
		//		 "colour":"blue",
		//		 "owner":"Tomoko"}, 
		// "Timestamp":"2020-01-01 18:35:47.941382504 +0000 UTC", 
		// "IsDelete":"false"}
		// ...
		// ]
		//
        // 處理方式：
        // (1) JSON格式轉換成JavaScript物件obj
        // (2) 操作物件：obj.TxId, obj.Record.make, obj.Record.model, obj.Record.colour, obj.Record.owner, obj.Timestamp, obj.IsDelete

        var obj = JSON.parse(result);  // JSON格式轉換成JavaScript物件obj

        // var tbody = document.getElementById("fabcar-tbody");
        var tbody = document.querySelector("#fabcar-table > tbody");
		
		var html = "";
        for (var i = 0; i < obj.length; i++) {
			html += '<tr>' +
            '<td>' + key + '</td>' +
			'<td>' + obj[i].TxId + '</td>' +
            '<td>' + obj[i].Value.colour + '</td>' +
            '<td>' + obj[i].Value.make + '</td>' +
            '<td>' + obj[i].Value.model + '</td>' +
            '<td>' + obj[i].Value.owner + '</td>' +
			'<td>' + obj[i].Timestamp + '</td>' +
			'<td>' + obj[i].IsDelete + '</td>' +
            '</tr>';
		}
        tbody.innerHTML = html;
    }

    //Send the proper header information along with the request
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var data = "key=" + key;
    req.send(data);
}


function clearFabcarTable() {
    // var tbody = document.getElementById("fabcar-tbody");
    var tbody = document.querySelector("#fabcar-table > tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}