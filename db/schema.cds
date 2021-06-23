namespace com.fiori.requirements;

using {
    cuid,
    managed,
    sap.common.CodeList as CodeList
} from '@sap/cds/common';


entity Requirements : cuid, managed {
    number      : Integer               @title : 'Requirement Number'  @readonly;
    problem     : String                @title : 'Problem';
    app         : String                @title : 'App';
    description : String                @title : 'Description'  @UI.MultiLineText;
    solution    : String                @title : 'Solution';
    status      : Association to Status @title : 'Status' @readonly;
    user        : String                @title : 'User';
}

annotate Requirements with {
    ID     @Core.Computed
    //status @Common.ValueListWithFixedValues
}

@cds.odata.valuelist
entity Status : CodeList, managed {
    key ID           : Integer;
        requirements : Association to many Requirements
                           on requirements.status = $self
};

annotate Status with {
    descr @readonly
}

// annotate Status with {

//     descr @Common : {
//         Text            : descr,
//         TextArrangement : #TextOnly,
//         //insert your value list here
//         ValueList       : {
//             $Type          : 'Common.ValueListType',
//             Label          : 'Status',
//             CollectionPath : 'Status',
//             Parameters     : [
//                 {
//                     $Type             : 'Common.ValueListParameterInOut',
//                     LocalDataProperty : ID,
//                     ValueListProperty : 'code'
//                 },
//                 {
//                     $Type             : 'Common.ValueListParameterDisplayOnly',
//                     ValueListProperty : 'descr'
//                 }
//             ]
//         }
//     };
// };
