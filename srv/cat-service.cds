using com.fiori.requirements from '../db/schema';

service requirements_service {
    entity Status       as projection on requirements.Status;

    entity Requirements as projection on requirements.Requirements;
}

annotate requirements_service with @(requires : 'authenticated-user');


