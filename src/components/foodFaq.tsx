import { useState } from "react"
import dropdown from "../images/chevron-down-svgrepo-com.svg"
import dropup from "../images/chevron-up-svgrepo-com.svg"



export default function(){
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <div id="parent" onClick={handleClick} className=" group flex flex-col w-11/12 md:w-2/3 mb-5 m-auto border-2 border-black rounded-md">
            <div className="flex justify-between">
                <p className="p-2 text-2xl">Where to eat downtown GR?</p>
                <img id="down" className={clicked ? "hidden" : ""} src={dropdown.src} height="40px" width="40px"/>
                <img id="up" className={clicked ? "" : "hidden"} src={dropup.src} height="40px" width="40px"/>
            </div>
            <div id="child" className={clicked ? "p-2" : "hidden "}>
                <p className="whitespace-pre-line">The downtown area offers some great restraunts and breweries. Some of our favorites are:</p>
                <p>Breakfast:</p>
                <div className="flex justify-around">
                    <div className="border-black border-2 p-2 rounded-md">Sundance Grill & Bar</div>
                    <div className="border-black border-2 p-2 rounded-md">Tupelo Honey</div>
                    <div className="border-black border-2 p-2 rounded-md">Social Misfits</div>
                </div>
                <p>Dinner/Breweries:</p>
                <div className="flex justify-around">
                    <div className="border-black border-2 p-2 rounded-md">New Holland Brewing</div>
                    <div className="border-black border-2 p-2 rounded-md">Palio (Best Italian in GR)</div>
                    <div className="border-black border-2 p-2 rounded-md">Founders Brewing</div>
                    <div className="border-black border-2 p-2 rounded-md">Jolly Pumpkin</div>
                    <div className="border-black border-2 p-2 rounded-md">Jolly Pumpkin</div>
                </div>
                <p>Hang Over Food</p>
                <div className="flex justify-around">
                    <div className="border-black border-2 p-2 rounded-md">Garage Bar & Grill</div>
                    <div className="border-black border-2 p-2 rounded-md">Condado Tacos</div>
                    <div className="border-black border-2 p-2 rounded-md"></div>
                    <div className="border-black border-2 p-2 rounded-md"></div>
                    <div className="border-black border-2 p-2 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}