import { Entity } from "./Entity";

/*
*
* This class handles the creation of a basic particle system
*
*/

export class ParticleSystem extends Entity 
{
    private _life_time: number; // the life of the particle system
    private _min_max_size: BABYLON.Vector2; // the size range of the particles
    private _emit_speed: number; // speed of emission

    private _particle_system: BABYLON.ParticleSystem; // the particle system itself

    // Constructer: creation of the particle system
    constructor(instances: number, // num particles
                life: number,  // life
                emission_speed: number, // rate of emission 
                min_max_size: BABYLON.Vector2, // size range
                scene: BABYLON.Scene)  // game scene
    {
        super(new BABYLON.Vector2(0, 0)); // this class extends entity

        this._life_time = life; // initialise the lifetime
        this._emit_speed = emission_speed; // initialise the emission rate variable
        this._min_max_size = min_max_size; // initialise the size range variable
    
        // initialise the particle system
        this._particle_system = new BABYLON.ParticleSystem(
            "particles", // name of the particle system
            instances, // number of particles
            scene // the game scene
        );
        // points of emission
        this._particle_system.minEmitBox = new BABYLON.Vector3(-1, 0, 0); 
        this._particle_system.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

        // size range of particles
        this._particle_system.minSize = this._min_max_size.x;
        this._particle_system.maxSize = this._min_max_size.y;

        // range of lifetime of all the particles
        this._particle_system.minLifeTime = 5.0;
        this._particle_system.maxLifeTime = this._life_time;

        // range of emission
        this._particle_system.emitRate = 1500;

        // range of direction of the particles
        this._particle_system.direction1 = new BABYLON.Vector3(-7, 8, 3);
        this._particle_system.direction2 = new BABYLON.Vector3(7, 8, -3);
    
        // Angular speed
        this._particle_system.minAngularSpeed = 0;
        this._particle_system.maxAngularSpeed = Math.PI;

        // power of emission & the speed of the particles
        this._particle_system.minEmitPower = 1;
        this._particle_system.maxEmitPower = 2;
        this._particle_system.updateSpeed = emission_speed;
    }    
    
    update(dT: any): void {} // update function: not really being used 

    // get the base particle system
    public GetParticleSystem(): BABYLON.ParticleSystem {
        return this._particle_system;
    }

    // set a texture for the particle system
    public SetTexture(url: string, scene: BABYLON.Scene): void {
        this._particle_system.particleTexture = new BABYLON.Texture(
           "assets/" + url + ".png", 
           scene
        );
    }

    // make the particles emit from an object
    public BindEmitter(instance: any) {
        this._particle_system.emitter = instance;
    }

    // start simulating the particle system
    public Simulate(): void {
        this._particle_system.start();
    }

    public GetLifeTime(): number { return this._life_time; } // get the particle lifetime
    public GetMinMaxSize(): BABYLON.Vector2 { return this._min_max_size; } // get the particle size range
    public GetEmissionSpeed(): number { return this._emit_speed; } // get the emission speed
}