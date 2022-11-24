import { FC } from 'react'
import { NoteForm } from '../../components'
import { NoteModel, Tag } from '../../types/notes'

type Props = {
	onSubmit: (data: NoteModel) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
}

const NewNote: FC<Props> = ({ onSubmit, onAddTag, availableTags }) => {
	return (
		<>
			<h2 className="mb-4">New note</h2>
			<NoteForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	)
}

export default NewNote
