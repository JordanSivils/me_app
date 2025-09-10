import styles from './HomeGrid.module.css';
import { gridItems } from './types';

 

const HomeGrid = () => {
    return (
        <div className={`${styles.gridContainer} grid-auto`}>
            {gridItems.map((item) => (
                <div key={item.id} >
                    <a href={item.url}><div className={`${styles.gridCard} flex-col`}>
                    <p>{item.title}</p>
                    <svg 
                    width="26" 
                    height="26" 
                    fill="#00bb00"
                    viewBox={item.image.viewBox}>
                    <path d={item.image.path} />
                    </svg>
                    <p>{item.phrase}</p>
                </div></a>
                </div>
                
                
            ))}
        </div>
    )
}

export default HomeGrid