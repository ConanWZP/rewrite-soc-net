import React from "react";
import styles from './Paginator.module.css';


const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = props.currentPage;
    let curPFloor = (curP >=5 ) ? (curP - 5) : 0;
    let curPCeiling = curP + 5;
    let slicedPages = pages.slice(curPFloor, curPCeiling);

    return (
        <div>
            {slicedPages.map((page) =>
                <button onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page ? styles.selectedPage : ""}>{page}</button>
            )}
        </div>
    )
}

export default Paginator