import {addGameEventListener} from "./EventManager.js";
import {navigate} from "./TransitionNavigator.js";

function registerVisibilityListeners() {
  addGameEventListener("hideUi", ()=>{
    document.body.style.opacity = "0";
    document.body.style.pointerEvents = "none";
  });

  addGameEventListener("showUi", ()=>{
    document.body.style.opacity = "1";
    document.body.style.pointerEvents = "unset";
  });

  addGameEventListener("menu", ()=>{
    document.body.style.opacity = "1";
    document.body.style.pointerEvents = "unset";
    navigate("/");
  });
}

export {registerVisibilityListeners};