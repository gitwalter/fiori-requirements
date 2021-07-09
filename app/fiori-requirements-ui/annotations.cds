using requirements_service as service from '../../srv/cat-service';

annotate service.Requirements @odata.draft.enabled;

//List Page
annotate service.Requirements with @(UI : {
    Identification  : [{Value : problem}],
    SelectionFields : [status_ID],

    LineItem        : [
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

      HeaderFacets              : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Requirement',
        Target : '@UI.FieldGroup#Header'
    }, ],

     FieldGroup #Header : {Data : [
        {
            Value : number,
            Label : 'Number'
        },       
    ]},

    Facets              : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Details',
        Target : '@UI.FieldGroup#Details'
    }, ],

    FieldGroup #Details : {Data : [       
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
