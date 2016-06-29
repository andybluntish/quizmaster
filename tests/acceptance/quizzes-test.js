import { test } from 'qunit';
import moduleForAcceptance from 'quizmaster/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | quizzes');

test('list all the Quizzes', function(assert) {
  assert.expect(2);

  visit('/');

  andThen(function() {
    const quizzes = find('.quiz-list .quiz-list__item');
    assert.equal(quizzes.length, 5);

    const quiz = find('.quiz-list .quiz-list__item:eq(0) .quiz-list__title');
    assert.equal(quiz.text(), 'Quiz 1');
  });
});

test('clicking on a Quiz link navigates to the Quiz page', function(assert) {
  assert.expect(1);

  visit('/');
  click('.quiz-list .quiz-list__item:eq(0) .quiz-list__link');

  andThen(function() {
    assert.equal(currentURL(), '/quizzes/1');
  });
});
