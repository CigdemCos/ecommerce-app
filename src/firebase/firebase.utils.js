import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyApwOQCV4OyUaidnE2O7gH5DbER1LlERgY",
        authDomain: "crwn-db-838ca.firebaseapp.com",
        databaseURL: "https://crwn-db-838ca.firebaseio.com",
        projectId: "crwn-db-838ca",
        storageBucket: "crwn-db-838ca.appspot.com",
        messagingSenderId: "694631639376",
        appId: "1:694631639376:web:99f946381e6eefbc2f6455",
        measurementId: "G-Y1P8JV2E0T"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) =>{
        if(!userAuth) return;
        
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();

       // console.log(snapShot);

       if(!snapShot.exists){
               const {displayName, email} = userAuth; //destructuring
               const createAt = new Date(); // when this was invoked

               try{
                await userRef.set({
                  displayName,
                  email,
                  createAt,
                  ...additionalData
                })       

               }catch(error){
                 console.log('error creating user', error.message);
               }
       }
       //console.log(await userRef.get());
       //console.log(snapShot.data());
       
       return userRef;

};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;