// src/components/VoiceChat.js
import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./VoiceChat.css";

const VoiceChat = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const fetchAndPlayAudio = useCallback(() => {
    if (!transcript.trim()) return;

    fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcript }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        SpeechRecognition.stopListening();
        setIsPlaying(true);

        const audio = new Audio(url);
        audio.play().catch((err) => console.error("Audio play error:", err));

        audio.onended = () => {
          setIsPlaying(false);
          resetTranscript();
          SpeechRecognition.startListening({ continuous: false });
        };
      })
      .catch((error) => console.error("Error fetching audio:", error));
  }, [transcript, resetTranscript]);

  useEffect(() => {
    if (!listening && transcript.trim() !== "" && !isPlaying) {
      fetchAndPlayAudio();
    }
  }, [listening, transcript, isPlaying, fetchAndPlayAudio]);

  useEffect(() => {
    if (hasInteracted && !isPlaying) {
      SpeechRecognition.startListening({ continuous: false });
    }
  }, [hasInteracted, isPlaying]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="voice-chat-card">
        <h3 className="error-title">
          Your browser does not support speech recognition.
        </h3>
      </div>
    );
  }

  if (!hasInteracted) {
    return (
      <div className="voice-chat-card">
        <h2 className="chat-title">AI Voice Chat</h2>
        <button
          className="start-chat-btn"
          onClick={() => {
            setHasInteracted(true);
            SpeechRecognition.startListening({ continuous: false });
          }}
        >
          Start Chat
        </button>
        <p className="tip-text">Tip: Ensure your microphone is enabled.</p>
      </div>
    );
  }

  return (
    <div className="voice-chat-card">
      <h2 className="chat-title">AI Voice Chat</h2>
      <div className="status-info">
        <p>
          <strong>Listening:</strong> {listening ? "Yes" : "No"}
        </p>
        <p>
          <strong>You said:</strong> {transcript}
        </p>
      </div>
      {audioUrl && (
        <div className="audio-response">
          <h4>AI Response:</h4>
          <audio src={audioUrl} controls autoPlay className="audio-player" />
        </div>
      )}
      <p className="tip-text">
        Tip: Speak clearly and wait for the AI to process your response.
      </p>

      {/* ===== מקטע מידע נוסף (Guidelines) ===== */}
      <div className="guidelines">
        <h3>Guidelines & Tips</h3>
        <ul>
          <li>
            <strong>Do:</strong> Speak at a moderate pace and enunciate words
            clearly.
          </li>
          <li>
            <strong>Do:</strong> Provide context if asking complex questions.
          </li>
          <li>
            <strong>Don't:</strong> Shout or speak extremely fast; the AI might
            misinterpret.
          </li>
          <li>
            <strong>Don't:</strong> Pause for too long mid-sentence, as it may
            finalize the transcription prematurely.
          </li>
          <li>
            <strong>Note:</strong> If you encounter errors, reset the transcript
            or refresh the page.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceChat;
