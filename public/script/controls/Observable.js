define(function () {

    var domEvents = {
        'click': 1,
        'dblclick': 1,
        'mousedown': 1,
        'mouseup': 1,
        'mouseover': 1,
        'mousemove': 1,
        'mouseout': 1,
        'keydown': 1,
        'keypress': 1,
        'keyup': 1,
        'load': 1,
        'unload': 1,
        'abort': 1,
        'error': 1,
        'resize': 1,
        'scroll': 1,
        'change': 1,
        'submit': 1,
        'reset': 1,
        'focus': 1,
        'blur': 1,
        'focusin': 1,
        'focusout': 1,
        'DOMActivate': 1,
        'DOMSubtreeModified': 1,
        'DOMNodeInserted': 1,
        'DOMNodeRemoved': 1,
        'DOMNodeRemovedFromDocument': 1,
        'DOMNodeInsertedIntoDocument': 1,
        'DOMAttrModified': 1,
        'DOMCharacterDataModified': 1,
        'touchstart': 1,
        'touchend': 1,
        'touchmove': 1,
        'touchenter': 1,
        'touchleave': 1,
        'touchcancel': 1
    };

    var observable = {};

    observable.make = function (o) {

        o.on = function (eventName, handler) {
            if( domEvents[eventName] ){
                o.el.addEventListener(eventName, function(e){
                    handler.apply(o, arguments);
                }, false);
            }
            else {
                if (!o.observers) {
                    o.observers = {};
                }
                if (!o.observers[eventName]) {
                    o.observers[eventName] = [];
                }
                o.observers[eventName].push(handler);
                if (o.fired && o.fired[eventName]) {
                    handler(o, eventName, o.fired[eventName]);
                }
            }
        };

        o.fire = function (eventName, eventData, fireOnce) {
            if (fireOnce) {
                o.fired = o.fired || {};
                o.fired[eventName] = eventData;
            }
            if (o.observers && o.observers[eventName]) {
                var observers = o.observers[eventName];
                for (var i = 0; i < observers.length; i++) {
                    observers[i](o, eventName, eventData);
                }
            }
        };

        if (o.listeners) {
            for (s in o.listeners) {
                o.on(s, o.listeners[s]);
            }
        }

    };

    return observable;

});