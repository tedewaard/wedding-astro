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
    //TODO: Add the option to choose a vegan or vegetarian meal. Do this after the RSVP maybe? 

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
/*
            {guests.map((data, idx) => {
                return (
                    <p key={idx}>Guest: {data.Name}</p>
                )})}
*/
/*
            <div className="flex justify-between">
                <h3 className="text-sm font-bold ml-5">Will you be attending?</h3>
                <h3 className=" text-sm font-bold">Dietary Restrictions?</h3>
            </div>
            <form onSubmit={submit}>
            {guests.map((data, idx) => {
                return (
                    <div key={idx} className="flex m-1">
                        <label htmlFor="rsvpSelect" className="px-5 w-1/2" >{data.Name}</label>
                        <div className="flex">                        
                            <select name={data.Name} id="rsvpSelect" className="w-1/3">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <select name={data.Name} id="rsvpSelect" className="pl-4 w-2/3">
                                <option value="none">None</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </div>
                    </div>
                )})}
                */