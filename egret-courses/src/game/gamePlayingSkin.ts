module game {

	export class GamePlaying extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/my_skins/gamePlayingSkin.exml";
		}
		private hero:eui.Image;
		private carLight:eui.Image;
		private distanceBg:eui.Image;
		private timeBg:eui.Image;
		private startBg:eui.Image;
		private startBg1:eui.Image;
		private distanceNum:eui.BitmapLabel;
		private timeNum:eui.BitmapLabel;
		//总距离
		private distance:number;
		//每次的增量
		private daley:number = 10;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);

			//创建一个计时器对象
			var timer:egret.Timer = new egret.Timer(500,0);
			//注册事件侦听器
			timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
			//开始计时
			timer.start();
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}


		protected timerFunc(): void {
			
			this.startBg.y -= this.daley;
			console.log(this.startBg.y)
			// this.startBg1.y -= this.daley;
		}

	}
}