import Ember from 'ember';

const {
  Route,
  get,
  inject: { service }
} = Ember;

export default Route.extend({
  session: service(),

  beforeModel(transition) {
    let { params: { quiz: { quiz_id: currentQuizId } } } = transition;
    let userSubmissions = get(this, 'session.userSubmissions');
    let lastSubmission = userSubmissions[userSubmissions.length -1];

    // Ensure that this is the 'next' quiz in sequence!

    // If there have been previous submissions...
    if (lastSubmission) {
      // and this quiz ID is the next in the sequence (one more than the last submission)
      if (parseInt(currentQuizId) === parseInt(lastSubmission.quizId) + 1) {

        // continue to load the route.
        return;
      }
    } else {

      // There are no previous submissions, is this the first quiz in the sequence?
      if (currentQuizId === "1") {
        // continue to load the route.
        return;
      }
    }

    // This is not the next quiz in the sequence, so abort
    this.transitionTo('quizzes');
  }
});
