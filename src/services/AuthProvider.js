import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../state/actions/userActions';
import db, { auth, facebookProvider, provider } from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userExist, setUserExist] = useState(false);
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-empty-pattern
  // const [{}, dispatch] = useStateValue();

  const userDocExist = async (uid) => {
    await db
      .collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserExist(true);
        }
      });
  };

  const createUser = async (uid, name) => {
    await db.collection('users').doc(uid).set({
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
        // dispatch({
        //   type: actionTypes.SET_USER,
        //   user: null,
        // });
        dispatch(removeUser());
        localStorage.removeItem('user');

        alertify.success(`Wylogowano pomyślnie!`);
      })
      .catch((error) => alertify.alert('Błąd', error.message));
  };

  useEffect(async () => {
    let cancel = true;
    await auth.onAuthStateChanged((authUser) => {
      if (cancel)
        if (authUser) {
          userDocExist(authUser.uid);
          if (!userExist) {
            createUser(authUser.uid, authUser.displayName);
          }
          if (authUser.emailVerified) {
            setCurrentUser(authUser);
            alertify.success('Zalogowano pomyślnie!');
          } else {
            auth.signOut();
            setCurrentUser();
            alertify.confirm(
              'Weryfikacja adresu e-mail',
              'Zweryfikuj adres email. Jeśli nie dostałeś wiadomości kliknij OK, aby wysłać ponownie.',
              () => {
                authUser.sendEmailVerification();
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

    return () => {
      cancel = false;
    };
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
