
function query() {
    // Important!!!
    document.querySelector("#form-fabcar-query").addEventListener("submit", function (e) {
        e.preventDefault();    //stop form from submitting
    }, false);

    // car number
    var key = document.getElementById("input-fabcar-key").value.trim();
    clearFabcarTable();

    if (key == "") {
        queryAllCars();
    } else {
        queryCar(key);
    }
}

function queryCar(key) {
    var req = new XMLHttpRequest();
    var action = "/queryCar";
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
        // {"colour":"blue","docType":"car","make":"Toyota","model":"Prius","owner":"Tomoko"}
        // 處理方式：
        // (1) JSON格式轉換成JavaScript物件obj
        // (2) 操作物件：obj.colour, obj.make, obj.model, obj.owner

        var obj = JSON.parse(result);  // JSON格式轉換成JavaScript物件obj

        // var tbody = document.getElementById("fabcar-tbody");
        var tbody = document.querySelector("#fabcar-table > tbody");

        var html = '<tr>' +
            '<td>' + key + '</td>' +
            '<td>' + obj.colour + '</td>' +
            '<td>' + obj.make + '</td>' +
            '<td>' + obj.model + '</td>' +
            '<td>' + obj.owner + '</td>' +
            '</tr>';

        tbody.innerHTML = html;
    }

    //Send the proper header information along with the request
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var data = "key=" + key;
    req.send(data);
}

function queryAllCars() {
    var req = new XMLHttpRequest();
    var action = "/queryAllCars";
    var method = "GET";
    var url = window.location.protocol + "//" + window.location.host + action;

    req.open(method, url);

    req.onload = function () {
        var result = this.responseText;
        if (result.toLowerCase() == 'fail' || result.trim() == '') {
            alert('查詢失敗！');
            return
        }

        // 回傳結果範例：
        // [{"Key":"CAR0", "Record":{"colour":"blue","make":"Toyota","model":"Prius","owner":"Tomoko"}},{"Key":"CAR1", "Record":{"colour":"red","make":"Ford","model":"Mustang","owner":"Brad"}},{"Key":"CAR2", "Record":{"colour":"green","make":"Hyundai","model":"Tucson","owner":"Jin Soo"}},{"Key":"CAR3", "Record":{"colour":"yellow","make":"Volkswagen","model":"Passat","owner":"Max"}},{"Key":"CAR4", "Record":{"colour":"black","make":"Tesla","model":"S","owner":"Adriana"}},{"Key":"CAR5", "Record":{"colour":"purple","make":"Peugeot","model":"205","owner":"Michel"}},{"Key":"CAR6", "Record":{"colour":"white","make":"Chery","model":"S22L","owner":"Aarav"}},{"Key":"CAR7", "Record":{"colour":"violet","make":"Fiat","model":"Punto","owner":"Pari"}},{"Key":"CAR8", "Record":{"colour":"indigo","make":"Tata","model":"Nano","owner":"Valeria"}},{"Key":"CAR9", "Record":{"colour":"brown","make":"Holden","model":"Barina","owner":"Shotaro"}}]
        // 處理方式：
        // (1) JSON格式轉換成JavaScript物件obj
        // (2) 操作物件：obj[i].key, obj[i].Record.colour, obj[i].Record.make, obj[i].Record.model, obj[i].Record.owner

        var obj = JSON.parse(result);  // JSON格式轉換成JavaScript物件obj

        // var tbody = document.getElementById("fabcar-tbody");
        var tbody = document.querySelector("#fabcar-table > tbody");

        var html = "";
        for (var i = 0; i < obj.length; i++) {
            html += '<tr>' +
                '<td>' + obj[i].Key + '</td>' +
                '<td>' + obj[i].Record.colour + '</td>' +
                '<td>' + obj[i].Record.make + '</td>' +
                '<td>' + obj[i].Record.model + '</td>' +
                '<td>' + obj[i].Record.owner + '</td>' +
                '</tr>';
        }
        tbody.innerHTML = html;
    };

    req.send();
}

function clearFabcarTable() {
    // var tbody = document.getElementById("fabcar-tbody");
    var tbody = document.querySelector("#fabcar-table > tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}