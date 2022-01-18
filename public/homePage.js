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
			ProfileWidget.showProfile(callback.data);
			moneyManager.setMessage(callback.success, 'Пополнение баланса прошло успешно');
		} else {
			moneyManager.setMessage(callback.success, 'Произошла ошибка при пополении баланса');
		}
	})
};
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, callback => {
		console.log(callback)
		if(callback.success){
			ProfileWidget.showProfile(callback.data);
			moneyManager.setMessage(callback.success, 'Конвертация прошла успешно');
		} else {
			moneyManager.setMessage(callback.success, 'Произошла ошибка при конвертации');
		}
	})
}
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, callback => {
		console.log(callback)
		if(callback.success){
			ProfileWidget.showProfile(callback.data);
			moneyManager.setMessage(callback.success, 'Средства успешно отправлены');
		} else {
			moneyManager.setMessage(callback.success, 'Произошла ошибка при отправке средств');
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
		} else {
			favoritesWidget.setMessage(callback.success, 'Произошла ошибка при добавлении пользователя')
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
		} else {
			favoritesWidget.setMessage(callback.success, 'Произошла ошибка при удалении пользователя')
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







