import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import db, { auth, facebookProvider, provider } from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userExist, setUserExist] = useState(false);

  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const userDocExist = (uid) => {
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserExist(true);
        }
      });
  };

  const createUser = (uid, name) => {
    db.collection('users').doc(uid).set({
      userName: name,
    });
  };

  const signUpWithEmail = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const signInWithEmail = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => auth.signInWithPopup(provider);
  const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        localStorage.removeItem('user');

        alertify.success(`Wylogowano pomyślnie!`);
      })
      .catch((error) => alertify.alert('Błąd', error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        userDocExist(user.uid);
        if (!userExist) {
          createUser(user.uid, user.displayName);
        }
        if (user.emailVerified) {
          setCurrentUser(user);
          alertify.success('Zalogowano pomyślnie!');
        } else {
          auth.signOut();
          setCurrentUser();
          alertify.confirm(
            'Weryfikacja adresu e-mail',
            'Zweryfikuj adres email. Jeśli nie dostałeś wiadomości kliknij OK, aby wysłać ponownie.',
            () => {
              user.sendEmailVerification();
              alertify.success('Wiadomość wysłano');
            },
            () => {
              alertify.error('Ponowna weryfikacja anulowana');
            }
          );
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    createUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
