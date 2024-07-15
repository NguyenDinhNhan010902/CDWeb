import {MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import {useEffect, useState} from "react";
import $ from "jquery";
import BASE_URL from "../../../database/Config";
import {Link} from "react-router-dom";
import HandleNewsClick from "../../../utils/HandleNewsClick";
function Cart(){
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

    return(
        <MDBRow className='row-cols-1 row-cols-md-3 g-4' >
            {data.filter(item => item.subId === 42).sort((a,b)=> b.id - a.id).slice(0,3).map((item)=>(
            <MDBCol key={item.id}>
                <Link to={`/detail/${item.id}`} className="titelRight" onClick={()=> HandleNewsClick(item.id)} style={{ textDecoration:'none', }}>
                <MDBCard>
                    <MDBCardImage
                        src={item.img}
                        alt='...'
                        position='top'
                        style={{ width:'100%',height:'40vh' }} />
                    <MDBCardBody>
                        <MDBCardTitle className="truncates" style={{ fontSize: '20px' }}>{item.titel}</MDBCardTitle>
                        <MDBCardText className="truncates">
                            {item.content}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                </Link>
            </MDBCol>
            ))}
        </MDBRow>
    )
}
export default Cart;