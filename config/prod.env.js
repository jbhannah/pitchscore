var stringify = require('core-js/library/fn/json/stringify')

var FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCXfj1ky7sXgfyvwXGy-zvo0_ErenC-tVo',
  authDomain: 'pitchscore-ade8c.firebaseapp.com',
  databaseURL: 'https://pitchscore-ade8c.firebaseio.com',
  projectId: 'pitchscore-ade8c'
}

module.exports = {
  FIREBASE_CONFIG: stringify(FIREBASE_CONFIG),
  NODE_ENV: '"production"'
}
