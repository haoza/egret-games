module fighter {
	export class Bullet extends egret.Bitmap{

		private static cacheDict:Object = {};

		private textureName:string;//可视为子弹类型名

		/**生产 */		
		public static produce(textureName:string):fighter.Bullet
		{
			if(fighter.Bullet.cacheDict[textureName] == null){
				fighter.Bullet.cacheDict[textureName] = [];
			}

			let dict:fighter.Bullet[] = fighter.Bullet.cacheDict[textureName];
			let bullet:fighter.Bullet;
			if(dict.length > 0){
				bullet = dict.pop();
			}
			else{
				bullet = new fighter.Bullet(RES.getRes(textureName),textureName);
			}

			return bullet;
			
		}

		/**回收 */
		 
		public static reclaim(bullet:fighter.Bullet):void
		{
			let textureName: string = bullet.textureName;
			if(fighter.Bullet.cacheDict[textureName] == null){
				fighter.Bullet.cacheDict[textureName] = []
			}
			let dict: fighter.Bullet[] = fighter.Bullet.cacheDict[textureName];

			if(dict.indexOf(bullet) === -1){
				dict.push(bullet);
			}		
		}
		 
		public constructor(texture:egret.Texture,textureName: string) {
            super(texture);
            this.textureName = textureName;
		}
	}
}