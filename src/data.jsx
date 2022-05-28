import React,{useEffect,useState} from "react";
function Notes(){
    const [notes,setNotes]=useState([{
        name : ""
    }])
    useEffect(()=>{
        fetch("/Register").then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes=>setNotes(jsonRes));
    });
    return(
        <div>
            {notes.map(
                note=><div>
                    <h1>{note.name}</h1>
                    <h1>{note.email}</h1>
                    </div>
            )}
        </div>
    );
}

export default Notes;