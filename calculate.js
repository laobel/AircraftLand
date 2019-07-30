
/**
 * 求过两线段的直线的交点。
 *
 * 算法：根据向量AP//BP和DC//CP,联合求出交点坐标。若向量（a,b)//(c,d)，则：a*d-b*c=0;
 *
 * @param A,线段1起点
 * @param B，线段1终点
 * @param C，线段2起点
 * @param D，线段2终点
 * @return {{x: number, y: number}}
 *
 * @constructor
 */
function Intersect(A,B,C,D){
   var k1=(B.x-A.x)/(B.y-A.y);
   var k2=(C.x-D.x)/(C.y-D.y);

   var d1=(A.x*(B.y-A.y)-A.y*(B.x-A.x))/(B.y-A.y);
   var d2=(D.x*(C.y-D.y)-D.y*(C.x-D.x))/(C.y-D.y);

   var y=-(d1-d2)/(k1-k2);
   var x=k1*y+d1;

    return {
        x:x,
        y:y
    };
}

/**
 *求一个角的内切圆圆心坐标和半径。
 *
 * 算法：根据向量AP⊥AO和BP⊥BO,联合求出交点坐标。若向量（a,b)⊥(c,d)，则：a*c+b*d=0;
 *
 * @param A,切点1
 * @param B，切点2
 * @param P，角顶点
 * @return {{x: *, y: number}}
 *
 * @constructor
 */
function CircleFromTangent(A,B,P) {
    var k1=-(P.y-A.y)/(P.x-A.x);
    var k2=-(P.y-B.y)/(P.x-B.x);

    var y=(k1*A.y-k2*B.y-A.x+B.x)/(k1-k2);
    var x=k1*y-k1*A.y+A.x;
    var r=Math.sqrt((A.x-x)*(A.x-x)+(A.y-y)*(A.y-y));

    return {
        x:x,
        y:y,
        r:r
    };
}

/**
 * 求三点的外接圆
 *
 * 算法：根据外接圆圆心为中垂线交点来求，使用向量法，若向量（a,b)⊥(c,d)，则：a*c+b*d=0;
 *
 * @param A
 * @param B
 * @param C
 * @return {{r: number, x: number, y: number}}
 * @constructor
 */
function CircleFromPoints(A,B,C) {
    var M=Center(A,B);
    var N=Center(B,C);

    var k1=-(B.y-A.y)/(B.x-A.x);
    var k2=-(C.y-B.y)/(C.x-B.x);

    var y=(k1*M.y-k2*N.y-M.x+N.x)/(k1-k2);
    var x=k1*y-k1*M.y+M.x;

    var r=Math.sqrt((A.x-x)*(A.x-x)+(A.y-y)*(A.y-y));

    return {
        x:x,
        y:y,
        r:r
    };

   /* var x1=A.x,y1=A.y;
    var x2=B.x,y2=B.y;
    var x3=C.x,y3=C.y;

    var a=x1*(y2-y3)-y1*(x2-x3)+x2*y3-x3*y2;
    var b=(x1*x1+y1*y1)*(y3-y2)+(x2*x2+y2*y2)*(y1-y3)+(x3*x3+y3*y3)*(y2-y1);
    var c=(x1*x1+y1*y1)*(x2-x3)+(x2*x2+y2*y2)*(x3-x1)+(x3*x3+y3*y3)*(x1-x2);
    var d=(x1*x1+y1*y1)*(x3*y2-x2*y3)+(x2*x2+y2*y2)*(x1*y3-x3*y1)+(x3*x3+y3*y3)*(x2*y1-x1*y2);

    var x=-b/(2*a);
    var y=-c/(2*a);
    var r=Math.sqrt((b*b+c*c-4*a*d)/4*a*a);


    return {
        x:x,
        y:y,
        r:r
    }*/


}

/**
 * 求两点的中点坐标
 *
 * @param A
 * @param B
 * @return {{x: *, y: number}}
 */
function Center(A,B) {
    var x=(A.x+B.x)/2;
    var y=(A.y+B.y)/2;

    return {
        x:x,
        y:y
    };
}

/**
 * 计算两点间距离
 *
 * @param A
 * @param B
 * @return {number}
 * @constructor
 */
function Dis(A,B) {
    return Math.sqrt((B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y));
}


/**
 * 计算线段内里起点一定距离的点
 *
 * @param p1
 * @param p2
 * @param s
 * @return {{x: *, y: *}}
 * @constructor
 */
function GetLatLonInSegment(p1,p2,s) {
    var dis = Dis(p1,p2);
    var tx = (p2.x-p1.x)/dis;
    var ty = (p2.y-p1.y)/dis;

    return {
        x:p1.x+tx*s,
        y:p1.y+ty*s
    };
}


/**
 * 根据一点、距离和角度，获取另一点经纬度，算法参考：https://www.cnblogs.com/softfair/p/lat_lon_distance_bearing_new_lat_lon.html
 * @param point 经纬度{x,y}
 * @param distance 距离，单位米
 * @param angle 角度(正北为0度，顺时针方向递增)，单位度
 * @param result 输出结果
 * @returns {*}
 */
function GetlatLon(point,distance,angle,result){
    var  Ea = 6378137;     //   赤道半径
    var  Eb = 6356725;     //   极半径

    var dx = distance * Math.sin(angle * Math.PI / 180.0);
    var dy = distance * Math.cos(angle * Math.PI / 180.0);

    var ec = Eb + (Ea-Eb) * (90.0 - point.y) / 90.0;
    var ed = ec * Math.cos(point.y * Math.PI / 180);

    if(result===undefined){
        result={};
    }

    result.x=(dx / ed + point.x * Math.PI / 180.0) * 180.0 / Math.PI;
    result.y=(dy / ec + point.y * Math.PI / 180.0) * 180.0 / Math.PI;

    return result;
}

/**
 * 求圆边上特定方位角的坐标
 *
 * @param circle
 * @param angle
 * @return {{x: *, y: *}}
 * @constructor
 */
function GetCircularlatLon(circle,angle) {
    return {
        x:circle.x+circle.r*Math.cos(Rad(angle)),
        y:circle.y+circle.r*Math.sin(Rad(angle))
    }
}

/**
 * 计算圆坐标
 *
 * @param center
 * @param radius
 * @param d
 * @param startAngle
 * @param endAngle
 * @param result
 * @return {Array}
 */
function GetCirclePositions(center,radius,n,startAngle,endAngle,result) {
    result=result===undefined?[]:result;

    n=n!==undefined?n:100;

    var l=startAngle===undefined?0:startAngle;
    var L=endAngle===undefined?360:endAngle;

    var d=(L-l)/n;

    var p;
    while (l< L) {
        p=GetlatLon(center,radius,l);
        result.push(p.x,p.y);
        l+=d;
    }

    if(L===360){
        result.push(result[0],result[1]);
    }

    return result;
}

/**
 * 计算方位角
 * @param double
 * @constructor
 */
function GetAzimuth(lonlat1,lonlat2) {
    var lat1 = Rad(lonlat1.y);
    var lat2 = Rad(lonlat2.y);
    var lon1 = Rad(lonlat1.x);
    var lon2 = Rad(lonlat2.x);



    var dRotateAngle = Math.atan2(Math.abs(lon1 - lon2), Math.abs(lat1 - lat2));
    if (lon2 >= lon1) {
        if (lat2 >= lat1) {
        } else {
            dRotateAngle = Math.PI - dRotateAngle;
        }
    } else {
        if (lat2 >= lat1) {
            dRotateAngle = 2 * Math.PI - dRotateAngle;
        } else {
            dRotateAngle = Math.PI + dRotateAngle;
        }
    }
    dRotateAngle = dRotateAngle * 180 / Math.PI;

    return dRotateAngle;
}

/**
 * 度转弧度
 * @param angle
 * @constructor
 */
function Rad(angle) {
    return angle * Math.PI / 180.0;
}


