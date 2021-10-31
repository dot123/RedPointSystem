/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2021-10-24 17:16:04
 * @LastEditors: conjurer
 * @LastEditTime: 2021-10-28 21:06:06
 * @Description:
 */
export class RedpointNode {
    public nodeName: string;
    public parentNode: RedpointNode;
    public pointNum: number = 0;
    public dicChilds = {};

    public numChangeFunc: Function; // 发生变化的回调函数

    public SetRedpointNum(num: number) {
        if (Object.keys(this.dicChilds).length > 0) {
            throw new Error("红点数量只能设置最后一个子节点");
        }
        this.pointNum = num;

        //广播
        this.numChangeFunc && this.numChangeFunc(num);
        if (this.parentNode != null) {
            this.parentNode.ChangePredPointNum();
        }
    }

    public ChangePredPointNum() {
        let num = 0;

        for (let key in this.dicChilds) {
            num += this.dicChilds[key].pointNum;
        }

        if (num != this.pointNum) {
            this.pointNum = num;
            //广播
            this.numChangeFunc && this.numChangeFunc(num);
        }
        if (this.parentNode != null) {
            this.parentNode.ChangePredPointNum();
        }
    }
}
