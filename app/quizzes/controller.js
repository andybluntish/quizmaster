import Ember from 'ember';

const {
  Controller,
  computed,
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  session: service(),

  completedQuizzes: computed('model', 'session.userSubmissions.[]', {
    get() {
      let quizzes = get(this, 'model');
      let userSubmissions = get(this, 'session.userSubmissions');
      let completedQuizzes = userSubmissions.map((submission) => {
        let { quizId, finalScore, potentialScore } = submission;
        let [quiz] = quizzes.filter((quiz) => quiz.id === quizId);

        return {
          quiz,
          finalScore,
          potentialScore
        };
      });

      return completedQuizzes;
    }
  }),

  nextQuiz: computed('model', 'session.userSubmissions.[]', {
    get() {
      let quizzes = get(this, 'model');
      let numQuizzes = get(quizzes, 'length');
      let numSubmissions = get(this, 'session.userSubmissions.length');

      if (numSubmissions === 0) {
        return get(quizzes, 'firstObject');
      } else if (numSubmissions === numQuizzes) {
        return null;
      } else {
        return quizzes.objectAt(numSubmissions);
      }
    }
  }),

  incompleteQuizzes: computed('model', 'session.userSubmissions.[]', {
    get() {
      let quizzes = get(this, 'model');
      let numSubmissions = get(this, 'session.userSubmissions.length');
      let incompleteQuizzes = quizzes.slice(numSubmissions + 1);

      return incompleteQuizzes;
    }
  })
});
