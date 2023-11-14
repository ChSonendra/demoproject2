
const fs = require('fs');
const currentDir = process.cwd();

const config = require('../configs/config.json')
async function saveFile(filename, jsonString) {
    try {
        await fs.writeFile(currentDir + config.userFilePath + filename, jsonString)
        return {status : true}
    }
    catch (error) {
        console.log("error in saving file",error)
        throw {status: false}
    }
}

async function readFile(filename) {
    try {
        let data =  fs.readFileSync(filename)
        return {status: true, data: data}
    }
    catch (error) {
        console.log("error in saving file",error)
        throw {status: false}
    }
}

module.exports.saveFile = saveFile
module.exports.readFile = readFile