window.onload = init;

function init() {
	// Gör inställningar för hovereffekter på knappar
	initMainMenu();

	var ansokningsknapp = document.getElementById('ansokningsknapp');
	if (ansokningsknapp) {
		ansokningsknapp.onclick = showApplicationForm;
	}

	// Artikelnavigering
	var textinnehall = document.getElementById('artnav-textinnehall');
	if (textinnehall) {
		textinnehall.onclick = manageTabs;
	}
	var bilder = document.getElementById('artnav-bilder');
	if (bilder) {
		bilder.onclick = manageTabs;
	}
	var lankar = document.getElementById('artnav-lankar');
	if (lankar) {
		lankar.onclick = manageTabs;
	}
	var relaterat = document.getElementById('artnav-relaterat');
	if (relaterat) {
		relaterat.onclick = manageTabs;
	}
	var publicering = document.getElementById('artnav-publicering');
	if (publicering) {
		publicering.onclick = manageTabs;
	}

	// Listor
	setupList('lanklista');
	setupList('utkastlista');
	setupList('publiceradelista');
	setupList('filterlista');
	setupList('dettaharhantlista');

	// Filterfält
	var filter = document.getElementById('filter');
   	if (filter) {
	   	applyFilter(filter);
	   	//filter.focus();
   	}
}

function initMainMenu() {
	// Gå igenom alla länkar i huvudmenyn och hantera musevents
	var menu = document.getElementById('navigering');
	if (menu) {
		var elm = menu.firstChild;
		while (elm) {
			if (elm.nodeType == 1 &&
				elm != document.getElementById('navigering_aktiv')) {

				var inner = elm.firstChild;
				if (inner) {
					inner.onmouseover = buttonHoverJpg;
					inner.onmouseout = buttonHoverJpg;
				}
			}
			elm = elm.nextSibling;
		}
	}
}

function buttonHoverJpg(e) {
	var button = getTarget(e);
	e = e ? e : window.event;
	if (e.type && e.type == 'mouseover') {
		if (button) {
			button.src = extractName(button.src) + '_aktiv.jpg';
		}
	} else if (e.type && e.type == 'mouseout') {
		if (button) {
			button.src = extractName(button.src) + '_inaktiv.jpg';
		}
	}
}

function extractName(filename) {
	return filename.substring(0, filename.lastIndexOf('_'));
}

function manageTabs(e) {
	var knapp = getTarget(e);
	if (knapp && knapp.id) {
		switch (knapp.id) {
			case 'artnav-bilder':
				showTab('artikelflik-bilder');
				break;
			case 'artnav-lankar':
				showTab('artikelflik-lankar');
				break;
			case 'artnav-relaterat':
				showTab('artikelflik-relaterat');
				break;
			case 'artnav-publicering':
				showTab('artikelflik-publicering');
				break;
			default:
				showTab('artikelflik-textinnehall');
				break;
		}
	}
}

function showTab(tabname) {
	var allTabs = new Array('artikelflik-textinnehall', 'artikelflik-bilder', 'artikelflik-lankar', 'artikelflik-relaterat', 'artikelflik-publicering');
	var allButtons = new Array('artnav-textinnehall', 'artnav-bilder', 'artnav-lankar', 'artnav-relaterat', 'artnav-publicering');
	for (var i = 0; i < allTabs.length; i++) {
		var tabElement = document.getElementById(allTabs[i]);
		var buttonElement = document.getElementById(allButtons[i]);
		if (tabElement && buttonElement) {
			if (allTabs[i] == tabname) {
				tabElement.style.display = 'block';
				buttonElement.className = 'aktiv';
			} else {
				tabElement.style.display = 'none';
				buttonElement.className = '';
			}
		}
	}
}

function showApplicationForm(e) {
	var ansokningsformular = document.getElementById('ansokningsformular');
	if (ansokningsformular) {
		ansokningsformular.style.display = 'block';
		var knapp = getTarget(e);
		if (knapp) {
			knapp.innerHTML = 'Dölj formulär';
			knapp.onclick = hideApplicationForm;
		}
	}
}

function hideApplicationForm(e) {
	var ansokningsformular = document.getElementById('ansokningsformular');
	if (ansokningsformular) {
		ansokningsformular.style.display = 'none';
		var knapp = getTarget(e);
		if (knapp) {
			knapp.innerHTML = 'Visa formulär';
			knapp.onclick = showApplicationForm;
		}
	}
}

function getTarget(e) {
	var targetElm;
	e = e ? e : window.event;

	if (e.target) {
		targetElm = e.target;
	} else if (e.srcElement) {
		targetElm = e.srcElement;
	}

	if (targetElm.nodeType == 3) {
		targetElm = targetElm.parentNode;
	}

	return targetElm;
}

function confirmUrl(url) {
	if (confirm("Är du säker?")) {
		window.location.href = url;
	}
}

function confirmAction() {
	return confirm("Är du säker?");
}

// Skriven av Samuel Sjöberg (www.samuelsjoberg.com)
// Modifierad av Anders Fjeldstad
function setupList(listID) {
	var list = document.getElementById(listID);
	if (list) {
		var items = list.childNodes;
	   	var item, i, count = 0;
	   	for (i = 0; (item = items[i]); i++) {
	      	if (item.nodeType == 1) {
	         	item.style.display = 'block';
	         	item.className = (count++ % 2) ? 'udda' : 'jamn';
	      	}
	   	}
   	}
}

// Skriven av Samuel Sjöberg (www.samuelsjoberg.com)
function applyFilter(filter) {
	var re = new RegExp(filter.value, 'i');
	var items = document.getElementById('filterlista').childNodes;
	var item, i, value, count = 0;
	for (i = 0; (item = items[i]); i++) {
		if (item.nodeType == 1) {
			value = item.firstChild.nextSibling.firstChild.nodeValue;
			if (re.test(value)) {
				item.style.display = 'block';
				item.className = (count++ % 2) ? 'udda' : 'jamn';
			} else {
				item.style.display = 'none';
			}
		}
	}
}
