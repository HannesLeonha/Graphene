function BackgroundBlur() {
  return <>
    <div className="w-screen h-screen absolute top-0 left-0 -z-10 bg-black-transparent backdrop-blur-xs"></div>
  </>;
}

export default BackgroundBlur;