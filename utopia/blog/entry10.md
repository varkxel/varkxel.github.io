# Entry 10 - Final Touches & Critical Evaluation of the Implementation
# Final Touches
This week I played about with the biome settings and wrote a simple camera controller
in order to better demonstrate the world generator.

This now means the game view can be used to inspect the terrain
and that the terrain is a little more presentable.

# Critical Evaluation
## The architecture
The decision to develop the project with the Burst compiler and Parallelism in mind
definitely added to the complexity of the project, but the decision seems to have paid off
from benchmarking on my end and externally with friends running the project.

I frequently ran into issues where data wasn't being passed around to the correct job,
or back from jobs correctly, along with having to manage memory myself.
This alone probably at least doubled the development time of the project.

Throughout the project, there were many revamps to systems to allow for further flexibility,
which has kept the code very modular and the system customisable.
This I feel has made sure that the project runs quick and is flexible.

Generation time on my machine was 4x longer without the Burst compiler
and more than 16x slower without multithreading, but was more than 25x slower without both.
This is a very significant performance improvement showing that
the architectural decisions were worth the effort.

Testing the project on friends' computers and at the university yielded similar results.

There are some sections that I could improve
like the mesh index generation, since it isn't parallel currently
and the profiler shows it to be a major bottleneck in the program.
Though, currently the implementation is very quick and doesn't require further optimisation.

## Flexibility
I found that whilst editing the terrain parameters can be slightly clunky due to the lack of
instant feedback, the solution was very flexible whilst retaining performance.

Being able to add and remove biomes in the inspector heavily aided world generation.
This is since instead of having to manually program parameters for
how the biome should spawn or world should look in different areas, 
you can just add a new biome with a set of parameters to the list in an inspector
and the world generator will blend it in with no extra code.

Some things I'd like to do in the future to improve the flexibility of the project
would be to allow for noise maps to be defined per-biome rather than globally.
This would allow for even more varied terrains and finer crafted worlds.

## Usability
Due to the heavy nature of generating terrains,
when running the preview inspectors in real time, it can seriously hurt performance.
This is somewhat of an issue as it makes changing parameters in the world generator
much more clunky than it needs to be.

There is also no sense of scale to the preview textures in the inspectors,
making choosing 

A better live updating method to visualise changes would be a very worthwile investment in the future.

## Visuals
Currently, there is no lighting on the terrain
and the texture blending could do with some further work to have unblended sections of biomes.
Though, the current texture blending setup does seem to be convincing enough.

Lighting is an issue for the future however as it may require a lot of custom shader work
depending on how integratable the terrain shader is into the Unity render pipelines.

There are also very obvious seams between each chunk due to the issues faced earlier in the project.
This seems unavoidable for now, without changing the core noise algorithm
or writing a seam stitching job. Both of which are currently out of scope for now.

Masks also weren't implemented due to the amount of issues that had to be solved between
all the other areas of the project, adding another module on top would only help
confuse things during development.

## Generation Quality
After reading [this blog post](https://noiseposti.ng/posts/2022-01-16-The-Perlin-Problem-Moving-Past-Square-Noise.html),
I feel that my current implementation of Fractal Simplex Noise was the correct algorithm
to implement for terrain generation.
Especially using Simplex over Perlin noise.

This is because Simplex noise is free from the "squareness" of the results of perlin, which can look unnatural.
The implementation used / adapted also made use of domain rotation,
which further reduced noise artefacts.

![Example of Squareness](https://noiseposti.ng/assets/images/the-perlin-problem-moving-past-square-noise/coastlines_perlin_highlighted.png)

Image source from [noiseposti.ng by KdotJPG](https://noiseposti.ng/posts/2022-01-16-The-Perlin-Problem-Moving-Past-Square-Noise.html).

## Hardware Compatibility
### Slower on non-AVX hardware
Since the world generator was designed around generating huge islands,
I decided to generate the noise maps in double-precision to allow for bigger worlds
without distortion or artefacting in the world generator.

This came with a tradeoff however of running much slower on older pre-AVX hardware,
due to how 4 doubles take up 256 bits of space where SSE only offers 128 bits.
This means that occasionally two operations are needed on older SSE hardware
whereas on AVX only one would be needed.
This also applies to mobile devices, as they also only have 128-bit wide registers with ARM Neon,
though this could change in the future.

### Vulkan Requirement
Some of the features used within the program and shaders require Vulkan to work properly,
or at least caused crashes on OpenGL and occasionally on D3D11.
The main feature being the asynchronous readback of the mask texture from the GPU.

This will limit the program to running on only newer mobile devices and graphics cards,
but could be worked around in the future with an alternative code path
and may be worth the effort for mobile devices.

## Conclusion
Overall, I feel that the current implementation is a very solid base to build upon in the future.
All the core features are implemented well and extendable,
future work is all about just improving on these features.

Some issues like the seams between the chunks desperately need attention,
but the core work is there.
Masks also could be implemented quickly in the future too, as the code is there,
though an upscaling algorithm should be used first to avoid VRAM memory issues with huge scenes,
since the mask is generated all at once.

Hitches could be reduced by allowing for streaming in/out chunks and generating on the fly,
rather than all at the start.

I would also like to utilise this project in a game to find further issues to fix and features to add,
along with being able to profile the world generator in a real scenario.
