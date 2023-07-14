import DialogEntity from "../dialogEntity.js";
import SceneTemplate from "../sceneTemplate.js";

class sceneHub extends SceneTemplate {

    constructor() {
        super('sceneHub')
    }


    init(data) {
        this.initLauncher(data);
    }

    preload() { }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);

        // Joueur - Environnement

        // PNJ
        this.panneau1 = new DialogEntity (this, 272, 968, 'panneauG').setOrigin(0.5, 0.5);
        this.panneau2 = new DialogEntity (this, 1040, 1032, 'panneauD').setOrigin(0.5, 0.5);
        this.panneau3 = new DialogEntity (this, 528, 1000, 'panneauD').setOrigin(0.5, 0.5)

        this.statue = new DialogEntity (this, 448, 1110, 'statue').setOrigin(0.5, 0.5);

        this.npcs.add(this.panneau1);
        this.npcs.add(this.panneau2);
        this.npcs.add(this.panneau3);
        this.npcs.add(this.statue);

        // REPLIQUES

        this.panneau1.listDialog = ["Vers les Collines Fertiles"];
        this.panneau2.listDialog = ["Vers les Contrées Arrosées"];
        this.panneau3.listDialog = ["Vers la Grande Laitue"];

        this.dialogue1 = ["Un écriteau se situe", "sous la statue :"];
        this.dialogue2 = ["Le Royaume Potager est protégé", "depuis toujours par les Gardiens."];
        this.dialogue3 = ["Leur rapidité légendaire fut transmise", "de génération en génération."];
        this.dialogue4 = ["Selon la tradition, on offre,", "5 graines pour nous porter chance."];
        this.dialogue5 = ["Pressez E pour déposer 5 graines", "devant la statue."];

        this.statue.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4, this.dialogue5]

        this.texteOffrande = ["Les Gardiens passés vous inspirent.", "Vous vous sentez plus rapide."]
        
        this.npcs.children.each(npc => {
            this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
        });
    
    }

    update() {

        this.updateManager();
    }

}

export default sceneHub