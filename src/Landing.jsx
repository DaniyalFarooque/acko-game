import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import gsap from "gsap";

export const Landing = () => {
  const { gameStarted, actions } = useStore();

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

  if (gameStarted) {
    return null; 
  }
  const wrapText = (text, lineIndex) => {
    return text.split("").map((char, index) => (
      <span key={index} style={{ animationDelay: `${lineIndex * 1 + index * 0.07}s` }} className="animated-letter">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };
  return (
    <>
      {setupStatus === 0 && (
        <div className="home" ref={homeRef}>
          <div className="logo">
            <img ref={logo} src="./logo2.png" alt="logo" />
          </div>
          {/* <div className="intro glassy" >
              Hello world
          </div> */}

          <div className="start" ref={startButton}>
            <button className="start-button"
                    onClick={() => setSetupStatus(1)} 
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        setSetupStatus(1);
                    }}} autoFocus>
              PRESS ENTER TO START
            </button>
          </div>
        </div>
      )}
      {setupStatus === 1 && (
        <div className="home">
          <div className="glassy" style={{height: "35vh"}}>
            <h1>{wrapText("Game Objective",0)}</h1>
            <h2>{wrapText("In Ackventure players navigate a city in a car, collecting coins and superpowers (insurance covers) to protect themselves from life's unpredictable challenges.",0)}</h2>
            

            <div className={"submit"}>
              <button
                className={"submit-button" }
                onClick={() => {
                  setSetupStatus(2)

                }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}
      {setupStatus === 2 && (
        <div className="home">
          <div className="glassy" style={{height: "60vh"}}>
            <h1>Your controls</h1>

            <div className="articles">
            <div className={controlStyle === "keyboard" ? "article selected" : "article"} onClick={() => 
              setControlStyle("keyboard")}>
                <img src="./images/up.png" alt="keyboard" />
                <div className="article_label">
                  <p>Accelerate</p>
                </div> 
              </div>
              <div className={controlStyle === "gamepad" ? "article selected" : "article"} onClick={() => 
              setControlStyle("gamepad")}>
                <img src="./images/down.png" alt="gamepad" />
                <div className="article_label">
                  <p>Break/Reverse</p>
                </div>
              </div>
              <div className={controlStyle === "mouseKeyboard" ? "article selected" : "article"} onClick={() => 
              setControlStyle("mouseKeyboard")}>
                <img src="./images/left.png" alt="mouse & keyboard" />
                <div className="article_label">
                  <p>Steer Left</p>
                </div>
              </div>
              <div className={controlStyle === "touch" ? "article selected" : "article"} onClick={() => 
              setControlStyle("touch")}>
                <img src="./images/right.png" alt="mobile" />
                <div className="article_label">
                  <p>Steer Right</p>
                </div>
              </div>
              <div className={controlStyle === "touch" ? "article selected" : "article"} onClick={() => 
              setControlStyle("touch")}>
                <img src="./images/space.png" alt="mobile" style={{
    height: "52px",
    margin: "auto"
      }} />
                <div className="article_label">
                  <p>Jump</p>
                </div>
              </div>
              
            </div>

            <div className={"submit"}>
              <button
                className={"submit-button" }
                onClick={() => {
                  actions.setControls("keyboard");
                  actions.setGameStarted(true);
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
