module.exports = createPageObjects({
  Main: {
    actions: {
      // add action functions 
      iClickOnCreateButton: function () {
        element(by.control({
            id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::StandardAction::Create",
            interaction: {
                idSuffix: "BDI-content"
            }
        })).click();
    },
    
      iClickOnMail: function () {
        element(by.control({
            id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.EntityContainer::sendMail",
            interaction: {
                idSuffix: "BDI-content"
            }
        })).click();
    },

      iEnterRequirementNumber: function (req) {
        element(by.control({
            id: "fiorirequirementsui::RequirementsList--fe::FilterBar::Requirements::FilterField::number-inner",
            interaction: {
                idSuffix: "inner"
            }
        })).sendKeys(req);
    },
    
    iClickonStart: function () {
      element(by.control({
          id: "fiorirequirementsui::RequirementsList--fe::FilterBar::Requirements-btnSearch",
          interaction: {
              idSuffix: "content"
          }
      })).click();
    },

    iClickSolution: function () {
      element(by.control({
          id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setSolution",
          interaction: {
              idSuffix: "BDI-content"
          }
      })).click();
    },

    iClickonReport: function () {
      element(by.control({
          id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setToReported",
          interaction: {
              idSuffix: "BDI-content"
          }
      })).click();
  },
  
  iClickonWorkinProgress: function () {
    element(by.control({
        id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setToWorkInProgress",
        interaction: {
            idSuffix: "BDI-content"
        }
    })).click();
    },
  
  iClickonSolved: function () {
    element(by.control({
        id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setToSolved",
        interaction: {
            idSuffix: "BDI-content"
        }
    })).click();
    },

  iClickDelete: function () {
    element(by.control({
        id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::StandardAction::Delete",
        interaction: {
            idSuffix: "BDI-content"
        }
    })).click();
    }, 
 
  iSelectRequirements:  function () {
    element(by.control({
        controlType: "sap.m.CheckBox",
        viewId: "fiorirequirementsui::RequirementsList",
        properties: {
            editable: true
        },
        ancestor: {
            controlType: "sap.m.ColumnListItem",
            viewId: "fiorirequirementsui::RequirementsList",
            bindingPath: {
                path: "/Requirements(ID=539f60d7-d8e1-4482-b6bb-f8b0d41f7b41,IsActiveEntity=false)"
            },
            ancestor: {
                id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem-innerTable"
            }
        },
        interaction: {
            idSuffix: "CbBg"
        }
    })).click();
      },
    iClickSolution: function () {
      element(by.control({
          id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setSolution",
          interaction: {
              idSuffix: "BDI-content"
          }
      })).click();
  },

  iClickonReport: function () {
    element(by.control({
        id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setToReported",
        interaction: {
            idSuffix: "BDI-content"
        }
    })).click();
},
iClickonWorkinProgress: function () {
  element(by.control({
      id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setToWorkInProgress",
      interaction: {
          idSuffix: "BDI-content"
      }
  })).click();
},

iClickonSolved: function () {
  element(by.control({
      id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::DataFieldForAction::requirements_service.setToSolved",
      interaction: {
          idSuffix: "BDI-content"
      }
  })).click();
},

iClickDelete: function () {
  element(by.control({
      id: "fiorirequirementsui::RequirementsList--fe::table::Requirements::LineItem::StandardAction::Delete",
      interaction: {
          idSuffix: "content"
      }
  })).click();
},
iClickonRequirement: function () {
  element(by.control({
      controlType: "sap.m.ColumnListItem",
      viewId: "fiorirequirementsui::RequirementsList",
      bindingPath: {
          path: "/Requirements(ID=539f60d7-d8e1-4482-b6bb-f8b0d41f7b41,IsActiveEntity=false)",
          propertyPath: "ID"
      }
  })).click();
}
    },
    assertions: {
      // add assertion functions here
      iSeeStart: function () {
        element(by.control({
            id: "fiorirequirementsui::RequirementsList--fe::FilterBar::Requirements-btnSearch"
        }));
     },
     iSeeRequirement:  function () {
      element(by.control({
          controlType: "sap.m.ColumnListItem",
          viewId: "fiorirequirementsui::RequirementsList",
          bindingPath: {
              path: "/Requirements(ID=539f60d7-d8e1-4482-b6bb-f8b0d41f7b41,IsActiveEntity=false)",
              propertyPath: "ID"
          }
      }));
  }

    }
  }
});
