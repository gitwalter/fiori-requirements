module.exports = createPageObjects({
    Details: {
      actions: {
        // add action functions here
        iEnterAppName: function (name) {
            element(by.control({
                id: "fiorirequirementsui::RequirementsObjectPage--fe::FormContainer::FieldGroup::Details::FormElement::DataField::app::Field-edit",
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys(name);
        },
        iEnterDescription: function (desc) {
            element(by.control({
                id: "fiorirequirementsui::RequirementsObjectPage--fe::FormContainer::FieldGroup::Details::FormElement::DataField::description::Field-edit",
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys(desc);
        },

        iEnterProblem: function (prob) {
            element(by.control({
                id: "fiorirequirementsui::RequirementsObjectPage--fe::FormContainer::FieldGroup::Details::FormElement::DataField::problem::Field-edit",
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys(prob);
        },

        iEnterSolution: function (sol) {
            element(by.control({
                id: "fiorirequirementsui::RequirementsObjectPage--fe::FormContainer::FieldGroup::Details::FormElement::DataField::solution::Field-edit",
                interaction: {
                    idSuffix: "inner"
                }
            })).sendKeys(sol);
        },

        iChooseWorkinProgress: function () {
            element(by.control({
                id: "fiorirequirementsui::RequirementsObjectPage--fe::Form::FieldGroup::Details::DataFieldForAction::requirements_service.setToWorkInProgress",
                interaction: {
                    idSuffix: "BDI-content"
                }
            })).click();
        },
        iClickonCreate: function () {
            element(by.control({
                id: "fiorirequirementsui::RequirementsObjectPage--fe::FooterBar::StandardAction::Save",
                interaction: {
                    idSuffix: "BDI-content"
                }
            })).click();
        },
        iClickBack: function () {
            element(by.control({
                id: "backBtn"
            })).click();
        }
      },
      assertions: {
        // add assertion functions here
        validate: function () {
          expect(element(by.control({
            controlType: "sap.m.Button"
          })).isDisplayed()).toBeTruthy();
        }
      }
    }
  });
  