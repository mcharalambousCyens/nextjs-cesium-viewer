'use client'    // Client component

import { Ion, createWorldTerrainAsync, Viewer,Quaternion, Cesium3DTileset, Matrix3, ScreenSpaceEventHandler, ScreenSpaceEventType, JulianDate, ConstantProperty, Cartesian3, Cartesian2, Color, VerticalOrigin, LabelStyle, PerspectiveFrustum, HeadingPitchRange, Math, defined, Cesium3DTileStyle, Entity, SceneMode, Transforms, KeyboardEventModifier, Ray, Ellipsoid, IntersectionTests, EntityCollection, CircleGeometry, PerInstanceColorAppearance, GeometryInstance, ColorGeometryInstanceAttribute, Primitive, CallbackProperty, ConstantPositionProperty } from "cesium";
import { useEffect, useState } from "react";
import ResponsiveCarousel from "./ResponsiveCarousel";
import CarouselModal from './CarouselModal';
import Modal from './Modal';
import { Phases } from './Phases';
import {FirstPersonCameraController} from './FirstPersonNavigation';







// This is the default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMjA4MzkzMC0yMGNjLTQxZDItOTIwMC0yMTBiZWE5MTdlMjgiLCJpZCI6MTcwMDY5LCJpYXQiOjE2OTY0OTIwMDV9.Dhq09qaf06rBxQgzlRWU-6eis8i4LO26WFpyDmM0WDE';
// const NAV_MODE_DEFAULT = "0";
// const NAV_MODE_FLY = "1";
// const NAV_MODE_FLY_EXPERT = "2";
const Map = () => {

  // Handle the modal carousel state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string | null>();
  const [viewer, setViewer] = useState<Viewer>();
  const [firstPersonCameraController, setFirstPersonCameraController] = useState<FirstPersonCameraController | null>();
  // Initialize the Cesium Viewer
  useEffect(() => {
    const initializeViewer = async () => {
      try {
        // Create the Viewer
        const viewer = new Viewer("cesiumContainer", {
          terrainProvider: await createWorldTerrainAsync(),   // Await the promise
          timeline: false,    // Disable timebar at the bottom
          animation: false,    // Disable animation (clock-like) widget
          creditContainer: document.createElement("none") // Remove the logo and credits of Cesium Ion
        });
        // setViewer(viewer);
       
        // ------
        // Load the 3D tilesets of the Church (init with only Exterior visible)
        // Exterior
        const buildingTileset = await Cesium3DTileset.fromIonAssetId(2302705);
        viewer.scene.primitives.add(buildingTileset);

        // circleEntity.show = true;
        const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
        //-----Marios-------
        var destinationPosition: Cartesian3 | null = null


        // yellow circle
        const intersectionPointEntity = new Entity({
          position: new Cartesian3(0, 0, 0),
          point: {
            pixelSize: 100,
            color: Color.TRANSPARENT,
            outlineColor: Color.YELLOW,
            outlineWidth: 2,

          },
        });

        viewer.entities.add(intersectionPointEntity);
        //-----end Marios------



        // var adjustedDistance=0;
        // var currentDistance=0;
        // // Create a ray using Cesium.Ray
        // handler.setInputAction((movement: any) => {
        //   viewer.scene.camera.lookAtTransform(originalPosition);

        //   // Get the clicked position on the screen
        //   if (defined(movement) && defined(movement.position)) {

        //     // Get the clicked position on the screen
        //     const windowPosition = new Cartesian3(movement.position.x, movement.position.y, movement.position.y);


        //     // Get the ray from the camera through the clicked position
        //     const ray = viewer.camera.getPickRay(windowPosition);


        //     // Use Cesium.Scene.pick to get the intersection with the 3D scene
        //     const pickedObject = viewer.scene.globe.pick(ray as Ray, viewer.scene);

        //     if (defined(pickedObject)) {

        //       // The point on the 3D terrain or model where the user clicked
        //       const intersection = viewer.scene.pickPosition(windowPosition);

        //       destinationPosition = intersection;
        //       currentDistance = Cartesian3.distance(viewer.camera.position, destinationPosition as Cartesian3);
        //       console.log("current"+currentDistance);

        //       // Adjust the destination position based on a factor (e.g., 2 times the current distance)
        //       adjustedDistance = 0.8 * currentDistance;
        //       var adjustedDestination = Cartesian3.multiplyByScalar(
        //         Cartesian3.normalize(
        //           Cartesian3.subtract(destinationPosition as Cartesian3, viewer.camera.position, new Cartesian3()),
        //           new Cartesian3()
        //         ),
        //         adjustedDistance,
        //         new Cartesian3()
        //       );
        //       var adjustedPointDistance = 0.995 * currentDistance;
        //       var adjustedPointDestination = Cartesian3.multiplyByScalar(
        //         Cartesian3.normalize(
        //           Cartesian3.subtract(destinationPosition as Cartesian3, viewer.camera.position, new Cartesian3()),
        //           new Cartesian3()
        //         ),
        //         adjustedPointDistance,
        //         new Cartesian3()
        //       );
        //       if (defined(intersection) && !isNaN(intersection.x) && !isNaN(intersection.y) && !isNaN(intersection.z)) {


        //         viewer.camera.flyTo({
        //           destination: Cartesian3.add(viewer.camera.position, adjustedDestination, new Cartesian3()),
        //           orientation: {
        //             heading: viewer.camera.heading,
        //             pitch: viewer.camera.pitch,
        //             roll: 0.0
        //           },
        //           duration: 2.0,


        //         });


        //         //viewer.camera.lookAt(Cartesian3.add(viewer.camera.position, adjustedDestination, new Cartesian3()), new HeadingPitchRange(viewer.camera.heading, viewer.camera.pitch, viewer.camera.roll));
        //         intersectionPointEntity.position = new ConstantPositionProperty(Cartesian3.add(viewer.camera.position, adjustedPointDestination, new Cartesian3()));
        //         intersectionPointEntity.show=true;
        //        // var center = Cartesian3.fromRadians(2.4213211833389243, 0.6171926869414084, 3626.0426275055174);
        //        viewer.scene.camera.lookAt(intersection, new HeadingPitchRange(0, -Math.PI/8, 1000000));



        //         console.log('Intersection point:', intersection);


        //       } else {
        //         console.error('Invalid intersection point:', intersection);
        //       }
        //     } else {
        //       console.warn('No object picked.');
        //     }
        //   }
        // }, ScreenSpaceEventType.LEFT_CLICK);
        // viewer.scene.preRender.addEventListener(function () {
        //   if (isRKeyPressed && defined(destinationPosition)) {



        //   }
        // });

        // const Menubutton = document.createElement("button");
        // let isMenuVisible = false;
        // Menubutton.textContent = "Menu";
        // Menubutton.classList.add('cesium-button', 'my-Button');
        // Menubutton.style.position = "absolute";
        // Menubutton.style.top = "10px"; // Adjust the top position as needed
        // Menubutton.style.left = "10px"; // Adjust the left position as needed
        // Menubutton.addEventListener("click", () => {
        //   if (isMenuVisible) {
        //     // Menu is already visible, do nothing or close it if needed
        //     return;
        //   }
        //   // Create a simple menu div
        //   const menu = document.createElement("div");
        //   menu.innerHTML = `
        //   <h3>Menu</h3>
        //   <ul>
        //       <li>
        //           <p><b>Menu button</b> = Displays the menu.</p>
        //       </li>
        //       <li>
        //           <p><b>Reset Camera button</b> = Resets the camera to its initial position.</p>
        //       </li>
        //       <li>
        //           <p><b>Phase Now button</b> = Shows the 3D model as it is now.</p>
        //       </li>
        //       <li>
        //           <p><b>Phase One button</b> = Shows the 3D model as it was in 1160.</p>
        //       </li>
        //       <li>
        //           <p><b>Phase Two button</b> = Shows the 3D model as it was in 1170-1183.</p>
        //       </li>
        //       <li>
        //           <p><b>Phase Three button</b> = Shows the 3D model as it was in 1183-1214.</p>
        //       </li>
        //       <li>
        //           <p><b>Story Mode(Next Location) button</b> = Displays the annotations/points on the 3D model with
        //               descriptions of what each one is.</p>
        //       </li>
        //   </ul>`;

        //   // Style the menu (adjust styles as needed)
        //   menu.style.position = "absolute";
        //   menu.style.top = "100px";
        //   menu.style.left = "200px";
        //   menu.style.padding = "20px";
        //   menu.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        //   menu.style.border = "1px solid #ccc";

        //   // Append the menu to the Cesium container

        //   viewer.container.appendChild(menu);
        //   isMenuVisible = true;

        //   // Close the menu when clicking outside of it
        //   handler.setInputAction(() => {
        //     viewer.container.removeChild(menu);
        //     handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
        //     isMenuVisible = false;
        //   }, ScreenSpaceEventType.LEFT_CLICK);

        //   // Prevent clicks inside the menu from closing it
        //   menu.addEventListener("click", (event) => {
        //     event.stopPropagation();
        //   });
        // });

        // // Append the button to the Cesium container
        // viewer.container.appendChild(Menubutton);


        const Resetbutton = document.createElement("button");
        Resetbutton.textContent = "Reset Camera";
        Resetbutton.classList.add('cesium-button');

        Resetbutton.addEventListener("click", () => {
          resetCamera();
        });
        viewer.container.appendChild(Resetbutton);

        const nextButton = document.createElement("button");
        nextButton.textContent = "Story Mode";
        nextButton.classList.add('cesium-button');
        viewer.container.appendChild(nextButton);

        // Phases Dropdown Menu
        const phasesDropdown = document.createElement('select');
        phasesDropdown.id = 'toolbar';
        phasesDropdown.classList.add('cesium-button');
        phasesDropdown.innerHTML = 'Phases';    // Phases Toolbar button name

        // Populate dropdown with options
        Phases.forEach(phase => {
          const option = document.createElement('option');
          option.value = phase.id.toString();
          option.textContent = phase.text;
          phasesDropdown.appendChild(option);
        });

        // Dropdown event listener
        phasesDropdown.addEventListener('change', (event) => {
          const selectedOption = event.target as HTMLSelectElement;
          const selectedPhaseId = parseInt(selectedOption.value); // Translate it to int

          // Show the selected phase tileset
          if (selectedPhaseId == 2302705) {
            addPhaseNow();
          }
          else if (selectedPhaseId == 2301221) {
            addPhaseOne();
          }
          else if (selectedPhaseId == 2301244) {
            addPhaseTwo();
          }
          else if (selectedPhaseId == 2453639) {
            addPhaseThree();
          }
          else if (selectedPhaseId == 2301245) {
            addPhaseFour();
          }

        });

        // // Set up variables for camera controls
        var moveSpeed = 0.1;
        // Add keyboard event listener for WASD movement
        document.addEventListener('keydown', function (e) {
          
          if (firstPersonCameraController._enabled) return; // Disable this WASD movement when in first person mode
          if (e.key === 'w' || e.key === 'W')
              viewer.camera.moveForward(moveSpeed);
          else if (e.key === 's' || e.key === 'S')
              viewer.camera.moveBackward(moveSpeed);
          else if (e.key === 'a' || e.key === 'A')
              viewer.camera.moveLeft(moveSpeed);
          else if (e.key === 'd' || e.key === 'D')
              viewer.camera.moveRight(moveSpeed);
          else if (e.key === 'q' || e.key === 'Q')
              viewer.camera.moveUp(moveSpeed);
          else if (e.key === 'e' || e.key === 'E')
              viewer.camera.moveDown(moveSpeed);
      });


        // Camera settings
        // Move the camera to the new building with more space
        viewer.flyTo(buildingTileset, {
          offset: new HeadingPitchRange(
            Math.toRadians(-35),
            Math.toRadians(0),
            35
          ),
        });

        viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
        // Apply the default style if it exists (based on the initial code)
        var extras = buildingTileset.asset.extras;
        if (
          defined(extras) &&
          defined(extras.ion) &&
          defined(extras.ion.defaultStyle)
        ) {
          buildingTileset.style = new Cesium3DTileStyle(extras.ion.defaultStyle);
        }

        const resetCamera = () => {
          const primitives = viewer.scene.primitives;

          for (let i = 0; i < primitives.length; i++) {
            const primitive = primitives.get(i);

            if (primitive instanceof Cesium3DTileset) {
              viewer.flyTo(primitive, {
                offset: new HeadingPitchRange(
                  Math.toRadians(-35),
                  Math.toRadians(0),
                  35
                ),
              });
            }
          }
        };

        //-----Marios-----
        // Path to your JSON file
        const jsonFilePath = 'data.json';

        // Variable to store the phases and their locations
        var phases: Record<string, { locations: Array<any> }> = {};

        // Variable to store the locations
        // const locations: any[] = [];
        var currentIndex = 0;

        // Variable to store the current label entity
        let currentLabelEntity: Entity | null = null;
        let labelTextEntity: Entity | null = null;
        let labelDescriptionEntity: Entity | null = null;


        // Variable to store the current phase
        var currentPhase = '';

        // Fetch the JSON data
        fetch(jsonFilePath)
          .then(response => response.json())
          .then((data: Record<string, any>) => {
            phases = data;
            // Assuming your JSON file has an array of locations
            // locations = data.locations;
            currentPhase = 'Phase Now';
            addAnnotations(currentPhase);
            // Function to set the camera to the current location and update description
            function setCameraToLocation(index: number) {
              const location = phases[currentPhase]?.locations[index];
              if (!location) return;

              const destination = Cartesian3.fromDegrees(
                location.lon,
                location.lat,
                location.height
              );

              // Calculate vector from camera to destination
              const cameraPosition = viewer.camera.positionWC.clone();
              const direction = new Cartesian3();
              Cartesian3.subtract(destination, cameraPosition, direction);

              // Set a desired distance (e.g., 1000 meters) from the destination
              const distance = location.distance;
              Cartesian3.normalize(direction, direction);
              Cartesian3.multiplyByScalar(direction, distance, direction);

              const finalDestination = Cartesian3.add(
                destination,
                direction,
                new Cartesian3()
              );
              
              
             
              // Remove the current label entity
              if (currentLabelEntity) {
                viewer.entities.remove(currentLabelEntity);
                currentLabelEntity = null;
              }

              // Create a label for the current location
              if (location.descriptions || location.image) {
                currentLabelEntity = viewer.entities.add({
                  position: destination,
                  label: {
                    text: location.descriptions,
                    show: false,
                    font: location.font,
                    fillColor: Color.WHITE,
                    outlineColor: Color.BLACK,
                    outlineWidth: 2,
                    style: LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    pixelOffset: new Cartesian2(0, 40),
                    backgroundColor: Color.fromCssColorString(
                      'rgba(0,0,0,0.7)'
                    ),
                    showBackground: true,
                    backgroundPadding: new Cartesian2(8, 4),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                  },
                  billboard: {
                    image: location.image,
                    show: false,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    width: location.image_width,
                    height: location.image_height,
                    pixelOffset: new Cartesian2(0, location.pixelOffset),
                  },
                });

              }

              if (phases[currentPhase].locations[index].move == 1) {
                viewer.scene.camera.flyTo({
                  destination:finalDestination,
                  orientation: {
                    heading:Math.toRadians(location.heading),
                    pitch: Math.toRadians(location.pitch),
                    roll: viewer.camera.roll,
                  },
                  duration: 3.0,
                  complete: function () {
                    
                  },
                });
               
              } else if (phases[currentPhase].locations[index].move == 0) {
                resetCamera();
              }
            }






            //escape -> camera move normally
            document.addEventListener('keyup', function (event) {
              if (event.key === 'Escape') {
                // isRKeyPressed = false;
                viewer.scene.camera.lookAtTransform(originalPosition);
                intersectionPointEntity.show = false;
                if (tempLabel) {
                  if (tempLabel.label) {
                    tempLabel.label.show = new ConstantProperty(false);
                  }
                }
                if (currentLabelEntity) {
                  if (currentLabelEntity.label) {
                    currentLabelEntity.label.show = new ConstantProperty(false);
                  }
                }



              }
            });

            //click on 3d object and zoom camera to this position
            var destinationPosition: Cartesian3 | null = null
            var positions: Cartesian3 | null = null;
            var SelectedPositions: Cartesian3 | null = null;
            var tempLabel: Entity;
            let firstframe = true;

            const originalPosition = viewer.scene.camera.transform.clone();

            viewer.screenSpaceEventHandler.setInputAction(function (movement: any) {

              viewer.scene.camera.lookAtTransform(originalPosition);
              var pickedObject = viewer.scene.pick(movement.position);
              if (defined(pickedObject)) {
                if (defined(pickedObject.id)) {
                  destinationPosition = pickedObject.id.position?.getValue(JulianDate.now());
                } else {
                  destinationPosition = viewer.scene.pickPosition(movement.position);
                }
                intersectionPointEntity.show = false;
                if (tempLabel) {
                  if (tempLabel.label) {
                    tempLabel.label.show = new ConstantProperty(false);
                  }
                }
                if (currentLabelEntity) {
                  if (currentLabelEntity.label) {
                    currentLabelEntity.label.show = new ConstantProperty(false);
                  }
                }
                // destinationPosition = pickedObject.id.position?.getValue(JulianDate.now());

                // Get the current camera distance
                var currentDistance = Cartesian3.distance(viewer.camera.position, destinationPosition as Cartesian3);

                // Adjust the destination position based on a factor (e.g., 2 times the current distance)
                var adjustedDistance = 0.85 * currentDistance;
                var adjustedDestination = Cartesian3.multiplyByScalar(
                  Cartesian3.normalize(
                    Cartesian3.subtract(destinationPosition as Cartesian3, viewer.camera.position, new Cartesian3()),
                    new Cartesian3()
                  ),
                  adjustedDistance,
                  new Cartesian3()
                );
                var adjustedPointDistance = 0.995 * currentDistance;
                var adjustedPointDestination = Cartesian3.multiplyByScalar(
                  Cartesian3.normalize(
                    Cartesian3.subtract(destinationPosition as Cartesian3, viewer.camera.position, new Cartesian3()),
                    new Cartesian3()
                  ),
                  adjustedPointDistance,
                  new Cartesian3()
                );

                viewer.camera.flyTo({
                  destination: Cartesian3.add(viewer.camera.position, adjustedDestination, new Cartesian3()),
                  orientation: {
                    heading: viewer.camera.heading,
                    pitch: viewer.camera.pitch,
                    roll: viewer.camera.roll
                  },
                  duration: 2.0,


                });


                intersectionPointEntity.position = new ConstantPositionProperty(Cartesian3.add(viewer.camera.position, adjustedPointDestination, new Cartesian3()));
                intersectionPointEntity.show = true;
                viewer.scene.camera.lookAt(destinationPosition as Cartesian3, new HeadingPitchRange(0, -Math.PI / 8, 1000000));
              }


              //add label descriptions for every positions from the data.json
              for (var i = 0; i < phases[currentPhase].locations.length; i++) {

                positions = Cartesian3.fromDegrees(phases[currentPhase].locations[i].lon, phases[currentPhase].locations[i].lat, phases[currentPhase].locations[i].height);
                if (firstframe) {
                  SelectedPositions = positions;
                  firstframe = false;
                }
                // console.log("pos" + positions);
                // console.log("dest" + destinationPosition);
                // Check if there is an existing labelDescriptionEntity and hide it


                labelDescriptionEntity = viewer.entities.add({
                  position: positions,
                  label: {
                    text: phases[currentPhase].locations[i].labeldesciption,
                    show: false,
                    font: phases[currentPhase].locations[i].font,  // You can customize font for the second label as needed
                    fillColor: Color.WHITE,
                    outlineColor: Color.BLACK,
                    outlineWidth: 2,
                    style: LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    pixelOffset: new Cartesian2(0, 80),  // Adjust pixelOffset for the second label
                    backgroundColor: Color.fromCssColorString('rgba(0,0,0,0.7)'),
                    showBackground: true,
                    backgroundPadding: new Cartesian2(8, 4),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                  },
                });
                //check if the clicked position is the same position with the data.json file -> to show the labeldescriptions
                if (destinationPosition && destinationPosition.equals(positions) && positions.equals(SelectedPositions as Cartesian3)) {
                  console.log(phases[currentPhase].locations[i].labeldesciption);


                  if (labelDescriptionEntity) {
                    if (labelDescriptionEntity.label) {
                      labelDescriptionEntity.label.show = new ConstantProperty(true);
                    }
                  }
                  tempLabel = labelDescriptionEntity;

                } else if (destinationPosition && destinationPosition.equals(positions) && !positions.equals(SelectedPositions as Cartesian3)) {

                  if (tempLabel) {
                    if (tempLabel.label) {
                      tempLabel.label.show = new ConstantProperty(false);
                    }
                  }
                  if (labelDescriptionEntity) {
                    if (labelDescriptionEntity.label) {
                      labelDescriptionEntity.label.show = new ConstantProperty(true);
                    }
                  }
                  tempLabel = labelDescriptionEntity;

                }
              }

            }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);




            //Story Mode Button to increase the index
            function onNextButtonClick() {
              // viewer.scene.camera.lookAtTransform(originalPosition);
              // intersectionPointEntity.show = false;
              // if (tempLabel) {
              //   if (tempLabel.label) {
              //     tempLabel.label.show = new ConstantProperty(false);
              //   }
              // }
              // currentIndex = (currentIndex) % phases[currentPhase]?.locations.length;
              // setCameraToLocation(currentIndex);
              // if (currentLabelEntity) {
              //   if (currentLabelEntity.label) {
              //     currentLabelEntity.label.show = new ConstantProperty(true);
              //   }
              //   if (currentLabelEntity.billboard) {
              //     currentLabelEntity.billboard.show = new ConstantProperty(true);
              //   }
              // }
              // currentIndex += 1;
              var Width=window.innerWidth- 800;
              var Height=window.innerHeight-400;
              var left = 40;
              var top =40;
              const newWindow = window.open("https://ion.cesium.com/stories/viewer/?id=1d2c9453-2d53-4e90-8123-f14dbe176d11", '_blank', `width=${Width},height=${Height},left=${left},top=${top}`);
              
            }



            nextButton?.addEventListener('click', onNextButtonClick);


            // Initial setup
            setCameraToLocation(currentIndex);
          })
          .catch(error => {
            console.error('Error fetching JSON:', error);
          });
        //-------end Marios----------

        const addPhaseNow = async () => {
          hideAllTilesets();
          const newbuildingTileset = await Cesium3DTileset.fromIonAssetId(2302705);
          viewer.scene.primitives.add(newbuildingTileset);

          resetCamera();
          //viewer.entities.remove(currentLabel);
          // currentLabelEntity = null;
          hideEntities();

          currentPhase = "Phase Now";
          addAnnotations(currentPhase);
          currentIndex = 0;

        };
        const addPhaseOne = async () => {
          hideAllTilesets();
          const newbuildingTileset = await Cesium3DTileset.fromIonAssetId(2301221);
          viewer.scene.primitives.add(newbuildingTileset);

          resetCamera();
          //viewer.entities.remove(currentLabel);
          // currentLabelEntity = null;
          hideEntities();

          currentPhase = "Phase One";
          addAnnotations(currentPhase);
          currentIndex = 0;

        };

        const addPhaseTwo = async () => {
          hideAllTilesets();
          const newbuildingTileset = await Cesium3DTileset.fromIonAssetId(2301244);
          viewer.scene.primitives.add(newbuildingTileset);

          resetCamera();
          //viewer.entities.remove(currentLabel);
          // currentLabelEntity = null;
          hideEntities();

          currentPhase = "Phase Two";
          addAnnotations(currentPhase);
          currentIndex = 0;

        };
        const addPhaseThree = async () => {
          hideAllTilesets();
          const newbuildingTileset = await Cesium3DTileset.fromIonAssetId(2453639);
          viewer.scene.primitives.add(newbuildingTileset);

          resetCamera();
          hideEntities();

          currentPhase = "Phase Three";
          addAnnotations(currentPhase);
          currentIndex = 0;

        };
        const addPhaseFour = async () => {
          hideAllTilesets();
          const newbuildingTileset = await Cesium3DTileset.fromIonAssetId(2301245);
          viewer.scene.primitives.add(newbuildingTileset);

          resetCamera();
          hideEntities();

          currentPhase = "Phase Four";
          addAnnotations(currentPhase);
          currentIndex = 0;

        };

        const hideAllTilesets = async () => {
          const primitives = viewer.scene.primitives;
          for (let i = 0; i < primitives.length; i++) {
            const primitive = primitives.get(i);
            if (primitive instanceof Cesium3DTileset) {
              primitives.remove(primitive);
              i--;
            }
          }
        };
        const hideEntities = async () => {

          // Remove the current label entity
          if (currentLabelEntity) {
            viewer.entities.remove(currentLabelEntity);
            currentLabelEntity = null;
          }
          // Iterate through all entities and hide them
          viewer.entities.values.forEach(function (entity) {
            entity.show = false;
          });

        };

        //---Marios-----
        const addAnnotations = async (Phase: any) => {
          fetch(jsonFilePath)
            .then(response => response.json())
            .then((data: Record<string, any>) => {


              for (var phase in data) {
                if (phase == Phase) {
                  if (data.hasOwnProperty(phase)) {
                    var locations = data[phase].locations;

                    for (var i = 0; i < locations.length; i++) {
                      var location = locations[i];
                      if (location.labeltext) {
                        var entity = viewer.entities.add({
                          position: Cartesian3.fromDegrees(
                            location.lon,
                            location.lat,
                            location.height
                          ),
                          point: {
                            pixelSize: 30,
                            color: Color.fromCssColorString('rgba(0, 0, 0, 0.8)'),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                          },
                          label: {
                            text: location.labeltext,
                            font: '14px sans-serif',
                            fillColor: Color.WHITE,
                            style: LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth: 2,
                            outlineColor: Color.WHITE,
                            pixelOffset: new Cartesian2(0, 0),
                            eyeOffset: new Cartesian3(0, 0, 0),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY

                          }
                        });


                      }
                    }
                  }
                }
              }



            })
            .catch(error => {
              console.error('Error fetching JSON:', error);
            });
        }
        //--- End Marios-----


        // ------
        // Carousel
        // Create a custom button in the Cesium's existing toolbar
        const carouselButton = document.createElement('button');
        carouselButton.classList.add('cesium-button');
        carouselButton.innerHTML = 'GraphMat';

        // Add a click event handler to open the Carousel
        carouselButton.addEventListener('click', () => {
          setIsModalOpen(true);
        });
        const logCameraConfig = () => {
          const camera = viewer.camera;
          const cameraConfig = {
            position: {
              x: camera.position.x,
              y: camera.position.y,
              z: camera.position.z
            },
            direction: {
              x: camera.direction.x,
              y: camera.direction.y,
              z: camera.direction.z
            },
            up: {
              x: camera.up.x,
              y: camera.up.y,
              z: camera.up.z
            },
            frustum: {
              fov: (camera.frustum as PerspectiveFrustum).fov,
              aspectRatio: (camera.frustum as PerspectiveFrustum).aspectRatio,
              near: camera.frustum.near,
              far: camera.frustum.far
            }
          };
          // Convert cameraConfig object to JSON string with pretty print
          const cameraConfigStr = JSON.stringify(cameraConfig, null, 2);
          console.log(cameraConfigStr);
          // Create a Blob from the JSON string
          const blob = new Blob([cameraConfigStr], { type: 'text/plain' });
          // Create a URL for the Blob
          const url = URL.createObjectURL(blob);
          // Create a temporary link to trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cameraConfig.txt'; // File name for the download
          document.body.appendChild(a); // Append the link to the document
          a.click(); // Trigger the download
          document.body.removeChild(a); // Clean up
          URL.revokeObjectURL(url); // Free up resources by revoking the blob URL
        };
        // const navModeDropdown = document.createElement('select');
        //         navModeDropdown.id = 'nav-menu';
        //         navModeDropdown.classList.add('cesium-button');
        //         navModeDropdown.innerHTML = 'Navigation';    // Toolbar button name

        //         const option1 = document.createElement('option');
        //         option1.value = NAV_MODE_DEFAULT;
        //         option1.textContent = "Navigation: default (globe)"
        //         navModeDropdown.appendChild(option1);

        //         const option2 = document.createElement('option');
        //         option2.value = NAV_MODE_FLY;
        //         option2.textContent = "Navigation: Fly-through";
        //         navModeDropdown.appendChild(option2);

                // const option3 = document.createElement('option');
                // option3.value = NAV_MODE_FLY_EXPERT;
                // option3.textContent = "Navigation: Fly-through (expert)";
                // navModeDropdown.appendChild(option3);


                // // Nav Modes Dropdown event listener
                // navModeDropdown.addEventListener('change', async (event) => {
                //     const id = (event.target as HTMLSelectElement).value;                    
                //     //console.log('Selected Nav Mode: ', id);
                //     if (id === NAV_MODE_FLY) {
                //         firstPersonCameraController.start();
                //         firstPersonCameraController._continuousMotion = false;
                //     }
                //     // else if (id === NAV_MODE_FLY_EXPERT) {
                //     //     firstPersonCameraController.start();
                //     //     firstPersonCameraController._continuousMotion = true;
                //     // }
                //     else if (id === NAV_MODE_DEFAULT) {
                //         firstPersonCameraController.stop();
                //     }
                // });
        // Create the button for logging camera configurations
        const logCameraButton = document.createElement('button');
        logCameraButton.textContent = "Log Camera Config";
        logCameraButton.classList.add('cesium-button');
        logCameraButton.addEventListener("click", logCameraConfig);

        // Get the Cesium toolbar container element to append the button


        // Get the Cesium toolbar container element
        const toolbar = viewer.container.querySelector('.cesium-viewer-toolbar');

        // Insert your custom button before an existing button
        if (toolbar) {
          const modeButton = toolbar.querySelector('.cesium-viewer-geocoderContainer');
          toolbar.insertBefore(carouselButton, modeButton);
        }

        if (toolbar) {
          toolbar.insertBefore(phasesDropdown, carouselButton);
        }
        if (toolbar) {
          toolbar.insertBefore(Resetbutton, phasesDropdown);
        }
        if (toolbar) {
          toolbar.insertBefore(nextButton, Resetbutton);
        }
        // if (toolbar) {
        //   toolbar.insertBefore(navModeDropdown, nextButton);
        // }
        if (toolbar) {
          toolbar.insertBefore(logCameraButton, nextButton);
        }
        const firstPersonCameraController = new FirstPersonCameraController({ cesiumViewer : viewer });
                setFirstPersonCameraController(firstPersonCameraController); 

                document.addEventListener('keypress', (event) => {    // TODO: set navigation mode through GUI
                    if (event.key=='f')
                        
                        firstPersonCameraController.start();
                    if (event.key=='g') 
                        firstPersonCameraController.stop();
                   

                  }, false);


      } catch (error) {
        console.log(error);
      }
    };

    initializeViewer();
  }, []);


  return (

    <div>
      
      {/* Return the Cesium Viewer */}
      <div id="cesiumContainer" />

      {/* Return the Image Carousel Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        openModal={() => setIsModalOpen(true)} selectedPhase={selectedPhase}>
      </Modal>
    </div>
  );
};

export default Map;
