import { useState } from "react"
import dropdown from "../images/chevron-down-svgrepo-com.svg"
import dropup from "../images/chevron-up-svgrepo-com.svg"


export default function({question, answer, image}){
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <div id="parent" onClick={handleClick} className=" group flex flex-col w-11/12 md:w-2/3 mb-5 m-auto border-2 border-black rounded-md">
            <div className="flex justify-between">
                <p className="p-2 text-2xl">{question}</p>
                <img id="down" className={clicked ? "hidden" : ""} src={dropdown.src} height="40px" width="40px"/>
                <img id="up" className={clicked ? "" : "hidden"} src={dropup.src} height="40px" width="40px"/>
            </div>
            <div id="child" className={clicked ? "p-2" : "hidden "}>
                <p className="whitespace-pre-line">{answer}</p>
            </div>
            <div className={clicked ? "flex items-center m-auto": "hidden"}>
                <img src={image}/>
            </div>
        </div>
    )
}