import Banner from "/banners/banner_curved.png";
import HeaderBanner from "../HeaderBanner.jsx";
import SaveContainer from "./SaveContainer.jsx";
import {transitionNavigate} from "../../utils/TransitionNavigator.js";

function loadFromFile(index) {
  window.top.DataManager.loadGame(index)
    .then(() => {
      window.top.Scene_Load.prototype.reloadMapIfUpdated();
      window.top.SceneManager.goto(window.top.Scene_Map);
      transitionNavigate("/hud");
      window.top.$gameSystem.onAfterLoad();
    })
    .catch(() => {
      window.top.SoundManager.playBuzzer();
    });
}

function Load() {
  return <>
    <HeaderBanner bannerImage={Banner} bannerSize="6" fontSize="2.7" fontTop="-0.5" positionClasses="left-[50%] translate-x-[-50%] top-5">Load</HeaderBanner>
    <SaveContainer positionClass="top-[57%] left-[50%] translate-[-50%]" onClick={loadFromFile} disableEmpty={true}/>
  </>;
}

export default Load;