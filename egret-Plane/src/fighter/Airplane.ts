module fighter {
	export class Airplane extends egret.DisplayObjectContainer{

		private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string,fireDelay:number):fighter.Airplane
        {
            if(fighter.Airplane.cacheDict[textureName]==null)
                fighter.Airplane.cacheDict[textureName] = [];
            var dict:fighter.Airplane[] = fighter.Airplane.cacheDict[textureName];
            var theFighter:fighter.Airplane;
            if(dict.length>0) {
                theFighter = dict.pop();
            } else {
                theFighter = new fighter.Airplane(RES.getRes(textureName),fireDelay);
            }
            theFighter.blood = 10;
            return theFighter;
        }
        /**回收*/
        public static reclaim(theFighter:fighter.Airplane,textureName:string):void
        {
            if(fighter.Airplane.cacheDict[textureName]==null)
                fighter.Airplane.cacheDict[textureName] = [];
            var dict:fighter.Airplane[] = fighter.Airplane.cacheDict[textureName];
            if(dict.indexOf(theFighter)==-1)
                dict.push(theFighter);
        }



		/**@private 飞机位图*/
		private bmp: egret.Bitmap;

		/**@private 子弹的间隔时间 */
		private fireDelay:number;

		/**@public 飞机血量 */
		public blood:number = 10;
		
		/**@private 定时器 */
		private timer:egret.Timer;
		
		public constructor(texture:egret.Texture,fireDelay:number) {
			super();
			this.fireDelay = fireDelay;
			this.bmp = new egret.Bitmap(texture);
			this.addChild(this.bmp);
			this.timer = new egret.Timer(fireDelay);
			this.timer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
		
		}
		/**开火 */
		public fire():void{
			this.timer.start();
		}
		/**停火 */
		public stopFire():void{
			this.timer.stop();
		}
		/**创建子弹 */
		public createBullet(event:egret.TimerEvent):void{
			this.dispatchEventWith('createBullet');
		}
		
	}
}