# AutoPartsEcommerce
This web shop is designed using Angular for frontend and Spring framework for the backend.

Here you can see the link to the backend:[Spring backend](https://github.com/bozduran/PartsWarehouseManager).

Here you can see a demo of the working app:[Demo video](https://github.com/bozduran/AutoPartsEcommerce/blob/master/Demo%20AutoParts.mkv).


Among those 2 framework I have used [Okta](https://developer.okta.com/) for the security and [Stripe](https://stripe.com/en-gr)
for the payments procescing.













This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

##  Install okta widgedts 
`npm install @okta/okta-signin-widget`

`npm install @okta/okta-angular`

`npm audit fix` 

`ng version`
##  Install stripe
`npm install stripe`

## Add https use the command :
```bash
openssl req -x509 \
  -out ssl-localhost/localhost.crt \
  -keyout ssl-localhost/localhost.key \
  -newkey rsa:2048 -nodes -sha256 -days 365 \
  -config localhost.conf
```
