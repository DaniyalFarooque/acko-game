import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import gsap from "gsap";
import perilsConfig from './constants/perils.json';
import coverConfig from './constants/covers.json';

export const InfoModal = () => {
  const { gameStarted, actions, modalOpen, perils, coins, item } = useStore();

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
  const peril = perilsConfig.filter(e => e.id === perils[perils.length - 1])[0];

  const coverArray = [];
  const isClaimAvailable = item.find(e => {
    let available = false;
    peril.coveredUnder.map(perilConf => {
      if (e === perilConf) {
        available = true;
        coverArray.push(coverConfig.find(x => x.id === e));
      }
    })
    return available;
  })

  let coverNameString = coverArray.reduce((acc, item, index) => {
    if (index === 0) {
      return item.title; // For the first element, directly return the item.
    }
    return acc + ", " + item.title; // Append the current item with a comma separator.
  }, "");
  // let coverNameString = coverArray.reduce((e,i) => {
  //   if(i == 0) {
  //     return acc;
  //   }
  //   return ", " + acc;
  // }, "", acc)

  let coversNeeded = [];
  peril.coveredUnder.map(e => {
    coversNeeded.push(coverConfig.find(x => x.id === e))
  })
  

  // {item.contains(e.id)?"power_available": "power_unavailable"}
  return (
    <>
      {modalOpen && (
        <div className="home" style={{
          display: "flex", gap: 30
        }}>
          <div className="glassy-info-modal" style={{ width: "80vh" }}>
            <h1 style={{color: "#ff0101",
    textTransform: "uppercase"}}>{peril.title}</h1>

            <div className="info-modal-image">
              {peril.imageUrl.map(e => {

                return <div className="article">
                  <img src={e} alt="keyboard" />
                </div>


              })}
            </div>
            {/* <h2 style={{ textAlign: "center" }}>Your existing coins: {coins}</h2> */}
            <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Damage to car health: {peril.carHealthConsumed}</h2>
            <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>Damage to personal health: {peril.lifeHealthConsumed}</h2>
            {isClaimAvailable &&
              <h2 style={{ textAlign: "center", marginTop: 40, color: "#56f756", textTransform: "uppercase" }}>Good for you!! This is already covered under<br /> <b>{coverNameString}</b></h2>
            }
            <div style={{ display: "flex", gap: 30, marginTop: 10, 
    color: "#ff0101",
    textTransform: "uppercase"
 }}>
              <div className={isClaimAvailable ? "submit" : "submit disabled"}>
                <button
                  className={isClaimAvailable ? "submit-button" : "submit-button disabled"}
                  onClick={() => {
                    actions.closeModal();
                  }}
                >
                  CLAIM SUPERPOWER
                </button>
              </div>

              <div className={coins >= peril.coinsNeeded ? "submit" : "submit disabled"}>
                <button
                  className={coins >= peril.coinsNeeded ? "submit-button" : "submit-button disabled"}
                  onClick={() => {
                    actions.looseCoins(peril.coinsNeeded)
                    actions.closeModal();
                  }}
                >
                  Use Coins: {peril.coinsNeeded}
                </button>
              </div>
              <div className={"submit"}>
                <button
                  className={"submit-button"}
                  onClick={() => {
                    if(peril.carHealthConsumed) actions.decreaseCarHealth(peril.carHealthConsumed);
                    if(peril.lifeHealthConsumed) actions.decreaseLifeHealth(peril.lifeHealthConsumed)
                    actions.closeModal();
                  }}
                >
                  Sustain Damage
                </button>
              </div>
            </div>
          </div>
          <div className="glassy-info-modal" style={{ width: "18vw" }}>
            <h1>Superpowers Needed</h1>
            {coversNeeded.map(e => {

              return <div className="article">
                <img src={e.imageUrl} alt="keyboard" className={item.includes(e.id) ? "power_available" : "power_unavailable"} />
              </div>


            })}
            <div style={{display: "flex", marginTop: 20}}>
              <div className="red-color"></div> Unavailable
            </div>
            <div style={{display: "flex", marginTop: 5}}>
            <div className="green-color"></div> Available
            </div>
          </div>
        </div>

      )}
    </>

  );
};
