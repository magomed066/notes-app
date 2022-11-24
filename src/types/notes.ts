export type NoteModel = {
	title: string
	markdown: string
	tags: Tag[]
}

export type Tag = { id: string; label: string }

export type Note = { id: string } & NoteModel

export type RawNote = {
	id: string
} & RawNoteData

export type RawNoteData = {
	title: string
	markdown: string
	tagIds: string[]
}
