function RightScrollButton({onClick, image, children}) {
  return <>
    <div onClick={onClick} className="group relative aspect-23/3 w-35 bg-[url(/scrolls/scroll_wide_long.png)] object-cover bg-no-repeat bg-cover cursor-pointer
      flex items-center justify-center
      after:absolute after:w-full after:h-[140%]
      transition-all ease-out-quart hover:w-37 hover:brightness-105
      active:brightness-90">
      <img className="absolute aspect-square" style={{left: (7/92*100) + "%", height: (10/12*100) + "%"}} src={image}/>
      <p className="absolute right-10.5 text-[2.6vw]">{children}</p>
    </div>
  </>;
}

export default RightScrollButton;