# Entry 4 - Mask Transform Fix, Gradient Fragment Shader & Async Texture Fetch
# Mask Transform Fix (Removal of HDRP)

# Gradient Fragment Shader


# Async texture fetch
The result texture is now fetched asynchronously from the GPU with a callback,
removing the main hitch from the generation method being called.

This works by creating a callback that copies the texture into a NativeArray
once the CPU has downloaded the RenderTexture.
A callback can also be provided to the method which is called once the RenderTexture has been downloaded.
