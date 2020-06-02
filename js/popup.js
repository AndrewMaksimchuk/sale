const bottonOnOff = document.getElementById('onOffApp');
const appStatusOn = document.getElementById('appStatusOn');
const appStatusOff = document.getElementById('appStatusOff');
const inputFieldForReloadTime = document.getElementById('time');
const formMultiplaySearchList = document.getElementById('search-list');
const formMultiplaySearchButton = document.getElementById('form-multiplay-search__button');

window.onload = function () {
	chrome.storage.sync.get(['appStatus'], function(result) {
		result.appStatus ? on() : off();
    });
}

bottonOnOff.onclick = function () {
	switch (this.checked) {
		case true:
			on();
			reloadDocument();
			break;
		case false:
			off();
			reloadDocument();
			break;
	}

	chrome.storage.sync.set({appStatus: this.checked}, function() {
        });
}

function on () {
	appStatusOff.classList.remove('glow-red');
	appStatusOn.classList.add('glow-blue');
	bottonOnOff.setAttribute('checked', true);
}

function off () {
	appStatusOn.classList.remove('glow-blue');
	appStatusOff.classList.add('glow-red');
	bottonOnOff.removeAttribute('checked');
}

function reloadDocument () {
	const sendObj = {
		reloadDocumentNow: true
	}
	chrome.runtime.sendMessage(sendObj);
}

formMultiplaySearchButton.onclick = function(event) {
	event.preventDefault();
	const searchQuery = 'https://www.rcscomponents.kiev.ua/modules.php?name=Asers_Shop&s_op=search&query=';
	const arrayFromString = formMultiplaySearchList.value.split(/\n/);
	console.log(arrayFromString);
		arrayFromString.forEach(item => {
			chrome.tabs.create({ url: `${searchQuery}${item}` });
		});
}
