import BackgroundBlur from "../../components/BackgroundBlur.jsx";
import MenuBackground from "/backgrounds/menu_background.png";
import BackIcon from "/icons/back.png";
import BackgroundImage from "../../components/BackgroundImage.jsx";
import Options from "../../components/options/Options.jsx";
import Transition from "../../components/Transition.jsx";
import {navigate} from "../../utils/TransitionNavigator.js";

function OptionsMenu() {
  return <>
    <BackgroundImage src={MenuBackground}/>
    <BackgroundBlur/>
    <img src={BackIcon} onClick={() => {window.top.ConfigManager.save(); navigate("/")}} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <Options/>
    <Transition/>
  </>;
}

export default OptionsMenu;