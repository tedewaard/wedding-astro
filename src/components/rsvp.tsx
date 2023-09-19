import { type FormEvent, useState } from "react";




export default function rsvp({guests}) {

    return(
        <div>
            {guests.map((data, idx) => {
                return (
                    <p key={idx}>Guest: {data.Name}</p>
                )})}
       </div> 
    )
}
/*
            {guests.map((data, idx) => {
                return (
                    <p key={idx}>Guest: {data.Name}</p>
                )})}
*/