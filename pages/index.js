import styles from '../styles/Home.module.css'
import Scene from "../components/Scene";
import {GraphContextProvider} from "../store/graph-context-provider";
import HeadsUpDisplay from "../components/HeadsUpDisplay";

export default function Home() {

  return (
    <div className={styles.container}>
      <GraphContextProvider>
        <HeadsUpDisplay />
        <Scene className={styles.scene}/>
      </GraphContextProvider>
    </div>
  )
}
