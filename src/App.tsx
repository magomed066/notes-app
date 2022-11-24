import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import { EditNote, NewNote, Note, NoteLayout, Notes } from './pages'
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

	const updateNote = (id: string, { tags, ...data }: NoteModel) => {
		setNotes((prev) => {
			return prev.map((note) =>
				note.id === id
					? {
							...note,
							...data,
							tagIds: tags.map((tag) => tag.id),
					  }
					: note,
			)
		})
	}

	const deleteNote = (id: string) => {
		setNotes((prev) => prev.filter((note) => note.id !== id))
	}

	const updateTag = (id: string, label: string) => {
		setTags((prev) => prev.map((tag) => (tag.id ? { ...tag, label } : tag)))
	}
	const deleteTag = (id: string) => {
		setTags((prev) => prev.filter((tag) => tag.id !== id))
	}

	return (
		<Container className="my-4 p-3 app">
			<Routes>
				<Route
					path="/"
					element={
						<Notes
							updateTag={updateTag}
							deleteTag={deleteTag}
							availableTags={tags}
							notes={notesWithTags}
						/>
					}
				/>
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
				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note deleteNote={deleteNote} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onAddTag={addTag}
								onSubmit={updateNote}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
