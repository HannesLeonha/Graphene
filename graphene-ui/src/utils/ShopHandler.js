import {addGameEventListener} from "./EventManager.js";
import {transitionNavigate} from "./TransitionNavigator.js";

function openShop(args) {
  transitionNavigate("/shop")
  console.log(args);
}

function registerShopHandler() {
  addGameEventListener("OpenShop", openShop);
}

export default registerShopHandler;