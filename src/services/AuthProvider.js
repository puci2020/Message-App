import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { auth, facebookProvider, provider } from './Firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUpWithEmail = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const signInWithEmail = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => auth.signInWithPopup(provider);
  const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
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
