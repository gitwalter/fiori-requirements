using com.fiori.requirements from '../db/schema';

type mailType {
    to      : String @title : 'To';
    subject : String @title : 'Subject';
    text    : String @UI.MultiLineText
}

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

    @sap.applicable.path : 'sendMail'
    action sendMail(mail : mailType);
}

// service RequirementService {
//     entity Requirements as projection on requirements.Requirements
// }

service mail {
    action sendMail(to : String @title : 'To', subject : String @title : 'Subject', text : String @title : 'Text');
}
