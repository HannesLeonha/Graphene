import {route} from "./Helpers.js";

let transition = true;

function transitionNavigate(path) {
  transition = true;

  let transitionElement = document.getElementById("transitionDiv");

  if(transitionElement == null) {
    route.navigate(path);
    return;
  }

  transitionElement.style.animationName = "fadeOut";

  transitionElement.addEventListener("animationend", (event) => {
    if(event.animationName === "fadeOut")
      route.navigate(path);
  });
}
// todo needs react router transition
function navigate(path) {
  transition = false;
  route.navigate(path);
}

export {transitionNavigate, navigate, transition};