import {useState} from 'react';

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="newsletter-form">
      <p className="newsletter-form__eyebrow">SIGNAL UPLINK</p>
      <h3 className="newsletter-form__title">Join the deployment list.</h3>
      {submitted ? (
        <p className="newsletter-form__success">SIGNAL RECEIVED.</p>
      ) : (
        <form
          className="newsletter-form__form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="operator@domain.com"
            className="newsletter-form__input"
          />
          <button type="submit" className="newsletter-form__submit">
            [SUBSCRIBE]
          </button>
        </form>
      )}
    </div>
  );
}
