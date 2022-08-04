import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBe_eEGIMeYAoRcHwLs6Ys0NGrd5iP-0TQ',
  authDomain: 'moth1nk.firebaseapp.com',
  projectId: 'moth1nk',
  storageBucket: 'moth1nk.appspot.com',
  messagingSenderId: '60112704834',
  appId: '1:60112704834:web:e191ab214fbd80f8a0a4db'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    time: data?.time.toMillis() || 0
  }
}
