export class Content {
    private static _scene: BABYLON.Scene;
    public static _content: Array<any> = new Array<any>();
    
    static init(scene: BABYLON.Scene): void {
        this._scene = scene;
    }

    public static newMaterialFromTexture(material_name: string, 
                                tex: BABYLON.Texture): BABYLON.StandardMaterial {
        var mat = new BABYLON.StandardMaterial(material_name, this._scene);
        mat.diffuseTexture = tex;
        mat.opacityTexture = tex;
        tex.hasAlpha = true;
        this._content.push(mat);
        
        return mat;
    }

    static GetContentList(): Array<any> {
        return this._content;
    }
}