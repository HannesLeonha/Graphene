import CloseIcon from "/icons/close.png";
import SaveIcon from "/icons/save.png";
import LoadIcon from "/icons/load.png";
import InventoryIcon from "/icons/inventory.png";
import AttributesIcon from "/icons/upgrade.png";
import SkillTreeIcon from "/icons/skill_tree.png";
import OptionsIcon from "/icons/options.png";
import BackIcon from "/icons/leave.png";
import BackgroundBlur from "../components/BackgroundBlur.jsx";
import RightScrollButton from "../components/pause/RightScrollButton.jsx";
import Transition from "../components/Transition.jsx";
import {navigate, transitionNavigate} from "../utils/TransitionNavigator.js";
import HeaderBanner from "../components/HeaderBanner.jsx";
import Banner from "/banners/banner_curved.png";
import PlayerStats from "../components/main/PlayerStats.jsx";

function PauseMenu() {
  window.top.SceneManager.stop()

  return <>
    <BackgroundBlur/>
    <HeaderBanner bannerImage={Banner} bannerSize="6" fontSize="2.7" fontTop="-0.5" positionClasses="left-[50%] translate-x-[-50%] top-5">Game Paused</HeaderBanner>
    <img src={CloseIcon} onClick={() => navigate("/hud")} className="absolute right-1 top-1 w-5 h-5 cursor-pointer
      transition-all ease-out-quart hover:brightness-110
      active:brightness-80"/>
    <div className="flex flex-col justify-between flex-nowrap items-end absolute -right-10 bottom-2 h-43 transition">
      <RightScrollButton onClick={() => navigate("/save")} image={SaveIcon}>Save</RightScrollButton>
      <RightScrollButton onClick={() => navigate("/loadInGame")} image={LoadIcon}>Load</RightScrollButton>
      <RightScrollButton onClick={() => navigate("/inventory")} image={InventoryIcon}>Inventory</RightScrollButton>
      <RightScrollButton onClick={() => navigate("/attributes")} image={AttributesIcon}>Attributes</RightScrollButton>
      <RightScrollButton onClick={() => navigate("/skillTree")} image={SkillTreeIcon}>Skill Tree</RightScrollButton>
      <RightScrollButton onClick={() => navigate("/optionsInGame")} image={OptionsIcon}>Options</RightScrollButton>
      <RightScrollButton onClick={() => transitionNavigate("/")} image={BackIcon}>Back to Menu</RightScrollButton>
    </div>
    <PlayerStats/>
    <Transition/>
  </>;
}

export default PauseMenu;