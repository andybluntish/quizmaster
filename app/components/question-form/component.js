import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: 'question-form',
  questions: null,
  scores: null,
  finalScore: null,
  submitScores: null,
  isSubmitted: false,

  init() {
    set(this, 'scores', {});

    return this._super(...arguments);
  },

  potentialScore: computed('questions.[]', {
    get() {
      let potentialScore = get(this, 'questions.length');

      return potentialScore;
    }
  }),

  submit(e) {
    e.preventDefault();

    // Only allow submitting once
    if (get(this, 'isSubmitted')) {
      return;
    }

    let scores = get(this, 'scores');
    let totalAnswers = Object.keys(scores).length;
    let totalQuestions = get(this, 'questions.length');
    let completed = totalAnswers === totalQuestions;

    if (completed) {
      let submitScores = get(this, 'submitScores');
      let scoreValues = Object.keys(scores).map((k) => scores[k]);
      let finalScore = scoreValues.reduce((prev, curr) => prev + curr);

      set(this, 'finalScore', finalScore);
      set(this, 'isSubmitted', true);

      if (typeof submitScores === 'function') {
        submitScores(scores);
      }
    }
  },

  actions: {
    setScore(id, score) {
      set(this, `scores.${id}`, score);
    }
  }
});
