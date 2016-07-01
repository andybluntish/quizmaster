# Quizmaster

Blake JS Test quiz application.

This is a simple quiz application written in Ember, consisting of multiple quizzes that each contain a number of multiple-choice questions. Each quiz must be completed in order before the next becomes available.

The application functionality is primarily contained within two components: a wrapper `{{question-form}}` component to handle submission and score aggregation, and a `{{multiple-choice-question}}` for each question in the quiz. This allows each question to provide its own answer validation and rendering, keeping the option to add more question types in the future. At submission, the question answers are validated inline to give immediate feedback, and the correct answer is given if the question is marked as incorrect.

User scores and progress are stored in a session service, which may be synced to a server if necessary. The application data api is mocked using [Mirage](http://www.ember-cli-mirage.com/) and the [ActiveModel adapter](https://github.com/ember-data/active-model-adapter).

## TODO:

* Refactor Controllers into a separate components
* CSS styles
* sync user session data with the server

---

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

