const net = require("node:net")


const client = net.createConnection({
    host: "::1",
    port: 8000
}, () => {
    const buff = Buffer.from("Secret datagram")

    client.write(buff)
})