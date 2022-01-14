const logoutBtn = new LogoutButton();
logoutBtn.action = () => {
	ApiConnector.logout(callback => {
		location.reload();
	});
}