
function InitialiseBackground(canvas_id)
{
	UpdateSize(canvas_id);

	// Initialize the GL context
	const gl = CreateContext(canvas_id, WaterLoop);

	// Set clear color to black, fully opaque
	gl.clearColor(1.0, 0.0, 0.0, 1.0);
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);
}

var previousTime = performance.now();
var timeCatchup = 0.0;

const tickRate = 30.0 / 1000.0;

function WaterLoop()
{
	const time = performance.now();
	const delta = time - previousTime;
	previousTime = time;
	timeCatchup += delta;

	// Handle input here if required

	while(timeCatchup >= tickRate)
	{
		Tick();
		timeCatchup -= tickRate;
	}
	Render();

	// Loop
	window.requestAnimationFrame(WaterLoop);
}

function Tick()
{
	
}

function Render()
{
	
}
