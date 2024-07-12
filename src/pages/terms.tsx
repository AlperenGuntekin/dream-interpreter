import { NextPage } from 'next';
import styles from '../styles/TermsOfUse.module.css';

const TermsOfUse: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Use</h1>
      <p className={styles.text}>
        Welcome to InterpretationDream! By using our services, you agree to
        comply with and be bound by the following terms and conditions of use.
      </p>
      <hr className={styles.separator} />
      <h2 className={styles.subtitle}>1. Acceptance of Terms</h2>
      <p className={styles.text}>
        By accessing and using our services, you accept and agree to be bound by
        the terms and provision of this agreement. In addition, when using these
        particular services, you shall be subject to any posted guidelines or
        rules applicable to such services.
      </p>
      <h2 className={styles.subtitle}>2. Description of Service</h2>
      <p className={styles.text}>
        InterpretationDream provides users with access to an AI-powered dream
        interpretation service. You understand and agree that the service may
        include advertisements and that these advertisements are necessary for
        InterpretationDream to provide the service.
      </p>
      <h2 className={styles.subtitle}>3. User Conduct</h2>
      <p className={styles.text}>
        You agree to use the service only for lawful purposes and that you are
        responsible for your use of and communications on the service. You agree
        not to use the service in a manner that interferes with its normal
        operation or with any other user's use and enjoyment of the service.
      </p>
      <h2 className={styles.subtitle}>4. Modification of Terms</h2>
      <p className={styles.text}>
        InterpretationDream reserves the right to modify these terms at any
        time. Your continued use of the service following any such modification
        constitutes your agreement to follow and be bound by the terms as
        modified.
      </p>
      <div className={styles.contact}>
        <h2 className={styles.subtitle}>5. Contact Us</h2>
        <p className={styles.text}>
          If you have any questions about these Terms, please contact us at{' '}
          <a href="mailto:info@interpretationdream.com">
            info@interpretationdream.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
