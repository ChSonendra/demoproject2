const { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { createReadStream, createWriteStream } = require('fs');
const config = require("../configs/config.json")

async function getS3() {
    try {
        const client = new S3Client({
            region: "ap-south-1", credentials: {
                accessKeyId: "AKIAUFOPUZT623APV6WD",
                secretAccessKey: "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"
            }
        });
        return client;
    }
    catch (error) {
        console.log("couldn't create s3 client", error)
    }


}
async function putS3Object(userKey, data) {
    try {
        const client = await getS3();
        const bucketName = config.s3Bucket;  // Replace with your S3 bucket name
        const objectKey = userKey; // Replace with the desired path in the bucket
        const localFilePath = '/home/ubuntu/demoproject2/lol.json'; // Replace with the local file you want to upload
        // Set up parameters for the putObject operation
        const putObjectParams = {
            Bucket: bucketName,
            Key: objectKey,
            Body: JSON.stringify(data),
            ContentType: 'application/json'
        };

        const putObjectCommand = new PutObjectCommand(putObjectParams);

        const response = await client.send(new PutObjectCommand(putObjectParams));
        return { status: true }
    }
    catch (error) {
        console.log("error in put ", error)
        return { status: false }
    }
}

async function getS3Object(userKey) {
    try {
        const client = await getS3();
        const bucketName = config.s3Bucket;
        const objectKey = userKey;
        const getObjectParams = {
            Bucket: bucketName,
            Key: objectKey,
        };
        const response = await client.send(new GetObjectCommand(getObjectParams));
        const fileData = await response.Body.transformToByteArray()
        let buff = Buffer.from(fileData);
        const hexBuffer = Buffer.from(buff.toString('hex'), 'hex');
        const stringData = hexBuffer.toString('utf-8');
        console.log(JSON.parse(stringData))
        return { status: true, data: JSON.parse(stringData) }
    }
    catch (error) {
        console.log("error i get s3", error)
        return { status: false }
    }
}

module.exports.getS3Object = getS3Object
module.exports.putS3Object = putS3Object