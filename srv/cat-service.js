const { callSendMailAPI, getNextNumber, getProcessEnvironmentVariables } = require("./catServiceFunctions");

module.exports = (srv) => {
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


