import firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const writeUserData = (custId, tier, amount) => {
  firebase.database().ref(`users/${custId}`).set({
    tier,
    bought: new Date().getTime(),
    amount,
  });
};

export const readUserData = async custId => {
  return new Promise((resolve, reject) => {
    try {
      firebase.database()
        .ref('users/' + custId)
        .on('value', snapshot => {
          resolve(snapshot.val());
        });
    } catch {
      resolve({});
    }
  })
};
