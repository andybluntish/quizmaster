import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('quizzes', { path: '/' });
  this.route('quiz', { path: '/quizzes/:quiz_id' });
});

export default Router;
