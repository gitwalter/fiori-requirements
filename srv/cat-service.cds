using com.fiori.requirements from '../db/schema';

service requirements_service {
    entity Status       as select from requirements.Status;

    entity Requirements as projection on requirements.Requirements actions {
        @sap.applicable.path : 'setToReported'
        action setToReported();
        @sap.applicable.path : 'setToWorkInProgress'
        action setToWorkInProgress();
        @sap.applicable.path : 'setToSolved'
        action setToSolved();
        @sap.applicable.path : 'setSolution'
        action setSolution(solution : String);
    };

    @sap.applicable.path :               'sendMail'
    action sendMail(to : String @title : 'To', subject : String @title : 'Subject', text : String @title : 'Text');
}

// service RequirementService {
//     entity Requirements as projection on requirements.Requirements
// }

service mail {
    action sendMail(to : String @title : 'To', subject : String @title : 'Subject', text : String @title : 'Text');
}
