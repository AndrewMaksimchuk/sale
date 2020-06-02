let audio = new Audio("audio/Ticket-machine-sound.mp3");

//Прийом повідомлення від контент скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		let numberOfOrders = request.numberOfOrders;
		
		// if (numberOfOrders != 0) {
			if (numberOfOrders > 0) {
			chrome.browserAction.setBadgeText({text: '"' + numberOfOrders + '"'});
			chrome.browserAction.setBadgeBackgroundColor({color: "red"});

			let notificationTemp = {
				type: "basic",
				title: "Ура, є замовлення!",
				message: `Кількість нових замовленнь: ${numberOfOrders}`,
				iconUrl: "img/icon.png"
			};
			
			function callBackNotification() {
				console.log(numberOfOrders);
			};
			
			chrome.notifications.create(notificationTemp, callBackNotification);

			chrome.notifications.onClicked.addListener(toOrders);
			function toOrders() {
				window.open("https://www.rcscomponents.kiev.ua/admin.php?op=AserShopShowOrderList&daynum=1&myonly=1");
			}

			audio.volume = 0.5;
			audio.play();

		} else {
			chrome.browserAction.setBadgeText({text: "Нема"});
			chrome.browserAction.setBadgeBackgroundColor({color: "#3399ff"});
		}
		
		if (request.reloadDocumentNow == true) {
	 		chrome.tabs.reload();
 		}

	});