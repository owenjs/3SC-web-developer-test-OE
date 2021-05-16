class EventDispatcher {
  constructor() {
    this.dispatchEvents = {};

    this.nextDispatchEventsToFire = [];
    this.dispatchEventFiring = false;
  }

  addDispatchEvent(eventName) {
    if(!this.dispatchEvents.hasOwnProperty(eventName)) {
      this.dispatchEvents[eventName] = [];
    }
  }

  removeDispatchEvent(eventName) {
    // Delete Operator has built in Error Handling 
    // if the property does not exist
    delete this.dispatchEvents[eventName];
  }

  addDispatchEventListener(eventName, { id, callBack }) {
    if(!this.dispatchEvents.hasOwnProperty(eventName)) {
      this.addDispatchEvent(eventName);
    }

    this.dispatchEvents[eventName].push({
      id: id,
      callBack: callBack
    });
  }

  removeDispatchEventListener(eventName, id) {
    if(!this.dispatchEvents.hasOwnProperty(eventName)) {
      // Dispatch Event doesn't exist
      return;
    }

    // Remove any listeners on this Event that have the same ID
    let filteredDispatchEventListeners = this.dispatchEvents[eventName].filter(dispatchEventListener => dispatchEventListener.id !== id);

    if(filteredDispatchEventListeners.length) {
      this.dispatchEvents[eventName] = filteredDispatchEventListeners;
    } else {
      this.removeDispatchEvent(eventName);
    }
  }

  fireNextDispatchEvent() {
    let nextDispatchEventToFire = this.nextDispatchEventsToFire.shift();

    if(!nextDispatchEventToFire) {
      // No Dispatch Event to Fire
      this.dispatchEventFiring = false;
      return;
    }

    this.dispatchEventFiring = true;

    this.dispatchEvents[nextDispatchEventToFire.eventName].forEach(dispatchEventListener => {
      dispatchEventListener.callBack(nextDispatchEventToFire.payload);
    });

    this.fireNextDispatchEvent();
  }

  fireDispatchEvent(eventName, payload) {
    if(!this.dispatchEvents.hasOwnProperty(eventName)) {
      // Dispatch Event doesn't exist
      return;
    }

    this.nextDispatchEventsToFire.push({
      eventName: eventName,
      payload: payload
    });

    if(!this.dispatchEventFiring) {
      this.fireNextDispatchEvent();
    }
  }
}

// Skelton
let EventDispatcherInstance = new EventDispatcher();
export default EventDispatcherInstance;