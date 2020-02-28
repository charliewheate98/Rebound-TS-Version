import { Entity } from "./Entity"
import { Content } from "./Content" 

export class Ball extends Entity {
    mesh: BABYLON.Mesh;

    constructor(scene: BABYLON.Scene) {
        super(new BABYLON.Vector2(0, 200));

        let mat = new BABYLON.StandardMaterial("ball_mat", scene);
        mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
        mat.emissiveColor = new BABYLON.Color3(1, 1, 1);

        this.mesh = BABYLON.Mesh.CreateSphere("ball", 35, 35, scene);
        this.mesh.position = new BABYLON.Vector3(100, 500, 0);
        this.mesh.material = mat;
        this.mesh.checkCollisions = true;
 
        this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.SphereImpostor, 
           { mass: 1, restitution: 0.9 }, scene);

        // edge blockers
        var left = BABYLON.MeshBuilder.CreatePlane("left_blocker", {width: 64, height:1060}, scene);
        left.position.x = -230;
        left.position.y = 180;
        var right = BABYLON.MeshBuilder.CreatePlane("right_blocker", {width: 64, height:1060}, scene);
        right.position.x = 430;
        right.position.y = 180;
        var top = BABYLON.MeshBuilder.CreatePlane("top_blocker", {width: 600, height:64}, scene);
        top.position.x = 100;
        top.position.y = 740;
    
        // make the edge blocks physics objects with 0 mass
        left.physicsImpostor = new BABYLON.PhysicsImpostor(left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        right.physicsImpostor = new BABYLON.PhysicsImpostor(right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        top.physicsImpostor = new BABYLON.PhysicsImpostor(top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1.5 }, scene);
   }
    
    public update(dT: any): void {

    }
}