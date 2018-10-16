var mymap = L.map('map')
        
        mymap.setView([1.323, 103.845], 12.5);
        L.tileLayer('https://api.mapbox.com/styles/v1/mengqi-liu/cjn1et3qn59zl2rseneapr6y6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVuZ3FpLWxpdSIsImEiOiJjamNha2Z3ZzgwZTVtMnFzM2Jzd3I1YWpxIn0.lnPIGqG0MMMaN2qMTY1NkQ', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(mymap);



 window.onload = function() {
 	requestData();
}

function requestData() {
    var fusionTablesAPIKey = "AIzaSyDolf6qsyW4vtM3spGTg9mToKtxHHJ31HM";
    var fusionTableID = '1GdRz_AH2UpNo6JaOJ4JjgyMNlasNXs3RqsYowZA2';
    var query = encodeURIComponent("SELECT * FROM " + fusionTableID + "");
    var url = 'https://www.googleapis.com/fusiontables/v2/query?sql=' + query + '&key=' + fusionTablesAPIKey +'&typed=false&callback=jsonp';
    var encodedURL = encodeURIComponent(url);
 console.log(url)

 $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonpCallback: 'jsonp',
    success: parseFusionTableResponse,
    error: errorResponse
    });
}

function parseFusionTableResponse(data) {

var CoffeeShop = L.layerGroup().addTo(mymap);
 for (	var i = 0; i < data.rows.length; i++) {
 		var entry = data.rows[i];
 		var html = generateHTMLForEntry(entry);
 			if (entry[3] != "") {
 				var coordinates = (data.rows[i][3]).split(',')
 				var myIcon = L.icon({
    				iconUrl: './coffee-icon.png',
    				iconSize: [33, 33],
    				iconAnchor: [22, 94],
    				popupAnchor: [-3, -76],
   				 	});
 var marker = L.marker(coordinates,{icon: myIcon}).bindPopup(html).addTo(CoffeeShop);
 };
}}


function errorResponse(error) {
    console.log(error);
}

function generateHTMLForEntry(entry) {
 var html = '<p><strong>' + entry[1]+ '<p><strong>Address: </strong>' + entry[2] + '<p>';
 return html;};


