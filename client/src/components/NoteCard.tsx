import { trpc } from "../trpc";


interface Props {
    note: {
        _id: string;
        title: string;
        description: string;
        done: boolean;
    }

}
const NoteCard = ({ note }: Props) => {

    const deleteNote = trpc.note.delete.useMutation();
    const toggleDone = trpc.note.toggleDone.useMutation();
    const utils = trpc.useContext();

    const handleDelete = () => {
        deleteNote.mutate(note._id, {
            onSuccess: (data) => {
                if (data) utils.note.get.invalidate()
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    const handleDone = async () => {
        await toggleDone.mutate(note._id, {
            onSuccess: (data) => {
                if (data) utils.note.get.invalidate()
            }
        })
    }

    return (
        <div className="bg-zinc-800 p-8 mb-2 flex">
            <div className=" font-bold text-xl text-white">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
            </div>

            <button
                className="bg-red-500 text-white rounded-md px-3 py-2 ml-auto"
                onClick={handleDelete}>
                Delete
            </button>
            <button
                className="bg-green-500 text-white rounded-md px-3 py-2 ml-2"
                onClick={handleDone}>
                {note.done ? 'Undone' : 'Done'}
            </button>
        </div>
    )
}

export default NoteCard