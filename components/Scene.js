import dynamic from "next/dynamic";
import {useCallback, useContext, useEffect, useMemo, useRef} from "react";
import GraphContext from "../store/graph-context";
import {getNodeThreeObject} from "../utils/three-helper";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

export default function Scene() {
  const graphCtx = useContext(GraphContext);
  const gData = graphCtx.data;
  const fgRef = useRef();
  useEffect(() => {
    graphCtx.initData();
  }, [])
  const handleClick = useCallback(node => {
    graphCtx.selectNode(node)
  }, [fgRef])
  const GROUPS = 12;

  return useMemo(() => {
    return (
      <div>
        <ForceGraph3D graphData={gData}
                      nodeThreeObject={getNodeThreeObject()}
                      nodeDesc={'hellos'}
                      ref={fgRef}
                      onNodeClick={handleClick}
                      linkDirectionalArrowLength={6.5}
                      linkDirectionalArrowRelPos={1}
                      nodeAutoColorBy={d => d.id % GROUPS}
                      linkAutoColorBy={d => gData.nodes[d.source].id % GROUPS}
                      linkWidth={1}/>
      </div>
    )
  }, [gData])
}