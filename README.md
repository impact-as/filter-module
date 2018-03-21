# FilterModule

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Use cases

### Getting the filtered entity list

* Inject the filter service in a components contructor.
* Subscribe to the filterered entity list by mapping out the entities property from the filter model. This subscription will get updated everytime any facets get updated.

### Getting facets

* Inject the filter service in a components contructor.
* Subscribe to the facets property from the filter model and possible filter (Array.prototype.filter()) out unwanted facets. This subscription will get updated everytime any facets get updated.

### Updating facets

* Inject the filter service in a components contructor.
* Call the update method on the filter service with a new facet state.

## Future developments

With a little work the filter service can become independent of Angular

* Inject a more general HTTP library
* Inject a route service which can be called whenever the filter is updated
* Replace route-subscription with a updateUrl(url: string) method
