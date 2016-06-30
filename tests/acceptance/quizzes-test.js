import { test } from 'qunit';
import moduleForAcceptance from 'quizmaster/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | quizzes');

test('list all the Quizzes', function(assert) {
  assert.expect(2);

  visit('/');

  andThen(function() {
    const quizzes = find('.quiz-list .quiz-list__item');
    assert.equal(quizzes.length, 5, 'correct number of quizzes');

    const quiz = find('.quiz-list .quiz-list__item:eq(0) .quiz-list__title');
    assert.equal(quiz.text(), 'Quiz 1', 'correct quiz title');
  });
});

test('clicking on a Quiz link navigates to the Quiz page', function(assert) {
  assert.expect(3);

  visit('/');
  click('.quiz-list .quiz-list__item:eq(1) .quiz-list__link');

  andThen(function() {
    assert.equal(currentURL(), '/quizzes/2', 'correct quiz URL');

    const title = find('.quiz__title');
    assert.equal(title.text(), 'Quiz 2', 'correct quiz title');

    // ensure model relationship is loaded
    const questions = find('.question');
    assert.equal(questions.length, 2, 'correct number of questions');
  });
});
