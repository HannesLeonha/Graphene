import MenuBackground from "/backgrounds/menu_background.png";
import BackIcon from "/icons/back.png";
import BackgroundImage from "../../components/BackgroundImage.jsx";
import BackgroundBlur from "../../components/BackgroundBlur.jsx";
import Load from "../../components/load/Load.jsx";
import Transition from "../../components/Transition.jsx";
import {navigate} from "../../utils/TransitionNavigator.js";

function LoadMenu() {
  return <>
    <BackgroundImage src={MenuBackground}/>
    <BackgroundBlur/>
    <img src={BackIcon} onClick={() => navigate("/")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <Load/>
    <Transition/>
  </>;
}

export default LoadMenu;