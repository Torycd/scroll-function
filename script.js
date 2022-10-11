// now we start by gettting all the header links by declaring a const value
const navLinks =  document.querySelectorAll('nav ul li a');
// now we add an event listener to each of the navlinks using foreach
navLinks.forEach( function(eachlink){
	// we add an event listener to each to find out a click and create a new function "smoothsscroll"
	eachlink.addEventListener('click', Smoothscroll)
});

function Smoothscroll(event){
	event.preventDefault();
	// this is for the smooth scroll
	// this gets the href of the clicked link
	const targetID = event.target.getAttribute("href");
	// this gets the section where the href links to
	const targetSection =  document.querySelector(targetID);
	// we use the syntax getBoundingClientRect().top to get the top of the targetSection
	// this gets the section as a box and gets the top - 200 because of the header
	const originalTop = Math.floor((targetSection.getBoundingClientRect().top) - 200);
	// the scrollBy is very important syntax then we create an object ({})
	window.scrollBy({top: originalTop, left: 0, behavior: 'smooth'})
	

}
window.addEventListener('load', function(){
	// we get all the posts using queryselector
	const posts = document.querySelectorAll('section');
	// we create an array where all the tops of each section will be pushed in
	let postTops = [];
	let pageTop;
	let counter = 1;
	let prevCounter = 1;
	let doneResizing;

	

	resetpagePosition();

	this.window.addEventListener('scroll', function(){
		// 
		pageTop = window.pageYOffset + 250;
		if (pageTop > postTops[counter]){
			counter++;
			console.log(`scrolling down ${counter}`)
		}
		else if (counter > 1 && pageTop < postTops[counter - 1]){
			counter--;
			console.log(`scrolling up ${counter}`)
		}
		if (counter != prevCounter){
			navLinks.forEach(function(eachlink){
				eachlink.removeAttribute('class')
			})

			const thisLink = this.document.querySelector(`nav ul li:nth-child(${counter}) a`);
			thisLink.className = 'selected';
			prevCounter = counter;
		}
	});
	
	this.window.addEventListener('resize', function(){
		clearTimeout(doneResizing)
		doneResizing = this.setTimeout(function(){
			resetpagePosition();
		}, 500)

	})

	function resetpagePosition(){
		postTops = [];

		posts.forEach( function(post){
			postTops.push(Math.floor(post.getBoundingClientRect().top + this.window.pageYOffset))
		});

		const pagePosition = window.pageYOffset + 250;
		counter = 0;

		postTops.forEach(function(post){
			if(pagePosition > post){
				counter++;
			}
		});

		navLinks.forEach(function(eachlink){
			eachlink.removeAttribute('class')
		})

		const thisLink = this.document.querySelector(`nav ul li:nth-child(${counter}) a`);
			thisLink.className = 'selected';
			prevCounter = counter;
	}
});