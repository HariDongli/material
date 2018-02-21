// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BASE_API_URL: 'http://localhost:4200',
  BASE_LOCAL_URL: 'http://demo.siga.akka.eu:9090/siga',
  BASE_NOELLE_URL: 'http://172.25.156.34:9091/siga',
};
