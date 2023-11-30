import { type FormEvent, useState, useEffect } from "react";


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

const lambdaURL = "https://zd36se2dtkj5ydnrs7ostihmle0liyga.lambda-url.us-east-2.on.aws/"

//TODO: Fix logic around submitting a name in a party that someone has already submitted a response for

export default function Rsvp({guests}) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [rsvpIncomplete, setRsvpIncomplete] = useState([]);
    const [rsvpComplete, setRsvpComplete] = useState([]);
    const [updatedRSVP, setUpdatedRSVP] = useState([]);

    async function parseData(data) {
        let guestList = rsvpIncomplete;
        const length = Object.keys(data).length;
        console.log(Object.keys(data));
        for (const key in data) {
            let idx = key.charAt(key.length - 1);
            let c = key.charAt(0);
            //Better way of doing this but works for now
            //"r" stands for rsvp_status
            if (c == "r") {
                let guest: Guest = guestList[idx];
                guest.RSVP_Status = data[key]
                guest.Updated = "True"
                guestList[idx] = guest;
            }
            //"f" stands for food
            if (c == "f") {
                let guest: Guest = guestList[idx];
                guest.Food_Pref = data[key]
                guestList[idx] = guest;
            }
        }
        console.log(guestList)
        console.log(JSON.stringify(guestList))
        setUpdatedRSVP(guestList);
        let rsvp_update_post = await fetch(lambdaURL, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guestList)
        });

        console.log(await rsvp_update_post.json());
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const parsedData = Object.fromEntries(formData.entries());

        parseData(parsedData)
        //Take the updated RSVPs and send them to Lambda API
        //Lambda will take the array of objects and make the necessary updates
        setFormSubmitted(true);
    }

    useEffect(() => {
        let incomplete = [];
        let complete = [];
        //console.log(guests);
        for (let i=0; i<guests.length; i++){
            //console.log(Object.keys(guests[i]));
            if (guests[i].RSVP_Status === "NA" | "No"){
                //console.log("Pushing to incomplete");
                incomplete.push(guests[i]);
            } else {
                //console.log("Pushing to complete");
                complete.push(guests[i]);
            }
        }
        setRsvpIncomplete(incomplete);
        setRsvpComplete(complete);
    }, []);

    //TODO: If the guest has already RSVPd then let them know

    return(
        <div className="mt-5 text-wed_black">
            {formSubmitted ? 
                <div className="mx-4 mb-5 text-lg font-bold">Thank you for your response!</div>
            :
            <div className="font-bold">
                <div className={(rsvpComplete.length > 0) ? "font-bold" : "hidden"}>
                    {rsvpComplete.map((guest, guestIdx) => {return(<div key={guestIdx} className="mb-4 mx-2 text-center">{guest.Name} has already RSVP'd</div>)})}
                    <div className="mb-2 w-3/4 text-center mx-auto">Would you like to RSVP for others in your party?</div>
                    <hr className="border-solid w-2/3 mx-auto border-1 mb-1 border-slate-700"></hr>
                </div>
            <form id="rsvpForm" className={formSubmitted ? "hidden" : "flex"} onSubmit={submit}>
                <div className="mx-2">
                    <div className="h-10"></div>
                    <div className="h-10">
                        <label className="text-sm whitespace-nowrap block">Attending?</label>
                    </div>
                    <div className="h-10">
                        <label className="text-sm whitespace-nowrap block">Dietary Restrictions?</label>
                    </div>
                </div>
                {rsvpIncomplete.map((data, idx) => {
                    return (
                        <div key={idx} className="mr-4 ">
                            <div className="h-10">
                                <label htmlFor={data.Name} className="whitespace-nowrap underline">{data.Name}</label>
                            </div>
                            <div className="h-10">
                                <select name={"rsvp_status_" + idx} id={data.Name} className="block w-full ring-1 rounded-md bg-white">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="h-10">
                                <select name={"food_" + idx} id={data.Name} className="block w-full ring-1 rounded-md bg-white">
                                    <option value="None">None</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
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