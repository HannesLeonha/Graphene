let eventSubscribers = {};

window.addEventListener("message", (event) => {
  let eventSubscriber = eventSubscribers[event.data.name];

  if(!eventSubscriber) return;

  if(event.data.arguments === '') {
    eventSubscriber();
    return;
  }

  let parsedArguments = JSON.parse(event.data.arguments).map(JSON.parse);

  let translatedArguments = {};

  for(let argument of parsedArguments) {
    translatedArguments[argument.name] = argument.value;
  }

  eventSubscriber(translatedArguments);
});

function addGameEventListener(eventName, callback) {
  eventSubscribers[eventName] = callback;
}

export { addGameEventListener };