import BigScroll from "/scrolls/scroll_wide_thick.png"
import Scrollbar from "react-scrollbars-custom";

function SaveButton({onClick, index, data, enabled}) {
  return <div className={"relative list-item flex-initial w-[99%] h-4 rounded-[1vw] mb-1 mr-[1%] last:mb-0 float-right " +
    (enabled ? "game-button" : "transition-all")} style={enabled ? {backgroundColor: "rgba(0,0,0,0.4)"} : {backgroundColor: "rgba(0,0,0,0.55)"}}
    onClick={enabled ? () => onClick(index) : ()=>{}}>
    <p className={"text-[2.8vw] absolute top-[50%] translate-y-[-50%] left-1" + (!enabled ? " text-disabled" : "")}>{index === 0 ? "Autosave" : "Save " + index}</p>
    <p className={"text-[2.8vw] absolute top-[50%] translate-y-[-50%] right-1" + (!enabled ? " text-disabled" : "")}>{data != null ? data.playtime : "Empty"}</p>
  </div>;
}

function SaveContainer({onClick, positionClass, disableEmpty = true}) {
  const saveData = [];

  for(let i = 0; i < window.top.DataManager.maxSavefiles(); i++) {
    saveData.push(window.top.DataManager.savefileInfo(i));
  }

  return <div className={"absolute " + positionClass}>
    <Scrollbar style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", overflow: "auto", position: "absolute", top: "50%", left: "50%", translate: "-50% -50%", width: "50vw", height: "25vw"}}>
      {saveData.map((data, index) =>
        <SaveButton index={index} key={index} onClick={onClick} data={data} enabled={data != null || !disableEmpty}/>
      )}
    </Scrollbar>
    <img src={BigScroll} className="w-72 max-w-[none] -z-1"/>
  </div>;
}

export default SaveContainer;