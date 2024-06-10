import './poper.css'
function Wapper ({children}){
    return <div className="tippy">
        {children}
    </div>
}
export default Wapper;