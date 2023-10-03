import hamburgerSVG from '../images/hamburgerSVG.svg';
import {useState} from "react";
import closeIcon from '../images/close_icon.jpg'


export default function Hamburger(){
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
      <>
        <div onClick={handleClick}>
          <img
            onClick={handleClick}
            className={clicked ? "hidden" : "z-40"}
            src={hamburgerSVG.src}
            width="50px"
            height="50px"
          ></img>
        </div>
        <div
          className={
            clicked
              ? "fixed z-10 top-0 left-0 w-full h-full bg-black/70"
              : "hidden"
          }
        >
            <img onClick={handleClick} className="absolute top-1 right-1 z-50" src={closeIcon.src} height="50px" width="50px"></img>
            <div className="mt-40 flex justify-center flex-col m-auto w-1/2 gap-5">
                <button className="rounded-lg  bg-white">Home</button>
                <button className="rounded-lg  bg-white">Relationship Timeline</button>
                <button className="rounded-lg  bg-white">RSVP</button>
                <button className="rounded-lg  bg-white">Venue</button>
            </div>
        </div>
      </>
    );
}