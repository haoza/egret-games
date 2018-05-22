

module game {
	export class GamePlaying extends eui.Component implements eui.UIComponent {

		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);

		public constructor() {
			super();
			this.skinName = "resource/my_skins/gamePlayingSkin.exml";
		}
		//背景
		public startBg: eui.Image;
		// 背景图group
		public bgGroup: eui.Group;
		// 背景图1
		public startBg1: eui.Image;
		// 起跑线
		public roadblock: eui.Image;
		// 猪脚套餐
		public heroGroup: eui.Group;
		// 猪脚
		public hero: eui.Image;
		// 车灯
		public carLight: eui.Image;
		// 距离背景
		public distanceBg: eui.Image;
		// 时间背景
		public timeBg: eui.Image;
		public distanceNum: eui.BitmapLabel;
		public timeNum: eui.BitmapLabel;
		// 刷新间隔时间
		public time: number = 16.7;
		//总时间
		private gameTimeNum: number = 0;
		//总距离
		private distance: number = 0;
		//每次的增量
		private daley: number = 10;
		// 触摸开始的坐标
		private startPosX: number;
		private util:Util = new Util();
		private timer: egret.Timer;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapStart, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.tapMove, this);

			this.sceneEvent.eventType = SceneEvent.GAME_END;
			this.sceneEvent.eventObj = this;

			//创建一个计时器对象
			this.timer = new egret.Timer(this.time, 0);
			//注册事件侦听器
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

			//开始计时
			this.timer.start();

		}
		private tapStart(event: egret.TouchEvent) {
			this.startPosX = event.stageX;
		}

		private tapMove(event: egret.TouchEvent) {
			const distance = event.stageX - this.startPosX;
			if (distance > 120) {
				console.log('右滑')
				if (this.heroGroup.x !== 406) {
					var tw = egret.Tween.get(this.heroGroup);
					tw.to({ x: 406 }, 300 - this.daley * 14);

				}
			}
			if (distance < -120) {
				console.log('左滑')
				if (this.heroGroup.x !== 150) {
					var tw = egret.Tween.get(this.heroGroup);
					tw.to({ x: 150 }, 300 - this.daley * 14 * 1.4);
				}

			}
		}

		private carArr: Array<any> = new Array();
		private createdCar(i: number = 0): void {
			const carimg = new egret.Bitmap();
			if (Math.random() > 0.5) {
				carimg.x = 150;
			}
			else {
				carimg.x = 430;
			}
			carimg.texture = RES.getRes(`car${i}_png`);

			carimg.y = 0;
			this.addChild(carimg);
			this.carArr.push(carimg);
			console.log("生成汽车")
		}

		// 初始化游戏
		public initPalying() {
			this.daley = 5;
			this.bgGroup.y = 0;
			this.heroGroup.y = 707.66;
			this.heroGroup.x = 406;
			this.roadblock.y = 523;

			this.timeNum.text = '0"';
			this.distanceNum.text = '0';


			for (var i = this.carArr.length - 1; i >= 0; i--) {
				let item = this.carArr[i];
				// 删除数组中的元素
				this.carArr.splice(i, 1);
				// 从显示列表移除
				this.removeChild(item);
			}


			// 重新计时
			this.timer.reset();
			this.timer.start();
		}


		// 计时器
		protected timerFunc(): void {
			this.bgGroup.y += this.daley;
			this.gameTimeNum += this.time;
			this.distance += this.daley;

			this.timeNum.text = Math.floor(this.gameTimeNum / 1000) + '"';
			this.distanceNum.text = String(Math.floor(this.distance / 100));
			for (var i = this.carArr.length - 1; i >= 0; i--) {
				if (this.carArr[i].status == 1) {
					this.carArr.splice(i, 1);
				}
			}

			for (var i = this.carArr.length - 1; i >= 0; i--) {
				let item = this.carArr[i];
				item.y += this.daley;

				// 超出边界
				if (item.y > 1136) {
					// 删除数组中的元素
					this.carArr.splice(i, 1);
					// 从显示列表移除
					this.removeChild(item);
					continue;
				}

				console.log(this.carArr.length)
	
				if (this.util.boundHit(this.heroGroup, item)) {
					console.log(this.heroGroup, item)
					// 已经碰撞
					this.timer.stop();
					ViewManager.getInstance().gameOver.is_gameover = true;
					ViewManager.getInstance().dispatchEvent(this.sceneEvent);
					// 结束循环

					return;
				}
			}


			// 起跑线运动
			if (this.roadblock.y < 1065) {
				this.roadblock.y += this.daley;
			}

			// 随机创建
			const isCreateCar = Math.floor(Math.random() * 100 * 60)
			if (isCreateCar < this.daley) {
				this.createdCar(Math.floor(Math.random() * 3))
			}


			// 背景滚动

			if (this.bgGroup.y > 0) {
				this.bgGroup.y = - 1136 + (this.bgGroup.y - 0);

			}

			if (this.roadblock.y > 1065) {
				this.roadblock.y = 1065;
			}
			if (this.daley < 20) {
				this.daley += 0.05;
			}
		}

	}
}