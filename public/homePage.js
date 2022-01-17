//logout
const logoutBtn = new LogoutButton();
logoutBtn.action = () => {
	ApiConnector.logout(callback => {
		location.reload();
	});
}

//get profile information
function getInformation() {
	ApiConnector.current(callback => {
		if(callback.success) {
			ProfileWidget.showProfile(callback.data);
		}
	});
}
getInformation();

//get current exchange rate
const rateBoard = new RatesBoard();


function getCurrentExchangeRate() {
	ApiConnector.getStocks(callback => {
		if(callback.success) {
			rateBoard.clearTable();
			rateBoard.fillTable(callback.data);
		}
	})
}

getCurrentExchangeRate();
setInterval(getCurrentExchangeRate, 60000);

//money operation
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, callback => {
		if(callback.success) {
			getInformation();
			moneyManager.setMessage(callback.success, 'Пополнение баланса прошло успешно');
		}
	})
};
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, callback => {
		console.log(callback)
		if(callback.success){
			getInformation();
			moneyManager.setMessage(callback.success, 'Конвертация прошла успешно');
		}
	})
}
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, callback => {
		console.log(callback)
		if(callback.success){
			getInformation();
			moneyManager.setMessage(callback.success, 'Средства успешно отправлены');
		}
	})
}

//work with favorites
const favoritesWidget = new FavoritesWidget();
favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, callback => {
		if(callback.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(callback.data);
			moneyManager.updateUsersList(callback.data);
			favoritesWidget.setMessage(callback.success, 'Пользователь успешно добавлен')
		}
	})
}

favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, callback => {
		if(callback.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(callback.data);
			moneyManager.updateUsersList(callback.data);
			favoritesWidget.setMessage(callback.success, 'Пользователь успешно удален')
		}
	})
}

function getFavoritesInf() {
	ApiConnector.getFavorites(callback => {
		if(callback.success){
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(callback.data);
			moneyManager.updateUsersList(callback.data);
		}
	})
}

getFavoritesInf();







