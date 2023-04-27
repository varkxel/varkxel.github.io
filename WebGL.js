
function LoadShaderProgram(glContext, vertexSrc, fragmentSrc)
{
	const vert = CompileShader(glContext, glContext.VERTEX_SHADER, vertexSrc);
	const frag = CompileShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);

	const shader = glContext.createProgram();
	glContext.attachShader(shader, vert);
	glContext.attachShader(shader, frag);
	glContext.linkProgram(shader);

	// Test if successful
	if(!glContext.getProgramParameter(shader, glContext.LINK_STATUS))
	{
		alert(`Shader program failed to initialise.\nInfo Log:\n${glContext.getProgramInfoLog(shader)}`);
		return null;
	}
	return shader;
}

function CompileShader(glContext, shaderType, src)
{
	// Compile the shader
	const shader = glContext.createShader(shaderType);
	glContext.shaderSource(shader, src);
	glContext.compileShader(shader);

	// Test if successful
	if(!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS))
	{
		alert(`Shader failed to compile.\nCompilation Log:\n${glContext.getShaderInfoLog(shader)}`);
		glContext.deleteShader(shader);
		return null;
	}
	return shader;
}
