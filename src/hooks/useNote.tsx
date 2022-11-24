import { useOutletContext } from 'react-router-dom'
import { Note } from '../types/notes'

function useNote() {
	return useOutletContext<Note>()
}

export default useNote
