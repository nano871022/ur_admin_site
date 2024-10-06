
# UrAdminSite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## settings

we need set two links folder to project

* .firebase on root folder save into properties private project
> ln -s ../folder/.firebase/on/properties/private/project/ .firebase

* envitonment.ts and environments.development.ts on src/environments folder use hard link, that files is into properties private project site admin folder and enviroment folders
> ln ../folder/enviroments/on/properties/private/project/environments.ts 
> ln ../folder/enviroments/on/properties/private/project/environments.development.ts 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run command to compile to test in local machine to redirect files to browser folder into dest folder

> build ng build --base-href /browser/

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Connected with firebase to Torres San Sebastian

command
> firebase deploy

it was used to select what api will be use the project to work with firebase
> firebase init

install firebase library
> npm install -g firebase-tools

command to connect with firebase
> firebase login

test application in local
> firebase emulators:start

Run test mode firebase app with other settings
> firebase emulators:start


steps to setting firebase
 
* install firebase
* login firebase
* init firebase
* deploy on firebase

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
