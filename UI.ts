import { Player } from "../src/Player";
import * as BABYLON_UI from 'babylonjs-gui'

/*
*
* This class handles creating the User Interface
*
*/

export class UI {
    // The score which is displayed in the center of the screen
    static score_txt: BABYLON.GUI.TextBlock;

    // Create the UI
    public static create(player: Player): void 
    {
        // create the full-screen canvas
        let ui_interface = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.score_txt = new BABYLON.GUI.TextBlock(); // initialise the text
        this.score_txt.text = "" + player.score; // set the text to be the players score
        this.score_txt.color = "white"; // colour the text white
        this.score_txt.fontSize = 100; // set the font size
        this.score_txt.alpha = 0.3; // make the text slightly transparent             
        ui_interface.addControl(this.score_txt); // add this text to the user interface
    }
}
