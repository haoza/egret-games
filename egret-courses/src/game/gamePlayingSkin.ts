module game {

	export class GamePlaying extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/my_skins/gamePlayingSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}

	}
}