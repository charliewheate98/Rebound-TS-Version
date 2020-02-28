export class OrthoCamera 
{
    private _camera: BABYLON.FreeCamera;
    public _position: BABYLON.Vector2;
    
    constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement, pos: BABYLON.Vector2) {
        this._position = pos;

        this._camera = new BABYLON.FreeCamera("orthoCamera", 
                    new BABYLON.Vector3(pos.x, pos.y, -10), scene, true);
        this._camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        
        this._camera.minZ = -0.1;
        this._camera.maxZ = 500;

        this._camera.orthoTop = 700;
        this._camera.orthoBottom = 0;
        this._camera.orthoLeft = 0;
        this._camera.orthoRight = 400;
        
        this._camera.attachControl(canvas, true);
        this._camera.inputs.clear();
    }

    public GetBaseCamera(): BABYLON.FreeCamera {
        return this._camera; 
    }

    public GetPosition(): BABYLON.Vector2 {
        return this._position;
    }
}

