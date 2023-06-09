export default class APIService {

	constructor (httpAdapter) {
		this.httpAdapter = httpAdapter;
	}

	getItems () {
		return this.httpAdapter.get("http://localhost:3000/items");
	}

	simulateFreight (data) {
		return this.httpAdapter.post("http://localhost:3000/simulate-freigth", data);
	}

	placeOrder (data) {
		return this.httpAdapter.post("http://localhost:3000/orders", data);
	}

	validateCoupon (data) {
		return this.httpAdapter.post("http://localhost:3000/validate-coupon", data);
	}
}
