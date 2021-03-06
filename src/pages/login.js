import React from 'react'
import firebase from "../config/firebase";
import { FirebaseAuth } from 'react-firebaseui';


const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: 'NONE',
  signInSuccessUrl: '/',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    minHeight: '300px',
    height: '100vh',
  }
}

const LoginPage = () => {
  return (
    <div style={styles.container}>
        <h1>Sign up / Sign in</h1>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default LoginPage