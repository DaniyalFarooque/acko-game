import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import { Joystick } from "react-joystick-component";

export const InformationDialog = () => {
  const wheel = useRef();
  const [image, setImage] = useState("");
  const { item, gameStarted, actions, controls, coins, carHealth, informationDialog } = useStore();

  console.log(informationDialog)
  if (!informationDialog) return null;
  return (
    <>
      <div style={{zIndex: 100, position: "absolute", top: "0", left: "0", right: "0", bottom: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
        {informationDialog === "coin" && <div className="glassy" style={{height: "40vh", width: "80vh"}}>
          <h1>Yay! You got a coin!</h1>
          <h2>Coins are the primary currency in the game. <br />
            Players collect coins by traveling through the city <br />
            The more coins you collect, the more recovery you can afford, but coins are limited, so you must make strategic choices about where to spend them.</h2>


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
          <h1>Oh no! You met with a peril!</h1>
          <h2>Damages in the game are designed to create setbacks for players. <br />
            Each damage type should drain health or coins or create other obstacles. <br />
            However, these can be mitigated with the right insurance superpowers.</h2>


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
          <h1>Yay! You got a cover!</h1>
          <h2>Superpowers in the game represent different insurance policies that help players mitigate the damage caused by life's challenges. <br />
          Superpowers can be activated when certain damage events occur.</h2>


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
