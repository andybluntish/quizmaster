import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const {
  get,
  set
} = Ember;

moduleForComponent('question-form', 'Unit | Component | question form', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('setScore action sets a score value for a given question ID', function(assert) {
  assert.expect(4);

  let component = this.subject();

  assert.deepEqual(get(component, 'scores'), {}, 'scores start blank');

  component.send('setScore', 1, 1);
  assert.deepEqual(get(component, 'scores'), { 1: 1 }, 'score is set for first question');

  component.send('setScore', 3, 2);
  assert.deepEqual(get(component, 'scores'), { 1: 1, 3: 2 }, 'another score is set for a second question');

  component.send('setScore', 1, 4);
  assert.deepEqual(get(component, 'scores'), { 1: 4, 3: 2 }, 'score for the first question is updated');
});

test('isSubmitted property is set on successful sumbission', function(assert) {
  assert.expect(3);

  let component = this.subject();

  set(component, 'questions', [{ id: 1 }]);
  set(component, 'submitScores', () => {});

  assert.equal(get(component, 'isSubmitted'), false, 'not submitted initially');
  component.submit({ preventDefault() {} });

  assert.equal(get(component, 'isSubmitted'), false, 'invalid, so still not submitted');

  component.send('setScore', 1, 1);
  component.submit({ preventDefault() {} });

  assert.equal(get(component, 'isSubmitted'), true, 'has been submitted');
});
