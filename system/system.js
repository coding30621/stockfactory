var stock_1 = document.getElementById("stock_1");

var baseinfo = [];
for(let num = 0;num<50;num++) {
    baseinfo.push(0);
}

let st_name = ["동원증권", "쿠팡", "한국조선해양", "아진자동차", "순양전자", "삼성전자", "SK텔레콤", "LG화학", "현대자동차", "롯데제과", "포스코케미칼", "한화에어로스페이스", "GS", "현대중공업", "농협은행", "신세계", "KT", "CJ ENM", "한진", "카카오", "두산", "LS", "DL", "부영", "중흥건설", "미래에셋증권", "네이버", "HMM", "하림", "농심", "아마존닷컴", "인텔", "AMD", "알파벳", "NVIDIA", "IBM", "페이스북", "트위터", "애플", "이베이", "마이크로소프트", "오라클", "테슬라", "오픈AI", "아람코", "토요타", "월마트", "폭스바겐", "알리바바", "월트 디즈니"]

var pricechange = 50000;

var koreanInfo = {
    name : 'Korean',
    firstprice: 0,
    price: 100000,
    holding: 1,
    profit: {
        percent : 0,
        price : 0
    },
    bankruptcy : false,
    priceinfo : [...baseinfo]
};

let ElementArray = [stock_1];
let InfoArray = [koreanInfo];

let interval = setInterval(function() {
    for(let num = 0;num<InfoArray.length;num++) {
        var Info = InfoArray[num];
        if(!Info.bankruptcy) {
            var random = Math.round(Math.random()*pricechange*2-pricechange);
            Info.price += random;
            if(Info.price <= 0) {
                Info.holding = 0;
                Info.profit.percent = 0;
                Info.profit.price = 0;
                Info.price = 0;
                Info.bankruptcy = true;
                DeList(Info);
                Info.priceinfo = [...baseinfo];
            } else {
                addStockInfo(Info.priceinfo,Info.price);
                if(holding > 0) {
                    Info.profit.percent = Info.price/Info.firstprice;
                    Info.profit.price = (Info.price-Info.firstprice)*Info.holding;
                }
            }
        }
        ShowDiv();
        google.charts.setOnLoadCallback(Chart);
    }
},1000);

function addStockInfo(array,price) {
    array.shift();
    array.push(price);
}

function DeList(info) {
    setTimeout(function() {
        info.price = 100000;
        info.bankruptcy = false;
    },5000);
}

function ShowDiv() {
    for(let num = 0;num<ElementArray.length;num++){
        var Element = ElementArray[num];
        var Info = InfoArray[num];
        for(let i = 0; i<= 3;i++) {
            var child = Element.childNodes[1].childNodes[1].childNodes[1].childNodes[2*i+1].childNodes[1];
            if(child.id == "price") {
                    var price = child;
            } else if(child.id == "holding") {
                    var holding = child;
            } else if(child.id == "profit") {
                    var profit = child;
            }
        }

        if(Info.bankruptcy) {
            price.innerText = "현재가: 성장폐지 ";
            holding.innerText = "보유: "+numscale(Info.holding)+"주";
            profit.innerText = "이율: "+priceToString(setpoint(Info.profit.percent))+"% ("+numscale(setpoint(Info.profit.price))+"원)"

        } else {
            price.innerText = "현재가: "+numscale(setpoint(Info.price))+"원";
            holding.innerText = "보유: "+numscale(Info.holding)+"주";
            profit.innerText = "이율: "+priceToString(setpoint(Info.profit.percent))+"% ("+priceToString(setpoint(Info.profit.price))+"원)"
        }

    }
}

function setpoint(number) {
    return Math.round(number*10)/10;
}

function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(Chart);

function Chart() {
    for(let num = 0;num<InfoArray.length;num++) {
        drawChart(InfoArray[num]);
    }
}

function drawChart(Info) {
    var dataArray = [['Time',Info.name]];
    for(let num = 0; num<Info.priceinfo.length;num++) {
       dataArray.push(
           [num+1,Info.priceinfo[num]]
        );
    }
    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: Info.name,
        colors: ['#e0440e'],
        vAxis: {
            minValue: Math.min.apply(null, dataArray),
            maxValue: Math.max.apply(null, dataArray)
        },
        backgroundColor: {
            fill: '#222'
        },
    };

    var chart = new google.visualization.AreaChart(document.getElementById(Info.name+'_chart'));
    chart.draw(data, options);
}

function numscale(number){
    var inputNumber  = number < 0 ? false : number
    var unitWords    = ['원', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극']
    var splitUnit    = 10000
    var splitCount   = unitWords.length
    var resultArray  = []
    var resultString = ''

    for (var i = 0; i < splitCount; i++){
        var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
        unitResult = Math.floor(unitResult)
        if (unitResult > 0){
            resultArray[i] = unitResult
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue
        resultString = String(resultArray[i]) + unitWords[i] + resultString
    }

    return resultString
}

function random_RGB(){
    var r = Math.round(Math.random() * 255); 
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")"
}

function create_new() {
    var obj = new Object()
}