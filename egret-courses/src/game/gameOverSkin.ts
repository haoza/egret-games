
module game {
	export class GameOver extends eui.Component implements eui.UIComponent {
		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);

		public constructor() {
			super();
			this.skinName = "gameOverSkin";
		}
		public resertBtn: eui.Button;
		public fail: eui.Image;
		public success: eui.Image;



		protected childrenCreated(): void {
			super.childrenCreated();
			this.resertBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.clickResertBtn, this);
			this.sceneEvent.eventObj = this;
			this.sceneEvent.eventType = SceneEvent.GAME_PLAYING;
		}
		private clickResertBtn(): void {
			ViewManager.getInstance().gamePlaying.initPalying();
			ViewManager.getInstance().dispatchEvent(this.sceneEvent);
		}
		public set is_gameover(val) {
			if (val) {
				this.resertBtn.visible = true;
				this.fail.visible = true;
				this.success.visible = false;
			} else {
				this.resertBtn.visible = false;
				this.fail.visible = false;
				this.success.visible = true;
			}
		}

	}
}