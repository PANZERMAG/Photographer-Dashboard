import { Col, Empty, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect } from "react";
import { getPhotosession } from "./photosessionSlicer";

export default function PhotosessionList() {
    const dispatch = useAppDispatch();
    const { photosessions } = useAppSelector(state => state.photosession)

    useEffect(() => {
        if (!photosessions || photosessions.length === 0) dispatch(getPhotosession())
        console.log(photosessions)
    }, [dispatch, photosessions])



    return (
        <Row style={{ height: '100vh', padding: '50px 0 50px 0' }}>
            <Col span={6} offset={1} style={{ backgroundColor: '#292929', borderRadius: '35px' }}>
                <p>PHOTOSESSIONs</p>
                <div className="">
                </div>
            </Col>
            <Col span={15} offset={1} style={{ backgroundColor: '#292929', borderRadius: '35px' }}>
                {photosessions != undefined && photosessions.length > 0 ? (photosessions[0].photos.map((item) => (
                    <img src={item.url} alt="" className="" />
                ))) : (
                    <div style={{ width: "100%", height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Empty style={{ color: 'white' }} />
                    </div>
                )} :
            </Col>
        </Row>
    )
}