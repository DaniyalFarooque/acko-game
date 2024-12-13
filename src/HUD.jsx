import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import { Joystick } from "react-joystick-component";
import coverConfig from "./constants/covers.json";

export const HUD = () => {
  const wheel = useRef();
  const [image, setImage] = useState("");
  const { item, gameStarted, actions, controls, coins, carHealth, lifeHealth } = useStore();
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

  let coversAcquired = [];
  item.map(e => {
    coversAcquired.push(coverConfig.find(x => x.id === e))
  })

  const linkIdHash = {
    "ACCIDENT_COVER": "/images/accident_cover.png",
    "FIRE_HAZARD_COVER": "/images/fire_hazard.png",
    "ELECTRONIC_COVER": "/images/electric_cover.png",
    "ENGINE_PROTECTION_COVER": "/images/engine_cover.png",
    "HEALTH_SHIELD": "/images/health_cover.png",
    "BILL_COVER": "/images/bill_cover.png",
    "TIME_SHIELD": "/images/time_shield.jpeg",
    "COVID_COVER": "/images/covid_cover.png",
    "LIFE_COVER": "/images/life_cover.png"
  }
  return (
    <>
      <div className="overlay" style={{ flexDirection: "column" , alignItems:'center', flexWrap:'wrap', maxHeight:'95vh'}}>
        {gameStarted && (
          <>
            {coversAcquired.map((e, i) => {
              return (<><div className="item enlarge-effect">
                <div className="borderOut">
                  <div className="borderIn">
                    <div className="background">
                      {e.imageUrl && <img src={e.imageUrl} alt="item" width={40} key={i} />}
                    </div>
                  </div>
                </div>
              </div><div style={{fontSize: 12, color:'#fff', background:'#6E6E6E', padding:4, textAlign:'center', opacity:'0.7', borderRadius: 5}}><b>{e.title}</b></div></>)
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
        <div className="item enlarge-effect">
          <div className="borderOut">
            <div className="borderIn">
              <div className="background">
                <div className="coinClass">
                  <img src="./images/coin.png" alt="item" width={40} /> <div className="coinText">{coins}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item enlarge-effect"  style={{ marginTop: 20 }}>
          <div className="borderOut">
            <div className="borderIn">
              <div className="background">
                <div className="coinClass">
                  <img src="./images/carHealth.webp" alt="item" width={40} /> <div className="coinText">{carHealth >= 0 ? carHealth : 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item enlarge-effect" style={{ marginTop: 20 }}>
          <div className="borderOut">
            <div className="borderIn">
              <div className="background">
                <div className="coinClass">
                  <img src="./images/hp.png" alt="item" width={40} /> <div className="coinText">{lifeHealth >= 0 ? lifeHealth : 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};
