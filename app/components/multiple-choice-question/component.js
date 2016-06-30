import Ember from 'ember';

const {
  computed,
  get,
  set
} = Ember;

export default Ember.Component.extend({
  classNames: ['question', 'question--multiple-choice'],
  classNameBindings: ['answerStateClassName'],

  data: null,
  setScore: null,
  showValidation: null,
  selectedAnswer: null,

  // Calculate the score based on the currently select answer
  currentScore: computed('selectedAnswer', 'data.correctAnswer', {
    get() {
      const selectedAnswer = get(this, 'selectedAnswer');
      const correctAnswer = get(this, 'data.correctAnswer');

      if (selectedAnswer === null) {
        return null;
      }

      const score = selectedAnswer === correctAnswer ? 1 : 0;

      return score;
    }
  }),

  // If an answer has been supplied, set correct/incorrect className on the component
  answerStateClassName: computed('currentScore', 'showValidation', {
    get() {
      const currentScore = get(this, 'currentScore');
      const showValidation = get(this, 'showValidation');

      if (!showValidation || currentScore === null) {
        return '';
      } else if (currentScore === 0) {
        return 'question--incorrect';
      } else {
        return 'question--correct';
      }
    }
  }),

  solution: computed('showValidation', 'currentScore', {
    get() {
      const showValidation = get(this, 'showValidation');
      const answers = get(this, 'data.answers');
      const correctAnswer = get(this, 'data.correctAnswer');
      const selectedAnswer = get(this, 'selectedAnswer');

      if (!showValidation || correctAnswer === selectedAnswer) {
        return;
      }

      return answers[correctAnswer];
    }
  }),

  actions: {
    selectAnswer(answer) {
      if (get(this, 'showValidation')) {
        return;
      }

      set(this, 'selectedAnswer', answer);

      const setScore = get(this, 'setScore');
      const currentScore = get(this, 'currentScore');

      if (typeof setScore === 'function') {
        setScore(currentScore);
      }
    }
  }
});
