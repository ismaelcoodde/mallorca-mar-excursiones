import { useRef, useState, useEffect } from 'react';

const transformInicial = {
  up:    'translateY(2rem)',
  down:  'translateY(-2rem)',
  left:  'translateX(2rem)',
  right: 'translateX(-2rem)',
  none:  'none',
};

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transformInicial[direction],
        transition: `opacity 650ms ease-out ${delay}ms, transform 650ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
