import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HashRouter, Route, Routes} from "react-router";
import './assets/styles/index.css'
import MainMenu from './pages/MainMenu.jsx'
import HUD from "./pages/HUD.jsx";
import PauseMenu from "./pages/PauseMenu.jsx";
import OptionsMenu from "./pages/options/OptionsMenu.jsx";
import OptionsInGame from "./pages/options/OptionsInGame.jsx";
import LoadMenu from "./pages/saveSystem/LoadMenu.jsx";
import LoadInGame from "./pages/saveSystem/LoadInGame.jsx";
import SaveMenu from "./pages/saveSystem/SaveMenu.jsx";
import Inventory from "./pages/Inventory.jsx";
import Attributes from "./pages/Attributes.jsx";
import SkillTree from "./pages/SkillTree.jsx";
import Shop from "./pages/Shop.jsx";
import registerShopHandler from "./utils/ShopHandler.js";
import {registerVisibilityListeners} from "./utils/VisibilitySystem.js";

registerShopHandler();
registerVisibilityListeners();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<MainMenu/>}/>
        <Route path="optionsMenu" element={<OptionsMenu/>}/>
        <Route path="optionsInGame" element={<OptionsInGame/>}/>
        <Route path="loadMenu" element={<LoadMenu/>}/>
        <Route path="loadIngame" element={<LoadInGame/>}/>
        <Route path="save" element={<SaveMenu/>}/>
        <Route path="hud" element={<HUD/>}/>
        <Route path="pause" element={<PauseMenu/>}/>
        <Route path="inventory" element={<Inventory/>}/>
        <Route path="attributes" element={<Attributes/>}/>
        <Route path="skillTree" element={<SkillTree/>}/>
        <Route path="shop" element={<Shop/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
