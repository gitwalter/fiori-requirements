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
async function setStatus(srv, req, status) {
    let id;
    //params are not filled during unittest but req.data.ID has a value set
    if (req.params.length === 0) {
        id = req.data.ID;
    }
    //req.params are filled during call from http
    else {
        id = req.params[0].ID
    }
    const { Requirements } = srv.entities;
    const n = await UPDATE(Requirements).set({ status_ID: status }).where({ ID: id });
}
exports.setStatus = setStatus;
async function sendRequirementMailTrap(requirements) {
    const credstoreBinding = getCredstoreBinding();
    //load environment variables to read from credential store
    const keyNameSpace = process.env.KEY_MAILTRAP_NAMESPACE;
    const keyName = process.env.KEY_MAILTRAP_NAME;
    let keys = await readCredential(credstoreBinding, keyNameSpace, "password", keyName);
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: keys.username,
            pass: keys.value
        }
    });
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: requirements.problem,
        text: requirements.description
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
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
    return 'error at sending mail';
}
