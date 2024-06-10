import './seachBox.css'
import logo from "../../../../image/logo3.png";
import React, {useEffect, useState} from "react";
import Image from "../../../img/InImage";
import {Link} from "react-router-dom";
import $ from "jquery";
import BASE_URL from "../../../../database/Config"; // optional

function SeachBox({data, onClick}){
    const [seachBox, setSeachBox] = useState([]);
    useEffect(() => {
        $.ajax({
            url: `${BASE_URL}/detail`,
            type: 'GET',
            success: function(response) {
                setSeachBox(response);
            },
            error: function(error) {
                console.error('Error fetching danh muc: ', error);
            }
        });
    }, []);
    return (
        <div className="containerSeachBox">
            <Link to={`/detail/${data.id}`} onClick={onClick} style={{ textDecoration: 'none' }}>
                <div className="titleSeachBox">
                    {/*../../../img/no-image.png" alt="Logo*/}
                    <Image className="acv" src={data.img}/>
                    <p className="truncate">
                        {data.titel}
                    </p>
                </div>
            </Link>
        </div>

    )
}
export default SeachBox;