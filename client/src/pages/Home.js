import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// שים לב שה-images וה-getImage שלך נשארים כרגיל
const images = require.context("../assets", false, /\.(png|jpe?g)$/);

const getImage = (imageName) =>
  images(`./${imageName}`).default || images(`./${imageName}`);

const Home = () => {
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  return (
    <div className="home-container">
      {/* ================== Hero Section ================== */}
      <section className="hero">
        <div className="hero-content">
          {/* טקסט בצד שמאל */}
          <div className="hero-text">
            <h1 className="hero-title2">Welcome to</h1>
            <h1 className="hero-title1">VOXA</h1>
            <p className="hero-subtitle">
              Speak naturally, let the AI respond instantly
            </p>
          </div>

          {/* תמונה בצד ימין */}
          <div className="hero-image">
            <img src={getImage("1hero.png")} alt="A woman holding a phone" />
          </div>
        </div>
      </section>

      {/* ================== About Section ================== */}
      <section className="about">
        <div className="container about-content">
          <h3 className="section-title">About VOXA</h3>
          <p className="section-subtitle">
            Bridging the gap between humans and AI in a seamless way
          </p>
          <p>
            AI Voice Chat is designed to create a truly seamless conversational
            experience between you and cutting-edge AI technology. Whether
            you're looking to brainstorm ideas, get quick answers, or just have
            a friendly chat, our platform uses advanced speech recognition and
            language models to provide real-time, natural responses.
          </p>
          {/*{showMoreAbout && (*/}
          <p>
            Our mission is to bridge the gap between humans and machines by
            offering an interface that feels just like talking to a friend. No
            more typing, no more waiting – simply speak, and let the AI handle
            the rest. Whether you need help with research, coding tips, or just
            want to have a casual conversation, AI Voice Chat is here to make
            every interaction smooth and intuitive.
          </p>
          {/*}*/}
          {/*<button
            className="read-more-btn"
            onClick={() => setShowMoreAbout(!showMoreAbout)}
          >
            {showMoreAbout ? "Read Less" : "Read More"}
          </button>*/}
        </div>
      </section>

      {/* ================== How It Works Section ================== */}
      <section className="how-it-works">
        <div className="container">
          <h3 className="section-title1">How It Works</h3>
          <p className="section-subtitle">
            A quick 3-step guide to using AI Voice Chat
          </p>
          <div className="how-grid">
            <div className="how-step">
              <div className="step-icon">
                <i className="fa-solid fa-microphone"></i>
              </div>
              <div className="step-number">1</div>
              <h4>Activate the Microphone</h4>
              <p>
                With a single click, enable your microphone so our AI can hear
                you loud and clear.
              </p>
            </div>

            <div className="how-step">
              <div className="step-icon">
                <i className="fa-solid fa-comment-dots"></i>
              </div>
              <div className="step-number">2</div>
              <h4>Speak Your Mind</h4>
              <p>
                Ask a question, share a thought, or simply say hello. Our system
                instantly converts your voice to text.
              </p>
            </div>

            <div className="how-step">
              <div className="step-icon">
                <i className="fa-solid fa-reply"></i>
              </div>
              <div className="step-number">3</div>
              <h4>Receive Instant Replies</h4>
              <p>
                The AI processes your input and generates a natural,
                context-aware response – all within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== Advantages Section ================== */}
      <section className="advantages">
        <div className="container">
          <h3 className="section-title">Why Use AI Voice Chat?</h3>
          <p className="section-subtitle">
            Unlock the power of real-time conversation with AI
          </p>
          <div className="advantages-grid">
            <div className="advantage-card">
              <img src={getImage("4.jpg")} alt="Natural Speech" />
              <h4>Natural Speech</h4>
              <p>
                Our advanced voice engine captures every nuance of your speech,
                ensuring a human-like interaction.
              </p>
            </div>
            <div className="advantage-card">
              <img src={getImage("5.jpg")} alt="Real-Time Responses" />
              <h4>Real-Time Responses</h4>
              <p>
                Enjoy fluid, back-and-forth conversation with minimal lag or
                waiting time.
              </p>
            </div>
            <div className="advantage-card">
              <img src={getImage("6.jpg")} alt="Easy to Use" />
              <h4>Easy to Use</h4>
              <p>
                No installation or setup. Just open your browser, click the mic
                button, and start talking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== Testimonials Section ================== */}
      <section className="testimonials">
        <div className="container">
          <h3 className="section-title1">What Our Users Say</h3>
          <p className="section-subtitle">
            Real feedback from people using AI Voice Chat daily
          </p>

          <div className="testimonials-grid-scroll">
            <div className="testimonial-card">
              <p>
                "AI Voice Chat transformed the way I communicate with
                technology. The speech recognition is remarkably accurate, and
                the AI’s responses feel almost human!"
              </p>
              <span>- Alex, Freelance Designer</span>
            </div>

            <div className="testimonial-card">
              <p>
                "A truly innovative tool. Whether I'm asking for coding tips or
                just chatting, the answers are fast and highly relevant. Highly
                recommended!"
              </p>
              <span>- Jamie, Web Developer</span>
            </div>

            <div className="testimonial-card">
              <p>
                "Simple, intuitive, and effective. It's like having a personal
                assistant who actually understands me. AI Voice Chat is now part
                of my daily routine."
              </p>
              <span>- Morgan, Project Manager</span>
            </div>

            <div className="testimonial-card">
              <p>
                "I used AI Voice Chat to brainstorm my design ideas. It's almost
                like talking to a creative partner who never runs out of
                inspiration!"
              </p>
              <span>- Sam, UX Designer</span>
            </div>

            <div className="testimonial-card">
              <p>
                "The real-time speech recognition is a game-changer for me. I
                don't have to type anymore, which saves a lot of time!"
              </p>
              <span>- Riley, Student</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
