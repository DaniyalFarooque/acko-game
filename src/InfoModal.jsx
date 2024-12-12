import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import gsap from "gsap";

export const InfoModal = () => {
  const { gameStarted, actions, modalOpen } = useStore();

  const logo = useRef();
  const startButton = useRef();
  const homeRef = useRef();
  const [setupStatus, setSetupStatus] = useState(0);
  const [controlStyle, setControlStyle] = useState("");

  useEffect(() => {
    const tl = gsap.timeline();

    if (setupStatus === 0) {
      if (logo.current && startButton.current) {
        tl.from(logo.current, {
          scale: 122,
          opacity: 0,
          duration: 0,
          ease: "power4.out",
        })
          .to(logo.current, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
          })
          .to(startButton.current, {
            opacity: 1,
            duration: 3,
            delay: 1,
            ease: "power4.out",
          });
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setSetupStatus(1);
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [setupStatus]);

  if (!modalOpen) {
    return null; 
  }
  return (
    <>
      {modalOpen && (
        <div className="home">
        <div className="glassy">
          <h1>THIS IS INFO MODAL</h1>

          <div className="articles">
          <div className={controlStyle === "keyboard" ? "article selected" : "article"} onClick={() => 
            setControlStyle("keyboard")}>
              <img src="./images/keyboard.png" alt="keyboard" />
              <div className="article_label">
                <p>Keyboard</p>
              </div> 
            </div>
            
          </div>
          <h1>Oops your car got hit by a bomb</h1>
          <div className={controlStyle != "" ? "submit" : "submit disabled"}>
            <button
              className={controlStyle != "" ? "submit-button" : "submit-button disabled"}
              onClick={() => {
                actions.setControls(controlStyle);
                actions.setGameStarted(true);
                actions.closeModal();
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
        
      )}
    </>

  );
};
