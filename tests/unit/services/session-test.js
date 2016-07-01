import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { get } = Ember;

moduleFor('service:session', 'Unit | Service | session', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it saves a user submission for a Quiz', function(assert) {
  let service = this.subject();
  let submission = {
    quizId: 1,
    finalScore: 2,
    potentialScore: 3
  };

  assert.equal(get(service, 'userSubmissions.length'), 0, 'user submissions are blank');

  service.submitQuizScore(submission);

  assert.equal(get(service, 'userSubmissions.length'), 1, 'correct new submission length');
  assert.equal(get(service, 'userSubmissions.firstObject'), submission, 'submission saved to session');
});

test('it finds a quiz submission by ID', function(assert) {
  let service = this.subject();
  let submission1 = {
    quizId: 1,
    finalScore: 2,
    potentialScore: 3
  };

  let submission2 = {
    quizId: 2,
    finalScore: 5,
    potentialScore: 5
  };

  service.submitQuizScore(submission1);

  assert.equal(service.getSubmission(1), submission1, 'finds correct submission for Quiz 1');
  assert.equal(service.getSubmission(2), null, 'returns null for Quiz without submission');

  service.submitQuizScore(submission2);

  assert.equal(service.getSubmission(2), submission2, 'finds correct submission for Quiz 1');
});
