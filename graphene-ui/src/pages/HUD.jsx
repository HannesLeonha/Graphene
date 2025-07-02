import MenuIcon from "/icons/menu.png";
import GuiltOverlay from "/bars/guilt_bar/guilt_bar_overlay.png";
import GuiltBar from "/bars/guilt_bar/guilt_bar.png";
import GuiltBackground from "/bars/guilt_bar/guilt_bar_background.png";
import HealthOverlay from "/bars/health_bar/health_bar_overlay.png";
import HealthBar from "/bars/health_bar/health_bar.png";
import HealthBackground from "/bars/health_bar/health_bar_background.png";
import HudBar from "../components/hud/HudBar.jsx";
import {useState} from "react";
import Transition from "../components/Transition.jsx";
import {navigate} from "../utils/TransitionNavigator.js";

function HUD() {
  let player = window.top.$gameParty.battleMembers()[0];
  const [react, updater] = useState(0);

  const _setHp = window.top.Game_BattlerBase.prototype.setHp;
  window.top.Game_BattlerBase.prototype.setHp = function() {
    _setHp.apply(this, arguments);

    updater(react+1);
  };

  const _guiltChanged = window.top.Game_System.prototype.guiltChanged;
  window.top.Game_System.prototype.guiltChanged = function() {
    _guiltChanged.apply(this, arguments);

    updater(react-1);
  };

  window.top.SceneManager.resume()

  return <>
    <HudBar name="Health" className="absolute top-1 left-1 aspect-43/5" overlayImage={HealthOverlay} barImage={HealthBar} backgroundImage={HealthBackground} currentValue={player.hp / player.mhp} barSize={86} barLeftPadding={7} barRightPadding={3} leftPercentOffset={1.8}/>
    <HudBar name="Guilt" className="absolute top-4 left-1 aspect-59/10" overlayImage={GuiltOverlay} barImage={GuiltBar} backgroundImage={GuiltBackground} currentValue={window.top.$gameSystem.guilt / 100} barSize={59} barLeftPadding={8} barRightPadding={3}/>
    <img src={MenuIcon} onClick={() => navigate("/pause")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <Transition/>
  </>;
  // TODO loading in transition needs to be less jarring
}

export default HUD;