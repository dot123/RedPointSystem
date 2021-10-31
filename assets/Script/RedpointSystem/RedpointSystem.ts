import { RedPointConst, RedpointType } from "./RedpointConst";
import { RedpointNode } from "./RedpointNode";

export class RedpointSystem {
    static s_instance: RedpointSystem;

    //红点树各个类型的子节点名称
    private _redpointTreeDict = {};

    // 红点树Root节点
    private _rootNodeDic = {};

    private _chatTreeList = [];

    constructor() {
        RedpointSystem.s_instance = this;
        this._redpointTreeDict = {};
        this._rootNodeDic = {};

        this.CreateTreeList();
    }

    private CreateTreeList() {
        this._chatTreeList = [RedPointConst.s_chatNode, RedPointConst.s_chatNodeWorld, RedPointConst.s_chatNodeSingle, RedPointConst.s_chatNodeWorldSub];
        this._redpointTreeDict[RedpointType.Chat] = this._chatTreeList;
    }

    public InitRedpointTreeNode() {
        let chatRootNode = new RedpointNode();
        chatRootNode.nodeName = this._chatTreeList[0];
        this._rootNodeDic[RedpointType.Chat] = chatRootNode;
        this.CreateNodes(chatRootNode, this._chatTreeList);
    }

    public static SetRpNum(type: RedpointType, nodeName: string, rpNum: number) {
        let nodeList = nodeName.split(".");

        let node: RedpointNode = RedpointSystem.s_instance._rootNodeDic[type];
        if (node) {
            if (nodeList[0] != node.nodeName) {
                throw new Error(`RedpointType和NodeName不对应,RedpointType:${type},NodeName:${node.nodeName}`);
            }

            for (let i = 1; i < nodeList.length; i++) {
                let subNodeName = nodeList[i];
                if (!node.dicChilds[subNodeName]) {
                    console.log("Does Not Contains Child Node :" + nodeList[i]);
                    return;
                }
                node = node.dicChilds[subNodeName];
                if (i == nodeList.length - 1) {
                    node.SetRedpointNum(rpNum);
                }
            }
        }
    }

    public static AddListener(type: RedpointType, nodeName: string, callback) {
        let nodeList = nodeName.split(".");
        let node: RedpointNode = RedpointSystem.s_instance._rootNodeDic[type];
        if (node) {
            if (nodeList.length == 1 && node.nodeName == nodeList[0]) {
                node.numChangeFunc = callback;
                return;
            } else if (nodeList[0] != node.nodeName) {
                throw new Error(`RedpointType和NodeName不对应,RedpointType:${type},NodeName:${nodeName}`);
            }

            for (let i = 1; i < nodeList.length; i++) {
                let subNodeName = nodeList[i];
                if (!node.dicChilds[subNodeName]) {
                    console.log("Does Not Contains Child Node :" + nodeList[i]);
                    return;
                }
                node = node.dicChilds[subNodeName];
                if (i == nodeList.length - 1) {
                    node.numChangeFunc = callback;
                }
            }
        }
    }

    public static RemoveLisnener(type: RedpointType, nodeName: string) {
        let nodeList = nodeName.split(".");
        let node: RedpointNode = RedpointSystem.s_instance._rootNodeDic[type];
        if (node) {
            if (nodeList.length == 1 && node.nodeName == nodeList[0]) {
                if (node.numChangeFunc != null) node.numChangeFunc = null;
                return;
            } else if (nodeList[0] != node.nodeName) {
                throw new Error(`RedpointType和NodeName不对应,RedpointType:${type},NodeName:${nodeName}`);
            }

            for (let i = 1; i < nodeList.length; i++) {
                let subNodeName = nodeList[i];
                if (!node.dicChilds[subNodeName]) {
                    console.log("Does Not Contains Child Node :" + nodeList[i]);
                    return;
                }
                node = node.dicChilds[subNodeName];
                if (i == nodeList.length - 1) {
                    if (node.numChangeFunc != null) node.numChangeFunc = null;
                }
            }
        }
    }

    private CreateNodes(treeRootNode: RedpointNode, list: string[]) {
        for (let tree of list) {
            let node = treeRootNode;
            let treeNodeAy = tree.split(".");
            if (treeNodeAy[0] != node.nodeName) {
                console.log("RedPointTree Root Node Error:" + treeNodeAy[0]);
                continue;
            }
            if (treeNodeAy.length > 1) {
                for (let i = 1; i < treeNodeAy.length; i++) {
                    let treeName = treeNodeAy[i];
                    if (!node.dicChilds[treeName]) {
                        node.dicChilds[treeName] = new RedpointNode();
                    }
                    let tmpNode = node.dicChilds[treeName];
                    tmpNode.nodeName = treeName;
                    tmpNode.parentNode = node;
                    node = tmpNode;
                }
            }
        }
    }
}
