(async () => {

	let store = {};

	try {
		store = await browser.storage.local.get('selectors');
	}catch(e){
		console.error('error', 'access to rules storage failed');
		return;
	}

	if ( typeof store.selectors !== 'object' ) { 
		console.error('error', 'rules selectors not available');
		return;
	}

	if ( typeof store.selectors.forEach !== 'function' ) { 
		console.error('error', 'rules selectors not iterable');
		return;
	}

	store.selectors.forEach( (selector) => {

		// check activ
		if(typeof selector.activ !== 'boolean') { return; }
		if(selector.activ !== true) { return; }

		// check url regex 
		if(typeof selector.url_regex !== 'string') { return; }
		selector.url_regex = selector.url_regex.trim(); 
		if(selector.url_regex === ''){ return; }

		if(!(new RegExp(selector.url_regex)).test(window.location.href)){ return; }

		if ( typeof selector.code !== 'string' ) { return; }
		if ( selector.code === '' ) { return; }

		try {
			setTimeout( () => {
				const item = document.querySelector(selector.code);
				if( item && typeof item.focus === 'function') {
					item.focus(); // click item 
				}
			}, selector.delay || 3000); // wait delay
		}catch(e){
			console.error(e);	
		}
	});

})();

