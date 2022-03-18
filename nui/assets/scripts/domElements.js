var DomElement = (function() {
	createDomElement = function(type, className, textNode) {
		const newDiv = document.createElement(type);
		newDiv.className = className;
		if (textNode) {
			newDiv.appendChild(document.createTextNode(textNode));
		}
		return newDiv;
	}

    createNewImg = function(className, src) {
        const img = document.createElement('img');
		img.className = className;
        img.src = src;
        return img;
    }

	return {
		createDomElement: createDomElement,
        createNewImg: createNewImg
	}
})();