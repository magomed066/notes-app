import React, { FC } from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from '../../types/notes'

type Props = {
	notes: Note[]
}

const NoteLayout: FC<Props> = ({ notes }) => {
	const { id } = useParams()

	const note = notes.find((note) => note.id === id)

	if (note == null) return <Navigate to="/" replace />

	return <Outlet context={note} />
}

export default NoteLayout
