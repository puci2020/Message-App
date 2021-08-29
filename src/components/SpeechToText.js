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
    animation: `$recordButton 1.5s linear infinite`,
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

const RecordButton = styled.div`
  .record {
    animation: recordButton 1.5s linear infinite;
  }

  @keyframes recordButton {
    from {
      background-color: transparent;
    }
    to {
      background-color: lightgray;
    }
  }
`;

const SpeechToText = () => {
  const classes = useStyles();
  const [{ message }, dispatch] = useStateValue();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      dispatch({
        type: actionTypes.SET_MESSAGE,
        message: message + result.transcript,
      })
    );
  }, [results]);

  //   useEffect(() => {
  //     // const msg = alertify.success('Mów teraz!', 0);
  //     if (!isRecording) {
  //       alertify.success('Mów teraz!', 0).dismiss();
  //     }
  //     console.log('cos');
  //     // return null;
  //   }, [isRecording]);

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
