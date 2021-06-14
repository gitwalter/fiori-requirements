namespace com.fiori.requirements;

using {
    cuid,
    managed,
    sap.common.CodeList as CodeList
} from '@sap/cds/common';


entity Requirements : managed {
        @Core.Computed
    key ID          : UUID                  @title : 'ID';
        @Core.Computed
        @readonly
        number      : Integer               @title : 'Requirement Number';
        problem     : String                @title : 'Problem';
        app         : String                @title : 'App';
        description : String                @title : 'Description'  @UI.MultiLineText;
        solution    : String                @title : 'Solution';
        @readonly
        status      : Association to Status @title : 'Status';       
        user        : String                @title : 'User';
}

entity RequirementsView as
    select from Requirements {
        ID,
        problem,
        app,
        description,
        solution,
        status.descr
    };

entity Status : CodeList, managed {
    key ID           : Integer;
        // name         : localized String(255) @title : 'Name';
        // @readonly
        // descr        : localized String(1000)@title : 'Description';        
        requirements : Association to many Requirements
                           on requirements.status = $self
};

annotate Status with  { descr @readonly };
