import ky from "ky-universal"
import {HttpServerError} from "./types"

const api = ky.extend({
	hooks: {
		beforeRequest: [
			// @ts-ignore
			async (request) => {
				// const token = await auth.currentUser?.getIdToken()
				// request.headers.set("x-id-token", `${token}`)
			},
		],
		afterResponse: [
			async (req, opt, res) => {
				if (!res.ok) {
					const error = (await res.json()) as HttpServerError
					throw new Error(error.message)
				}
			},
		],
	},
	retry: {
		limit: 3,
		methods: ["get", "post", "delete", "patch"],
		statusCodes: [413],
		backoffLimit: 3000,
	},
	timeout: 3000,
})

export {api}
