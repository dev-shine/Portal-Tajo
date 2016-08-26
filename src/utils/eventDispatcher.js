function EventDispatcher() {
  this.eventHandlers = {};
}

EventDispatcher.prototype.registerHandler = function(eventId, eventHandlerFunc) {
    //    console.log('hook++  '+ hookId + (this.hooks[hookId]===undefined ? ' add' : ' replace'));
  this.eventHandlers[eventId] = eventHandlerFunc;
};

EventDispatcher.prototype.fireEvent = function(eventId, eventData) {
  if (this.eventHandlers[eventId] !== undefined && this.eventHandlers[eventId] !== null) {
    this.eventHandlers[eventId](eventData);
  }
};

export default function createEventDispatcher() {
  return new EventDispatcher();
}

// export default eventDispatcher;