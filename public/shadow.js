(function(window, document, undefined) {
    // Refers to the "importer", which is index.html
    var thatDoc = document;

    thisScr = (thatDoc._currentScript || thatDoc.currentScript)

    // Refers to the "importee", which is src/hello-world.html
    var thisDoc =  thisScr.ownerDocument;

    // Gets content from <template>
    var template = thisDoc.querySelector('template').content;

    // Creates an object based in the HTML Element prototype
    var MyElementProto = Object.create(HTMLElement.prototype);

    // Fires when an instance of the element is created
    MyElementProto.createdCallback = function() {

        // Adds a template clone into shadow root
        var clone = thatDoc.importNode(template, true);

        // Clone template and make Shadows
        // fixme
        var shadowdiv   = clone.querySelector('div.shadow');
        var shadowdivInner = shadowdiv.innerHTML;
        shadowdiv.innerHTML = "";
        var shadow = shadowdiv.attachShadow({mode: "open"});
        shadow.innerHTML = shadowdivInner;
        this.appendChild(clone);
    };
    
    // Registers <hello-world> in the main document
    window.MyElement = thatDoc.registerElement(thisScr.getAttribute("name"), {
        prototype: MyElementProto
    });
})(window, document);

