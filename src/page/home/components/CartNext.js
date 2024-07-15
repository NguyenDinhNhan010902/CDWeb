
import {useEffect, useState} from "react";
import $ from "jquery";
import BASE_URL from "../../../database/Config";
import HandleNewsClick from "../../../utils/HandleNewsClick";
import {Link} from "react-router-dom";
function CartNext(){
    const [data, setData] = useState([]);
    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detail`,
            type: "GET",
            success: function (response) {
                setData(response);
            },
            error: function (error) {
                console.error("Error fetching detail: ", error);
            },
        });
    }, []);
    const dataSport = data.sort((a,b)=> b.id - a.id).filter(item => item.cateId === 5).slice(0,4);
    return(
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {dataSport.map((item)=> (
                <div className="col">
                    <Link to={`/detail/${item.id}`} style={{textDecoration: 'none'}} onClick={()=> HandleNewsClick(item.id)}>
                    <div className="card" style={{height:'100%'}} >
                        <img src={item.img} className="card-img-top " alt="Hollywood Sign on The Hill" style={{ height:'30vh'}}/>
                        <div className="card-body">
                            <h5 className="card-title">{item.titel}</h5>
                            <p className="card-text truncates"  >{item.content}</p>
                        </div>
                      </div>
                    </Link>
                </div>
            ))}

        </div>
    )
}
export default CartNext;