//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private LoadingUI: LoadingUI;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        // 添加加载进度界面
        this.LoadingUI = new LoadingUI();
        this.stage.addChild(this.LoadingUI)
        // 初始化
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configComplete, this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    /**
     * 配置文件加载并完成事件  配置文件加载完成,开始预加载preload资源组。
     */
    private configComplete(event: RES.ResourceEvent): void {
        // 移除
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.groupProgress, this);
        RES.loadGroup("preload");
    }
    /**
     * 延迟加载组资源加载进度
     */
    private groupProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.LoadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 延迟加载组件加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        console.log('延迟加载组件加载完成')
        if (event.groupName == 'preload') {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.groupProgress,this);
            // 游戏主类初始化
            let gameContainer: fighter.gameContainer = new fighter.gameContainer();
            this.addChild(gameContainer);

        }
    }

}



























class MyGrid extends egret.Shape {
    public constructor() {
        super();
        this.drawGrid();
    }
    private drawGrid() {
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(50, 50, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(50, 0, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0, 50, 50, 50);
        this.graphics.endFill();
    }
}

class sprcon extends egret.DisplayObjectContainer {
    /**
     * 学习显示容器的方法
     */
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedtostage, this)

    }

    private addedtostage() {
        var sprcon: egret.Sprite = new egret.Sprite();
        this.addChild(sprcon);
        this.spr1(sprcon)
        this.spr2(sprcon)
    }

    private spr1(target) {
        var sprite: egret.Sprite = new egret.Sprite();
        sprite.graphics.beginFill(0x00ff00);
        sprite.graphics.drawRect(0, 0, 100, 100);
        sprite.graphics.endFill();
        target.addChild(sprite)
    }

    private spr2(target) {
        var sprite: egret.Sprite = new egret.Sprite();
        sprite.graphics.beginFill(0x0ff120);
        sprite.graphics.drawRect(0, 0, 100, 100);
        sprite.graphics.endFill();
        target.addChild(sprite)
        sprite.x = 30;
        sprite.y = 30;
        sprite.alpha = .3;
    }

}

class arc extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedtostage, this);
    }

    private addedtostage() {


        var shape1: egret.Shape = new egret.Shape();
        shape1.graphics.beginFill(0xff0000);
        shape1.graphics.drawArc(200, 150, 50, 0, Math.PI * 1.5, false);
        shape1.graphics.endFill();
        this.addChild(shape1);

        var r: number = 50;
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(r, r);//绘制点移动(r, r)点
        shape.graphics.lineTo(r * 2, r);//画线到弧的起始点
        shape.graphics.drawArc(r, r, 50, 0, 260 * Math.PI / 180, false);//从起始点顺时针画弧到终点
        shape.graphics.lineTo(r, r);//从终点画线到圆形。到此扇形的封闭区域形成
        shape.graphics.endFill();
        // this.addChild(shape)

        // this.getArcProgress();
        this.getSectorProgress();
    }

    private getArcProgress(): void {
        var shape: egret.Shape = new egret.Shape();
        this.addChild(shape);
        var angle: number = 0;
        egret.startTick(function (timeStamp: number): boolean {
            angle += 1;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0x0000ff, 1);
            shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
            shape.graphics.endFill();
        }
    }

    private getSectorProgress(): egret.Shape {
        var shape: egret.Shape = new egret.Shape();
        this.addChild(shape)
        var angle: number = 0;
        egret.startTick(function (timeStamp: number): boolean {
            angle += 1;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        return shape;
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.moveTo(50, 50);
            shape.graphics.lineTo(100, 50);
            shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(50, 50);
            shape.graphics.endFill();
        }
    }
}