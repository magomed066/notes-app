import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalstorage'
import { NewNote } from './pages'
import { v4 as uuidV4 } from 'uuid'
import { NoteModel, RawNote, Tag } from './types/notes'

const App = () => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			}
		})
	}, [notes, tags])

	const createNote = ({ tags, ...data }: NoteModel) => {
		setNotes((prev) => {
			return [
				...prev,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			]
		})
	}

	const addTag = (tag: Tag) => {
		setTags((prev) => [...prev, tag])
	}

	return (
		<Container className="my-4 p-3 app">
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route
					path="/new"
					element={
						<NewNote
							onAddTag={addTag}
							onSubmit={createNote}
							availableTags={tags}
						/>
					}
				/>
				<Route path="/:id">
					<Route index element={<h1>Show</h1>} />
					<Route path="edit" element={<h1>Edit</h1>} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
