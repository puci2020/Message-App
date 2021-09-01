import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import useSpeechToText from 'react-hook-speech-to-text';
import styled from 'styled-components';
import alertify from 'alertifyjs';
import { useStateValue } from '../services/StateProvider';
import { actionTypes } from '../services/reducer';

const useStyles = makeStyles({
  root: {
    animation: `$recordButton .8s linear infinite alternate`,
  },
  '@keyframes recordButton': {
    from: {
      backgroundColor: 'transparent',
    },
    to: {
      backgroundColor: 'lightgray',
    },
  },
});

const SpeechToText = () => {
  const classes = useStyles();
  const [{ message }, dispatch] = useStateValue();

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(() => {
    // const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    //   // The standard secure default length for RSA keys is 2048 bits
    //   modulusLength: 2048,
    // });

    // console.log(
    //   publicKey.export({
    //     type: 'pkcs1',
    //     format: 'pem',
    //   }),

    //   privateKey.export({
    //     type: 'pkcs1',
    //     format: 'pem',
    //   })
    // );

    results.map((result) =>
      dispatch({
        type: actionTypes.SET_MESSAGE,
        message: message + result.transcript,
      })
    );
  }, [results]);

  const recordToText = () => {
    if (error.length === 0) {
      if (isRecording) {
        stopSpeechToText();
        alertify.warning('Nagrywanie zakończone');
      } else {
        startSpeechToText();
        alertify.success('Mów teraz!');
      }
    } else {
      alertify.alert(
        'Błąd nagrywania',
        'Twoja przeglądarka nie obsługuje tej funkcji lub masz problemy z mikrofonem. Użyj przeglądarki Google Chrome i spróbuj ponownie.'
      );
    }
  };

  return (
    <Tooltip title="Nagraj wiadomość">
      <IconButton
        className={isRecording && classes.root}
        onClick={recordToText}
        color={isRecording ? 'secondary' : 'default'}
      >
        {error.length === 0 ? <MicNoneIcon /> : <MicOffIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default SpeechToText;
