const net = require("node:net")

const HOST = "127.0.0.1"
const PORT = 3008

const CLIENTS = []

const server = net.createServer()


server.on("connection", (socket) => {
    console.log("A new connection to the server")

    const clientId = CLIENTS.length + 1
    CLIENTS.map((c) => {
        c.socket.write(`User ${clientId} joined!`);
    })
    socket.write(`id-${clientId}`)

    let username;
    socket.on("data", (data) => {
        const dataString = data.toString("utf-8")
        const id = dataString.substring(0, dataString.indexOf("-"))
        // const username = dataString.substring(dataString.indexOf("/usr-"))

        const message = dataString.substring(dataString.indexOf("-message-") + 9)

        CLIENTS.map((c) => {
            c.socket.write(`> User ${id}: ${message}`)
        })
    })
    

    socket.on("end", () => {
        CLIENTS.map((c) => {
            c.socket.write(`User ${clientId} disconnected!`);
        })
        CLIENTS.filter((c) => c.id !== clientId) 
    })

    CLIENTS.push({id: clientId.toString(), username: username, socket})
    // console.log(CLIENTS)
})



server.listen(PORT, HOST, () => {
    console.log("Server listening on", server.address())
})