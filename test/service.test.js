const cds = require('@sap/cds');
const chai = require("chai");

jest.setTimeout(50000);

describe('Requirements on CDS service-level', () => {
    let srv, Requirements, id
    beforeAll(async () => {
        await cds.deploy(__dirname + '../../srv/cat-service').to('sqlite')
        srv = await cds.serve('requirements_service')
            .from(__dirname + '../../srv/cat-service')
        Requirements = srv.entities.Requirements
        expect(Requirements).toBeDefined()
    })

    test('Create requirement', async () => {
        const requirements = await srv.read(Requirements, requirement => { requirement.ID, requirement.description });
        const newRequirement = await srv.create(Requirements).entries({ app: "unittest", description: "created by unittest" });
        const readRequirement = await SELECT.from`com.fiori.requirements.Requirements`.where`ID = ${newRequirement.ID}`;
        id = readRequirement[0].ID;
        chai.expect(newRequirement.ID).to.equal(readRequirement[0].ID);
        chai.expect(readRequirement[0].status_ID).to.equal(1);
        chai.expect(readRequirement[0].app).to.equal(newRequirement.app);
        chai.expect(readRequirement[0].number).to.equal(2);
    })

    test('Set requirement to work in progress', async () => {
        await srv.setToWorkInProgress('Requirements', id);
        const readRequirement = await SELECT.from`com.fiori.requirements.Requirements`.where`ID = ${id}`;
        chai.expect(readRequirement[0].status_ID).to.equal(2);
    })

    test('Set requirement to solved', async () => {
        await srv.setToSolved('Requirements', id);
        const readRequirement = await SELECT.from`com.fiori.requirements.Requirements`.where`ID = ${id}`;
        chai.expect(readRequirement[0].status_ID).to.equal(3);
    })

    test('Delete requirement', async () => {
        let readRequirement = await SELECT.from`com.fiori.requirements.Requirements`.where`ID = ${id}`;
        chai.expect(readRequirement).to.be.an('array').and.not.be.empty;
        const requirementWorkInProgress = await srv.delete('Requirements', id);

        //after deletion empty array is expected as result
        readRequirement = await SELECT.from`com.fiori.requirements.Requirements`.where`ID = ${id}`;
        chai.expect(readRequirement).to.be.an('array').and.be.empty;
    })
})
