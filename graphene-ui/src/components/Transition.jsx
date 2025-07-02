import {transition} from "../utils/TransitionNavigator.js";

function Transition() {
  return <div id="transitionDiv" className={"w-screen h-screen absolute top-0 left-0 z-10 pointer-events-none bg-transition" + (transition ? " bg-fadeIn-transition" : "")}></div>;
}

export default Transition;