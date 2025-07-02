function HudBar({name, overlayImage, barImage, backgroundImage, className, barSize, barLeftPadding, barRightPadding, leftPercentOffset = 0, currentValue}) {
  // TODO: Hover Tooltip, Correct pixel rounding

  currentValue = (leftPercentOffset/barSize) + (currentValue * (1-(leftPercentOffset/barSize)));

  let percentageOfInnerBar = (barLeftPadding+barRightPadding)/barSize;
  let missingWidthOfInnerBarPercentage = 1-percentageOfInnerBar;

  let pixelRoundedValue = Math.ceil((currentValue)*barSize)/barSize;

  let barCompletionStyle = {
    width: (missingWidthOfInnerBarPercentage * pixelRoundedValue * 100) + "%",
    left: ((barLeftPadding/barSize)*100) + "%"
  };

  return <>
    <div className={"h-3 " + className}>
      <img src={backgroundImage} className="absolute h-3 max-w-[none]"/>
      <img src={barImage} className="absolute h-3 max-w-[none] object-cover object-right" style={barCompletionStyle}/>
      <img src={overlayImage} className="absolute h-3 max-w-[none]"/>
    </div>
  </>;
}

export default HudBar;