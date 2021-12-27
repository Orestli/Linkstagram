import React from "react";
import ModalPageI from "../../../typing/ModalPagePayload";

const ModalPage: React.FC<ModalPageI> = ({active, setActive, children}) => {
    return (
        <div className={active ? "modal modal-active" : "modal"}
             role="none" onClick={() => setActive(false)}>
            <div className={active ? "modal-content modal-active" : "modal-content"}
                 role="none" onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default ModalPage