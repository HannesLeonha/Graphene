//=============================================================================
// Graphene UI
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Create your own ui with html.
 * @url https://github.com/HannesLeonha
 * @author Hannes Leonhartsberger
 *
 * @help -- Graphene Ui V1.0 --
 *
 * Removes the built in UI and replaces it with a custom web ui.
 * 
 * ---------------------------------- Usage ----------------------------------
 * 
 * 1. Creating the web ui
 * Create folder with your web project in the root of the RPG-Maker Project
 * folder. It's recommended that you create an npm-project with a build tool
 * like vite and a web framework like react.
 * 
 * 2. Efficient debugging
 *
 * 2.1 SDK Version of NWJS
 * It's highly recommended that you install the sdk version of nwjs from the
 * internet. Using the command `path/to/nwjs/nw.exe .` in the project root
 * folder the RPG Maker project will start. By pressing F12 you can now see a
 * developer console.
 *
 * 2.2 Running with npm
 * Another quality of life improvement you can add if you use npm are these
 * scripts which you can add to the package.json file:
 * "scripts": {
 *   ...
 *   "build": <build command>,
 *   "game": "nw ../",
 *   "game-ui": "npm run build && npm run game",
 *   "dev-game-ui": "concurrently \"npm run dev\" \"npm run game\""
 * },
 * 
 * This makes it so you can run the game with `npm run game` and you can
 * run the game with the updated ui using `npm run game-ui`.
 * 
 * And when you have installed the npm package concurrently (`npm install
 * concurrently`) you can also run the plugin in live development mode with
 * `npm run dev-game-ui`.
 *
 * When the ui tries to access the game via `window.top.` in live development
 * mode you need to add the following line to the package.json of the RPG Maker
 * project:
 *   "node-remote":"http://localhost",
 *
 * Be aware that this flag gets removed every time you save the project in
 * RPG Maker.
 * 
 * 3. Adding the ui
 * To put your ui into the game you need to set the `Path to ui` parameter to
 * the `index.html` file of your ui. If you don't do this an error will be
 * thrown.
 * 
 * 4. Best practices
 * 
 * 4.1 Ensuring a transparent background
 * To ensure that your ui is transparent add the following style to your
 * background element: `background: none transparent;`.
 * 
 * If the background still isn't transparent look for other css tags which
 * could prevent this. For example `color-scheme: ...;` causes the background
 * to be opaque.
 * 
 * 4.2 Making clicks pass through the ui
 * When you have problems with pointer events being passed through or not
 * being passed through to the game underneath the ui you need to consider
 * the following: Any pointer event which targets the document.body passes
 * through to the game. All pointer events which target elements within the
 * ui will target the ui.
 * 
 * 4.3 Making your ui feel better
 * As the ui is just a html page, you need to make sure that common behaviours
 * which make the ui feel cheap are removed.
 * 
 * Some examples of these behaviours are:
 *  - Selectable Text
 *  - Draggable Images
 * 
 * But there are also some things you don't need to worry about:
 *  - Context menu (only added by the sdk version of nwjs)
 *  - Responsiveness of the ui (will always be the same as the project size)
 *
 * 4.4 Communication between ui and game
 * To access anything inside the game from the ui you simply need to put
 * `window.top.` in front of any variable or function. This will access the
 * javascript environment of the game. This causes problems in live
 * development mode. Refer to the end of 2.2 to read the solution.
 *
 * In order to communicate with the ui from the game you can use the event
 * system. To set it up you just need to add the EventManager.js file to your
 * web ui and add your event listeners. Then in the game you just need to call
 * the SendEvent plugin command with the correct event name and arguments.
 *
 * 5. Building the game
 * Before building the game you should remove the modification of the
 * package.json file which was described in 2.2.
 *
 * You should make sure that the built ui is placed outside of the npm
 * project. When you have ensured that everything still works you need to
 * exclude the development ui folder in the RPG Maker deployment window.
 * 
 * --------------------------------- Updates ---------------------------------
 *
 * V1.0 - Added basic functionality
 * 
 * @param uiPath
 * @text Path to ui
 * @desc The path from the root of the project to the built html file (e.g. /graphene-ui/build/index.html)
 * @default 
 * @type string
 * 
 * @param liveDevelopment
 * @text Use live development server
 * @desc Uses the website of the given address when enabled.
 * @default false
 * @type boolean
 * 
 * @param address
 * @text Server address 
 * @desc The web address of the server (example: https://localhost:5173) used for the ui
 * @default 
 * @type string
 * @parent liveDevelopment
 * 
 * @command SendEvent
 * @text Send event
 * @desc Sends an event to the ui
 * 
 * @arg eventName
 * @text Event Name
 * @desc Name of the event you want to call
 * @type string
 * 
 * @arg arguments
 * @text Arguments
 * @desc The arguments which will get passed to the event call
 * @type struct<Arguments>[]
 */

/*~struct~Arguments:
 *
 * @param name
 * @text Argument name
 * @desc Name of the argument
 * @type string
 * 
 * @param value
 * @text Argument value
 * @desc Value of the argument
 * @type string
 */

(() => {
    const pluginName = "Graphene";

    const parameters = PluginManager.parameters(pluginName);

    // Utility
    class ParameterError extends Error {
        constructor(message) {
            super(message);
            this.name = "Parameter Error";
        }
    }

    function copyStyle(source, target) {
        let canvasStyle = source.style;

        for (let i = 0; i < canvasStyle.length; i++) {
            target.style[canvasStyle[i]] = canvasStyle.getPropertyValue(canvasStyle[i]);
        }
    }

    function urlIsValid(src) {
        var http = new XMLHttpRequest();
        http.open('HEAD', src, false);
        http.send();
    }

    // Validate ui parameter
    if(parameters.uiPath === "") {
        throw new ParameterError("You forgot to set the parameter `Path to ui`.");
    }

    if(parameters.uiPath.charAt(0) !== "/") {
        parameters.uiPath = "/" + parameters.uiPath;
    }

    try {
        urlIsValid(parameters.uiPath);
    } catch(e) {
        throw new ParameterError(`The given file (${parameters.uiPath}) in the parameter \`Path to ui\` doesn't exist.`);
    }

    // Add web ui to the game
    if(parameters.liveDevelopment === "true") {
        try {
            urlIsValid(parameters.address);
        } catch(e) {
            throw new ParameterError(`The given url (${parameters.address}) in the parameter \`Server address\` isn't reachable.`);
        }
    }

    let uiSource = parameters.liveDevelopment === "true" ? parameters.address : parameters.uiPath;

    const uiFrame = document.createElement("iframe");
    uiFrame.id = "gameUi";
    uiFrame.src = uiSource;

    const _createAllElements = Graphics._createAllElements;
    Graphics._createAllElements = function() {
        _createAllElements.apply(this, arguments);
        
        document.body.appendChild(uiFrame);
    };

    const _updateCanvas = Graphics._updateCanvas;
    Graphics._updateCanvas = function() {
        _updateCanvas.apply(this, arguments);
        
        copyStyle(this._canvas, uiFrame);
        uiFrame.style.zIndex = 2;
        uiFrame.style.border = "none";
        uiFrame.style.background = "none transparent";
    };

    // Fix video element
    const _createElement = Video._createElement;
    Video._createElement = function() {
        _createElement.apply(this, arguments);

        this._element.style.zIndex = 3;
        Video._updateVisibility(false);
    };

    const _updateVisibility = Video._updateVisibility;
    Video._updateVisibility = function() {
        _updateVisibility.apply(this, arguments);

        this._element.style.pointerEvents = Video._isVisible() ? "all" : "none";
        uiFrame.style.opacity = Video._isVisible() ? "0" : "1";
    };
    

    // Make pointer events pass through non ui elements
    uiFrame.onload = function () {
        document.addEventListener("mousemove", updateIframePointerEvents, true);
        uiFrame.contentDocument.addEventListener("mousemove", updateIframePointerEvents, true);

        function updateIframePointerEvents(e) {
            let mouseCoordinate;
    
            if (e.currentTarget === document) {
                mouseCoordinate = {
                    x: e.pageX - uiFrame.offsetLeft,
                    y: e.pageY - uiFrame.offsetTop,
                };
            } else {
                mouseCoordinate = { x: e.clientX, y: e.clientY };
            }
    
            const el = uiFrame.contentDocument.elementFromPoint(mouseCoordinate.x, mouseCoordinate.y);
            uiFrame.style.pointerEvents = !el || el === uiFrame.contentDocument.documentElement ? "none" : "auto";
        }

        // Can be adjusted according to later 
        const pf = { passive: false };
        // uiFrame.contentDocument.addEventListener("mousedown", TouchInput._onMouseDown.bind(TouchInput));
        uiFrame.contentDocument.addEventListener("mousemove", TouchInput._onMouseMove.bind(TouchInput));
        uiFrame.contentDocument.addEventListener("mouseup", TouchInput._onMouseUp.bind(TouchInput));
        uiFrame.contentDocument.addEventListener("wheel", TouchInput._onWheel.bind(TouchInput), pf);
        // uiFrame.contentDocument.addEventListener("touchstart", TouchInput._onTouchStart.bind(TouchInput), pf);
        uiFrame.contentDocument.addEventListener("touchmove", TouchInput._onTouchMove.bind(TouchInput), pf);
        uiFrame.contentDocument.addEventListener("touchend", TouchInput._onTouchEnd.bind(TouchInput));
        uiFrame.contentDocument.addEventListener("touchcancel", TouchInput._onTouchCancel.bind(TouchInput));
        uiFrame.contentDocument.addEventListener("keydown", SceneManager.onKeyDown.bind(SceneManager));
        uiFrame.contentDocument.addEventListener("keydown", Graphics._onKeyDown.bind(Graphics));
        uiFrame.contentDocument.addEventListener("keydown", WebAudio._onUserGesture.bind(WebAudio));
        uiFrame.contentDocument.addEventListener("mousedown", WebAudio._onUserGesture.bind(WebAudio));
        uiFrame.contentDocument.addEventListener("touchend", WebAudio._onUserGesture.bind(WebAudio));
        uiFrame.contentDocument.addEventListener("keydown", Video._onUserGesture.bind(Video));
        uiFrame.contentDocument.addEventListener("mousedown", Video._onUserGesture.bind(Video));
        uiFrame.contentDocument.addEventListener("touchend", Video._onUserGesture.bind(Video));
        uiFrame.contentDocument.addEventListener("keydown", Input._onKeyDown.bind(Input));
        uiFrame.contentDocument.addEventListener("keyup", Input._onKeyUp.bind(Input));
    };

    // Add blur to error screen
    const _applyCanvasFilter = Graphics._applyCanvasFilter;
    Graphics._applyCanvasFilter = function() {
        _applyCanvasFilter.apply(this, arguments);

        uiFrame.style.opacity = 0.3;
        uiFrame.style.filter = "blur(8px)";
        uiFrame.style.webkitFilter = "blur(8px)";
    };

    const _clearCanvasFilter = Graphics._clearCanvasFilter;
    Graphics._clearCanvasFilter = function() {
        _clearCanvasFilter.apply(this, arguments);

        uiFrame.style.opacity = 1;
        uiFrame.style.filter = "";
        uiFrame.style.webkitFilter = "";
    };

    // Event system for messages to the ui
    PluginManager.registerCommand(pluginName, "SendEvent", args => {
        const eventObject = {
            name: args.eventName,
            arguments: args.arguments
        };

        if(parameters.liveDevelopment === "true") {
            uiFrame.contentWindow.postMessage(eventObject, parameters.address);
        } else {
            uiFrame.contentWindow.postMessage(eventObject);
        }
    });

    // Rip out the ui
    Scene_Splash.prototype.gotoTitle = function() {
        SceneManager.goto(Scene_Blank);
    };

    Game_Interpreter.prototype.command302 = function() {
        if (!$gameParty.inBattle()) {
            this.nextEventCode()
            SceneManager.push(Scene_Blank);
        }
        return true;
    };

    Scene_Map.prototype.isMenuEnabled = (() => false);

    // Blank scene
    function Scene_Blank() {
        this.initialize(...arguments);
    }

    Scene_Blank.prototype = Object.create(Scene_Base.prototype);
    Scene_Blank.prototype.constructor = Scene_Blank;
})();
