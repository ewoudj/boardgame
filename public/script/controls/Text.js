define(['control/Control' /*, 'css!/css/title'*/], function (Control) {

    var Text = function (config, callback) {
        config.parentControl.texts = config.parentControl.texts || [];
        config.parentControl.texts.push(this);
        config = config || {};
        Control.call(this, config, callback);
    };

    Text.inheritsFrom(Control);

    Text.prototype.createElement = function () {
        this.el = document.createTextNode(this.text);
        this.parentEl.appendChild(this.el);
    }

    Text.prototype.setText = function (text) {
        this.el.textContent = text;
    };

    Text.prototype.getText = function () {
        return this.el.textContent;
    };

    Text.prototype.setCharAt = function (index, chr) {
        var s = this.el.textContent;
        if (!(index > s.length - 1)) {
            this.el.textContent = s.substr(0, index) + chr + s.substr(index + 1);
        }
    };

    Control.registry.Text = Text;

    return Text;

});