import BackIcon from "/icons/back.png";
import Transition from "../components/Transition.jsx";
import {navigate} from "../utils/TransitionNavigator.js";
import HeaderBanner from "../components/HeaderBanner.jsx";
import Banner from "/banners/banner_curved.png";
import BackgroundBlur from "../components/BackgroundBlur.jsx";
import BigScroll from "/scrolls/scroll_wide_thick.png"
import {useState} from "react";
import Frame from "/frames/frame_cutout.png";
import FrameBackground from "/frames/frame_background.png";

function Attributes() {
  const showArrows = window.top.$gameParty.size() > 1;
  const [characterId, setCharacterId] = useState(0);
  const character = window.top.$gameParty.allMembers()[characterId];

  return <>
    { showArrows &&
      <div className="absolute left-32 top-3 w-5 aspect-square bg-[url(/icons/left_arrow.png)] object-cover bg-no-repeat bg-cover
        cursor-pointer transition-all ease-out-quart hover:brightness-110
        active:brightness-80" onClick={() => {setCharacterId(characterId > 0 ? characterId-1 : window.top.$gameParty.size()-1)}}></div>
    }
    { showArrows &&
      <div className="absolute right-32 top-3 w-5 aspect-square bg-[url(/icons/right_arrow.png)] object-cover bg-no-repeat bg-cover
        cursor-pointer transition-all ease-out-quart hover:brightness-110
        active:brightness-80" onClick={()=>{setCharacterId(characterId < window.top.$gameParty.size()-1 ? characterId+1 : 0)}}></div>
    }
    <BackgroundBlur/>
    <img src={BackIcon} onClick={() => navigate("/pause")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <HeaderBanner bannerImage={Banner} bannerSize="6" fontSize="2.7" fontTop="-0.5"
                  positionClasses="left-[50%] translate-x-[-50%] top-5">Attributes</HeaderBanner>
    <Transition/>
    <div className="absolute top-[50%] left-[50%] translate-[-50%]">
      <div className="absolute top-[50%] left-[50%] translate-[-50%] w-50 h-25 grid grid-rows-2 grid-cols-2 gap-1">
        <div className="col-span-2">
          <div className="relative aspect-square h-full float-left">
            <img src={Frame} className="absolute w-full h-full"/>
            <img src={"/characters/" + character._name + ".png"} className="absolute w-full h-full -z-1"/>
            <img src={FrameBackground} className="absolute w-full h-full -z-2"/>
          </div>
          <div className="w-[73%] h-full float-right">
            <h2>{character._name}</h2>
            <p className="text-[3vw]">{`Level: ${character.level} ${character.isMaxLevel() ? "" : `(${character.currentExp()}/${character.nextRequiredExp()})`}`}</p>
          </div>
        </div>
        <div>
          <p className="text-[2vw] h-3">{"HP: " + character.hp + "/" + character.mhp}</p>
          <p className="text-[2vw] h-3">{"MP: " + character.mp + "/" + character.mmp}</p>
          <p className="text-[2vw] h-3">{"TP: " + character.tp}</p>
          <p className="text-[2vw] h-3">{"Guilt: " + window.top.$gameSystem.guilt + "/100"}</p>
          <p className="text-[2vw] h-3">{"Luck: " + character.luk}</p>
        </div>
        <div>
          <p className="text-[2vw] h-3">{"Attack: " + character.atk}</p>
          <p className="text-[2vw] h-3">{"Defense: " + character.def}</p>
          <p className="text-[2vw] h-3">{"Magic Attack: " + character.mat}</p>
          <p className="text-[2vw] h-3">{"Magic Defense: " + character.mdf}</p>
          <p className="text-[2vw] h-3">{"Agility: " + character.agi}</p>
        </div>
        {/*todo: add equips with visual, try and make an automatic image resource loader which retrieves from rpg maker and uses them using canvas*/}
      </div>
      <img src={BigScroll} className="w-72 max-w-[none] -z-1"/>
    </div>
  </>;
}

export default Attributes;