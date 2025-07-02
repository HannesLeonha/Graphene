import BackgroundBlur from "../components/BackgroundBlur.jsx";
import BackIcon from "/icons/back.png";
import Transition from "../components/Transition.jsx";
import {navigate} from "../utils/TransitionNavigator.js";
import HeaderBanner from "../components/HeaderBanner.jsx";
import Banner from "/banners/banner_curved.png";
import {useState} from "react";
import Scrollbar from "react-scrollbars-custom";
import BigScroll from "/scrolls/scroll_wide_thick.png"

function formatItem(item) {
  switch(item.etypeId) {
    case 1:
      return `ATK: ${item.params[2]}, M. ATK: ${item.params[6]}`;
    default:
      return `DEF: ${item.params[3]}, M. DEF: ${item.params[5]}, MAX HP: ${item.params[0]}, MAX MP: ${item.params[1]}`;
  }
}

function ItemElement({onClick, data, enabled, equipped}) {
  data.description = data.description.replaceAll("\n", " ");

  return <div
    className={"aspect-23/3 relative list-item flex-initial w-[99%] mb-1 mr-[1%] last:mb-0 float-right object-cover bg-cover bg-no-repeat rounded-[1vw] " +
      (enabled ? "game-button" : "transition-all")}
    style={enabled ? {backgroundColor: "rgba(0,0,0,0.4)"} : {backgroundColor: "rgba(0,0,0,0.55)"}}
    onClick={enabled ? () => onClick(data) : () => {
    }}>
    <p className={"text-[2.8vw] absolute top-0 left-1" + (!enabled ? " text-disabled" : "")}>{data.name}</p>
    <p className={"text-[2.8vw] absolute top-0 right-1" + (!enabled ? " text-disabled" : "")}>{enabled ? (equipped ? "Equipped" : "Unequipped") : "Unusable"}</p>
    <p className={"text-[2.4vw] leading-[2vw] absolute bottom-[0.5vw] left-1 right-1 text-center" + (!enabled ? " text-disabled" : "")}>{formatItem(data)}</p>
  </div>;
}

function Inventory() {
  const filterTypes = ["Weapon", "Shield", "Head", "Body", "Accessory"];
  const [filter, setFilter] = useState("Weapon");

  const character = window.top.$gameParty.allMembers()[0];
  let items = window.top.$gameParty.allItems().concat(character.equips()[filterTypes.indexOf(filter)]);
  items = items.filter((item) => item?.etypeId === filterTypes.indexOf(filter)+1);

  const [equippedItem, setEquippedItem] = useState(character.equips());

  function isItemEquipped(item) {
    return character.isEquipped(item);
  }

  function onItemClick(item) {
    if(isItemEquipped(item)) {
      character.tradeItemWithParty(null, item);
      character.discardEquip(item);
    } else {
      character.changeEquip(item.etypeId-1, item);
    }

    setEquippedItem(character.equips());
  }

  return <>
    <BackgroundBlur/>
    <img src={BackIcon} onClick={() => navigate("/pause")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <HeaderBanner bannerImage={Banner} bannerSize="6" fontSize="2.7" fontTop="-0.5" positionClasses="left-[50%] translate-x-[-50%] top-5">Inventory</HeaderBanner>
    <Scrollbar style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", overflow: "auto", position: "absolute", top: "56%", left: "57%", translate: "-50% -50%", width: "50vw", height: "25vw"}}>
      {
        items.length === 0 ?
          <p className="absolute top-[50%] left-[50%] translate-[-50%]">No items</p> :
          items.map((data, index) =>
          <ItemElement index={index} key={index} onClick={onItemClick} data={data} enabled={character.canEquip(data)} equipped={isItemEquipped(data)}/>
      )}
    </Scrollbar>
    <img src={BigScroll} className="w-72 max-w-[none] -z-1 absolute top-[56%] left-[57%] translate-[-50%]"/>
    <div className="flex flex-col justify-between flex-nowrap items-end absolute right-81 top-[53%] translate-y-[-50%] h-33 transition">
      {
        filterTypes.map((data) =>
          <div onClick={() => setFilter(data)} key={data} className={"group relative aspect-24/17 w-10 bg-[url(/banners/banner_small.png)] object-cover bg-no-repeat bg-cover cursor-pointer " +
            "flex items-center justify-center " +
            "after:absolute after:w-full after:h-[140%] " +
            (data !== filter ? "transition-all ease-out-quart hover:w-11 hover:brightness-105 " +
            "active:brightness-90" : "brightness-70")}>
            <p className="absolute left-[50%] translate-x-[-50%] text-[2vw]">{data}</p>
          </div>
        )
      }
    </div>
    <Transition/>
  </>;
}

export default Inventory;