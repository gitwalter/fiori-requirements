module.exports = createPageObjects({
    Popup: {
       //Mail PopUP
        iEnterReceiver: function (t) {
            element(by.control({
                id: "APD_::mail-inner",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys(t);
        },
        iEnterSubject: function () {
            element(by.control({
                id: "APD_::to-inner",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys("test");
        },

        iEnterTest: function () {
            element(by.control({
                id: "APD_::text-inner",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys("test");
        },

        iClickMail:function () {
            element(by.control({
                controlType: "sap.m.Button",
                viewId: "fiorirequirementsui::RequirementsList",
                properties: {
                    text: "Mail"
                },
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "BDI-content"
                }
            })).click();
        },
    //Mail PopUP
    iEnterSolution: function (sl) {
        element(by.control({
            id: "APD_::solution-inner",
            searchOpenDialogs: true,
            interaction: {
                idSuffix: "inner"
            }
        })).sendKeys(sl);
    },
    IClickSolution: function () {
        element(by.control({
            controlType: "sap.m.Button",
            viewId: "fiorirequirementsui::RequirementsList",
            properties: {
                text: "Solution"
            },
            searchOpenDialogs: true,
            interaction: {
                idSuffix: "BDI-content"
            }
        })).click();
    }
    },
 iClickDelete: function () {
    element(by.control({
        controlType: "sap.m.Button",
        properties: {
            text: "Löschen"
        },
        searchOpenDialogs: true,
        interaction: {
            idSuffix: "BDI-content"
        }
    })).click();
    }
    
});