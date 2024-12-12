import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import perilConfig from "./constants/perils.json";
import coverConfig from "./constants/covers.json";

export const GameOver = () => {
  const { actions, lifeHealth, carHealth, perils, item, coins } = useStore();
  console.log(perils, item, "THis is magicccccccc")

  if (carHealth > 0 && lifeHealth > 0) return null;

  let coversFound = [];
  item.map(e => {
    coversFound.push(coverConfig.find(x => x.id === e))
  })

  let perilsEncountered = [];
  let found = {};
  perils.map(e => {
    let config = perilConfig.find(x => x.id === e);
    if (!found[config.id]) {
      found[config.id] = 1;
      perilsEncountered.push(config)
    } else {
      found[config.id]++;
    }

  })


  return (
    <>
      <div style={{ zIndex: 100, position: "absolute", top: "0", left: "0", right: "0", bottom: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>

        <div className="glassy-info-modal" style={{ height: "90vh", width: "60vw" }}>
          <h1 style={{ marginBottom: 30 }}>GAME OVER</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ width: "50%" }}>
              <h2 style={{ textTransform: "uppercase", marginBottom: 20 }}>Superpowers Collected</h2>
              {coversFound.map(e => {

                return <div className="game-over-entities">
                  <img src={e.imageUrl} alt="keyboard" className="disp-pic" />
                  {e.title}
                </div>

              })}
            </div>
            <div style={{ width: "50%" }}>
              <h2 style={{ textTransform: "uppercase", marginBottom: 20 }}>Perils Encountered</h2>
              {perilsEncountered.map(e => {

                return <div className="game-over-entities">
                  <img src={e.imageUrl[0]} alt="keyboard" className="disp-pic" />
                  {e.title}
                </div>

              })}
            </div>
          </div>
          {coins < 100 && <div>
            <h1 style={{ marginBottom: 30 }}>YOU WON</h1>
            <p>Great! You made some amazing choices. You have more coins than you had initially. </p>
            <p>You can redeem them now to avail great discount with the plan you made!!

            </p>
            <p>OR</p>
            <p style={{marginBottom: 40}}>You can retry and save more coins and avail higher discount!</p>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              <div className={"submit"}>
                <button
                  className={"submit-button"}
                  onClick={() => {
                    
                  }}
                >
                  GET QUOTE
                </button>
              </div>
              <div className={"submit"}>
                <button
                  className={"submit-button"}
                  onClick={() => {
                    // actions.restartGame();
                  }}
                >
                  RETRY
                </button>
              </div>
            </div>
          </div>}
          {coins >= 100 && <div>
            <h1 style={{ marginBottom: 30, marginTop: 100 }}>YOU LOST</h1>
            <p style={{ marginBottom: 40 }}>You lost due to your poor choices. Current wallet has less coins than the initial amount.</p>
            <div className={"submit"} style={{ margin: '0 auto' }}>
              <button
                className={"submit-button"}
                onClick={() => {
                  // actions.restartGame();
                }}
              >
                RETRY
              </button>
            </div>
          </div>}


        </div>
      </div>
    </>
  );
};
