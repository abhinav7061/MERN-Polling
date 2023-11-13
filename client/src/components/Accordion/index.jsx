import React, { useState, useRef, useEffect } from 'react';
import './index.css'
import styles from '../../styles';

const Accordion = ({ content }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isOverflowed, setOverflowed] = useState(false);
  const contentRef = useRef(null);
  // const [num, setNum] = useState(0);


  useEffect(() => {
    // Check if the content exceeds two lines
    if (contentRef.current) {
      // const lines = window.getComputedStyle(contentRef.current).getPropertyValue('-webkit-line-clamp');
      // setOverflowed(lines && parseInt(lines) <= contentRef.current.clientHeight / parseFloat(getComputedStyle(contentRef.current).lineHeight));
      const element = contentRef.current;
      const isCurrentlyClamped = element.offsetHeight < element.scrollHeight;
      // setNum(isCurrentlyClamped)
      setOverflowed(isCurrentlyClamped);
    }
  }, [content]);
  // console.log({ isOverflowed, num });
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
