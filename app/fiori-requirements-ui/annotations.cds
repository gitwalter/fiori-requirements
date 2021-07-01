using requirements_service as service from '../../srv/cat-service';

annotate service.Requirements @odata.draft.enabled;

//List Page
annotate service.Requirements with @(UI : {
    Identification  : [{Value : problem}],
    SelectionFields : [number],

    LineItem        : [
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.EntityContainer/sendMail',
            Label  : 'Mail',

        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'requirements_service.setSolution',
            Label  : 'Solution',

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
            Value : solution,
            Label : 'Solution'
        },
        {
            Value : status_ID,
            Label : 'Status'
        },
        {
            Value : status.descr,
            Label : 'Status Text'
        },
        {
            $Type : 'UI.DataFieldWithUrl',
            Value : 'https://www.google.de',
            Url   : 'https://www.google.de',
            Label : 'Column label'
        }
    ]}
});

annotate service.Requirements with {

    @Common.Label                    : 'Status'

    @Common                          : {

        Text            : status.descr,
        TextArrangement : #TextOnly

    }

    @Common.ValueListWithFixedValues : true

    @Common.ValueList                : {

        $Type          : 'Common.ValueListType',
        Label          : 'Status',
        CollectionPath : 'Status',

        Parameters     : [

            {

                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : status_ID,
                ValueListProperty : 'ID'

            },

            {

                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'descr'

            }

        ]

    }

    @Core.Description                : 'Status'

    status

};
