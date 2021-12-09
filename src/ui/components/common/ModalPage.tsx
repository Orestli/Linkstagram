import React from "react";
import ModalPageI from "../../../core/utils/models/ModalPageType";

const ModalPage: React.FC<ModalPageI> = ({active, setActive, _padding, children}) => {
    return (
        <div className={active ? "modal modal-active" : "modal"}
             role="none" onClick={() => setActive(false)}>
            <div className={active ? "modal-content modal-active" : "modal-content"}
                 role="none" onClick={e => e.stopPropagation()}
                 style={{padding: _padding}}
            >
                {children}
            </div>
        </div>
    )
}

export default ModalPage