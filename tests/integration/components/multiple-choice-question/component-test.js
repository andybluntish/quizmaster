import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('multiple-choice-question', 'Integration | Component | multiple choice question', {
  integration: true
});

const mockQuestion = {
  'id': 2,
  'question': 'What is the most common language?',
  'answers': [
    'English',
    'Hindi',
    'Spanish',
    'Mandarin'
  ],
  'correctAnswer': 3
};

test('it renders a radio input and label for each answer', function(assert) {
  assert.expect(3);

  this.set('data', mockQuestion);
  this.render(hbs`{{multiple-choice-question data=data}}`);

  const radioInputs = this.$('[type="radio"][name="question_2"]');
  const labels = this.$('label');

  assert.equal(radioInputs.length, 4, 'correct number of radio buttons in a group');
  assert.equal(labels.length, 4, 'correct number of labels');
  assert.equal(labels.last().text().trim(), 'Mandarin', 'correct label value');
});

test('it triggers external action when answer is selected', function(assert) {
  assert.expect(2);

  this.set('data', mockQuestion);
  this.set('showValidation', false);
  this.render(hbs`{{multiple-choice-question data=data setScore=externalAction}}`);

  // Selecting the second answer (incorrect)
  this.set('externalAction', data => {
    assert.equal(data, 0, 'no points when answer is incorrect');
  });
  this.$('input:eq(1)').click();

  // Selecting the last answer (correct!)
  this.set('externalAction', data => {
    assert.equal(data, 1, '1 point when answer is correct');
  });
  this.$('input:eq(3)').click();
});

test('if showValidation is true, disable form controls', function(assert) {
  assert.expect(1);

  this.set('data', mockQuestion);

  // should not be called because controls are disabled
  this.set('externalAction', () => {
    assert.ok(true, 'external action not called when showValidation is true');
  });

  this.render(hbs`{{multiple-choice-question data=data setScore=externalAction showValidation=true}}`);

  const input = this.$('input:eq(1)');

  input.click();
  assert.equal(input.prop('disabled'), true, 'inputs are disabled');
});

test('it adds an appropriate correct/incorrect className when showValidation is true', function(assert) {
  assert.expect(4);

  this.set('data', mockQuestion);
  this.set('showValidation', false);

  this.render(hbs`{{multiple-choice-question data=data showValidation=showValidation}}`);

  // Incorrect
  this.$('input:eq(1)').click();
  assert.ok(!this.$('div').hasClass('question--incorrect'), 'no validation className since showValidation is false');
  this.set('showValidation', true);
  assert.ok(this.$('div').hasClass('question--incorrect'), 'question has "incorrect" class when answer is incorrect and showValidation is true');

  // Correct!
  this.set('showValidation', false);
  this.$('input:eq(3)').click();
  assert.ok(!this.$('div').hasClass('question--correct'), 'no validation className since showValidation is false');
  this.set('showValidation', true);
  assert.ok(this.$('div').hasClass('question--correct'), 'question has "correct" class when answer is correct');
});

test('it shows the correct answer when showValidation is true, and the selectedAnswer is incorrect', function(assert) {
  assert.expect(5);

  this.set('data', mockQuestion);
  this.set('showValidation', false);

  this.render(hbs`{{multiple-choice-question data=data showValidation=showValidation}}`);

  // Incorrect
  this.$('input:eq(1)').click();
  assert.equal(this.$('.question__solution').length, 0, 'correct answer is not shown');
  this.set('showValidation', true);
  assert.equal(this.$('.question__solution').length, 1, 'correct answer is shown');

  this.$('input:eq(1)').click();
  this.render(hbs`{{multiple-choice-question data=data showValidation=showValidation}}`);
  assert.ok(this.$('.question__solution').text().indexOf('Mandarin') > -1, 'correct answer value is shown');

  // Correct!
  this.set('showValidation', false);
  this.$('input:eq(3)').click();
  assert.equal(this.$('.question__solution').length, 0, 'correct answer is not shown');
  this.set('showValidation', true);
  assert.equal(this.$('.question__solution').length, 0, 'correct answer is not shown');
});
