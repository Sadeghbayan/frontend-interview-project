import React, {useRef, useEffect, useState} from 'react';
import classnames from 'classnames';
import {createPortal} from 'react-dom';
import styles from './modal.module.scss'

interface ModalProps {
  isShow: boolean;
  toggle: (isShow: boolean) => void;
  title?: string;
  footer?: boolean;
}

const Modal: React.FC<ModalProps> = ({isShow, toggle, title, footer, children, ...otherProps}) => {

  const [isAnimationEnd, setAnimationEnd] = useState(false);
  const containerRef = useRef<HTMLInputElement>(null);

  const rootClass = classnames(
    {
      [styles.modal]: true,
      [styles.modalIsOpen]: isShow,
      [styles.modalSlideDown]: isAnimationEnd,
      [styles.modalIsClose]: !isShow
    },
  );

  const handleClose = (): void => {
    setAnimationEnd(true)
    containerRef && containerRef.current && containerRef.current.addEventListener("animationend", setToggleOff)
  };


  const setToggleOff = (): void => {
    toggle(false);
    containerRef && containerRef.current && containerRef.current.removeEventListener("animationend", setToggleOff);
  }

  // handle click outside
  const handleOutsideClick = (e: React.SyntheticEvent): void  => {
    if (e.currentTarget.hasAttribute("data-modal")) {
      handleClose()
    }
  };

  useEffect(() => {
    if(isShow) {
      // prevent body from scrolling when modal is open
      document.body.style.overflow = 'hidden';
      setAnimationEnd(false)
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShow]);


  return (
    isShow ? createPortal(
      <div {...otherProps} className={rootClass}>
        <div className={styles.fixedOverlay}></div>
        <div className={styles.innerWrapper} data-modal="true" onClick={handleOutsideClick}>
          <div className={styles.modalBox} ref={containerRef}>
            {title && (
              <div className={styles.header}>
                <h2 className={styles.title} >{title}</h2>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className={styles.body}>
              <p>
                {children}
              </p>
            </div>
            {footer && (
              <div className={styles.footer}>
                <button type="button" onClick={handleClose}>Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
      , document.body
    ) : null
  )
};

export default Modal;
