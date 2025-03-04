import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

const Recorder = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Function to fetch and play audio from backend
  const fetchAndPlayAudio = useCallback(() => {
    if (!transcript.trim()) return;

    fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcript }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        // Stop listening to avoid capturing playback audio
        SpeechRecognition.stopListening();
        setIsPlaying(true);
        const audio = new Audio(url);
        audio.play().catch((err) => console.error("Audio play error:", err));
        // Once audio finishes playing, reset transcript and restart listening
        audio.onended = () => {
          setIsPlaying(false);
          resetTranscript();
          SpeechRecognition.startListening({ continuous: false });
        };
      })
      .catch((error) => console.error("Error fetching audio:", error));
  }, [transcript, resetTranscript]);

  // Effect: when listening stops and there's transcript, fetch audio
  useEffect(() => {
    if (!listening && transcript.trim() !== "" && !isPlaying) {
      fetchAndPlayAudio();
    }
  }, [listening, transcript, isPlaying, fetchAndPlayAudio]);

  // Effect: start listening when user has interacted and audio isn't playing
  useEffect(() => {
    if (hasInteracted && !isPlaying) {
      SpeechRecognition.startListening({ continuous: false });
    }
  }, [hasInteracted, isPlaying]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center">
          Your browser does not support speech recognition.
        </Typography>
      </Container>
    );
  }

  // Render initial Start Chat button if user hasn't interacted yet.
  if (!hasInteracted) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            AI Voice Chat
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setHasInteracted(true);
              SpeechRecognition.startListening({ continuous: false });
            }}
          >
            Start Chat
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            AI Voice Chat
          </Typography>
          <Typography variant="body1" align="center">
            <strong>Listening:</strong> {listening ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" align="center">
            <strong>You said:</strong> {transcript}
          </Typography>
        </Box>
        {audioUrl && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              AI Response:
            </Typography>
            <audio src={audioUrl} controls autoPlay style={{ width: "100%" }} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Recorder;
