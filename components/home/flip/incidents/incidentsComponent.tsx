import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './styles.module.css';
import Link from 'next/link';

const IncidentsComponent = () => {
  const [hovered, setHovered] = useState(false);
  const { opacity, transform } = useSpring({
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateY(-50%)' : 'translateY(0%)',
  });

  return (
    <Link href={`/incidents`}>
      <div
        className={styles.container}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.front}>
          <animated.div
            className={styles.backdrop}
            style={{ opacity, transform }}
          />
          <div className={styles.text}>
            <p>ZGŁOSZENIA</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IncidentsComponent;