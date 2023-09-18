import { FormEvent, useState } from "react";
import closeIcon from '../images/close_icon.jpg'

export default function rsvpComponent() {
    const [modal, setModal] = useState(false);
    console.log(modal);
    const [responseMessage, setResponseMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch("/api/guest", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.message) {
            setResponseMessage(data.message);
        }
    }

    const handleClick = () => {
        console.log(modal);
        setModal(!modal);
        console.log(modal);
    }


    return (
        <>
        <button id="rsvp" onClick={handleClick} className="text-white bg-black rounded-md p-2 w-20">RSVP</button>
        <div id="vis" className={modal ? "fixed top-0 left-0 w-full h-full z-10 bg-black/40" : "hidden" }>
            <div className="relative border-black rounded-3xl border-4 w-3/12 mx-auto bg-white z-20 mt-40">
                <div id="close" onClick={handleClick} className="absolute top-2 right-2">
                    <img src={closeIcon.src} alt="X icon to close" width="20" height="20" />
                </div>
                <h2 className="text-center underline text-2xl font-bold">RSVP</h2>
                <p className="text-center font-bold">October 19, 2024</p>
                <p className="text-center text-sm font-bold">4PM - 11PM</p>
                <form onSubmit={submit}>
                    <div className="flex mx-auto w-4/5 my-4">
                        <div className="mr-4 whitespace-nowrap">
                            <label className="font-bold" htmlFor="name">Name:</label><br />
                            <label className="font-bold" htmlFor="song">Song Request:</label>
                        </div>
                        <div className="min-w-0">
                            <input className="h-6 max-w-full border rounded-lg border-black mb-1" type="text" id="name" name="name" required /><br />
                            <input className="h-6 max-w-full border rounded-lg border-black" type="text" id="song" name="song" /><br />
                        </div>
                    </div>
                    <div className="flex">
                        <input id="submit" className="mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit" />
                        <button id="submit" className="mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit"></button>
                    </div>
                    <div>
                    </div>
                </form>
            </div>
        </div>
</>
    )
};

/*
let rsvp_button = document.getElementById('rsvp');
console.log(rsvp_button);
let vis = document.getElementById('vis');
console.log(vis);
let close = document.getElementById('close');
console.log(close);
rsvp_button.onclick = function() {
    if (vis.className == 'hidden'){
        vis.setAttribute('className', 'fixed top-0 left-0 w-full h-full z-10 bg-black/40 ');
        console.log("clicked");
    } else {
        vis.setAttribute('className', 'hidden');
    }
};
close.addEventListener('click', function (event) {
    if (vis.className == 'hidden'){
        vis.setAttribute('className', 'fixed top-0 left-0 w-full h-full z-10 bg-black/40 ');
    } else {
        vis.setAttribute('className', 'hidden');
    }
});
*/





/*
export default function RSVPForm() {
    const [responseMessage, setResponseMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch("/api/guest", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.message) {
            setResponseMessage(data.message);
        }
    }
return(
<div id="vis" className="hidden">
<div className="relative border-black rounded-3xl border-4 w-3/12 mx-auto bg-white z-20 mt-40">
    <div id="close" className="absolute top-2 right-2"><img src={closeIcon} width="20" height="20"/></div>
	<h2 className="text-center underline text-2xl font-bold">RSVP</h2>
	<p className="text-center font-bold">October 19, 2024</p>	
	<p className="text-center text-sm font-bold">4PM - 11PM</p>	
    <form onSubmit={submit}>
        <div className="flex mx-auto w-4/5 my-4">
            <div className="mr-4 whitespace-nowrap">
                <label className="font-bold" htmlFor="name">Name:</label><br />
                <label className="font-bold" htmlFor="song">Song Request:</label>
            </div>
            <div className="min-w-0">
                <input className="h-6 max-w-full border rounded-lg border-black mb-1" type="text" id="name" name="name" required/><br />
                <input className="h-6 max-w-full border rounded-lg border-black" type="text" id="song" name="song"/><br />
            </div>
        </div>
        <div className="flex">
            <input id="submit" className="mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit"/>
            <button id="submit" className="mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit"></button>
        </div>
        <div>
        </div>
    </form>
</div>
</div>
)
};
*/