import Link from 'next/link';

import Container from '@components/Container';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>My Images</a>
          </Link>
        </p>
      </Container>
    </header>
  )
}

export default Header;