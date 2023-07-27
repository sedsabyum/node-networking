const dgram = require("node:dgram")

const socket = dgram.createSocket("udp6")

socket.on("message", (message, remoteInfo) => {
    console.log(`Server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`)
})

socket.bind({address: "::1", port: 8000})

socket.on("listening", () => {
    console.log("Server listening on", socket.address())
})