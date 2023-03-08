import { useState, ChangeEvent, FormEvent } from 'react';
import { trpc } from '../trpc';

const NoteForm = () => {

    const [note, setNote] = useState({
        title: '',
        description: ''
    })

    const addNote = trpc.note.create.useMutation()
    const utils = trpc.useContext()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addNote.mutate(note, {
            onSuccess: () => {
                utils.note.get.invalidate()
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <form onSubmit={handleSubmit}
            className="bg-zinc-100 p-10 rounded-md shadow-md"
        >
            <input type="text"
                className='bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3'
                placeholder="Enter a note"
                name="title"
                autoFocus
                onChange={handleChange}
            />

            <textarea
                className='bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3'
                placeholder="Description"
                name="description"
                onChange={handleChange}
            />
            <button
                className='bg-slate-600 px-3 py-2 w-full block rounded-md mb-3'   
                type="submit">Add Note</button>
        </form>
    )
}

export default NoteForm