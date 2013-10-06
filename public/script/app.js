requirejs.config({
    baseUrl: 'script',
    paths: {
        lib: '../lib'
    }
});

Omni.ready(function() {
    var ChatView = Backbone.View.extend({
        events: {
            "submit #send": "sendMessage"
        },
        initialize: function() {
            this.collection.each(this.addMessage, this); // Add any messages that already exist in this collection
            this.listenTo(this.collection, "add", this.addMessage); // Listen for new messages
        },
        addMessage: function(model) {
            console.log(model);
            this.$el.find(".chat").append($("<p>").text(model.get("message")));
            this.$el.find(".chat").animate({ scrollTop: this.$el.find(".chat")[0].scrollHeight }, "slow")
        },
        sendMessage: function(event) {
            var $input = this.$el.find("input");
            if ($input.val()) {
                this.collection.add({message: $input.val()});
                $input.val('');
            }

            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });

    new ChatView({el: $("body"), collection: Omni.Collections.messages});
});


require([], function() {

    var svg = document.getElementById('svg2');
    var svgNS = svg.getAttribute('xmlns');
    var svgWidth = 216;
    var svgHeight = 230;
    var scale = 1;
    var offsetLeft = 0;
    var offsetTop = 0;
    var speed = 1;

    updateViewBox();
    fillBody();
    bindToMap();

    function bindToMap(){
        var childNodes = document.getElementById('mapGroup').childNodes;
        for(var i = 0, l = childNodes.length; i < l; i++){
            var child = childNodes[i];
            if(child.style.fill == 'none' && child.id.indexOf('_') == 0){
                child.style.fill = 'rgba(255 ,255, 255, 1.0)';
                child.addEventListener('mouseenter', mouseEnterArea.bind(child) );
                child.addEventListener('mouseleave', mouseLeaveArea.bind(child) );
            }
            // Make sure the water appears on top
            moveElementToBottom('water1');
            moveElementToBottom('water2');
        }
    }

    function mouseEnterArea(evt){
        this.style.fill = 'rgba(200 ,255, 200, 1.0)';
    }

    function mouseLeaveArea(evt){
        this.style.fill = 'rgba(255 ,255, 255, 1.0)';
    }

    function moveElementToBottom(elementId){
        var el = document.getElementById(elementId);
        el.parentNode.appendChild(el);
    }

    function createOn( root, name, attrs ){
        var el = document.createElementNS(svgNS,name);
        for (var attr in attrs){
            if (attrs.hasOwnProperty(attr)){
                el.setAttribute(attr,attrs[attr]);
            }
        }
        return root.appendChild(el);
    }

    function updateViewBox(){
        var width = svgWidth * scale;
        var height = svgHeight * scale;
        var left = ((svgWidth - width) / 2) + offsetLeft;
        var top = 0 + offsetTop;
        svg.viewportElement.setAttribute("viewBox", left + " " + top + " " + width + " " + height);
    }

    function fillBody(){
        svg.viewportElement.setAttribute("width", window.document.body.clientWidth);
        svg.viewportElement.setAttribute("height", window.document.body.clientHeight);
    }

    var circle = createOn( svg.viewportElement, 'circle', { cx: 100, cy: 100, r:20, fill:'#000' });

    svg.addEventListener('mousemove', function(evt){
        circle.setAttribute('cx', evt.clientX);
        circle.setAttribute('cy', evt.clientY);
    });

    window.addEventListener('resize', function(evt){
        fillBody();
    });

    window.addEventListener('keydown', function(evt){
        if(evt.keyCode == 187){ // +
            scale = scale / 1.2;
        }
        else if(evt.keyCode == 189){ // -
            scale = scale * 1.2;
        }
        else if(evt.keyCode == 38){ // Arrow Up
            offsetTop += speed;
        }
        else if(evt.keyCode == 40){ // Arrow Down
            offsetTop -= speed;
        }
        else if(evt.keyCode == 37){ // Arrow Left
            offsetLeft += speed;
        }
        else if(evt.keyCode == 39){ // Arrow Right
            offsetLeft -= speed;
        }
        if(speed < 20){
            speed += 0.5;
        }
        updateViewBox();
    });

    window.addEventListener("mousewheel", function(evt){
        var delta = Math.max(-2, Math.min(2, evt.wheelDelta));
        if(evt.ctrlKey){
            if(delta < 0){
                scale = scale * 1.2;
            }
            else {
                scale = scale / 1.2;
            }
        }
        else{
            offsetTop += delta;
        }
        updateViewBox();
    }, false);


    window.addEventListener('keyup', function(evt){
        speed = 1;
    });


    (function animloop(){
        requestAnimationFrame(animloop);
        // render();
    })();

});