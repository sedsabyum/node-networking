const http = require("node:http")

const PORT = 80;
const HOST = "192.168.1.178"

const server = http.createServer((req, res) => {
    const data = {message: "Hi there!"};

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Connection", "close")
    res.statusCode = 200
    res.end(JSON.stringify(data))
})

server.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`)
})