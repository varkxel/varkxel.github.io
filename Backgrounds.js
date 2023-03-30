
function PickBackground(callback)
{
	// Add backgrounds here.
	const backgrounds = [
		"Water.js"
	];

	// Choose random value from backgrounds array.
	let randomVal = Math.random();
	randomVal *= backgrounds.length;
	randomVal = Math.floor(randomVal);

	// Assign to variable
	const background = backgrounds[randomVal];

	// Load the script
	var script = document.createElement("script");
	script.src = background;
	script.onload = callback;

	// Inject into HTML.
	document.head.appendChild(script);
}
