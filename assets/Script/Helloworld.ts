/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2021-10-24 17:15:03
 * @LastEditors: conjurer
 * @LastEditTime: 2021-10-28 21:54:53
 * @Description:
 */
import { RedPointConst, RedpointType } from "./RedpointSystem/RedpointConst";
import { RedpointSystem } from "./RedpointSystem/RedpointSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    private system: RedpointSystem;

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);

        this.system = new RedpointSystem();
        this.system.InitRedpointTreeNode();

        RedpointSystem.AddListener(RedpointType.Chat, RedPointConst.s_chatNodeWorldSub, this.OnCallbackWorldCub);
        RedpointSystem.AddListener(RedpointType.Chat, RedPointConst.s_chatNodeWorld, this.OnCallbackWorld);
        RedpointSystem.AddListener(RedpointType.Chat, RedPointConst.s_chatNode, this.OnCallbackChat);
    }

    //键盘按下
    private OnKeyDown(event) {
        let keyCode = event.keyCode;
        console.error(keyCode);
        switch (keyCode) {
            case cc.macro.KEY.k:
                RedpointSystem.SetRpNum(RedpointType.Chat, RedPointConst.s_chatNodeWorldSub, 2);
                RedpointSystem.SetRpNum(RedpointType.Chat, RedPointConst.s_chatNodeSingle, 2);
                break;
            case cc.macro.KEY.j:
                RedpointSystem.RemoveLisnener(RedpointType.Chat, RedPointConst.s_chatNode);
                RedpointSystem.SetRpNum(RedpointType.Chat, RedPointConst.s_chatNodeWorldSub, 10);
                break;
        }
    }

    private OnCallbackWorldCub(num: number) {
        console.log("sub:" + num);
    }

    private OnCallbackWorld(num: number) {
        console.log("world:" + num);
    }

    private OnCallbackChat(num: number) {
        console.log("Chat:" + num);
    }
}
