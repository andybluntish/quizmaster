import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('quiz', 'Unit | Model | quiz', {
  // Specify the other units that are required for this test.
  needs: ['model:question']
});

test('should have many Questions', function(assert) {
  let Quiz = this.store().modelFor('quiz');
  let relationship = get(Quiz, 'relationshipsByName').get('questions');

  assert.equal(relationship.key, 'questions', 'has relationship with question');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
