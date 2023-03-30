
function InitialiseBackground(canvas_id)
{
	UpdateSize(canvas_id);

	// Initialize the GL context
	const gl = CreateContext(canvas_id);

	// Set clear color to black, fully opaque
	gl.clearColor(1.0, 0.0, 0.0, 1.0);
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);
}
