function BackgroundImage({ src, className }) {
  return <>
    <img src={src} className={"w-screen h-screen object-cover bg-no-repeat absolute top-0 left-0 -z-20 " + className} />
  </>;
}

export default BackgroundImage;