import HeaderBanner from "../HeaderBanner.jsx";
import Banner from "/banners/banner_curved.png";
import Scrollbar from "react-scrollbars-custom";
import BigScroll from "/scrolls/scroll_wide_thick.png"
import {settings} from "../../utils/Settings.js";
import {useState} from "react";

function OptionItem({setting}) {
  let [inputState, setState] = useState(setting.get());
  let input = <p>ERROR</p>;

  switch(setting.type) {
    case "bool":
      input = <input className="text-[2.8vw] absolute top-[50%] translate-y-[-50%] right-1" type="checkbox" checked={inputState} onChange={(event)=>{
        setting.set(event.target.checked);
        setState(event.target.checked);
      }}/>;
      break;
    case "percentage":
      input = <div className="text-[2.8vw] absolute top-[50%] translate-y-[-50%] right-1">
        <input type="range" min="0" max="100" step="5" value={inputState} onChange={(event)=>{
          setting.set(event.target.value);
          setState(event.target.value);
        }}/>
        <label className="w-6 inline-block text-right">{inputState + "%"}</label>
      </div>;
      break;
  }
  // todo: remove default input fields

  return <div
        className="relative list-item flex-initial w-[99%] h-4 rounded-[1vw] mb-1 mr-[1%] last:mb-0 float-right"
        style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
        <p className="text-[2.8vw] absolute top-[50%] translate-y-[-50%] left-1">{setting.name}</p>
        {input}
      </div>;
  }

  function Options() {
  window.top.ConfigManager.load();

  // todo: make scrollbar scroll with scrollwheel
  return <>
    <HeaderBanner bannerImage={Banner} bannerSize="6" fontSize="2.7" fontTop="-0.5" positionClasses="left-[50%] translate-x-[-50%] top-5">Options</HeaderBanner>
    <div className="absolute top-[57%] left-[50%] translate-[-50%]">
      <Scrollbar style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", overflow: "auto", position: "absolute", top: "50%", left: "50%", translate: "-50% -50%", width: "50vw", height: "25vw"}}>
        {settings.map((value) =>
            <OptionItem key={value.configName} setting={value}/>
        )}
      </Scrollbar>
      <img src={BigScroll} className="w-72 max-w-[none] -z-1"/>
    </div>
  </>;
}

export default Options;