import Link from 'next/link';
import styles from '../styles/DreamPage.module.css';

interface BreadcrumbProps {
  title: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => (
  <nav aria-label="breadcrumb">
    <ol className={styles.breadcrumb}>
      <li className={styles.breadcrumbItem}>
        <Link href="/">Home</Link>
      </li>
      <li className={styles.breadcrumbItem}>{title}</li>
    </ol>
  </nav>
);
