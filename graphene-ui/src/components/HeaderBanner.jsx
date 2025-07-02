function HeaderBanner({positionClasses, bannerImage, bannerSize, fontSize, fontTop = 50, children}) {
  return <div className={"absolute " + positionClasses}>
    <p className="absolute translate-[-50%] w-30 text-center" style={{top: fontTop + "vw", fontSize: fontSize + "vw"}}>{children}</p>
    <img src={bannerImage} className="absolute -z-1 translate-[-50%] max-w-none" style={{height: bannerSize + "vw"}}/>
  </div>;
}

export default HeaderBanner;