import { useState } from 'react';
import Styles from './Rating.module.css';

export default function Rating({
  maxRating = 10,
  color = 'red',
  size = '2rem',
  defaultRating = 0,
  onSetExtenalRate,
  onSetExtenalHoverRate,
}) {
  const [hoverRate, setHoverRate] = useState(0);
  const [rate, setRate] = useState(defaultRating);

  function handleMouseEnter(rating) {
    setHoverRate(rating);
    onSetExtenalHoverRate?.(rating);
  }

  function handleMouseExit() {
    setHoverRate(0);
    onSetExtenalHoverRate?.(0);
  }

  function handleClick(rating) {
    if (rate === rating) {
      setRate(0);
      onSetExtenalRate?.(0);
    } else {
      setRate(rating);
      onSetExtenalRate?.(rating);
    }
  }
  return (
    <div className={Styles['stars-container']}>
      {Array.from({ length: maxRating }, (v, i) => (
        <Star
          key={i}
          isFull={hoverRate ? i < hoverRate : i < rate}
          color={color}
          size={size}
          onClick={() => handleClick(i + 1)}
          onMouseExit={() => handleMouseExit()}
          onMouseEnter={() => handleMouseEnter(i + 1)}
        />
      ))}
      {/* <p>{hoverRate || rate || ""}</p> */}
    </div>
  );
}

function Star({ isFull, color, onMouseEnter, onMouseExit, onClick, size }) {
  return (
    <div
      className={Styles['star']}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseExit}
      onClick={onClick}
    >
      {isFull ? (
        <svg
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          style={{ width: size, height: size }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          style={{ width: size, height: size }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </div>
  );
}
