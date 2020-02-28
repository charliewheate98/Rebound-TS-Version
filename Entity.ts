// Virtual Functions
interface IEntity {
    update(dT: any): void;
}

/*
*
* This class is a base abstract which in game objects can extend from
* 
*/
export abstract class Entity implements IEntity {
    public position: BABYLON.Vector2; // an entities position

    // the entity constructer simply sets the position
    constructor(_position : BABYLON.Vector2) {
        this.position = _position; // initialise the position 
    }

    // virtual functions (IEntity)
    abstract update(dT: any): void;
}