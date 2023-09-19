import { type FormEvent, useState } from "react";




export default function Rsvp({guests}) {

    async function submit(e: FormEvent<HTMLFormElement>) {
        console.log(e);
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
    }

    //TODO: If the guest has already RSVPd then let them know

    //TODO: After submitting the RSVP show a message
    //TODO: Add the option to choose a vegan or vegetarian meal

    return(
        <div>
            <h3 className="text-lg font-bold text-center">Will you be attending?</h3>
            <form onSubmit={submit}>
            {guests.map((data, idx) => {
                return (
                    <div key={idx} className="flex m-1">
                        <label htmlFor="rsvpSelect" className="mx-5 w-1/2" >{data.Name}</label>
                        <select name={data.Name} id="rsvpSelect" className="">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                )})}
                <button id="submit" className="block mb-4 mx-auto w-1/3 text-center border-black border rounded-lg" type="submit" value="Submit">Submit</button>
            </form>
       </div> 
    )
}
/*
            {guests.map((data, idx) => {
                return (
                    <p key={idx}>Guest: {data.Name}</p>
                )})}
*/