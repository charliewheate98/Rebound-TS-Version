import { Entity } from "../src/Entity";
import { Content } from "../src/Content";
import { StandardMaterial } from "babylonjs";

/*
*
* This class handles the Player Controller. Creation and Movement.
*
*/

// class exported so it can be accessed in other ts files
export class Player extends Entity {
  player_character: BABYLON.Mesh; // the player mesh

  public current_direction: number; // the current direction the player is going in
  public score: number; // the players current score

  // Constructer: initialise and create objects here..
  constructor(pos: BABYLON.Vector2, _scene: BABYLON.Scene) {
    super(pos); // extends/uses the Entitys constructer

    // initialise variables
    this.current_direction = 0; // initialise the current direction 
    this.score = 0; // initialise the players score

    // create a new material
    var unlit_mat = new BABYLON.StandardMaterial("unlitMat", _scene); // initialise a standard material. this will an unlit white material
    unlit_mat.diffuseColor = new BABYLON.Color3(1, 1, 1); // set the diffuse color to white
    unlit_mat.emissiveColor = new BABYLON.Color3(1, 1, 1); // set the emissive color to white

    // create the player mesh
    this.player_character = BABYLON.Mesh.CreatePlane(
      "myPlayerMesh", // the player mesh 
      8, // size of the player mesh
      _scene // the create plane function takes in the scene as the last parameter
    );
    this.player_character.position.x = pos.x; // set the player characters x position in the game
    this.player_character.position.y = pos.y; // set the player characters y position in the game
    this.player_character.scaling.x = 6.0; // set the player characters width
    this.player_character.scaling.y = 0.5; // set the player characters height
    this.player_character.checkCollisions = true; // the player character must have collision 
    this.player_character.material = unlit_mat; // the player character uses the unlit material I just made

    // make the player character a physics object
    this.player_character.physicsImpostor = new BABYLON.PhysicsImpostor(this.player_character, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, _scene);
  }

  // update the player every frame
  public update(dT: any): void {
    if(this.current_direction == 1) {
      this.player_character.position.x -= 8.0; //* dT;
    }
    else if(this.current_direction == -1) {
      this.player_character.position.x += 8.0; //* dT;
    }
  }
}
