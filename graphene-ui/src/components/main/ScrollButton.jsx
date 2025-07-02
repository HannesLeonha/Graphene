function ScrollButton({onClick, children}) {
  return <>
    <div onClick={onClick} className="group relative aspect-19/3 w-27 bg-[url(/scrolls/scroll_wide.png)] object-cover bg-no-repeat bg-cover cursor-pointer
      flex items-center justify-center
      after:absolute after:w-full after:h-[130%]
      transition-all ease-out-quart hover:w-30 hover:brightness-105
      active:brightness-90">
      <p className="absolute top-[50%] left-[50%] translate-[-50%] text-[2.9vw] w-50 text-center">{children}</p>
    </div>
  </>
}

export default ScrollButton;
