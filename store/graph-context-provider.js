import {useState} from "react";
import GraphContext from "./graph-context";

export function GraphContextProvider(props) {
  const [data, setData] = useState();
  const [selectedNode, setSelectedNode] = useState(null)
  function initDataHandler() {
    setData({
      nodes: [{id: "Click To Start", img: "https://picsum.photos/id/237/200/300"}],
      links: []
    });
  }

  function addNodeHandler(fromNode, toNode) {

  }

  function deleteNodeHandler(node) {

  }

  function addLinkHandler(fromNode, toNode) {

  }

  function editNodeHandler(oldNode, newNode){
    let updatedNodes = data.nodes.map(n=>n.id!=oldNode.id?n:newNode);
    setData({...data, nodes: updatedNodes})
    setSelectedNode(newNode);
  }

  function selectNodeHandler(node){
    setSelectedNode(node);
  }

  const context = {
    data: data,
    selectedNode: selectedNode,
    initData: initDataHandler,
    addNode: addNodeHandler,
    deleteNode: deleteNodeHandler,
    addLink: addLinkHandler,
    selectNode: selectNodeHandler,
    editNode: editNodeHandler,
  }

  return (
    <GraphContext.Provider value={context}>
      {props.children}
    </GraphContext.Provider>
  )
}