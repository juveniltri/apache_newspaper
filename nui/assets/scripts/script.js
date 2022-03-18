var NewsPaper = (function() {
	init = function() {		

		document.addEventListener('DOMContentLoaded', function () {
			window.addEventListener('message', function( event ) {
				var item = event.data;
				if (item.type == 'periodico') {
					if (item.status == true) {
						opennewspaper(item.notis,item.ads,item.publi);
					} else {
						closenewspaper();
					}
				}
				if (item.type == 'oficina') {
					if (item.status == true) {
						closenewspaper();
						openoffice();
						loadtables(item.notis,item.ads,item.publi);
					} else {
						closeoffice();
					}
				}
				if (item.type == 'closeAll') {
					closenewspaper();
					closeoffice();
				}
			});
			document.getElementById('formatedDate').innerHTML = getFormatedDate(new Date());
		});
					
	}

	opennewspaper = function (notis,ads,publi) {
		populateAdsData(ads);
		populateNotisData(notis);
		populatePubliData(publi);
		$(".periodico").css("display", "block");
    	$("body").css("display", "block");
	}

	closenewspaper = function() {
		$(".periodico").css("display", "none");
		$("body").css("display", "none");
	}

	openoffice = function() {
		closeoptions();
		$(".oficina").css("display", "block");
		$("body").css("display", "block");
	}

	closeoffice = function() {
		$(".oficina").css("display", "none");
		$("body").css("display", "none");
	}

	closeoptions = function() {
		$(".newnoti").css("display", "none");
		$(".newad").css("display", "none");
		$(".editnoti").css("display", "none");
		$(".editad").css("display", "none");
	}

	loadtables = function(notis,ads,publi) {
		notis = JSON.parse(notis);
		publi = JSON.parse(publi);
		ads = JSON.parse(ads);

		var main = document.getElementById("tablanoti");
		if (main.childElementCount > 0) {
			while (main.childElementCount > 0) {
				main.removeChild(main.lastElementChild);
			}
		}
		var main2 = document.getElementById("tablaads");
		if (main2.childElementCount > 0) {
			while (main.childElementCount > 0) {
				main.removeChild(main.lastElementChild);
			}
		}

		notis.forEach(ad => {			
			const currentDiv = document.getElementById("tablanoti");
			currentDiv.appendChild(createTabNotElements(ad));
		});

		publi.forEach(ad => {			
			const currentDiv = document.getElementById("tablanoti");
			currentDiv.appendChild(createTabNotElements(ad));
		});

		ads.forEach(ad => {			
			const currentDiv = document.getElementById("tablaads");
			currentDiv.appendChild(createTabAdsElements(ad));
		});
	}
	
	getFormatedDate = function(date) {
		const options = { weekday: 'long', month: 'long', day: 'numeric' };
		return Utils.toTitleCase(date.toLocaleDateString("es-ES", options));
	}
	
	populateNotisData = function(data) {
		data = JSON.parse(data);
		var main = document.getElementById("adColumn1");
		if (main.childElementCount > 0) {
			while (main.childElementCount > 0) {
				main.removeChild(main.lastElementChild);
			}
		}
		data.forEach(ad => {			
			const currentDiv = document.getElementById("adColumn1");
			currentDiv.appendChild(createDomElements(ad));
		});
	}

	populatePubliData = function(data) {
		data = JSON.parse(data);
		var main = document.getElementById("adColumn2");
		if (main.childElementCount > 0) {
			while (main.childElementCount > 0) {
				main.removeChild(main.lastElementChild);
			}
		}
		data.forEach(ad => {			
			const currentDiv = document.getElementById("adColumn2");
			currentDiv.appendChild(createDomElements(ad, true));
		});
	}

	populateAdsData = function(data) {
		data = JSON.parse(data);
		var main = document.getElementById("announcements-container");
		if (main.childElementCount > 0) {
			while (main.childElementCount > 0) {
				main.removeChild(main.lastElementChild);
			}
		}
		data.forEach(an => {
			const currentDiv = document.getElementById("announcements-container");
			const parentDiv = DomElement.createDomElement("div", "card");
			parentDiv.appendChild(DomElement.createNewImg("card-img-top", an.img));
			parentDiv.appendChild(DomElement.createDomElement("hr", "width-100 height-0 border-gray-1px m-0"));

			const cardBody = DomElement.createDomElement("div", "card-body");
			cardBody.appendChild(DomElement.createDomElement("p", "card-text", an.title));

			parentDiv.appendChild(cardBody);
			currentDiv.appendChild(parentDiv);
		});
	}

	createDomElements = function(ad, expansible = false) {
		const parentDiv = DomElement.createDomElement("div", expansible ? "ad" : "ad ad-minimal");
		parentDiv.appendChild(DomElement.createDomElement("div", "ad-title", ad.type));
		parentDiv.appendChild(DomElement.createDomElement("p", "ad-subtitle", ad.title));
		parentDiv.appendChild(DomElement.createNewImg("ad-img", ad.img));

		const footerDiv = DomElement.createDomElement("div", "ad-footer");
		footerDiv.appendChild(DomElement.createDomElement("p", "", getFormatedDate(new Date(ad.dateadded))));
		footerDiv.appendChild(DomElement.createDomElement("p", "", ad.reportero));
		parentDiv.appendChild(footerDiv);
		parentDiv.appendChild(DomElement.createDomElement("p", "ad-notice", ad.comment));
		return parentDiv;
	}

	createTabNotElements = function(ad) {
		const parentDiv = DomElement.createDomElement("tr", "");
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.tiponoti));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.title));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.reportero));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.comment));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.img));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.id));
		return parentDiv;
	}

	createTabAdsElements = function(ad) {
		const parentDiv = DomElement.createDomElement("tr", "");
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.title));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.img));
		parentDiv.appendChild(DomElement.createDomElement("td","", ad.id));

		return parentDiv;
	}

	closeDocument = function() {
		$.post('http://apache_newspaper/NUIFocusOff', JSON.stringify({}));
	}

	enviarNoti = function() {
		$.post('http://apache_newspaper/PostNoti', 
			JSON.stringify({
				title: $("#title").val(),
				comment: $("#comment").val(),
				image: $("#image").val(),
				tipo: $("#tipo").val()
			}));
	}
	
	enviarAd = function() {
		$.post('http://apache_newspaper/PostAd', 
			JSON.stringify({
				title: $("#title1").val(),
				image: $("#image1").val(),
				priority: $("#priority").val(),
				finaldate: $("#finaldate").val(),
			}));
	}

	deleteNoti = function() {
		$.post('http://apache_newspaper/DeleteNoti', 
			JSON.stringify({
				delID: $("#iddelete").val()
			}));
	}

	deleteAd = function() {
		$.post('http://apache_newspaper/DeleteAd', 
			JSON.stringify({
				delID: $("#iddelete2").val()
			}));
	}

	ChangeToNewspaper = function() {
		$.post('http://apache_newspaper/ChangeToNewsPaper', JSON.stringify({}));
	}

	openwindows = function(data) {
		if (data == 'newnoti') {
			closeoptions();
			$(".newnoti").css("display", "block");
		} else if ( data == 'newad' ) {
			closeoptions();
			$(".newad").css("display", "block");

		} else if ( data == 'editnoti' ) {
			closeoptions();
			$(".editnoti").css("display", "block");

		} else if ( data == 'editad' ) {
			closeoptions();
			$(".editad").css("display", "block");

		}
	}

	return {
		init: init,
		closeDocument: closeDocument,
		ChangeToNewspaper: ChangeToNewspaper,
		openwindows: openwindows
	}
})();

NewsPaper.init();

document.onkeyup = function (data) {
    if (data.which == 27) {
        $.post('http://apache_newspaper/NUIFocusOff', JSON.stringify({}));
        return
    }
};