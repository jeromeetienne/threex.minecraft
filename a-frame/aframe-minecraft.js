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
		console.log('update')
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
		console.assert( this.headAnims.names().indexOf(this.data) !== -1 )
		this.headAnims.start(this.data);
	},
	tick : function(now, delta){
		this.headAnims.update(delta/1000,now/1000)
	},
	update: function () {
		// TODO how to check if the name is value
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
		console.assert( this.bodyAnims.names().indexOf(this.data) !== -1 )
		this.bodyAnims.start(this.data);
	},
	tick : function(now, delta){
		this.bodyAnims.update(delta/1000,now/1000)
	},
	update: function () {
		console.assert( this.bodyAnims.names().indexOf(this.data) !== -1 )
		this.bodyAnims.start(this.data);
	},
});
