# Entry 6 - Biome Revamp (Now with Blending!)
This week I decided to try and implement blending on the biomes
and generally speed up the entire system where possible,
as the current implementation is limited to running on / blocking the main thread.

# Stopping the biome generation from blocking the main thread
The original implementation blocked the main thread while the biome map generates.
This caused a bottleneck in the generation code and was the biggest contributor to generation time.

To fix this, I made the biome spawner take in the previous biome's spawner JobHandle.
This allowed each spawner to set the previous one as a dependency,
allowing the whole spawner chain to run in the background without blocking the main thread.
