const assert = require('assert');
const functions = require('../srv/catServiceFunctions');


const { expect } = require("chai");

describe('test mail sending', () => {
    it('should return a credstore-binding', () => {
        const credstoreBinding = functions.getCredstoreBinding();
        expect(credstoreBinding.url).to.be.eq('https://credstore.cfapps.eu10.hana.ondemand.com/api/v1/credentials');
        expect(credstoreBinding.service_key_name).to.be.eq('key');
    });
    it('should return a token', async () => {
        const credstoreBinding = functions.getCredstoreBinding();
        const { mailApiUrl, keyNameSpace, passwordName, tokenUrl, keyName } = functions.getProcessEnvironmentVariables();
        //get request handler
        const request = require("superagent");
        //get token
        const accessToken = await functions.getAccessToken(credstoreBinding, keyNameSpace, passwordName, tokenUrl, request);
        expect(accessToken).not.to.be.eq(undefined);
    });
    it('should return an error after mail sending with incorrect recipient', async () => {
        const res = await functions.callSendMailAPI('asdfsdfsd', 'shhd', 'dfsdfasdf');
        expect(res).to.be.eq('error at sending mail');
    });
    it('should not return an error after mail sending', async () => {
        const { mailRecipient } = functions.getProcessEnvironmentVariables();
        const res = await functions.callSendMailAPI(mailRecipient, 'testproblem', 'testdescription');
        expect(res).not.to.be.eq('error at sending mail');
    });
});