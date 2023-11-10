import hamburgerSVG from '../images/hamburgerSVG.svg';
import {useState} from "react";
import closeIcon from '../images/close_icon_white.png'
import cross from '../images/icons/cross-svgrepo-com.svg'
import RSVPModal from './rsvpModal.tsx';


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
              ? "fixed z-10 top-0 left-0 w-full h-full bg-black/30"
              : "hidden"
          }
        >
            <img onClick={handleClick} className="absolute top-1 right-1 z-40" src={cross.src} height="50px" width="50px"></img>
            <div className="mt-40 flex justify-center flex-col m-auto w-1/2 gap-5">
                <a href="/" className="rounded-lg  bg-white text-center py-1 font-bold underline text-blue-600 hover:text-blue-800 visited:text-purple-600">HOME</a>
                <a href="/timeline/" className="rounded-lg  bg-white text-center py-1 font-bold underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Relationship Timeline</a>
                <RSVPModal className="rounded-lg  bg-white text-center py-1 font-bold underline text-blue-600 hover:text-blue-800 visited:text-purple-600" />
                <a href="/venue/" className="hidden rounded-lg  bg-white text-center py-1 font-bold underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Venue</a>
                <a href="/venue/" className="hidden rounded-lg  bg-white text-center py-1 font-bold underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Registry</a>
                <a href="/faq/" className=" rounded-lg  bg-white text-center py-1 font-bold underline text-blue-600 hover:text-blue-800 visited:text-purple-600">FAQ</a>
            </div>
        </div>
      </>
    );
}
