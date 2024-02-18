const TeleSignSDK = require('telesignsdk');

async function sendSmsAsync(phoneNumber, message, messageType) {
    return new Promise((resolve, reject) => {
        const customerId = process.env.CUSTOMER_ID || "13C90265-9397-4171-BE0B-BE3566CAA826";
        const apiKey = process.env.API_KEY || "XbuqP6MGYiyBVKiQEo/Y24ABxPggBOvWoWDt7R3fDAVgwl7rClqc9k6mgyHvxL4v8oEdib0zZxExsMMdkTJgcA==";


        // Instantiate a messaging client object.
        const client = new TeleSignSDK(customerId, apiKey);

        // Define the callback.
        function smsCallback(error, responseBody) {
            if (error === null) {
                console.log("\nResponse body:\n" + JSON.stringify(responseBody));
                client.sms.status(function (err, statusResponse) {
                    if (err) {
                        reject({status:falseP}); // network failure likely cause for error
                    } else {
                        console.log("Status response OTP Sent success", statusResponse);
                        if(statusResponse.status.code == 203){
                            resolve({status:true, message:"Otp Sent Successfully"});
                        }
                        else
                        {
                            reject({status:false})
                        }
                        
                    }
                }, responseBody.reference_id);
            } else {
                console.error("Unable to send SMS. Error:\n\n" + error);
                reject(error);
            }
        }

        // Make the request and capture the response.
        client.sms.message(smsCallback, phoneNumber, message, messageType);
    });
}


module.exports.sendSmsAsync = sendSmsAsync;