require("./pages/main");
require("./pages/details");
require("./pages/popup");

describe("creation", function () {
let appName = 'TestApp'
let description ="This App does not run"
let problem ="App crashes"
let solution ="report query"
let number = 2
let receiver = 'test@tt.com'

  it("should Create an issue", function () {
  When.onTheMainPage.iClickOnCreateButton();
  debugger;
  When.onTheDetailsPage.iEnterAppName(appName);
  When.onTheDetailsPage.iEnterDescription(description);
  When.onTheDetailsPage.iEnterProblem(problem);
  When.onTheDetailsPage.iEnterSolution(solution);
  When.onTheDetailsPage.iChooseWorkinProgress();
  When.onTheDetailsPage.iClickonCreate();
  When.onTheDetailsPage.iClickBack();
  Then.onTheMainPage.iSeeStart();
 });

/*
 it("should send mail", function () {
  When.onTheMainPage.iClickOnMail();
  When.onThePopupPage.iEnterReceiver(receiver);
  When.onThePopupPage.iClickMail();
  Then.onTheMainPage.iSeeStart();
 });

it("should find an issue by requirmentnumber", function () {
  When.onTheMainPage.iEnterRequirementNumber();
  When.onTheMainPage.iClickonStart();
  Then.onTheMainPage.iSeeRequirement();
  }); 

it("should change status to solution", function () {
  When.onTheMainPage.iEnterRequirementNumber();
  When.onTheMainPage.iClickonStart();
  When.onTheMainPage.iSelectRequirements();
  When.onTheMainPage.iClickSolution();
  When.onThePopupPage.iEnterSolution();
  When.onThePopupPage.IClickSolution();
  Then.onTheMainPage.iSeeStart();
  }); 

  it("should change status to report", function () {
    When.onTheMainPage.iEnterRequirementNumber();
    When.onTheMainPage.iClickonStart();
    When.onTheMainPage.iSelectRequirements();
    When.onTheMainPage.iClickonReport();
    Then.onTheMainPage.iSeeStart();
    });  

  it("should change status to work in progress", function () {
    When.onTheMainPage.iEnterRequirementNumber();
    When.onTheMainPage.iClickonStart();
    When.onTheMainPage.iSelectRequirements();
    When.onTheMainPage.iClickonWorkinProgress();
    Then.onTheMainPage.iSeeStart();
    });  

  it("should change status to solved", function () {
    When.onTheMainPage.iEnterRequirementNumber();
    When.onTheMainPage.iClickonStart();
    When.onTheMainPage.iSelectRequirements();
    When.onTheMainPage.iClickonSolved();
    Then.onTheMainPage.iSeeStart();
    });  

  it("should delete a requirement", function () {
    When.onTheMainPage.iEnterRequirementNumber();
    When.onTheMainPage.iClickonStart();
    When.onTheMainPage.iSelectRequirements();
    When.onSolution.iClickDelete();
    When.onThePopupPage.iClickDelete();
    Then.onTheMainPage.iSeeStart();
    });   

  it("Requirement can be edited", function () {
    let pb = 'testproblem solved'
    let sl = 'no issue'
    When.onTheMainPage.iEnterRequirementNumber();
    When.onTheMainPage.iClickonStart();
    When.onTheMainPage.iSelectRequirements();
    When.onTheMainPage.iClickonRequirement();
    When.onTheDetailsPage.iEnterProblem(pb);
    When.onTheDetailsPage.iEnterSolution(sl);
    When.onTheDetailsPage.iClickonCreate();
    Then.onTheDetailsPage.iClickBack();
    Then.onTheMainPage.iSeeStart();
    });     
*/
 });

