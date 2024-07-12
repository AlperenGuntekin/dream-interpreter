import { NextPage } from 'next';
import styles from '../styles/PrivacyPolicy.module.css';

const PrivacyPolicy: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.text}>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or make a purchase from
        InterpretationDream.
      </p>
      <hr className={styles.separator} />
      <h2 className={styles.subtitle}>1. Personal Information We Collect</h2>
      <p className={styles.text}>
        When you visit the site, we automatically collect certain information
        about your device, including information about your web browser, IP
        address, time zone, and some of the cookies that are installed on your
        device.
      </p>
      <h2 className={styles.subtitle}>
        2. How We Use Your Personal Information
      </h2>
      <p className={styles.text}>
        We use the information that we collect to operate and maintain our
        services. Additionally, we use this information to communicate with you,
        screen our orders for potential risk or fraud, and when in line with the
        preferences you have shared with us, provide you with information or
        advertising relating to our products or services.
      </p>
      <h2 className={styles.subtitle}>3. Sharing Your Personal Information</h2>
      <p className={styles.text}>
        We share your Personal Information with third parties to help us use
        your Personal Information as described above. For example, we use Google
        Analytics to help us understand how our customers use the site.
      </p>
      <h2 className={styles.subtitle}>4. Email Communications</h2>
      <p className={styles.text}>
        By providing your email address, you agree to receive emails from us.
        These emails may include updates, newsletters, and promotional content.
        If you do not wish to receive these emails, you may opt out at any time
        by following the unsubscribe instructions provided in the email.
      </p>
      <div className={styles.contact}>
        <h2 className={styles.subtitle}>5. Contact Us</h2>
        <p className={styles.text}>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by email at{' '}
          <a href="mailto:info@interpretationdream.com">
            info@interpretationdream.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
