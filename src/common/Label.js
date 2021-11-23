import React from "react";

export default function Label(props) {
    return <div style={{color: '#aaa', fontSize: '13px', lineHeight: '13px', marginBottom: '5px'}}>{props.children}</div>;
}