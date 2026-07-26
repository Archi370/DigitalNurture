import React, { Component } from 'react';

export class Contact extends Component {
  state = { submitted: false };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <h2>📞 Welcome to the Contact Page of Student Management Portal</h2>
        </div>

        {this.state.submitted ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '20px', borderRadius: '12px', color: '#34d399' }}>
            ✅ Message dispatched successfully! Our administration desk will respond shortly.
          </div>
        ) : (
          <form className="contact-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Your Full Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Student Email Address" required />
            </div>
            <div className="form-group">
              <textarea rows="4" placeholder="How can administration assist you?" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Inquiry</button>
          </form>
        )}
      </div>
    );
  }
}