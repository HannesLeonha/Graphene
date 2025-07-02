import MenuBackground from "/backgrounds/menu_background.png";
import Title from "/eternal_odyssey.png";
import ScrollButton from "../components/main/ScrollButton.jsx";
import BackgroundImage from "../components/BackgroundImage.jsx";
import {useLocation, useNavigate} from "react-router";
import {route} from "../utils/Helpers.js";
import Transition from "../components/Transition.jsx";
import {navigate, transitionNavigate} from "../utils/TransitionNavigator.js";

function MainMenu() {
  route.navigate = useNavigate();
  route.location = useLocation();

  function newGame(location) {
    // TODO check if this is the right way to make a new game
    window.top.DataManager.setupNewGame();
    window.top.SceneManager.goto(window.top.Scene_Map);

    transitionNavigate(location);
  }

  return <>
    <BackgroundImage src={MenuBackground} />
    <img src={Title} className="w-48 absolute top-5 left-3" />
    <div className="flex flex-col justify-between flex-nowrap items-baseline absolute left-6 bottom-3 h-20 transition">
      <ScrollButton onClick={() => newGame("/hud")}>New Game</ScrollButton>
      <ScrollButton onClick={() => navigate("/loadMenu")}>Load Game</ScrollButton>
      <ScrollButton onClick={() => navigate("/optionsMenu")}>Options</ScrollButton>
      <ScrollButton onClick={() => window.top.nw.App.quit()}>Quit</ScrollButton>
    </div>
    <Transition/>
  </>;
}

export default MainMenu;