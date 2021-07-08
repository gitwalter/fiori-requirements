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
    solution    : String                @title : 'Solution'  @UI.MultiLineText;
    status      : Association to Status @title : 'Status';
    user        : String                @title : 'User';
}

annotate Requirements with {
    ID @Core.Computed
}

@cds.odata.valuelist
entity Status : CodeList, managed {
    key ID           : Integer;
        requirements : Association to many Requirements
                           on requirements.status = $self
};

annotate Status with {
    descr @Core.Computed
}
