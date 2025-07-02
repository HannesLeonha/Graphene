import Frame from "/frames/frame_cutout.png";
import FrameBackground from "/frames/frame_background.png";
import Gold from "/icons/gold.png";
import {useState} from "react";

function PlayerStats({customPlayerId = undefined, customPlacement = undefined}) {
  const showArrows = window.top.$gameParty.size() > 1 && isNaN(customPlayerId);
  const [characterId, setCharacterId] = useState(0);
  const character = window.top.$gameParty.allMembers()[!isNaN(customPlayerId) ? customPlayerId : characterId];

  return <div className={"bg-[url(/scrolls/scroll.png)] aspect-47/118 object-cover bg-no-repeat bg-cover -z-2 absolute " + (customPlacement === undefined ? "w-20 left-1 top-[50%] translate-y-[-50%]" : customPlacement)}>
    { showArrows &&
      <div className="absolute left-0 -top-2 aspect-square w-[30%] bg-[url(/icons/left_arrow.png)] object-cover bg-no-repeat bg-cover
        cursor-pointer transition-all ease-out-quart hover:brightness-110
        active:brightness-80" onClick={() => {setCharacterId(characterId > 0 ? characterId-1 : window.top.$gameParty.size()-1)}}></div>
    }
    { showArrows &&
      <div className="absolute right-0 -top-2 aspect-square w-[30%] bg-[url(/icons/right_arrow.png)] object-cover bg-no-repeat bg-cover
        cursor-pointer transition-all ease-out-quart hover:brightness-110
        active:brightness-80" onClick={()=>{setCharacterId(characterId < window.top.$gameParty.size()-1 ? characterId+1 : 0)}}></div>
    /*todo: top to precento w-[85%] h-[91%] <- don't know wtf that's supposed to mean */}
    <div className="absolute top-4.5 bottom-4 left-1.5 right-1.5">
      <p className="text-[2.6vw] w-full text-center">{character._name}</p>
      <div className="relative aspect-square w-full">
        <img src={Frame} className="absolute w-full h-full"/>
        <img src={"/characters/" + character._name + ".png"} className="absolute w-full h-full -z-1"/>
        <img src={FrameBackground} className="absolute w-full h-full -z-2"/>
        {/* todo: acquire images from rpg maker */}
      </div>
      <p className="text-[2.6vw] h-3">{"HP: " + character.hp + "/" + character.mhp}</p>
      <p className="text-[2.6vw] h-3">{"MP: " + character.mp + "/" + character.mmp}</p>
      <p className="text-[2.6vw] h-3">{"TP: " + character.mp + "/" + character.mmp}</p>
      <p className="text-[2.6vw] h-3">{"Guilt: " + window.top.$gameSystem.guilt + "/100"}</p>
      <div className="absolute w-full h-4 bottom-0 mt-1">
        <img src={Gold} className="h-full aspect-square float-left"/>
        <p className="h-full align-middel text-[2.6vw] float-right">{window.top.$gameParty.gold() + "G"}</p>
      </div>
    </div>
  </div>;
}

export default PlayerStats;