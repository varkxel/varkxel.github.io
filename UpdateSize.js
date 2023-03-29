export function updateSize(canvas_id)
{
	canvas = document.getElementById(canvas_id);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
