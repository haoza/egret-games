// TypeScript file

class Util {

    //包围盒碰撞检测.顺序:左上右下四个值→Xmin,Ymin,Xmax,Ymax参数说明：
    //pos1:第一个矩形坐标
    //pos2:第二个矩形坐标
    //p1：第一个矩形左上右下四个点的值(注意：不是坐标)
    //p2 : 第二个矩形左上右下四个点的值
    boundHit(shp1: egret.DisplayObject, shp2: egret.DisplayObject): boolean {
        const rect1 = new egret.Rectangle(shp1.x, shp1.y, shp1.width, shp1.height);

        const rect2 = new egret.Rectangle(shp2.x, shp2.y, shp2.width, shp2.height);
        
        return rect1.intersects(rect2)

    }

}