import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: 'question-form',
  questions: null,
  scores: null,
  isSubmitted: false,

  init() {
    set(this, 'scores', {});

    return this._super(...arguments);
  },

  submit(e) {
    e.preventDefault();

    // Only allow submitting once
    if (get(this, 'isSubmitted')) {
      return;
    }

    const scores = get(this, 'scores');
    const questions = get(this, 'questions');
    const completed = Object.keys(scores).length === questions.length;

    if (completed) {
      const submitScores = get(this, 'submitScores');
      set(this, 'isSubmitted', true);
      submitScores(scores);
    }
  },

  actions: {
    setScore(id, score) {
      set(this, `scores.${id}`, score);
    }
  }
});
