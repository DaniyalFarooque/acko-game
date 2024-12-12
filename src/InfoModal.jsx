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
  const peril = perilsConfig.filter(e => e.id===perils[perils.length-1])[0];

  const coverArray = [];
  const isClaimAvailable = item.find(e => {
    let available = false;
    peril.coveredUnder.map(perilConf => {
      if(e === perilConf) {
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
  console.log(coverNameString, "asdfasdf")
  return (
    <>
      {modalOpen && (
        <div className="home">
        <div className="glassy-info-modal">
          <h1>{peril.title}</h1>

          <div className="info-modal-image">
          <div className= "article" onClick={() => 
            setControlStyle("keyboard")}>
              <img src={peril.imageUrl} alt="keyboard" />
             
            </div>
            
          </div>
          <h2 style={{textAlign: "center"}}>Your existing coins: {coins}</h2>
          <h2 style={{textAlign: "center"}}>Damage to car health: {peril.carHealthConsumed}</h2>
          {isClaimAvailable && 
            <h2 style={{textAlign: "center"}}>Good for you!! This is already covered under: {coverNameString}</h2>
          }
          <div style = {{display: "flex", gap: 30}}>
          { isClaimAvailable && <div className={"submit"}>
            <button
              className={controlStyle != "" ? "submit-button" : "submit-button disabled"}
              onClick={() => {
                actions.closeModal();
              }}
            >
              CLAIM COVER
            </button>
          </div>}
          
          <div className={coins>=peril.coinsNeeded ? "submit" : "submit disabled"}>
            <button
              className={coins>=peril.coinsNeeded ? "submit-button" : "submit-button disabled"}
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
                actions.decreaseCarHealth(peril.carHealthConsumed);
                actions.closeModal();
              }}
            >
              Accept Damage
            </button>
          </div>
          </div>
        </div>
      </div>
        
      )}
    </>

  );
};
