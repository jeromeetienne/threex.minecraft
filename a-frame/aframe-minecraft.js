// The mesh mixin provides common material properties for creating mesh-based primitives.
// This makes the material component a default component and maps all the base material properties.
AFRAME.registerPrimitive('a-minecraft', AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
  // Preset default components. These components and component properties will be attached to the entity out-of-the-box.
  defaultComponents: {
    minecraft: {},
    'minecraft-head-anim': 'yes',
    // 'minecraft-body-anim': {},
  },
}));

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

AFRAME.registerComponent('minecraft', {
	schema: {
		skinUrl: {
			type: 'string',
			default : ''
		},
		wellKnownSkin: {
			type: 'string',
			default : ''
		},
		heightMeter : {
			default : 1.6
		}
	},
	init: function () {
		var character	= new THREEx.MinecraftChar()
		this.character = character

		this.el.object3D.add( character.root )
		// this.el.setObject3D('superRoot', character.root);
	},
	update: function () {
		var character = this.character
		character.root.scale.set(1,1,1).multiplyScalar(this.data.heightMeter)
		
		if( this.data.skinUrl ){
			character.loadSkin(this.data.skinUrl)
		}else if( this.data.wellKnownSkin ){
			character.loadWellKnownSkin(this.data.wellKnownSkin)
		}
	},
});


//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////
AFRAME.registerComponent('minecraft-head-anim', {
	schema: {
		type: 'string',
		default : 'yes',
	},
	init: function () {
		var character = this.el.components.minecraft.character
		this.headAnims	= new THREEx.MinecraftCharHeadAnimations(character);
	},
	tick : function(now, delta){
		this.headAnims.update(delta/1000,now/1000)
	},
	update: function () {
		console.assert( this.headAnims.names().indexOf(this.data) !== -1 )
		this.headAnims.start(this.data);			
	},
});

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

AFRAME.registerComponent('minecraft-body-anim', {
	schema: {
		type: 'string',
		default : 'wave',
	},
	init: function () {
		var character = this.el.components.minecraft.character
		this.bodyAnims	= new THREEx.MinecraftCharBodyAnimations(character);
	},
	tick : function(now, delta){
		this.bodyAnims.update(delta/1000,now/1000)
	},
	update: function () {
		console.assert( this.bodyAnims.names().indexOf(this.data) !== -1 )
		this.bodyAnims.start(this.data);
	},
});
