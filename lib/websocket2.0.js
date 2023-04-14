let WebSocket = require('ws');
const Parser = require('binary-parser').Parser;
let { URL } = require('../config/constant');

let triggers = {
	connect: [],
	tick: [],
};

let WebSocketV2 = function (params) {
	try {
		let { clientcode, jwttoken, apikey, feedtype } = params;
		let self = this;
		let ws = null;
		let headers = {
			'x-client-code': clientcode,
			Authorization: jwttoken,
			'x-api-key': apikey,
			'x-feed-token': feedtype,
		};
		const url = URL.websocket;
		let ping_Interval = 30000;

		this.connect = function () {
			return new Promise((resolve, reject) => {
				if (
					headers?.['x-client-code'] === null ||
					headers?.['x-feed-token'] === null ||
					headers?.['x-api-key'] === null ||
					headers?.Authorization === null
				) {
					return 'client_code or jwt_token or api_key or feed_token is missing';
				}
				console.log('Headers::', headers);
				ws = new WebSocket(url, { headers });

				ws.onopen = function onOpen(evt) {
					setInterval(function () {
						ws.send('ping');
					}, ping_Interval);
					resolve();
				};

				ws.onmessage = function (evt) {
					let result = evt.data;
					// console.log('result', result);
					const buf = Buffer.from(result);

					const receivedData = setResponse(buf);

					trigger('tick', [receivedData]);

					resolve(result);
				};

				ws.onerror = function (evt) {
					console.log('onerror::', evt);
					self.connect();
					reject(evt);
				};
				ws.onclose = function (evt) {
					console.log('Socket closed::::::::', evt);
				};
			});
		};

		this.fetchData = function (json_req) {
			ws.send(JSON.stringify(json_req));
		};

		this.on = function (e, callback) {
			if (triggers.hasOwnProperty(e)) {
				triggers[e].push(callback);
			}
		};

		this.close = function () {
			ws.close();
		};
	} catch (error) {
		console.log('5:::::', error.toJSON());
	}
};

function trigger(e, args) {
	if (!triggers[e]) return;
	for (var n = 0; n < triggers[e].length; n++) {
		triggers[e][n].apply(triggers[e][n], args ? args : []);
	}
}

function _atos(array) {
	var newarray = [];
	try {
		for (var i = 0; i < array.length; i++) {
			newarray.push(String.fromCharCode(array[i]));
		}
	} catch (e) {}

	return newarray.join('');
}

function LTP(buf) {
	const ltp = new Parser()
		.endianness('little')
		.int8('subscription_mode', { formatter: toNumber })
		.int8('exchange_type', { formatter: toNumber })
		.array('token', { type: 'uint8', length: 25, formatter: _atos })
		.int64('sequence_number', { formatter: toNumber })
		.int64('exchange_timestamp', { formatter: toNumber })
		.int32('last_traded_price', { formatter: toNumber });

	let response = ltp.parse(buf);
	return response;
}

function QUOTE(buf) {
	const quote = new Parser()
		.endianness('little')
		.uint8('subscription_mode', { formatter: toNumber, length: 1 })
		.uint8('exchange_type', { formatter: toNumber, length: 1 })
		.array('token', { type: 'int8', length: 25, formatter: _atos })
		.uint64('sequence_number', { formatter: toNumber, length: 8 })
		.uint64('exchange_timestamp', { formatter: toNumber, length: 8 })
		.uint64('last_traded_price', { formatter: toNumber, length: 8 })
		.int64('last_traded_quantity', { formatter: toNumber, length: 8 })
		.int64('avg_traded_price', { formatter: toNumber, length: 8 })
		.int64('vol_traded', { formatter: toNumber, length: 8 })
		.doublele('total_buy_quantity', { formatter: toNumber, length: 8 })
		.doublele('total_sell_quantity', { formatter: toNumber, length: 8 })
		.int64('open_price_day', { formatter: toNumber, length: 8 })
		.int64('high_price_day', { formatter: toNumber, length: 8 })
		.int64('low_price_day', { formatter: toNumber, length: 8 })
		.int64('close_price', {
			formatter: toNumber,
			length: 8,
		});

	let response = quote.parse(buf);
	return response;
}

function SNAP_QUOTE(buf) {
	const bestFiveData = new Parser()
		.endianness('little')
		.int16('buy_sell', { formatter: toNumber, length: 2 })
		.int64('buy_sell_quantity', { formatter: toNumber, length: 8 })
		.int64('buy_sell_price', { formatter: toNumber, length: 8 })
		.int16('buy_sell_orders', { formatter: toNumber, length: 2 });

	const snapQuote = new Parser()
		.endianness('little')
		.uint8('subscription_mode', { formatter: toNumber, length: 1 })
		.uint8('exchange_type', { formatter: toNumber, length: 1 })
		.array('token', { type: 'int8', length: 25, formatter: _atos })
		.uint64('sequence_number', { formatter: toNumber, length: 8 })
		.uint64('exchange_timestamp', { formatter: toNumber, length: 8 })
		.uint64('last_traded_price', { formatter: toNumber, length: 8 })
		.int64('last_traded_quantity', { formatter: toNumber, length: 8 })
		.int64('avg_traded_price', { formatter: toNumber, length: 8 })
		.int64('vol_traded', { formatter: toNumber, length: 8 })
		.doublele('total_buy_quantity', { formatter: toNumber, length: 8 })
		.doublele('total_sell_quantity', { formatter: toNumber, length: 8 })
		.int64('open_price_day', { formatter: toNumber, length: 8 })
		.int64('high_price_day', { formatter: toNumber, length: 8 })
		.int64('low_price_day', { formatter: toNumber, length: 8 })
		.int64('close_price', {
			formatter: toNumber,
			length: 8,
		})
		.int64('last_traded_timestamp', { formatter: toNumber, length: 8 })
		.int64('open_interest', { formatter: toNumber, length: 8 })
		.doublele('open_interest_change', {
			formatter: toNumber,
			length: 8,
		})
		.array('best_five_data', { type: bestFiveData, lengthInBytes: 200 })
		.int64('upper_circuit', { formatter: toNumber, length: 8 })
		.int64('lower_circuit', { formatter: toNumber, length: 8 })
		.int64('fiftytwo_week_high', {
			formatter: toNumber,
			length: 8,
		})
		.int64('fiftytwo_week_low', { formatter: toNumber, length: 8 });

	let response = snapQuote.parse(buf);
	return response;
}

function toNumber(number) {
	return number.toString();
}

function setResponse(buf) {
	const subscription_mode = new Parser().uint8('subscription_mode');

	switch (subscription_mode.parse(buf)?.subscription_mode) {
		case 1:
			return LTP(buf);
		case 2:
			return QUOTE(buf);
		case 3:
			return SNAP_QUOTE(buf);
		default:
			return 'Attempting to resubscribe/reconnect...';
	}
}

module.exports = WebSocketV2;
