# HeroesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Introduction

The project is intended for companies that wish to hire staff and require technical validation of the candidate.

- Addressed to the company.

## Requirements

- NodeJS v18.19.1
- Angular 18

## Dependencies

- Angular Material v18.

## Install / Update

### Install

1. Installation of NodeJS ([download link](https://nodejs.org/es)).
2. Cloning the project ([link to the project](https://github.com/tomasbalducchidev/heroes-frontend)).
3. Instalación de dependencias.
   - `npm install`

### Development

Development on this project will always be done on a separate branch, created from the updated code that exists in the `develop` branch. The desired functionality will be implemented, and only after validation, a PR can be made to be integrated into the `develop` branch.

The project version must be updated in the `package.json` file, and version notes added to the `CHANGELOG.md` file.

Simple states are managed with signals instead of BehaviorSubject to reduce lines of code.

The 'ngModel' approach used by default in Angular material inputs is replaced by the use of Reactive Forms to access the model directly instead of through the template.

A colors.scss file is used to define color variables.

Modals are used to perform actions associated with a previous one, instead of routing to new views to simplify the visual load for the user.

A reusable 'Button' component is created to avoid repeating code.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
