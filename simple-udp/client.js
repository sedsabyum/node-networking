const dgram = require("node:dgram")

//max size of buffer by default is 9216 bytes
const client = dgram.createSocket({type: "udp6", getSendBufferSize: 20000})

client.send(
    Buffer.from("Secret data #1"),
    8000,
    "::1",
    (e, bytes) => {
        if(e) console.log(e)
        console.log(bytes)
    }
)

client.send(
    Buffer.from("Secret data #2"),
    8000,
    "::1",
    (e, bytes) => {
        if(e) console.log(e)
        console.log(bytes)
    }
)

// Another syntactic approach
// client.connect(8000, "::1", (err) => {
//     if(err) console.log(err)
//
//     client.send(Buffer.from("Some secret data ..."))
// })