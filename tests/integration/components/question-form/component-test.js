import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('question-form', 'Integration | Component | question form', {
  integration: true
});

test('for each item in the questions attribute, yeild the item, a setScore action, and isSubmitted boolean', function(assert) {
  assert.expect(3);

  let questions = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

  this.set('questions', questions);
  this.render(hbs`{{#question-form questions=questions as |question setScore isSubmitted|}}
    <p class="item">
      <span class="id">{{question.id}}</span>
      <span class="isSubmitted">{{isSubmitted}}</span>
    </p>
  {{/question-form}}`);

  let items = this.$('.item');

  assert.equal(items.length, 3, 'correct number of questions');
  assert.equal(items.last().find('.id').text(), '3', 'correct question ID');
  assert.equal(items.last().find('.isSubmitted').text(), 'false', 'correct isSubmitted value');
});

test('it should trigger an external action to send question scores on form submit', function(assert) {
  assert.expect(1);

  let questions = [{ id: 5 }];
  let expected = { 5: 2 };

  this.set('questions', questions);
  this.set('externalAction', (data) => {
    assert.deepEqual(data, expected, 'submitted value is passed to external action');
  });

  this.render(hbs`{{#question-form questions=questions submitScores=(action externalAction) as |question setScore isSubmitted|}}
    <button {{action setScore 2}}>{{question.id}}</button>
  {{/question-form}}`);

  this.$('button').first().click();
  this.$('[type="submit"]').click();
});

test('quiz may be submitted once, only after all questions have been attempted', function(assert) {

  // assertion is in the submitScores callback, so even though we're attempting
  // to submit multiple times, this test will only pass if it's successful only
  // once.
  assert.expect(1);

  let questions = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

  let expected = {
    1: 1,
    2: 1,
    3: 1
  };

  this.set('questions', questions);
  this.set('externalAction', (data) => {
    assert.deepEqual(data, expected, 'submitted value is passed to external action');
  });

  this.render(hbs`{{#question-form questions=questions submitScores=(action externalAction) as |question setScore isSubmitted|}}
    <button {{action setScore 1}}>{{question.id}}</button>
  {{/question-form}}`);

  // No answers, so submission should fail
  this.$('[type="submit"]').click();

  // Incomplete, so submitScores should not be called
  this.$('button:eq(0)').click();
  this.$('[type="submit"]').click();

  // Incomplete, so submitScores should not be called
  this.$('button:eq(1)').click();
  this.$('[type="submit"]').click();

  // Complete, so submitScores should be called!
  this.$('button:eq(2)').click();
  this.$('[type="submit"]').click();

  // Already submitted, so submitScores should not be called again
  this.$('[type="submit"]').click();
});
