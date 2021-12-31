import React from 'react';
import {Dropdown} from 'antd';

function ContextMenu({menu, visible, handleChange, xx, yy}) {
    return (
        <Dropdown overlay={menu} trigger={['click']} visible={visible} onVisibleChange={handleChange}>
            <span style={{position: 'absolute', left:xx, top: yy}}></span>
        </Dropdown>
    )
}
export default ContextMenu;

