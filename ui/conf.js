exports.config = {
  profile: "integration",
  baseUrl: "https://brille-enterprise-dev.launchpad.cfapps.eu10.hana.ondemand.com/df0ed918-a12e-412a-bbd4-968aa1275e23.fiori_requirements.fiorirequirementsui-1.0.0/index.html#fe-lrop-v4",
  authOnce: true,
auth: {
  'sapcloud-form': {
     config: 'Form-Authenticator',
     idpSelector: 'a[href*="https://arqgyqmrp"]', //html atag
      user: 'tester@fielmann.net',
      pass:  'Fielmann123?',
  }
},
};
