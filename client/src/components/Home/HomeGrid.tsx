import styles from './HomeGrid.module.css';

 type HomeGridItem = {
    title: string
    url: string
    image: Image
    phrase: string
}

type Image = {
    viewBox: string
    path: string
}
const gridItems: HomeGridItem[] = [
    {
        title: "Home", 
        url: "/home",
        image: {
            viewBox: "0 0 16 16",
            path: "M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
        }, 
        phrase: "Home Page"
    },
    {
        title: "Inventory Report",
        url: "/inventory-upload",
         image: {
            viewBox: "0 0 16 16",
            path: "M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1H3a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3.5a1 1 0 0 0-1-1h-1v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2m6.979 3.856a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.895-.133L4.232 10H3.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .416-.223l1.41-2.115 1.195 3.982a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h1.5a.5.5 0 0 0 0-1h-1.128z"
        }, phrase: "Pinogy Excel into usable inventory checklist"},
]

const HomeGrid = () => {
    return (
        <div className={`${styles.gridContainer} grid-auto`}>
            {gridItems.map((item, value) => (
                <a href={item.url}><div key={value} className={`${styles.gridCard} flex-col`}>
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
                
            ))}
        </div>
    )
}

export default HomeGrid