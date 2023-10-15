import { type FormEvent, useState } from "react";
import closeIcon from '../images/close_icon_black.jpg'
import Rsvp from './rsvp.jsx';

export default function rsvpComponent({className}) {
    const [modal, setModal] = useState(false);
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [guests, setGuests] = useState([]);
    //console.log(guests);


    async function submit(e: FormEvent<HTMLFormElement>) {
        //console.log(e);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        //console.log(formData);
        const response = await fetch("/api/guest", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        //console.log(data);
        if (data.message) {
            setResponseMessage(data.message);
            setGuests(data.data);
            setNameSubmitted(true);
        }

    }

    const handleClick = () => {
        if (modal) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
        setModal(!modal);
    }


    return (
        <>
        <button id="rsvp" onClick={handleClick} className={className}>RSVP</button>
        <div id="vis" className={modal ? "flex justify-center fixed top-0 left-0 w-full h-full z-40 bg-black/40 " : "hidden" }>
            <div className="relative border-black rounded-3xl border-4 bg-white z-20  mt-40 h-fit">
                <div id="close" onClick={handleClick} className="absolute top-2 right-2">
                    <img src={closeIcon.src} alt="X icon to close" width="20" height="20" />
                </div>
                <div className="w-1/2 mx-auto mb-8 text-black">
                    <h1 className="text-center underline text-2xl font-bold">RSVP</h1>
                    <p className="text-center font-bold">October 19, 2024</p>
                    <p className="text-center text-sm font-bold">4PM - 11PM</p>
                </div>
                <form className={nameSubmitted ? "hidden" : "flex flex-col justify-center w-1/2 mx-auto"} onSubmit={submit}>
                    <div className="flex justify-center mx-4">
                        <div className="mr-3">
                            <label className="font-bold text-lg" htmlFor="name">Name:</label><br />
                        </div>
                        <div className="">
                            <input className="h-6 max-w-full border rounded-lg border-black mb-1 p-2 text-lg bg-white" type="text" id="name" name="name" required /><br />
                        </div>
                    </div>
                        <button id="submit" className="justify-center mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit">Submit</button>
                </form>
                {nameSubmitted && <Rsvp guests={guests} />}
            </div>
        </div>
</>
    )
};