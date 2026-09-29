import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import './ContactPage.css';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'architecture',
    message: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page container container--narrow">
      <header className="contact-hero">
        <span className="contact-hero__eyebrow">Direct Atelier Dialogue</span>
        <h1 className="contact-hero__title">Commissions & Inquiries</h1>
        <p className="contact-hero__lead">
          We welcome dialogue regarding private architectural residences,
          bespoke furniture commissions, and curatorial collaborations.
        </p>
      </header>

      {submitted ? (
        <div className="contact-success">
          <h3>Your inquiry has been received.</h3>
          <p>
            Our studio director reviews correspondence on Tuesdays and Thursdays.
            We will contact you shortly with archival documentation.
          </p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Radhika Parekh"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              required
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="radhika@domain.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="inquiryType" className="form-label">Nature of Inquiry</label>
            <select
              id="inquiryType"
              className="form-select"
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            >
              <option value="architecture">Architectural Commission</option>
              <option value="furniture">Furniture Edition Acquisition</option>
              <option value="press">Press & Editorial Monograph</option>
              <option value="trade">Architectural Trade Program</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Project Scope / Details</label>
            <textarea
              id="message"
              rows={5}
              required
              className="form-textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Location, approximate timeframe, or specific piece of interest..."
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="contact-submit-btn">
            Transmit Inquiry
          </Button>
        </form>
      )}

      <div className="contact-details">
        <div className="contact-detail-col">
          <h4>Ahmedabad Studio</h4>
          <p>The Old Mill Compound, Ellisbridge</p>
          <p>Ahmedabad, Gujarat 380006</p>
        </div>
        <div className="contact-detail-col">
          <h4>Correspondence</h4>
          <p>inquiries@sanatanstudio.com</p>
          <p>+91 (079) 2658 4100</p>
        </div>
      </div>
    </div>
  );
}
