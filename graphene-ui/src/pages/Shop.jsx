import CloseIcon from "/icons/close.png";
import ShopBackground from "/backgrounds/shop_background.png";
import BackgroundImage from "../components/BackgroundImage.jsx";
import Transition from "../components/Transition.jsx";
import {transitionNavigate} from "../utils/TransitionNavigator.js";
import PlayerStats from "../components/main/PlayerStats.jsx";

function Shop() {
  return <>
    <BackgroundImage src={ShopBackground} className="brightness-60"/>
    <img src={CloseIcon} onClick={() => transitionNavigate("/hud")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <PlayerStats/>
    <Transition/>
  </>;
}

export default Shop;