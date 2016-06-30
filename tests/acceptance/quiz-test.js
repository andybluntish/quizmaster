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
