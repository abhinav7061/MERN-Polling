import React, { useState, useRef, useEffect } from 'react';
import './index.css'
import styles from '../../styles';

const Accordion = ({ content }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isOverflowed, setOverflowed] = useState(false);
  const contentRef = useRef(null);

  // Check if the content is overflowing and update state accordingly
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      const isCurrentlyClamped = element.offsetHeight < element.scrollHeight;
      setOverflowed(isCurrentlyClamped);
    }
  }, [content]);
  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className={`accordion ${isOverflowed ? 'overflowed' : ''} ${styles.heading5}`}>
      <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`} ref={contentRef}>
        {content}
      </div>
      {isOverflowed && <div onClick={toggleAccordion} className='hover:underline cursor-pointer duration-300 hover:text-sky-800'>
        <h3>{isExpanded ? 'See less' : 'See more'}</h3>
      </div>}
    </div>
  );
};

export default Accordion;
