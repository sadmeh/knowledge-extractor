import styles from '../styles/HeadsUpDisplay.module.css'

export default function SearchResultShow({results, onSelect}) {
  return (<div className={styles.searchResult}>
    {results.map((r, index)=>(
      <div className={styles.item} key={index} onClick={()=>onSelect(r)}>
        <img src={r.img}/>
        <div>
          <h3>{r.id}</h3>
          <div dangerouslySetInnerHTML={{ __html: r.excerpt }} ></div>
        </div>
      </div>
    ))}
  </div>);
}