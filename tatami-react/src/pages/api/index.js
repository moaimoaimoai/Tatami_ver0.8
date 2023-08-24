import axios from 'axios'
import AppConfig from '../../config/AppConfig'

const cancelTokens = {}

const apiCall = (url, params, method = 'get', cancelTokenId = '') => {
	const config = {
		baseURL: AppConfig.ApiEndpoint,
		headers: {
            "Content-Type": "application/json"
        },
	}

	if (cancelTokenId !== '') {
		config.cancelToken = new axios.CancelToken(c => {
			cancelTokens[cancelTokenId] = c
		})
	}

	if (method === 'post') {
		// return axios.post(url, qs.stringify(params), config)
		return axios.post(url,"", config )
	}
	else {
		return axios.get(url, {
			...config,
			params
		})
	}
}

export const cancelCallRequest = (cancelTokenId = '') => {
	if (cancelTokenId !== '') {
		if (cancelTokens[cancelTokenId]) cancelTokens[cancelTokenId]()
	}
}

export default apiCall