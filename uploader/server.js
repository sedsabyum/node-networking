const net = require("node:net");
const fs = require("node:fs/promises");

const HOST = "127.0.0.1";
const PORT = 3008;

const server = net.createServer();


server.on("connection", async (socket) => {
  console.log("New connection");
  
  let fileHanlde, fileWriteStream;

  socket.on("data", async (data) => {
    if (!fileHanlde) {
      socket.pause() // pause receiving data from client

      const indexOfDivider = data.indexOf("//data$:")
      const fileName = data.subarray(9, indexOfDivider).toString("utf-8")

      fileHanlde = await fs.open(`./storage/${fileName}`, "w");
      fileWriteStream = fileHanlde.createWriteStream();

      //writing to destination
      fileWriteStream.write(data.subarray(indexOfDivider + 8));

      socket.resume(); // resume receiving data from client
      fileWriteStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on("end", () => {
    if(fileHanlde) fileHanlde.close();
    fileHanlde = undefined;
    fileWriteStream = undefined
    console.log("Connection ended!");
  });
});



server.listen(PORT, HOST, () => {
  console.log("Server listening on", server.address());
});
