import SkillTreeBackground from "/backgrounds/skill_background.png";
import BackIcon from "/icons/back.png";
import Transition from "../components/Transition.jsx";
import {navigate} from "../utils/TransitionNavigator.js";
import Scrollbar from "react-scrollbars-custom";
import HeaderBanner from "../components/HeaderBanner.jsx";
import Banner from "/banners/banner_big.png";
import {useState} from "react";

function SkillElement({onClick, data, enabled, equipped}) {
  data.description = data.description.replaceAll("\n", " ");

  return <div
    className={"bg-[url('/scrolls/scroll_wide_long.png')] aspect-23/3 relative list-item flex-initial w-[99%] mb-1 mr-[1%] last:mb-0 float-right object-cover bg-cover bg-no-repeat " +
      (enabled ? "game-button" : "transition-all")} style={!enabled ? {filter: "brightness(90%)"} : {}}
    onClick={enabled ? () => onClick(data) : () => {
    }}>
    <p className={"text-[2.8vw] absolute top-[10%] left-5" + (!enabled ? " text-disabled" : "")}>{`${data.name} (${data.mpCost > data.tpCost ? "MP" : "TP"} ${Math.max(data.mpCost, data.tpCost)})`}</p>
    <p className={"text-[2.8vw] absolute top-[10%] right-5" + (!enabled ? " text-disabled" : "")}>{enabled ? (equipped ? "Equipped" : "Unequipped") : "Unusable"}</p>
    <p className={"text-[2vw] leading-[2vw] absolute top-[45%] left-5 right-5" + (!enabled ? " text-disabled" : "")}>{data.description}</p>
  </div>;
}

function SkillTree() {
  const character = window.top.$gameParty.allMembers()[0];
  const skills = character.skills();

  const [equippedSkill, setEquippedSkill] = useState(character.lastMenuSkill()?.name);

  function onClick(skill) {
    character.setLastMenuSkill(skill);
    setEquippedSkill(skill.name);
  }

  return <div className="DarkScrollBackground">
    <img className="w-full -z-10" src={SkillTreeBackground}/>

    <img src={BackIcon} onClick={() => navigate("/pause")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <HeaderBanner bannerImage={Banner} bannerSize="8" fontSize="4" fontTop="-1" positionClasses="left-[50%] translate-x-[-50%] top-7">Skill Tree</HeaderBanner>

    {
      skills.length === 0 ?
        <p className="top-[50%] left-[50%] absolute font-[4vw] translate-[-50%]">No skills yet</p> :
        <Scrollbar style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", overflow: "auto", position: "absolute", top: "60%", left: "50%", translate: "-50% -50%", width: "80vw", height: "40vw"}}>
          {skills.map((data, index) =>
            <SkillElement key={index} onClick={onClick} data={data} enabled={character.canUse(data)} equipped={equippedSkill === data.name}/>
          )}
        </Scrollbar>
    }
    <Transition/>
  </div>;
}

export default SkillTree;