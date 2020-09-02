const orderTable = document.getElementsByClassName("order_list");
if (orderTable.length) {
	orderTable[0].style.width = "100%"
}

window.addEventListener("load", onOff);
const timeToReload = 30 * 1000;
let currentNumberOfOrders = 0;

function getOrders() {
	// currentNumberOfOrders = 0;
	console.log(`Get all orders.`);
	let rowsInTable = document.getElementsByTagName("tr"); //колекція замовленнь
	
	for (var i=0; i < rowsInTable.length; i++) {
		if(rowsInTable[i].hasAttribute("bgcolor")) {
			let attribureValue = rowsInTable[i].getAttribute("bgcolor");
			if (attribureValue == "FFFF99" || attribureValue == "#66AA66") { // Жовтий колір || зелений колір
				currentNumberOfOrders++
			}
			// Забирає заказ на себе
			// if (attribureValue == "FFFF99") {
			// 	let detailOrder = rowsInTable[i].children[1];
			// 	let linkToOrderDetail = detailOrder.getElementsByTagName('a')[0].getAttribute('href');
			// 	linkToOrderDetail = 'https://www.rcscomponents.kiev.ua/' + linkToOrderDetail;
			// 	let alLine = rowsInTable[i].children[5];
			// 	let lineID = alLine.getAttribute('id');
			// 	let orderOwner = lineID.slice(-6);
			// 	let userId = 70;
			// 	let shopId = 18;
			// 	let url = `https://www.rcscomponents.kiev.ua/ajax_asershop_admin.php?lid=${orderOwner}&new_order_owner=${userId}&old_order_owner=${shopId}`;
			// 	let tab = window.open(url);
			// 	let openDetailOrder = window.open(linkToOrderDetail);
			// 	function closeTab(){tab.close();}
			// 	setTimeout(closeTab, 3000);
			// }
		}
	};
	chrome.runtime.sendMessage({
		numberOfOrders: currentNumberOfOrders
	});
};


 function onOff() {
	chrome.storage.sync.get(['appStatus'], function(result) {
		switch (result.appStatus) {
			case true:
				console.log(`App works.`);
				getOrders();
				reloadDocument();
				break;
			case false:
				console.log(`App does not work.`);
				break;
			default:
				console.log(`App does not work.`);
				break;
		}
	});
}

function reloadDocument () {
	setTimeout(() => location.reload(), timeToReload);
	console.log(`Document has be reload after 30 seconds.`);
}