const settings = [{
    name: "Always Dash",
    type: "bool",
    configName: "alwaysDash"
  }, {
    name: "Command Remember",
    type: "bool",
    configName: "commandRemember"
  }, {
    name: "Touch UI",
    type: "bool",
    configName: "touchUI"
  }, {
    name: "Background Music",
    type: "percentage",
    configName: "bgmVolume"
  }, {
    name: "Background Sounds",
    type: "percentage",
    configName: "bgsVolume"
  }, {
    name: "Music Effects",
    type: "percentage",
    configName: "meVolume"
  }, {
    name: "Sound Effects",
    type: "percentage",
    configName: "seVolume"
  }
];

// Add Getter and Setter for each
settings.forEach((setting, index) => {
  settings[index].set = (value)=>{
    window.top.ConfigManager[setting.configName] = value;
    window.top.ConfigManager.save();
  };

  settings[index].get = ()=>window.top.ConfigManager[setting.configName];
});

export {settings};