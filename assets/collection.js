
let popUp = document.getElementById('popup')
let popContent = document.getElementById('popContent')


// Function to render your items
const renderItems = (collection) => {
	// The `section` where the items will be inserted
	const collectionList = document.getElementById('collection')

	// Loop through each item in the collection array
	collection.forEach(item => {
		const divItem = document.createElement('div') // Make the `div`
		
		const itemImage = document.createElement('img') // And an image
		itemImage.src = item.img // Set the `src` attribute from the JSON
		itemImage.style.width = "200px" // set width for img

		//I'm creating a uniqueID for each image so when I click it I can pull up
		// the corresponding JSON data.
		let uniqueID = item.number 
		itemImage.id = uniqueID

		divItem.appendChild(itemImage) // And add that too

		// This can get annoying, so we can use “template literals” instead
		const itemDetails =
			`
				<h1> Title: ${item.name} </h1> 
				<div>${item.number} number fun</div> 
				<p>${item.fact}</p>
			`
		divItem.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert
		divItem.classList.add("divItem");

		collectionList.appendChild(divItem) // Then add the whole `div` into the `section`
	
	

		// I'm creating an event listener for each image.
		itemImage.addEventListener('click', (event)=>{

			let currentImage = event.target.src // This variable stores the src of the clicked image
			let currentID = event.target.id // This variable stores the id of the clicked image
			
			popUp.style.display = "block"  // Making the pop up be seen

			let image = document.getElementById('popImg')
			image.src = currentImage // Setting the src of the img in my pop up to the current img i Clicked

			//if the item.number is equal to the current ID of my photo 
			//then I bring up corresponding JSON data by changing the innerHTML of elements in
			//My pop up
			if(currentID == item.number){
				popContent.innerHTML = item.fact
				secretContent.innerHTML = item.secret
			}

		})
	})
}

//If the little 'x' in my pop up is clicked the popup disappears.
document.getElementById('exit').addEventListener('click', ()=>{
	popUp.style.display = "none"
	console.log(collection)
})



// Fetch gets your JSON file…
fetch('assets/collection.json')
	.then(response => response.json())
	.then(collection => {
		// And passes the data to the function, above!
		renderItems(collection) 
	})


