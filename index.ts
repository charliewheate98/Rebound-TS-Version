import { Player } from "../src/Player";
import { Content } from "../src/Content";
import { OrthoCamera } from "../src/OrthoCamera";
import { Ball } from "../src/Ball";
import { UI } from "../src/UI";
import { ParticleSystem } from "./ParticleSystem"

/*
*
* This is the main class that all classes filter down to. 
*
*/ 
class Game {
  private _canvas: HTMLCanvasElement; // the html canvas
  private _engine: BABYLON.Engine; // the babylon engine
  public _scene: BABYLON.Scene; // the babylon scene
  private _cam: OrthoCamera; // orthographic camera

  private dT: any;

  // Constructer: 
  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);

    this._scene = new BABYLON.Scene(this._engine);
    this._scene.clearColor = new BABYLON.Color4(0.25, 0.25, 0.25, 1.0);

    // initialise the content
    Content.init(this._scene);
  }

  // this function handles creating the game scene
  createScene(): void 
  {
      // enable cannon physics (would probably use Ammo next time)
    this._scene.enablePhysics(
      new BABYLON.Vector3(0, -9.87, 0), // gravity
      new BABYLON.CannonJSPlugin() // initialise cannon
    );
    this._scene.getPhysicsEngine().setTimeStep(1 / 4); // set the timestep for the physics. Increase speed
    this._scene.collisionsEnabled = true; // collisions are enabled

    this._cam = new OrthoCamera(
        this._scene, 
        this._canvas, 
        new BABYLON.Vector2(0, 5)
    );

    // // This creates and positions a free camera (non-mesh)
    // var camera = new BABYLON.FreeCamera(
    //   "camera1", // name of camera
    //   new BABYLON.Vector3(0, 5, -10), // position
    //   this._scene // game scene
    // );
    // camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA; // type of camera: Orthographic
    // camera.orthoTop = 700; // top of screen
    // camera.orthoBottom = 0; // bottom of screen
    // camera.orthoLeft = 0; // left of screen
    // camera.orthoRight = 400; // right of screen

    var update = () => {
        this.dT = this._engine.getDeltaTime();
        console.log(this.dT);
    }    

    var _player = new Player(new BABYLON.Vector2(100, -200), this._scene); // initialise the player
    var _ball = new Ball(this._scene); // initialise the ball

    UI.create(_player); // create the User Interface
           
    // Burst Particles when the ball hits the platform 
    let trail = new ParticleSystem(
        500, // number of particles
        6.0, // lifetime of the particles
        0.04, // speed of emission
        new BABYLON.Vector2(5.0, 10.0), // range of size of the particles 
        this._scene // the game scene
    );
    trail.SetTexture("flare", this._scene); // set the texture for the particles
    trail.BindEmitter(_player.player_character); // the object in which the particles emit from
    trail.Simulate(); // start the particle simulation on the first hit

    // tick the following code every frame
    this._scene.registerBeforeRender(function () {
        update();

        _player.update(this.dT); // update the player

        // on keydown perform the code in the function
        document.addEventListener("keydown", function(event: KeyboardEvent) {
            if(event.keyCode == 65) { // check for the 'a' key
                _player.current_direction = 1; // go left
            }
            else if(event.keyCode == 68) { // check for the 'd' key
                _player.current_direction = -1; // go right
            }
        });

        // on keyup perform the code in the function
        document.addEventListener("keyup", function(event: KeyboardEvent) {
            if(event.keyCode == 65 || event.keyCode == 68) { // check for the 'a' || 'b' key
                _player.current_direction = 0; // stop moving
            }
        });

        // check for an intersection between the ball and the player/platform
        if(_ball.mesh.intersectsMesh(_player.player_character)) {
            _player.score++; // increase player score
            UI.score_txt.text = "" + _player.score; // reset the score text
            trail.GetParticleSystem().start(); // play the start
            _ball.mesh.physicsImpostor.applyImpulse(new BABYLON.Vector3(Math.floor(BABYLON.Scalar.RandomRange(-5, 5)), 70, 0), 
                        _ball.mesh.getAbsolutePosition()); // apply an impulse and make the ball go in a range direction to keep it exciting 
        }
        else // if no intersection has been detected there shouldnt be any particles playing
            trail.GetParticleSystem().stop();
    });
}

// render the scene and check for window resizing events
loop(): void {
    var self = this;

    // run the render loop
    this._engine.runRenderLoop(() => {
        self._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener("resize", () => {      
        self._engine.resize();
    });
  }
}

// The OnLoad Function
window.addEventListener("DOMContentLoaded", () => {
  // Create the game using the 'renderCanvas'
  let game = new Game("renderCanvas");

  // Create the scene
  game.createScene();

  // start animation
  game.loop();
});
