const net = require("node:net");
const path = require("node:path")
const fs = require("node:fs/promises");

const HOST = "127.0.0.1";
const PORT = 3008;


const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
      process.stdout.clearLine(dir, () => {
          resolve()
      })
  })
}

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
      process.stdout.moveCursor(dx, dy, () => {
          resolve()
      })
  })
}


const socket = net.createConnection({ host: HOST, port: PORT }, async () => {
  console.log("Connected to server");

  const filePath = process.argv[2]
  const fileName = path.basename(filePath)

  const fileHanlde = await fs.open(filePath, "r");
  const fileSize = (await fileHanlde.stat()).size
  const fileReadStream = fileHanlde.createReadStream();


  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  socket.write(`filename:${fileName} //data$:`) 

  fileReadStream.on("data", async (data) => {
    if(!socket.write(data)) {
      fileReadStream.pause()
    };

    bytesUploaded += data.length
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100)

    if(newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage
      await moveCursor(0, -1)
      await clearLine()
      console.log(`Uploading... ${uploadedPercentage}%`)
    }
});


socket.on("drain", () => {
  fileReadStream.resume()
})
  
fileReadStream.on("end", () => {
    console.log("File was successfully uploaded");
    fileHanlde.close();
    process.exit()
  });
});
