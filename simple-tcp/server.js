const net = require("node:net")


const server = net.createServer((socket) => {
    socket.on("data", (chunk) => {
        console.log(chunk.toString("utf-8"))
    })
})


server.listen(8000, "::1", () => {
    console.log("Server listening on", server.address())
})


