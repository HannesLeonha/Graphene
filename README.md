<h1 align="center">Graphene</h1>
Removes the built in UI of RPG Maker Mz and replaces it with a custom web ui which can use npm.

## Examples
If you're not sure about how to start or how to implement something take a look at the RPG Maker project provided in the code of the GitHub repository. A lot of common usecases have already been covered here.

## Usage
1. Creating the web ui
Create folder with your web project in the root of the RPG-Maker Projectfolder. It's recommended that you create an npm-project with a build toollike vite and a web framework like react.

2. Efficient debugging

<ol start="2"><li>1. SDK Version of NWJS</li></ol>
It's highly recommended that you install the sdk version of nwjs from theinternet. Using the command `path/to/nwjs/nw.exe .` in the project rootfolder the RPG Maker project will start. By pressing F12 you can now see adeveloper console.

<ol start="2"><li>2. Running with npm</li></ol>
Another quality of life improvement you can add if you use npm are thesescripts which you can add to the package.json file:
```
"scripts": {
  ...
  "build": <build command>,
  "game": "nw ../",
  "game-ui": "npm run build && npm run game",
  "dev-game-ui": "concurrently \"npm run dev\" \"npm run game\""
},
```
This makes it so you can run the game with `npm run game` and you canrun the game with the updated ui using `npm run game-ui`.

And when you have installed the npm package concurrently (`npm install concurrently`) you can also run the plugin in live development mode with `npm run dev-game-ui`.

When the ui tries to access the game via `window.top.` in live development mode you need to add the following line to the package.json of the RPG Maker project: `"node-remote":"http://localhost",` Be aware that this flag gets removed every time you save the project inRPG Maker.

3. Adding the ui

To put your ui into the game you need to set the `Path to ui` parameter to the `index.html` file of your ui. If you don't do this an error will be thrown.

5. Best practices

<ol start="4"><li>1. Ensuring a transparent background</li></ol>
To ensure that your ui is transparent add the following style to your background element: `background: none transparent;`.
If the background still isn't transparent look for other css tags which could prevent this. For example `color-scheme: ...;` causes the background to be opaque.

<ol start="4"><li>2. Making clicks pass through the ui</li></ol>
When you have problems with pointer events being passed through or not being passed through to the game underneath the ui you need to consider the following: Any pointer event which targets the document.body passes through to the game. All pointer events which target elements within the ui will target the ui.

<ol start="4"><li>3. Making your ui feel better</li></ol>
As the ui is just a html page, you need to make sure that common behaviours which make the ui feel cheap are removed.

Some examples of these behaviours are:
 - Selectable Text
 - Draggable Images

But there are also some things you don't need to worry about:
 - Context menu (only added by the sdk version of nwjs)
 - Responsiveness of the ui (will always be the same as the project size)

<ol start="4"><li>4. Communication between ui and game</li></ol>
To access anything inside the game from the ui you simply need to put `window.top.` in front of any variable or function. This will access the javascript environment of the game. This causes problems in live development mode. Refer to the end of 2.2 to read the solution.
In order to communicate with the ui from the game you can use the event system. To set it up you just need to add the EventManager.js file to your web ui and add your event listeners. Then in the game you just need to call the SendEvent plugin command with the correct event name and arguments.

5. Building the game

Before building the game you should remove the modification of the package.json file which was described in 2.2.
You should make sure that the built ui is placed outside of the npm project. When you have ensured that everything still works you need to exclude the development ui folder in the RPG Maker deployment window.
