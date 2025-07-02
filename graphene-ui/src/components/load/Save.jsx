import Banner from "/banners/banner_curved.png";
import SaveContainer from "./SaveContainer.jsx";
import HeaderBanner from "../HeaderBanner.jsx";
import {navigate} from "../../utils/TransitionNavigator.js";

function saveToFile(index) {
  window.top.$gameSystem.setSavefileId(index);
  window.top.$gameSystem.onBeforeSave();
  window.top.DataManager.saveGame(index)
    .then(() => {
      navigate("/pause");
      window.top.SoundManager.playSave();
    })
    .catch(() => {
      window.top.SoundManager.playBuzzer();
    });
}

function Save() {
  return <>
    <HeaderBanner bannerImage={Banner} bannerSize="6" fontSize="2.7" fontTop="-0.5" positionClasses="left-[50%] translate-x-[-50%] top-5">Save</HeaderBanner>
    <SaveContainer positionClass="top-[57%] left-[50%] translate-[-50%]" onClick={saveToFile} disableEmpty={false}/>
  </>;
}

export default Save;