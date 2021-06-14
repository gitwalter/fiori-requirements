const xsenv = require("@sap/xsenv");

const { readCredential } = require("./getAuthFromCredstore");

module.exports = (srv) => {

    srv.on('setToReported', async (req) => {
        setStatus(srv, req, 1);
        req.notify('Please save your changes');
    })

    srv.on('sayHello', async (req) => {
        req.notify('Hello');
    })


    srv.on('setToWorkInProgress', async (req) => {
        setStatus(srv, req, 2);
        req.notify('Please save your changes');
    })

    srv.on('setToSolved', async (req) => {
        setStatus(srv, req, 3);
        req.notify('Please save your changes');
    })

    srv.before('CREATE', 'Requirements', async (context) => {
        const { Requirements } = srv.entities;
        context.data.number = context.data.number || await getNextNumber(Requirements);
        context.data.status_ID = 1;
    })

    srv.after('CREATE', 'Requirements', async (requirements) => {

        xsenv.loadEnv();

        const binding = xsenv.getServices({ credstore: { tag: 'credstore' } }).credstore;
        //load environment variables to read from credential store

        const KeyNameSpace = process.env.KEY_NAMESPACE;

        const KeyName = process.env.KEY_NAME;

        let keys = await readCredential(binding, KeyNameSpace, "password", KeyName);
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
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    })
}

async function getNextNumber(entity) {
    const result = await SELECT.one(entity).orderBy({ number: 'desc' })
    return result ? result.number + 1 : 1
}

async function setStatus(srv, req, status) {
    const id = req.params[0].ID;
    const { Requirements } = srv.entities;
    const n = await UPDATE(Requirements).set({ status_ID: status }).where({ ID: id });    
}