import Ember from 'ember';

const {
  Service,
  get,
  set
} = Ember;

export default Service.extend({
  userId: null,
  userSubmissions: null,

  init() {
    this._super(...arguments);

    // Mock user session by manually setting userId
    // TODO: fetch user data from server
    set(this, 'userId', 1);

    // Mock userSubmission data
    // TODO: fetch initial user submission data from server
    set(this, 'userSubmissions', []);
  },

  submitQuizScore(submission) {
    let userSubmissions = get(this, 'userSubmissions');

    userSubmissions.pushObject(submission);

    // TODO: sync submission to the server
  },

  getSubmission(quizId) {
    let userSubmissions = get(this, 'userSubmissions');
    let [submission = null] = userSubmissions.filter((submission) => submission.quizId === quizId);

    return submission;
  },

  // TODO: send credentials to the server to login
  signin(/*username, password*/) {},

  // TODO: destroy session data
  signout() {},
});
