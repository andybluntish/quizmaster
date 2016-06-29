import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  questions: hasMany('question')
});
