import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('question', 'Unit | Model | question', {
  // Specify the other units that are required for this test.
  needs: ['model:quiz']
});

test('should belong to a Quiz', function(assert) {
  let Question = this.store().modelFor('question');
  let relationship = get(Question, 'relationshipsByName').get('quiz');

  assert.equal(relationship.key, 'quiz', 'has relationship with quiz');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
