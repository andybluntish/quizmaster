import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  question: attr('string'),
  answers: attr(),
  correctAnswer: attr('number'),
  quiz: belongsTo('quiz')
});
