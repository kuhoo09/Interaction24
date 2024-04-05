const renderItems = (collection) => {
	const collectionList = document.getElementById('collection');
		collection.forEach(item => {
		
			const itemDetails =
				`
					<li id="${item.id}" class="list-item" data-country="${item.country}">
						<img src="${item.posterImage}" class="list-item-image">
						<div class="list-item-content">
							<p>📍 Name <span>${item.location}</span></p>
							<p>📐 Category ${item.architect}</p>
							<p>📐 Founder ${item.architect}</p>
							<p>📖 ${item.description}</p>
						</div>
					</li>
				`;
			
		collectionList.insertAdjacentHTML('beforeend', itemDetails); 


	})

	const listItems = document.querySelectorAll('.list-item');
	listItems.forEach(item => {
		item.addEventListener('click', () => {
			item.classList.toggle('is-active');
		})
	})

	// set up our filter controls
	const filterButtons = document.querySelectorAll('.filter-item');
	filterButtons.forEach(button => {
		button.addEventListener('click', () => {
			const previousActiveButton = document.querySelector('.filter-item.is-active');
			if (previousActiveButton) previousActiveButton.classList.remove('is-active')

			// add is-active to the latest/clicked button/filter
			button.classList.add('is-active');
			// const buttonCountry = item.dataset.country;
			const buttonCountry = button.getAttribute("data-country"); 
			const buttonState = button.classList.contains('is-active'); // true (active) or false (inactive)
			
			// if we are toggling off a button OR (that's what || means) the All button is clicked…
			// show all elements
			if (buttonState == false || buttonCountry == 'All') {
				const hiddenListItems = document.querySelectorAll('.list-item.is-hidden');
				hiddenListItems.forEach(item => {
					item.classList.remove('is-hidden');
				});
			// otherwise, start filtering
			} else {
				// go through each list item again, deciding if to show or hide it
				listItems.forEach(item => {
					if (item.dataset.country != buttonCountry) {
						item.classList.add('is-hidden')
					} else {
						item.classList.remove('is-hidden')
					}
				})
			}
		})
	})

}

fetch('assets/collection.json')
	.then(response => response.json())
	.then(collection => {
		renderItems(collection)
})