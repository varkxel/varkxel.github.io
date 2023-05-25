var gl;

var Water_VertexBuffer;
var Water_IndexBuffer;

const Water_VertexShader = `

attribute vec3 vertPos;

void main()
{
	gl_Position = vec4(vertPos, 1.0);
}

`;

const Water_FragmentShader = `

void main()
{
	gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}

`;

var Water_Shader;
var Water_Shader_vertPos;

function InitialiseBackground(canvas_id)
{
	UpdateSize(canvas_id);
	
	// Initialize the GL context
	gl = CreateContext(canvas_id, WaterLoop);
	
	Water_Shader = LoadShaderProgram(gl, Water_VertexShader, Water_FragmentShader);
	
	// Generate mesh
	const vertices = Water_GenerateMesh(-10, -10, 10, 10, 1);
	const indices = Water_GenerateIndices(-10, -10, 10, 10, 1);
	
	Water_VertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Water_VertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	Water_IndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Water_IndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	Water_Shader_vertPos = gl.getAttribLocation(Water_Shader, "vertPos");
	gl.vertexAttribPointer(shader_vertPos, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.enableVertexAttribArray(shader_vertPos);
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
		Water_Tick();
		timeCatchup -= tickRate;
	}
	Water_Render();

	// Loop
	window.requestAnimationFrame(WaterLoop);
}

function Water_Tick()
{
	
}

function Water_Render()
{
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	
	// Depth testing settings
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
}

function Water_Morton1D(input)
{
	/*
		Based on this method:
		https://stackoverflow.com/questions/4909263/how-to-efficiently-de-interleave-bits-inverse-morton
	*/
	
	input = input & 0x55555555;
	input = (input | (input >> 1)) & 0x33333333;
	input = (input | (input >> 2)) & 0x0F0F0F0F;
	input = (input | (input >> 4)) & 0x00FF00FF;
	input = (input | (input >> 8)) & 0x0000FFFF;
	return input;
}

function Water_Morton2D(input)
{
	return [Water_Morton1D(input), Water_Morton1D(input >> 1)];
}

function Water_GenerateMesh(boundX, boundY, boundZ, boundW, resolution)
{
	var mesh = [];
	for(y = boundY; y < boundW; y += resolution)
	{
		for(x = boundX; x < boundZ; x += resolution)
		{
			mesh.push(x);
			mesh.push(y);
			mesh.push(0.0);
		}
	}
	return mesh;
}

function Water_GenerateIndices(boundX, boundY, boundZ, boundW, resolution)
{
	const lengthX = Math.floor((boundZ - boundX) / resolution);
	const lengthY = Math.floor((boundW - boundY) / resolution);
	const length = Math.floor(lengthX * lengthY);

	var indices = [];
	for(i = 0; i < length; i++)
	{
		var xy = Water_Morton2D(i);
		var x = xy[0]; var y = xy[1];

		indices.push(x + (y * lengthX));

		iplusplus = i + 1;
		if(i > 0 && (iplusplus % 6) == 3)
		{
			for(j = -1; j <= 0; j++)
			{
				xy = Water_Morton2D(i + j);
				x = xy[0]; y = xy[1];
				
				indices.push(x + (y * lengthX));
			}
		}
	}
	return indices;
}
