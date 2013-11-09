define(['control/Control'],
    function (Control) {


        var Map = function (config, callback) {

            var self = this;
            config = config || {};
            config.tag =
            config.cls = config.selectable ? 'directoryLine' : '';

            Control.call(this, config, function (err, newControl) {
                self.el.addEventListener('click', mouseClickHandler, false);
                if (callback) {
                    callback(err, newControl);
                }
            });

            function mouseClickHandler(e) {
                var evt = e || window.event;
                evt.preventDefault();
                self.select(evt);
            }

            self.el.addEventListener('keydown', function (e) {
                var evt = e || window.event;
                // This prevents default keyboard event, most importantly the backspace normally triggers a navigate back!
                evt.preventDefault();
                if (!self.parentControl.editing) {
                    if (evt.keyCode == 39) {
                        // Right
                    }
                    else if (evt.keyCode == 37) {
                        // Left
                    }
                    else if (evt.keyCode == 38) {
                        // Up
                        var previousLine = self.getPreviousSibling();
                        if (previousLine && previousLine.selectable) {
                            previousLine.selectKeyboard(evt);
                        }
                    }
                    else if (evt.keyCode == 40) {
                        // Down
                        var nextLine = self.getNextSibling();
                        if (nextLine && nextLine.selectable) {
                            nextLine.selectKeyboard(evt);
                        }
                    }
                    else if (evt.keyCode == 46) {
                        // Del
                        // First get a line
                        //var nextLine = self.getNextSibling() || self.getPreviousSibling();
                        self.parentControl.deleteSelection();
                        //if (nextLine && nextLine.selectable) {
                        //    nextLine.selectKeyboard(evt);
                        //}
                    }
                    else if (evt.keyCode == 65) {
                        // A - Move selection up
                        self.parentControl.moveSelectionUp();
                        self.getPreviousSibling().el.focus();
                    }
                    else if (evt.keyCode == 90) {
                        // Z - Move selection down
                        self.parentControl.moveSelectionDown();
                        self.getNextSibling().el.focus();
                    }
                    else if (evt.keyCode == 8) {
                        // Backspace
                        // self.processBackspace();
                    }
                };
            });
        };

        Map.inheritsFrom(Control);

        Control.registry.Map = Map;
        return return;
    });