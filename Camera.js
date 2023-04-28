
function Camera_Projection(gl, fov, near, far)
{
	const fovRad = (fov * Math.PI) / 180.0;
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	
	const projection = mat4.create();
	mat4.perspective(projection, fovRad, aspect, near, far);
	
	return projection;
}

function Camera_ModelView(pos)
{
	const modelView = mat4.create();
	mat4.translate(/*dst*/ modelView, /*src*/ modelView, pos);
	
	return modelView;
}
