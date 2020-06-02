const bottonOnOff = document.getElementById('onOffApp');
const appStatusOn = document.getElementById('appStatusOn');
const appStatusOff = document.getElementById('appStatusOff');
const inputFieldForReloadTime = document.getElementById('time');

window.onload = function () {
	chrome.storage.sync.get(['appStatus'], function(result) {
		result.appStatus ? on() : off();
    });
  //   chrome.storage.sync.get(['reloadTime'], function(result) {
  //   	result.reloadTime 
		// ? inputFieldForReloadTime.value = result.reloadTime 
		// : inputFieldForReloadTime.value = 30;
  //   });
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

// inputFieldForReloadTime.onkeyup = function () {
// 	event.preventDefault();
// 	console.log(event.which);
// 	// const sendObj = {
// 	// 	reloadTime: this.value
// 	// }
// 	// chrome.runtime.sendMessage(sendObj);
// }