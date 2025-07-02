function RpgText({children}) {
  let svg = <svg viewBox="0 0 1000 90" xmlns="http://www.w3.org/2000/svg">
    <text x="500" textAnchor="middle" dominantBaseline="hanging" fill="white" strokeWidth="22" paintOrder="stroke">
      {children}
    </text>
  </svg>;
  console.log(svg);
  svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
  svg.querySelector("text").setAttribute("x", svg.clientWidth/2);

  return <>
    {svg}
  </>;
}

export default RpgText;