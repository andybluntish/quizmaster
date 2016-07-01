import Ember from 'ember';

const {
  Controller,
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  session: service(),

  actions: {
    submitScores(scores) {
      let quiz = get(this, 'model');
      let quizId = get(quiz, 'id');
      let potentialScore = get(quiz, 'questions.length');
      let scoreValues = Object.keys(scores).map((k) => scores[k]);
      let finalScore = scoreValues.reduce((prev, curr) => prev + curr);
      let session = get(this, 'session');
      let submission = { quizId, finalScore, potentialScore };

      session.submitQuizScore(submission);
    }
  }
});
