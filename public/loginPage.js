'use strict'

const form = new UserForm();
form.loginFormCallback = (data) => {
	ApiConnector.login(data, (callback) => {
		if(callback.success) {
			location.reload();
		} else {
			form.setLoginErrorMessage(callback.error);
		}
	});
}
form.registerFormCallback = (data) => {
	const regExp = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
	if(!regExp.test(data.login)){
		form.setRegisterErrorMessage('Введите e-mail адрес!');
	} else {
		ApiConnector.register(data, (callback) => {
			if(callback.success) {
			location.reload();
		} else {
			form.setRegisterErrorMessage(callback.error);
		}
		});
	}
}