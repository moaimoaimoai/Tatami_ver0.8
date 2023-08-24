const AppConfig = {
	ApiEndpoint: process.env.REACT_APP_API_ENDPOINT,
	isLocalMode: process.env.REACT_APP_MODE === 'local',
	isDevMode: process.env.REACT_APP_MODE === 'development',
	isProdMode: process.env.REACT_APP_MODE === 'production',
}

export default AppConfig