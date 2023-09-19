import { type FormEvent, useState } from "react";
import closeIcon from '../images/close_icon.jpg'
import Rsvp from './rsvp.jsx';

export default function rsvpComponent() {
    const [modal, setModal] = useState(false);
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [guests, setGuests] = useState([]);
    console.log(guests);


    async function submit(e: FormEvent<HTMLFormElement>) {
        console.log(e);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch("/api/guest", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
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
        <button id="rsvp" onClick={handleClick} className="text-white bg-black rounded-md p-2 w-20">RSVP</button>
        <div id="vis" className={modal ? "fixed top-0 left-0 w-full h-full z-10 bg-black/40 " : "hidden" }>
            <div className="relative border-black rounded-3xl border-4 w-3/12 mx-auto bg-white z-20 mt-40">
                <div id="close" onClick={handleClick} className="absolute top-2 right-2">
                    <img src={closeIcon.src} alt="X icon to close" width="20" height="20" />
                </div>
                <h2 className="text-center underline text-2xl font-bold">RSVP</h2>
                <p className="text-center font-bold">October 19, 2024</p>
                <p className="text-center text-sm font-bold">4PM - 11PM</p>

                <form className={nameSubmitted ? "hidden" : ""} onSubmit={submit}>
                    <div className="flex mx-auto w-4/5 my-4">
                        <div className="mr-4 whitespace-nowrap">
                            <label className="font-bold" htmlFor="name">Name:</label><br />
                        </div>
                        <div className="min-w-0">
                            <input className="h-6 max-w-full border rounded-lg border-black mb-1" type="text" id="name" name="name" required /><br />
                        </div>
                    </div>
                    <div className="flex">
                        <button id="submit" className="mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit">Submit</button>
                    </div>
                </form>
                <Rsvp guests={guests} />
            </div>
        </div>
</>
    )
};