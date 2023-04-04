
function CreateContext(canvas_id, loop)
{
	// Get the given canvas
	const canvas = document.getElementById(canvas_id);
	if(canvas === null)
	{
		alert
		(
			`Unable to find canvas with the given ID \"${canvas_id}\".\n` +
			`Please check that the canvas exists, and is tagged with the ID \"${canvas_id}\".`
		);
		return null;
	}

	// Create GL context
	const gl = canvas.getContext("webgl");
	if(gl === null)
	{
		// Context was unable to be created.
		alert
		(
			"Failed to create WebGL context.\n" +
			"Your browser or machine may not support WebGL."
		);
		return null;
	}

	requestAnimationFrame(loop);
	return gl;
}

function UpdateSize(canvas_id)
{
	let canvas = document.getElementById(canvas_id);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
