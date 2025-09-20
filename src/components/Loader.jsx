import {OrbitProgress} from "react-loading-indicators"

export default function Loader() {
    return (
        <>
            <div className="loading-wrapper">
                <OrbitProgress variant="disc" dense color="#3c00ffff" size="large" text="" textColor="" />
            </div>
        </>
    )
}