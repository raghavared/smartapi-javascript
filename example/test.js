let { SmartAPI, WebSocketClient, WebSocketV2 } = require('../lib');

let smart_api = new SmartAPI({
	api_key: 'xRss03Vd',
	// OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
	// access_token: "YOUR_ACCESS_TOKEN",
	// refresh_token: "YOUR_REFRESH_TOKEN"
});

// // If user does not have valid access token and refresh token then use generateSession method

// }
// smart_api
// 	.generateSession('A1381358', '1258', '143911')
// 	.then((data) => {
// 		console.log(data);
// 		return smart_api.getProfile();

// 		// 	// User Methods
// 		// 	// return smart_api.logout()

// 		// 	// return smart_api.getRMS();

// 		// 	// Order Methods
// 		// 	// return smart_api.placeOrder({
// 		// 	//     "variety": "NORMAL",
// 		// 	//     "tradingsymbol": "SBIN-EQ",
// 		// 	//     "symboltoken": "3045",
// 		// 	//     "transactiontype": "BUY",
// 		// 	//     "exchange": "NSE",
// 		// 	//     "ordertype": "LIMIT",
// 		// 	//     "producttype": "INTRADAY",
// 		// 	//     "duration": "DAY",
// 		// 	//     "price": "19500",
// 		// 	//     "squareoff": "0",
// 		// 	//     "stoploss": "0",
// 		// 	//     "quantity": "1"
// 		// 	// })

// 		// 	// return smart_api.modifyOrder({
// 		// 	//     "orderid": "201130000006424",
// 		// 	//     "variety": "NORMAL",
// 		// 	//     "tradingsymbol": "SBIN-EQ",
// 		// 	//     "symboltoken": "3045",
// 		// 	//     "transactiontype": "BUY",
// 		// 	//     "exchange": "NSE",
// 		// 	//     "ordertype": "LIMIT",
// 		// 	//     "producttype": "INTRADAY",
// 		// 	//     "duration": "DAY",
// 		// 	//     "price": "19500",
// 		// 	//     "squareoff": "0",
// 		// 	//     "stoploss": "0",
// 		// 	//     "quantity": "1"
// 		// 	// });

// 		// 	// return smart_api.cancelOrder({
// 		// 	//     "variety": "NORMAL",
// 		// 	//     "orderid": "201130000006424"
// 		// 	// });

// 		// 	// return smart_api.getOrderBook();

// 		// 	// return smart_api.getTradeBook();

// 		// 	// Portfolio Methods
// 		// 	// return smart_api.getHolding();

// 		// 	// return smart_api.getPosition();

// 		// 	// return smart_api.convertPosition({
// 		// 	//     "exchange": "NSE",
// 		// 	//     "oldproducttype": "DELIVERY",
// 		// 	//     "newproducttype": "MARGIN",
// 		// 	//     "tradingsymbol": "SBIN-EQ",
// 		// 	//     "transactiontype": "BUY",
// 		// 	//     "quantity": 1,
// 		// 	//     "type": "DAY"
// 		// 	// });

// 		// 	// GTT Methods
// 		// 	// return smart_api.createRule({
// 		// 	//    "tradingsymbol" : "SBIN-EQ",
// 		// 	//    "symboltoken" : "3045",
// 		// 	//    "exchange" : "NSE",
// 		// 	//    "producttype" : "MARGIN",
// 		// 	//    "transactiontype" : "BUY",
// 		// 	//    "price" : 100000,
// 		// 	//    "qty" : 10,
// 		// 	//    "disclosedqty": 10,
// 		// 	//    "triggerprice" : 200000,
// 		// 	//    "timeperiod" : 365
// 		// 	// })
// 		// 	// return smart_api.modifyRule({
// 		// 	//             "id" : 1000014,
// 		// 	//             "symboltoken" : "3045",
// 		// 	//             "exchange" : "NSE",
// 		// 	//             "qty" : 10

// 		// 	// })
// 		// 	// return smart_api.cancelRule({
// 		// 	//      "id" : 1000014,
// 		// 	//      "symboltoken" : "3045",
// 		// 	//      "exchange" : "NSE"
// 		// 	// })
// 		// 	// return smart_api.ruleDetails({
// 		// 	//     "id" : 25
// 		// 	// })
// 		// 	// return smart_api.ruleList({
// 		// 	//      "status" : ["NEW","CANCELLED"],
// 		// 	//      "page" : 1,
// 		// 	//      "count" : 10
// 		// 	// })

// 		// 	// Historical Methods
// 		// 	// return smart_api.getCandleData({
// 		// 	//     "exchange": "NSE",
// 		// 	//     "symboltoken": "3045",
// 		// 	//     "interval": "ONE_MINUTE",
// 		// 	//     "fromdate": "2021-02-10 09:00",
// 		// 	//     "todate": "2021-02-10 09:20"
// 		// 	// })
// })
// .then((data) => {
// 	console.log('PROFILE::', data);
// })
// .catch((ex) => {
// 	console.log('EX::', ex);
// });

// // // smart_api.generateToken("YOUR_REFRESH_TOKEN")
// // //     .then((data) => {
// // //         console.log(data)
// // //     });

// smart_api.setSessionExpiryHook(customSessionHook);

// function customSessionHook() {
//     // USER CAN GENERATE NEW JWT HERE
//     console.log("User loggedout");
// }

// ########################### Socket Sample Code Starts Here ###########################
// Old Websocket

// let web_socket = new WebSocket({
//     client_code: "CLIENT_CODE",
//     feed_token: "FEED_TOKEN"
// });

// web_socket.connect()
//     .then(() => {
//         web_socket.runScript("SCRIPT", "TASK") // SCRIPT: nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

//         setTimeout(function () {
//             web_socket.close()
//         }, 3000)
//     })

// web_socket.on('tick', receiveTick)

// function receiveTick(data) {
//     console.log("receiveTick:::::", data)
// }

// ########################### Socket Sample Code Ends Here ###########################

// ########################### Socket Sample Code Starts Here ###########################
// New websocket

// let web_socket = new WebSocketClient({
//     clientcode: "CLIENT_CODE",
//     jwttoken: 'JWT_TOKEN',
//     apikey: "API_KEY",
//     feedtype: "FEED_TYPE",
// });

// web_socket.connect()
//     .then(() => {
//         web_socket.fetchData("subscribe", "order_feed");  // ACTION_TYPE: subscribe | unsubscribe FEED_TYPE: order_feed

//         setTimeout(function () {
//             web_socket.close()
//         }, 60000)
//     });

// web_socket.on('tick', receiveTick);

// function receiveTick(data) {
//     console.log("receiveTick:::::", data);
// }

// ########################### Socket V2 Sample Code Start Here ###########################
const web_socket = new WebSocketV2({
	jwttoken:
		'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkExMzgxMzU4Iiwicm9sZXMiOjAsInVzZXJ0eXBlIjoiVVNFUiIsImlhdCI6MTY4NDQ3MjM1MCwiZXhwIjoxNjg0NTU4NzUwfQ.DoOW6Ry5LQ8VJwESQpylmtk6qdqO96IWHPAyE7fPLFZimEgEut1pGvhInfcGBpx_iJAUD-sbk14vnKxGlLeUvw',
	apikey: 'm7TeW9kY',
	clientcode: 'A1381358',
	feedtype:
		'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkExMzgxMzU4IiwiaWF0IjoxNjg0NDcyMzUwLCJleHAiOjE2ODQ1NTg3NTB9.fd7qqxg6Yfx_PqFcnmgm2ALkfs6Yi4kGVJvILwfPH6zZXcYLLY_184xVZ5PoGeaYEDP-qvcHJToaPwRw-0u8wQ',
});

web_socket.connect().then(() => {
	let json_req = {
		correlationID: 'abcde12345',
		action: 1,
		mode: 1,
		exchangeType: 1,
		tokens: ['2885'],
	};

	web_socket.fetchData(json_req);

	// let nfo_json_req = {
	// 	correlationID: 'abcde12345',
	// 	action: 0,
	// 	mode: 1,
	// 	exchangeType: 7,
	// 	tokens: ['JEERAUNJHA19MAY2023'],
	// };

	// web_socket.fetchData(nfo_json_req);

	web_socket.on('tick', receiveTick);

	function receiveTick(data) {
		console.log('receiveTick:::::', data);
	}
});
// ########################### Socket V2 Sample Code End Here ###########################
