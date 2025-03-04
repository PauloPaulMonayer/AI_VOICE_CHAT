import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent("Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    // החלף את yourEmail@example.com לכתובת האימייל שלך
    window.location.href = `mailto:yourEmail@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
