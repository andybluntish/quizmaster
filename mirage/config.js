import Mirage from 'ember-cli-mirage';

const QUIZZES = [
  {
    "id": 1,
    "title": "Quiz 1",
    "question_ids": [1, 2, 3]
  },
  {
    "id": 2,
    "title": "Quiz 2",
    "question_ids": [3, 4]
  },
  {
    "id": 3,
    "title": "Quiz 3",
    "question_ids": [4, 5, 1, 2]
  },
  {
    "id": 4,
    "title": "Quiz 4",
    "question_ids": [1, 3, 5]
  },
  {
    "id": 5,
    "title": "Quiz 5",
    "question_ids": [5, 1, 2]
  }
];

const QUESTIONS = [
  {
    "id": 1,
    "question": "What is the second largest country (total area)?",
    "answers": [
      "United States",
      "Russia",
      "Canada",
      "China"
    ],
    "correct_answer": 2
  },
  {
    "id": 2,
    "question": "What is the most common language?",
    "answers": [
      "English",
      "Hindi",
      "Spanish",
      "Mandarin"
    ],
    "correct_answer": 3
  },
  {
    "id": 3,
    "question": "What is the largest ocean?",
    "answers": [
      "Pacific Ocean",
      "Southern Ocean",
      "Indian Ocean",
      "Atlantic Ocean"
    ],
    "correct_answer": 0
  },
  {
    "id": 4,
    "question": "What is the diameter of Earth (nearest km)?",
    "answers": [
      "12,802km",
      "12,734km",
      "31,243km",
      "6,938km"
    ],
    "correct_answer": 1
  },
  {
    "id": 5,
    "question": "Which of these countries is the smallest (population)?",
    "answers": [
      "Vatican City",
      "Tokelau",
      "Cocos Keeling Islands",
      "Christmas Island"
    ],
    "correct_answer": 2
  },
];


export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
     Config (with defaults).

     Note: these only affect routes defined *after* them!
     */

  this.urlPrefix = 'api';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  this.timing = 0;           // delay for each request, automatically set to 0 during testing

  /*
     Shorthand cheatsheet:

     this.get('/posts');
     this.post('/posts');
     this.get('/posts/:id');
     this.put('/posts/:id'); // or this.patch
     this.del('/posts/:id');

     http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
     */


  // GET /quizzes
  // Fetch the list of all Quizzes
  this.get('/quizzes', () => {
    return {
      quizzes: QUIZZES
    };
  });

  // GET /quizzes/:id
  // Fetch a single Quiz with its associated Questions
  this.get('/quizzes/:id', (schema, request) => {
    let id = parseInt(request.params.id, 10);
    let [quiz] = QUIZZES.filter((q) => q.id === id);

    if (!quiz) {
      return new Mirage.Response(404, {}, {
        errors: { msg: `Quiz with ID ${id} not found.` }
      });
    }

    let questions = QUESTIONS.filter((q) => quiz.question_ids.indexOf(q.id) !== -1);

    return {
      quiz,
      questions
    };
  });
}
