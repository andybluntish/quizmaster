import { test } from 'qunit';
import moduleForAcceptance from 'quizmaster/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | quiz');

test('view an individual Quiz and its Questions', function(assert) {
  assert.expect(6);

  visit('/quizzes/1');

  andThen(() => {
    assert.equal(currentRouteName(), 'quiz');

    let title = find('.quiz__title');
    assert.equal(title.text().trim(), 'Quiz 1', 'correct quiz title');

    let questions = find('.question');
    assert.equal(questions.length, 3, 'correct number of questions');

    let first = find('.question:eq(0)');
    let stem = first.find('.question__stem');
    let answers = first.find('.question__answer');

    assert.equal(stem.text().trim(), 'What is the second largest country (total area)?', 'first question has correct stem value');
    assert.equal(answers.length, 4, 'first question has correct number of answers');
    assert.equal(answers.first().text().trim(), 'United States', 'first question first answer has correct value');
  });
});

test('completing a quiz', function(assert) {
  assert.expect(5);

  visit('/');

  click('.quiz-list__link:eq(0)');

  andThen(() => {
    assert.equal(currentURL(), '/quizzes/1');
  });

  // Incorrect answer
  click('.question:eq(0) label:contains("Russia")');

  // Correct answers
  click('.question:eq(1) label:contains("Mandarin")');
  click('.question:eq(2) label:contains("Pacific Ocean")');

  // Sumbit
  click('[type="submit"]');

  andThen(() => {
    let solution = find('.question:eq(0) .question__solution').text();
    let actualScore = find('.question-form__score:eq(0)').text();
    let potentialScore = find('.question-form__score:eq(1)').text();

    assert.ok(solution.indexOf('Canada') !== -1, 'correct solution is displayed for incorrect answer');
    assert.equal(actualScore, 2, 'correct score exists');
    assert.equal(potentialScore, 3, 'correct potential score exists');
  });

  click('.question-form__return');

  andThen(() => {
    assert.equal(currentRouteName(), 'quizzes');
  });
});

test('quizzes must be completed in order', function(assert) {
  assert.expect(3);

  visit('/quizzes/2');
  andThen(() => {
    assert.equal(currentRouteName(), 'quizzes', 'not the first quiz, so redirected back to the quizzes page');
  });

  // Complete the first quiz
  click('.quiz-list__link:eq(0)');
  click('.question:eq(0) label:contains("Russia")');
  click('.question:eq(1) label:contains("Mandarin")');
  click('.question:eq(2) label:contains("Pacific Ocean")');
  click('[type="submit"]');
  click('.question-form__return');

  visit('/quizzes/1');
  andThen(() => {
    assert.equal(currentRouteName(), 'quizzes', 'quiz already completed, so redirected back to the quizzes page');
  });

  visit('/quizzes/3');
  andThen(() => {
    assert.equal(currentRouteName(), 'quizzes', 'not the next quiz in sequence, so redirected back to the quizzes page');
  });
});
