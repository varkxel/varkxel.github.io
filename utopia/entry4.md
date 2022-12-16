# Entry 4 - Mask Transform Fix, Gradient Fragment Shader & Async Texture Fetch
# Mask Transform Fix (Removal of HDRP)
One of the main issues I was facing with the mask shader was that the ortho matrix was not being used.
This turned out to be because of HDRP not utilising the same matrices as the standard pipeline.
As I didn't want to deal with the extra hassle of adding support for HDRP,
I decided to revert back to the built-in pipeline.
This fixed the issue and support for a Scriptable Render Pipeline can always be added back in the future.

# Gradient Fragment Shader


# Async texture fetch
The result texture is now fetched asynchronously from the GPU with a callback,
removing the main hitch from the generation method being called.

This works by creating a callback that copies the texture into a NativeArray
once the CPU has downloaded the RenderTexture.
A callback can also be provided to the method which is called once the RenderTexture has been downloaded.
