# Entry 2 - Mask Implementation
## 1D Noise
After reading through the [book of shaders](https://thebookofshaders.com/10/)' section about randomness and noise,
I developed an implementation of a smooth 1D noise algorithm in Burst.

## Implementation finished with issues
The implementation was also finished this week, but it has a few issues.

![Mask RenderTexture](./entry2/mask.png)

The main one to focus on this week is that the extents of the mesh generated are not normalised.
This was fixed to create the image by scaling it in the render step.
This leads to issues where the mesh won't be in view or can intersect itself.

This issue can be fixed by adding a step to find the minimum and maximum value of the array,
to then use in an inverse lerp on the extents within the vertex generation step.
