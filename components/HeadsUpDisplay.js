import styles from '../styles/HeadsUpDisplay.module.css'
import {useContext, useState} from "react";
import GraphContext from "../store/graph-context";
import axios from "axios";
import SearchResultShow from "./SearchResultShow";
import AsyncSelect from "react-select/async";

function wikiResultMapper(result) {
  return result.map(r => ({
    id: r.title,
    excerpt: r.excerpt,
    img: r?.thumbnail?.url,
  }))
}

function GoogleSuggestInput({value, onValueChange}) {

  async function valueChangeHandler(inputValue) {
    if (!inputValue)
      return;
    const params = {
      client: "firefox",
      hl: "en",
      q: inputValue,
      limit: 5
    }
    let response = await axios.get("/google/complete/search/", {params});
    return response.data[1].map(d => ({label: d, value: d}))
  }

  return (
    <AsyncSelect
      defaultInputValue={value}
      getNewOptionData={true}
      isValidNewOption={true}
      onChange={onValueChange}
      loadOptions={inputValue => valueChangeHandler(inputValue)}
    />)
}

export default function HeadsUpDisplay() {
  const graphCtx = useContext(GraphContext);
  const [results, setResults] = useState([]);

  async function wikiSearchHandler() {
    const url = "/wikipedia/v1/search/page"
    const params = {
      q: graphCtx.selectedNode.id,
    }
    let response = await axios.get(url, {params});
    setResults(wikiResultMapper(response.data.pages));
  }

  function idChangeHandler(option) {
    graphCtx.editNode(graphCtx.selectedNode,
      {...graphCtx.selectedNode, id: option.value});
  }

  function closeHandler() {
    graphCtx.selectNode(null);
    setResults([]);
  }
  function onSelectResultHandler({id, img}){
    graphCtx.editNode(graphCtx.selectedNode,
      {...graphCtx.selectedNode, id, img});
    graphCtx.selectNode(null);
  }

  if (graphCtx.selectedNode)
    return (
      <div className={styles.container}>
        <div className={styles.searchInput}>
          <GoogleSuggestInput
            value={graphCtx.selectedNode.id}
            onValueChange={idChangeHandler}/>
        </div>
        <button onClick={wikiSearchHandler}>Wiki</button>
        <button>Google</button>
        <button>Add Sibling</button>
        <button>Connect</button>
        <button className={styles.closeButton}
                onClick={closeHandler}>
          X
        </button>
        <SearchResultShow results={results} onSelect={onSelectResultHandler}/>
      </div>
    )
  else return (<></>);
}