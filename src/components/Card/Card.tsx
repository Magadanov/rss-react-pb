import { FormData } from '@app/types/form.type';
import styles from './Card.module.scss';
import { cn } from '@app/utils/cn';
import { useState } from 'react';
import visibleImg from '@app/assets/visible.svg';
import hiddenImg from '@app/assets/hidden.svg';

interface Props {
  data: FormData;
}

export function Card({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={cn(styles.card, styles[data.gender])}>
      <img src={data.picture} alt="ava" className={styles.card__img} />
      <div className={styles.card__info}>
        {data.isNew && <span className={styles.new}>New</span>}{' '}
        <h2>{data.name}</h2>
        <div className={cn(styles.card__info_content)}>
          <div>
            <p>
              <strong>Age:</strong>
              {data.age}
            </p>
            <p>
              <strong>Country:</strong>
              {data.country}
            </p>
          </div>
          <div>
            <p>{data.email}</p>
            <div style={{ position: 'relative' }}>
              <input
                type={isVisible ? 'text' : 'password'}
                value={data.password}
                disabled
              />
              <img
                className={styles.visible__img}
                src={isVisible ? hiddenImg : visibleImg}
                alt="visible"
                onClick={() => setIsVisible(!isVisible)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
