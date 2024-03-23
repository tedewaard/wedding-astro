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
                <p className="whitespace-pre-line mb-5">The downtown area offers some great restraunts. Some of our favorites are:</p>
                <p>Breakfast</p>
                <div className="text-center flex justify-around flex-col md:flex-row">
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/kqftH3VYRr4g7uAP8" target="_blank">Sundance Grill & Bar</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/fXekW7k3GWyDHLz5A" target="_blank">Tupelo Honey</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/yqmptfnocq1QkSUq6" target="_blank">Social Misfits</a>
                </div>
                <p>Dinner</p>
                <div className="text-center flex flex-col md:flex-row justify-around">
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/A5Xw3GLqz2wZF4Vm8" target="_blank">New Holland Brewing</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/QoYXeLRrSTxVBYHt8" target="_blank">Palio (Best Italian in GR)</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/JHXGNo6MPFTc71vH9" target="_blank">Founders Brewing</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/8vmFHNHQQmrt9xaj9" target="_blank">Bangkok Taste Cuisine</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/HcZtctABpuBdGAFaA" target="_blank">Condado Tacos</a>
                </div>
                <p>Hang Over Food</p>
                <div className="text-center flex flex-col md:flex-row justify-around">
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/t3v9CF2GjeZxN9ig7" target="_blank">Garage Bar & Grill</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/HcZtctABpuBdGAFaA" target="_blank">Condado Tacos</a>
                    <a className=" p-2 mb-2 rounded-md bg-gray-200 text-black" href="https://maps.app.goo.gl/4ZPo3NVEuumCDbP87" target="_blank">Stella's Lounge</a>
                </div>
            </div>
        </div>
    )
}