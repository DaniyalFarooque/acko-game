import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import { Joystick } from "react-joystick-component";

export const InformationDialog = () => {
  const wheel = useRef();
  const [image, setImage] = useState("");
  const { item, gameStarted, actions, controls, coins, carHealth, informationDialog } = useStore();
  const wrapText = (text, lineIndex) => {
    return text.split("").map((char, index) => (
      <span key={index} style={{ animationDelay: `${lineIndex * 1 + index * 0.07}s` }} className="animated-letter">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  
  if (!informationDialog) return null;
  return (
    <>
      <div style={{zIndex: 100, position: "absolute", top: "0", left: "0", right: "0", bottom: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
        {informationDialog === "coin" && <div className="glassy" style={{height: "40vh", width: "80vh"}}>
          <h2>{wrapText("Yay! You got a coin! Coins are the primary currency in the game.Players collect coins by traveling through the city.The more coins you collect, the more recovery you can afford, but coins are limited, so you must make strategic choices about where to spend them.", 0)}</h2>


          <div className={"submit"}>
            <button
              className={"submit-button"}
              onClick={() => {
                actions.setCoinTouched();
                actions.setInformationDialog(null);
              }}
            >
              CONTINUE
            </button>
          </div>
        </div>}
        {informationDialog === "peril" && <div className="glassy" style={{height: "40vh", width: "80vh"}}>
          <h2>{wrapText("Oh no! You met with a peril! Peril in the game are designed to create setbacks for players.Each peril type should drain health or coins or create other obstacles.However, these can be mitigated with the right insurance superpowers. ",0)}</h2>
          {/* <h2><br />
             <br />
            </h2> */}


          <div className={"submit"}>
            <button
              className={"submit-button"}
              onClick={() => {
                actions.setPerilTouched();
                actions.setInformationDialog(null);
              }}
            >
              CONTINUE
            </button>
          </div>
        </div>}
        {informationDialog === "cover" && <div className="glassy" style={{height: "40vh", width: "80vh"}}>
          <h2>{wrapText("Yay! You got a superpower! Superpowers in the game represent different insurance policies that help players mitigate the damage caused by life's challenges.Superpowers can be activated when certain damage events occur.",0)}</h2>
          {/* <h2> <br />
          </h2> */}


          <div className={"submit"}>
            <button
              className={"submit-button"}
              onClick={() => {
                actions.setCoverTouched();
                actions.setInformationDialog(null);
              }}
            >
              CONTINUE
            </button>
          </div>
        </div>}
      </div>
    </>
  );
};
