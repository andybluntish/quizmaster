import { test } from 'qunit';
import moduleForAcceptance from 'quizmaster/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | quizzes');

test('list all the Quizzes', function(assert) {
  assert.expect(2);

  visit('/');

  andThen(() => {
    let quizzes = find('.quiz-list .quiz-list__item');
    assert.equal(quizzes.length, 5, 'correct number of quizzes');

    let quiz = find('.quiz-list .quiz-list__item:eq(0) .quiz-list__title');
    assert.equal(quiz.text(), 'Quiz 1', 'correct quiz title');
  });
});

test('clicking on a Quiz link navigates to the Quiz page', function(assert) {
  assert.expect(3);

  visit('/');
  click('.quiz-list .quiz-list__link:eq(0)');

  andThen(() => {
    assert.equal(currentURL(), '/quizzes/1', 'correct quiz URL');

    let title = find('.quiz__title');
    assert.equal(title.text(), 'Quiz 1', 'correct quiz title');

    // ensure model relationship is loaded
    let questions = find('.question');
    assert.equal(questions.length, 3, 'correct number of questions');
  });
});

test('quizzes must be completed in sequence', function(assert) {
  assert.expect(8);

  visit('/');

  andThen(() => {
    // No 'completed', one 'next', four 'upcoming'
    assert.equal(find('.quiz-group--completed').length, 0, 'no quizzes completed');
    assert.equal(find('.quiz-group--next').length, 1, 'next quiz is visible');
    assert.equal(find('.quiz-list__link').length, 1, 'only one quiz is active');
    assert.equal(find('.quiz-group--upcoming .quiz-list__item').length, 4, 'correct number of upcoming quizzes');
  });

  // Complete the quiz
  click('.quiz-list__link:eq(0)');
  click('.question:eq(0) label:contains("Russia")');
  click('.question:eq(1) label:contains("Mandarin")');
  click('.question:eq(2) label:contains("Pacific Ocean")');
  click('[type="submit"]');

  // Return to the quizzes list
  click('.question-form__return');

  andThen(() => {
    // One 'completed', one 'next', three 'upcoming'
    assert.equal(find('.quiz-group--completed .quiz-list__title').text().trim(), 'Quiz 1', 'correct completed quiz');
    assert.equal(find('.quiz-group--next .quiz-list__link').text().trim(), 'Quiz 2', 'correct next quiz');
    assert.equal(find('.quiz-group--upcoming .quiz-list__item').length, 3, 'correct number of upcoming quizzes');
    assert.equal(find('.quiz-group--upcoming .quiz-list__item:eq(0)').text().trim(), 'Quiz 3', 'correct upcoming quiz');
  });
});
