using com.fiori.requirements from '../db/schema';

type actionReturn {
    acknowledge : String enum {
        succeeded;
        failed;
    };
    message     : String;
};

service requirements_service {
    entity Status       as select from requirements.Status;

    entity Requirements as projection on requirements.Requirements actions {
                @sap.applicable.path : 'setToReported'
        action setToReported() returns           actionReturn;
                @sap.applicable.path : 'setToWorkInProgress'
            action setToWorkInProgress() returns actionReturn;
                @sap.applicable.path : 'setToSolved'
                action setToSolved() returns     actionReturn;
                @sap.applicable.path : 'setSolution'
                action setSolution(solution: String) returns     actionReturn;
            };
}


service RequirementsViewService {
    entity RequirementsView as select from requirements.RequirementsView;
}
