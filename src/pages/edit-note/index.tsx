import React, { FC } from 'react'
import { NoteForm } from '../../components'
import useNote from '../../hooks/useNote'
import { NoteModel, Tag } from '../../types/notes'

type Props = {
	onSubmit: (id: string, data: NoteModel) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
}

const EditNote: FC<Props> = ({ onSubmit, onAddTag, availableTags }) => {
	const note = useNote()

	return (
		<>
			<h2 className="mb-4">Edit note</h2>
			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={(data) => onSubmit(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	)
}

export default EditNote
