================================================================================
                                    Group 20
                  Toon Shading Approach on Redbird Statue
                                  WANG Yucheng
================================================================================

1. Team member

Group 20
WANG Yucheng   <ywangls@connect.ust.hk>

================================================================================

2. Implemented models & codes

The following codes are implemented from scratch:
* denotes reference from existing source codes 
+ denotes mentioned in the Report

-public Folder
  -models Folder
    public/models/model.blend (Blender Model source)
                              +Modelling part in Report
                              +Toon Shading Log Approach part in Report
    public/models/Redbird.glb (Blender Model)
  -textures Folder
    public/textures/ytb.mp4   (Video source)

-src Folder
  -Utils Folder
  1) src/Utils/Assets.js     (Model and Texture resource - Location and Type)
  2) src/Utils/Resource.js   (Model and Texture resource - Loder)

  -World Folder
  3) src/World/Background.js (World Background setting)
  4) src/World/Controls.js   (World controls setting)
  5) src/World/Lighting.js   (World Lighting setting - Sunlight and Ambient Light)
                             *Exclude: setGUI function is external source
  6) src/World/Redbird.js    (Redbird model setting & animation setting)
                             +Animation part in Report
                             +Lerp Rotation part in Report
                             +Texture part in Report
  7) src/World/World.js      (World overall setting)

  -Without Folder
  8) src/World/camera.js    (Camera setting - Perspective & Orthographic)
  9) src/World/Experience.js(Experience - Update & Resize Solver)
  10) src/World/Render.js   (THREE.js Render Parameter)

  -Shaders Folder
  11) src/Shaders/toon.frag (fragment shader setting)
  12) src/Shaders/toon.vert (vertex shader setting)
                            +Toon Shading Naive Approach
  
  (To be continued)server.js(Future Communication Use)

The following codes are referred from existing source codes but with adjustment:
-src Folder
  -Utils Folder
  1) src/Utils/Sizes.js      (User Interface - Resize Emitter)
  2) src/Utils/Time.js       (Delta Time Update Emitter)
  -Without Folder
  3) src/World/Theme.js      (Theme Toggle Controller)
                             +Theme Toggle part in Report
  index.html                 (html file)
================================================================================

3. Compiling the code

 1) Go to the root directory and execute
    
    npm install

 2) Then execute
    
    npm run dev

