import React from 'react';

const DataTable = (props) => {
    const result = props.data.length 
    ? props.data.map( 
        (item) => 
        (
            <div style={{display: "flex"}} key={"item" + item.id}>
                <span key={item.id} style={{border: "1px solid rgba(0,0,0,0.1)", width: "70px", textAlign: "center"}}>
                    {item.id}
                </span>
                <span key={item.title} style={{border: "1px solid rgba(0,0,0,0.1)", width: "100%", paddingLeft: "20px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                    {item.title}
                </span>
            </div>
        )
    )
    : "No data found"
    return (
        <div>
           {result}
        </div>
    );
}

export default DataTable;