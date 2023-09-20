import { type FormEvent, useState, useEffect } from "react";




export default function Rsvp({guests}) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [rsvpIncomplete, setRsvpIncomplete] = useState([]);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch("/api/rsvp", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
        if (data.message) {
        }
        setFormSubmitted(true);
    }

    useEffect(() => {
        let incomplete = [];
        console.log(guests);
        for (let i=0; i<guests.length; i++){
            if (guests.RSVP_Status === 'Yes'){
                console.log(guests[i].Name)
                incomplete.push(guests[i])
            }
        }
        setRsvpIncomplete(incomplete);
    }, []);

    //TODO: If the guest has already RSVPd then let them know

    return(
        <div className="mt-5">
            {formSubmitted ? 
                <div className="mx-4 mb-5 text-lg font-bold">Thank you for your response!</div>
            :
            <div>
            <form id="rsvpForm" className={formSubmitted ? "hidden" : "flex"} onSubmit={submit}>
                <div className="mx-2">
                    <div className="h-10"></div>
                    <div className="h-10">
                        <label className="text-sm whitespace-nowrap block">Will you attend?</label>
                    </div>
                    <div className="h-10">
                        <label className="text-sm whitespace-nowrap block">Dietary Restrictions?</label>
                    </div>
                </div>
                {rsvpIncomplete.map((data, idx) => {
                    return (
                        <div key={idx} className="mr-4 ">
                            <div className="h-10">
                                <label htmlFor="rsvpSelect" className="whitespace-nowrap">{data.Name}</label>
                            </div>
                            <div className="h-10">
                                <select name={data.Name} id="rsvpSelect" className="block w-full">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="h-10">
                                <select name={data.Name} id="rsvpSelect" className="block w-full">
                                    <option value="none">None</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                </select>
                            </div>
                        </div>
                    )
                })}
            </form>
                <div className="mt-4">
                    <button id="submit" form="rsvpForm" className="block mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit">Submit</button>
                </div>
                </div>
            }
       </div> 
    )
}
/*
    return(
        <div className="">
            <form id="rsvp" className="flex">
                <div>
                    <label className="text-sm mb-4 whitespace-nowrap block">Will you attend?</label>
                    <label className="text-sm whitespace-nowrap block">Dietary Restrictions?</label>
                </div>
                {guests.map((data, idx) => {
                    return(
                        <div key={idx}>
                            <label htmlFor="rsvpSelect" className="whitespace-nowrap">{data.Name}</label>
                            <select name={data.Name} id="rsvpSelect" className="block w-full my-4">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <select name={data.Name} id="rsvpSelect" className="block w-full">
                                <option value="none">None</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </div>
                    )
                })}
            </form>
                <div className="mt-4">
                    <button id="submit" form="rsvp" className="block mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit">Submit</button>
                </div>
       </div> 
    )
}
*/