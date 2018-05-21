
module game {
	export class GameOver extends eui.Component implements eui.UIComponent {


		public constructor() {
			super();
			this.skinName = "gameOverSkin";
		}
		public resertBtn: eui.Button;
		public fail: eui.Image;
		public success: eui.Image;


		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			// this.resertBtn.addEventListener(egret.TouchEvent.TOUCH_END)
			// ViewManager.getInstance().gamePlaying.initPalying();
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