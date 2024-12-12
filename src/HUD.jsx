import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import { Joystick } from "react-joystick-component";

export const HUD = () => {
  const wheel = useRef();
  const [image, setImage] = useState("");
  const { item, gameStarted, actions, controls, coins, carHealth } = useStore();
  console.log(item)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (wheel.current) {
        const { clientX, clientY } = e;
        const screenWidth = window.innerWidth;
        const rotation = ((clientX - screenWidth / 2) / screenWidth) * 180;

        wheel.current.style.left = `${clientX - 100}px`;
        wheel.current.style.top = `${clientY - 100}px`;
        wheel.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMove = (e) => {
    actions.setJoystickX(e.x);
  };

  const handleStop = () => {
    actions.setJoystickX(0);
  };

  // useEffect(() => {
  //   switch (item) {
  //     case "banana":
  //       setImage("./images/banana.webp");
  //       break;
  //     case "mushroom":
  //       setImage("./images/mushroom.png");
  //       break;
  //     case "shell":
  //       setImage("./images/shell.webp");
  //       break;
  //     default:
  //       setImage("");
  //   }
  // }, [item]);
  const linkIdHash = {
    "item1": "./images/banana.webp",
    "item2": "./images/mushroom.png",
    "item3": "./images/mushroom.png"
  }

  return (
    <>
    <div className="overlay">
      {gameStarted && (
        <>
            {item.map(e => {
              return (<div className="item">
                <div className="borderOut">
                  <div className="borderIn">
                    <div className="background">
                      {linkIdHash[e] && <img src={linkIdHash[e]} alt="item" width={90} />}
                    </div>
                  </div>
                </div>
              </div>)
            })
            }
            {controls === "touch" && (
              <>
                <div className="controls joystick">
                  <Joystick
                    size={100}
                    sticky={false}
                    baseColor="rgba(255, 255, 255, 0.5)"
                    stickColor="rgba(255, 255, 255, 0.5)"
                    move={handleMove}
                    stop={handleStop}
                  ></Joystick>
                </div>
                <div
                  className="controls drift"
                  onMouseDown={(e) => {
                    actions.setDriftButton(true);
                  }}
                  onMouseUp={(e) => {
                    actions.setDriftButton(false);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    actions.setDriftButton(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    actions.setDriftButton(false);
                  }}
                >
                  drift
                </div>
                <div
                  className="controls itemButton"
                  onMouseDown={(e) => {
                    actions.setItemButton(true);
                  }}
                  onMouseUp={(e) => {
                    actions.setItemButton(false);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    actions.setItemButton(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    actions.setItemButton(false);
                  }}

                >
                  item
                </div>
                <div
                  className="controls menuButton"
                  onMouseDown={(e) => {
                    actions.setMenuButton(true);
                  }}
                  onMouseUp={(e) => {
                    actions.setMenuButton(false);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    actions.setMenuButton(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    actions.setMenuButton(false);
                  }}

                >
                  menu
                </div>
              </>
            )}
        </>
      )}
    </div>
    {gameStarted && <div className="right-overlay">
      <div className="item">
                <div className="borderOut">
                  <div className="borderIn">
                    <div className="background">
                    <div className="coinClass">
            <img src="./images/coin.png" alt="item" width={50} /> <div className="coinText">{coins}</div>
            </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{marginTop: 20}}>
                <div className="borderOut">
                  <div className="borderIn">
                    <div className="background">
                    <div className="coinClass">
            <img src="./images/carHealth.webp" alt="item" width={50} /> <div className="coinText">{carHealth}</div>
            </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>}
    </>
  );
};
