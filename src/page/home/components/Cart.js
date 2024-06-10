import {MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import {useEffect, useState} from "react";
import $ from "jquery";
import BASE_URL from "../../../database/Config";
import {Link} from "react-router-dom";
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
    // const leftData = data.filter(item => item.cateId === 1).slice(0,2);
    // const rightData = data.filter(item => item.cateId === 3).slice(0, 4);
    // const centerData = data.filter(item => item.cateId === 2).slice(0,1);
    return(
        <MDBRow className='row-cols-1 row-cols-md-2 g-4' >
            {data.filter(item => item.cateId === 2).slice(0,2).map((item)=>(
            <MDBCol key={item.id}>
                <Link to={`/detail/${item.id}`} className="titelRight">
                <MDBCard>
                    <MDBCardImage
                        src={item.img}
                        alt='...'
                        position='top'
                    />
                    <MDBCardBody>
                        <MDBCardTitle style={{ fontSize: '40px' }}>{item.titel}</MDBCardTitle>
                        <MDBCardText className="truncate">
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