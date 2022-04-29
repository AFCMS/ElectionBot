import http from "http"

http
	.createServer(function (_, res) {
		res.write("Bot is online")
		res.end()
	})
	.listen(8000)
