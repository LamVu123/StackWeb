const muaRau = (tien) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(tien >= 10000) {
				// return "Rau";
				resolve("Rau");
			} else {
				// return "Chong du tien ra day roi noi chuyen!!!";
				reject("Chong du tien ra day roi noi chuyen!!!");
			}
		}, 1000);
	});
};

// muaRau(10000, function(result) {
// 	console.log(result);
// 	muaRau(10000, function(result) {
// 		console.log(result);
// 		muaRau(10000, function(result) {
// 			console.log(result);
// 			muaRau(10000, function(result) {
// 				console.log(result);
// 			});
// 		});
// 	});
// });

muaRau(10000)
	.then((result) => {
		console.log(result);
		return muaRau(9999);
	})
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log("Loi", err);
	});
