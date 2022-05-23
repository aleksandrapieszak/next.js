import {redirect} from "next/dist/server/api-utils";
import notes from "../pages/notes";

export async function getAllNotes() {
    const response = await fetch("http://127.0.0.1:8000/api/notes");
    const data = await response.json();

    // const API_URL = "http://127.0.0.1:8000/api/events"
    //  const response = await fetch(API_URL)
    //  const data = await response.json();

    const notes = [];

    for (const key in data){
        notes.push({
            id: key,
            ...data[key]

        })
    }
    return notes;
}

export async function getNotesById(id){
    const API_URL = `http://127.0.0.1:8000/api/notes/${id}`
    const response = await fetch(API_URL)
    const data = await response.json();
    return data;
}

export async function sendNoteData(enteredTitle, enteredDescription){

    const newData = {
        "title": enteredTitle,
        "description": enteredDescription
    }
    const response = await fetch('http://127.0.0.1:8000/api/notes', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'Content-Type' : 'application/json',
        }
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message || "Coś poszło nie tak");
    }
    return data
}


export async function deleteNote(id){
    const API_URL = `http://127.0.0.1:8000/api/notes/${id}`
    const response = await fetch(API_URL, {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(id)
    });
    if (response.status!== 204){
        throw new Error("Coś poszło nie tak")
    }
}


export async function getNotesCreatedToday(){

    const response = await fetch("http://127.0.0.1:8000/api/notes?created[after]=2022-05-10");
    const data = await response.json();

    const notes = [];

    for (const key in data){
        notes.push({
            id: key,
            ...data[key]

        })
    }
    return notes;
}

export async function editNote(noteId, noteTitle, noteDescription) {
    const noteData = {
        "title": noteTitle,
        "description": noteDescription,
    }
    const response = await fetch('http://localhost:8000/api/notes/' + noteId, {
        method: 'PATCH',
        body: JSON.stringify(noteData),
        headers: {
            'Content-Type': 'application/merge-patch+json'
        }
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        throw new Error(data.message || "Coś poszło nie tak");
    }
}

