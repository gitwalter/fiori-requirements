const { readCredential } = require("./getAuthFromCredstore");

exports.getCredstoreBinding = getCredstoreBinding;
function getCredstoreBinding() {
    const xsenv = require("@sap/xsenv");
    xsenv.loadEnv();
    const binding = xsenv.getServices({ credstore: { tag: 'credstore' } }).credstore;
    return binding;
}
async function getNextNumber(entity) {
    const result = await SELECT.one(entity).orderBy({ number: 'desc' });
    return result ? result.number + 1 : 1;
}
exports.getNextNumber = getNextNumber;

async function callSendMailAPI(to, subject, text) {
    //read environment
    const { mailApiUrl, keyNameSpace, passwordName, tokenUrl, keyName } = getProcessEnvironmentVariables();
    //get credstore binding
    const credstoreBinding = getCredstoreBinding();
    //get request handler
    const request = require("superagent");
    //get token, apikey and authorization
    const accessToken = await getAccessToken(credstoreBinding, keyNameSpace, passwordName, tokenUrl, request);
    const apikey = await readCredential(credstoreBinding, keyNameSpace, "key", keyName);
    const authorization = 'Bearer ' + accessToken;
    //send mail
    const res =
        await request.post(mailApiUrl)
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization)
            .set('apikey', apikey.value)
            .send('grant_type=client_credentials')
            .send({
                "from": {
                    "email": "sap.btp@sap.cloud.fielmann.net",
                    "name": "SAP BTP "
                },
                "to": {
                    "email": to,
                },
                "subject": subject,
                "content": {
                    "type": "text/html",
                    "value": text
                }
            })
            .then(callback)
            .catch(errorCallback);
    return res;
}
exports.callSendMailAPI = callSendMailAPI;

async function getAccessToken(binding, keyNameSpace, passwordName, tokenUrl, request) {
    const password = await readCredential(binding, keyNameSpace, "password", passwordName);
    const clientID = 'client_id=' + password.username;
    const clientSecret = 'client_secret=' + password.value;
    const response = await request.post(tokenUrl)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('grant_type=client_credentials')
        .send(clientID)
        .send(clientSecret)
        .then(callback)
        .catch(errorCallback);
    const accessToken = response.body.access_token;
    return accessToken;
}
exports.getAccessToken = getAccessToken;
function getProcessEnvironmentVariables() {
    const tokenUrl = process.env.TOKEN_URL;
    const mailApiUrl = process.env.MAIL_API_URL;
    const keyNameSpace = process.env.KEY_MAILAPI_NAMESPACE;
    const keyName = process.env.KEY_MAILAPI_NAME;
    const passwordName = process.env.PASSWORD_MAILAPI_NAME;
    const mailRecipient = process.env.MAIL_RECIPIENT;
    return { keyNameSpace, passwordName, tokenUrl, keyName, mailApiUrl, mailRecipient };
}
exports.getProcessEnvironmentVariables = getProcessEnvironmentVariables;
function callback(res) {
    return res;
}
 function errorCallback(error) {
     //console.log(error.message);
     return 'error at sending mail' + ' ' + error.message;
 }
