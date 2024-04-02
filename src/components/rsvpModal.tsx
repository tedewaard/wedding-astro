import { type FormEvent, useState } from "react";
import closeIcon from '../images/close_icon_black.jpg'
import Rsvp from './rsvp.jsx';

const lambdaURL = "https://zd36se2dtkj5ydnrs7ostihmle0liyga.lambda-url.us-east-2.on.aws/?name="

type Guest = {
    ID: string,
    Name: string,
    Family_ID: string,
    RSVP_Sent: string,
    RSVP_Status: string,
    Updated: string,
    Song: string,
    Food_Pref: string,
}

export default function rsvpComponent({className}) {
    const [modal, setModal] = useState(false);
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [badRequest, setBadRequest] = useState(false);
    //console.log(guests);


    async function submit(e: FormEvent<HTMLFormElement>) {
        //console.log(e);
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const name = Object.fromEntries(formData).name;
        console.log(name);

        let url = lambdaURL + encodeURIComponent(name as string);
        console.log(url)
        const response = await fetch(url);
        console.log(response.status);
        if (response.status == 400) {
            setLoading(false);
            setBadRequest(true);
            console.log(badRequest)
        } else {
            setLoading(false);
            const data = await response.json()
            setGuests(data);
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
            <div className="relative border-black rounded-3xl border-4 bg-white z-20  mt-40 max-h-max md:h-fit w-11/12 md:w-auto overflow-scroll md:overflow-auto">
                <div id="close" onClick={handleClick} className="absolute top-2 right-2">
                    <img src={closeIcon.src} alt="X icon to close" width="20" height="20" />
                </div>
                <div className="w-1/2 mx-auto mb-8 text-black">
                    <h1 className="text-center underline text-2xl font-bold">RSVP</h1>
                    <p className="text-center font-bold">October 19, 2024</p>
                    <p className="text-center text-sm font-bold">4PM - 11PM</p>
                </div>
                <form className={nameSubmitted ? "hidden" : "flex flex-col justify-center mx-auto"} onSubmit={submit}>
                    <div className="flex justify-center mx-4">
                        <div className="mr-3">
                            <label className="font-bold text-lg" htmlFor="name">Name:</label><br />
                        </div>
                        <div className="">
                            <input className="h-6 max-w-full border rounded-lg border-black mb-1 p-2 text-lg bg-white" type="text" id="name" name="name" required /><br />
                        </div>
                    </div>
                    <label className={badRequest ? "max-w-full text-sm text-red-600 text-center" : "hidden"}>Guest not found, please try again.</label>
                    <label className={loading ? "max-w-full text-sm text-black text-center" : "hidden"}>Searching...</label>
                    <button id="submit" className="justify-center mb-4 mx-auto w-fit px-1 text-center border-black border rounded-lg" type="submit" value="Submit">Submit</button>
                </form>
                {nameSubmitted && <Rsvp guests={guests} />}
            </div>
        </div>
</>
    )
};
