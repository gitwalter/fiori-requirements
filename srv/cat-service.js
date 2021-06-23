const { callSendMailAPI, setStatus, getNextNumber, getProcessEnvironmentVariables } = require("./catServiceFunctions");
const status = { "reported": 1, "workInProgress": 2, "solved": 3 }

module.exports = (srv) => {
    srv.on('setSolution', async (req) => {
        const id = req.params[0].ID;
        const { solution } = req.data;
        const { Requirements } = srv.entities;
        const n = await UPDATE(Requirements).set({ solution: solution }).where({ ID: id });
    })

    srv.on('sendMail', async (req) => {
        const { to, subject, text } = req.data;
        callSendMailAPI(to, subject, text);
    })

    srv.on('setToReported', async (req) => {
        setStatus(srv, req, status.reported);
        //req.notify('Please save your changes');
    })

    srv.on('setToWorkInProgress', async (req) => {
        setStatus(srv, req, status.workInProgress);
    })

    srv.on('setToSolved', async (req) => {
        setStatus(srv, req, status.solved);
    })

    srv.before('CREATE', 'Requirements', async (context) => {
        const { Requirements } = srv.entities;
        context.data.number = context.data.number || await getNextNumber(Requirements);
        context.data.status_ID = 1;
    })

    srv.after('CREATE', 'Requirements', async (requirements) => {
        const { mailRecipient } = getProcessEnvironmentVariables();
        callSendMailAPI(mailRecipient, requirements.problem, requirements.description);
    }
    )
}


