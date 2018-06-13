// import firebaseConfig from './firebaseConfig'
import fb from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDtnJLGrKz6F081O-Aij-8mDhIFuDh_-MM",
  authDomain: "billingsupport-6216c.firebaseapp.com",
  databaseURL: "https://billingsupport-6216c.firebaseio.com",
  projectId: "billingsupport-6216c",
  storageBucket: "",
  messagingSenderId: "760083933037"
};
fb.initializeApp(config)
// const db = firebase.firestore();
// const auth = firebase.auth();
// const currentUser = auth.currentUser;
const settings = {
  timestampsInSnapshots: true
} // your settings...
const fs = fb.firestore()
fs.settings(settings)
fs.authUser = null;
// db.settings(settings);
// firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')
// export {
//   db,
//   // auth,
//   // currentUser,
//   usersCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
// }
export {
  fb,
  fs
}
