import { Flex } from "antd";
import { Outlet } from "react-router-dom";

export default function PhotosessionMain() {
    return (
        <Flex vertical style={{ backgroundColor: 'black' }}>
            <Outlet />
        </Flex>
    )
}