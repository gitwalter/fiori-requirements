using requirements_service as service from '../../srv/cat-service';

annotate service.Requirements @odata.draft.enabled;

//List Page
annotate service.Requirements with @(UI : {
    Identification  : [{Value : problem}],
    SelectionFields : [number],

    LineItem        : [
          {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.EntityContainer/sayHello',
            Label  : 'Say Hello'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setToReported',
            Label  : 'Report'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setToWorkInProgress',
            Label  : 'Work In Progress'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setToSolved',
            Label  : 'Solved'
        },
        {
            Value : number,
            Label : 'Requirement Number'
        },
        {
            Value : problem,
            Label : 'Title'
        },

        {            
            Value : description,
            Label : 'Description'
        },
        {
            Value : status.descr,            
            Label : 'Status Text',           
        }
    ]
});

//Object Page

annotate service.Requirements with @(UI : {
    Facets              : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Details',
        Target : '@UI.FieldGroup#Details'
    }, ],


    FieldGroup #Details : {Data : [
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setToReported',
            Label  : 'Report'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setToWorkInProgress',
            Label  : 'Work In Progress'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setToSolved',
            Label  : 'Solved'
        },

        {
            Value : number,
            Label : 'Requirement Number'
        },
        {
            Value : app,
            Label : 'App'
        },
        {
            Value : problem,
            Label : 'Problem'
        },
        {
            Value : description,
            Label : 'Description'
        },
        {
            Value : status_ID,
            Label : 'Status'
        },
        {
            Value : status.descr,
            Label : 'Status Text'
        }
    ]}
});
