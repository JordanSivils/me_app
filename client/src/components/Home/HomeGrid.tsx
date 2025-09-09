import styles from './HomeGrid.module.css';

 type HomeGridItem = {
    title: string
    image: string
    phrase: string
}

const gridItems: HomeGridItem[] = [
    {title: "Inventory Report", image: "src/assets/clipboard.svg", phrase: "Pinogy Excel into usable inventory checklist"},
    {title: "Inventory Report", image: "src/assets/clipboard.svg", phrase: "Pinogy Excel into usable inventory checklist"},
]

const HomeGrid = () => {
    return (
        <div className={`${styles.gridContainer} grid-auto`}>
            {gridItems.map((item, value) => (
                <a href=""><div key={value} className={`${styles.gridCard} flex-col`}>
                    <p>{item.title}</p>
                    <img src={item.image} alt={`${item.title} image`} />
                    <p>{item.phrase}</p>
                </div></a>
                
            ))}
        </div>
    )
}

export default HomeGrid