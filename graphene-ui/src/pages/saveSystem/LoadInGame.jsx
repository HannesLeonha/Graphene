import BackgroundBlur from "../../components/BackgroundBlur.jsx";
import BackIcon from "/icons/back.png";
import Load from "../../components/load/Load.jsx";
import Transition from "../../components/Transition.jsx";
import {navigate} from "../../utils/TransitionNavigator.js";

function LoadInGame() {
  return <>
    <BackgroundBlur/>
    <img src={BackIcon} onClick={() => navigate("/pause")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <Load/>
    <Transition/>
  </>;
}

export default LoadInGame;