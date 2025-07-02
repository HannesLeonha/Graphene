import BackgroundBlur from "../../components/BackgroundBlur.jsx";
import BackIcon from "/icons/back.png";
import Options from "../../components/options/Options.jsx";
import Transition from "../../components/Transition.jsx";
import {navigate} from "../../utils/TransitionNavigator.js";

function OptionsInGame() {
  return <>
    <BackgroundBlur/>
    <img src={BackIcon} onClick={() => {window.top.ConfigManager.save(); navigate("/pause")}} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <Options/>
    <Transition/>
  </>;
}

export default OptionsInGame;