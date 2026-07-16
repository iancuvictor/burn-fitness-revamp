import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Review({ review }) {
    return <div className="flex flex-col items-center gap-2 bg-black
    ring-white text-white font-finlandica w-80 p-5">
        <div className="flex gap-1">
        {Array.from({ length: review.stele }).map((review, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400"/>
        ))}
        </div>
        <h1 className="text-[24px] font-[700]">{review.nume}</h1>
        <p className="text-center">{review.comentariu}</p>
    </div>
}