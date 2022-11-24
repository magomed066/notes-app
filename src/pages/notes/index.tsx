import React, { FC, useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect, { MultiValue } from 'react-select'
import { NoteCard } from '../../components'
import { Note, Tag } from '../../types/notes'
import transformSelectData from '../../utils/transformSelectData'

type Props = {
	availableTags: Tag[]
	notes: Note[]
}

const Notes: FC<Props> = ({ availableTags, notes }) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState<string>('')

	const handleChange = (
		tags: MultiValue<ReturnType<typeof transformSelectData>[0]>,
	) => {
		const mappedTags = tags.map((tag) => ({ label: tag.label, id: tag.value }))

		setSelectedTags(mappedTags)
	}

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === '' ||
					note.title.toLowerCase().includes(title?.toLowerCase() as string)) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id),
					))
			)
		})
	}, [title, selectedTags, notes])

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h2>Notes</h2>
				</Col>
				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to="/new">
							<Button variant="outlined">Edit Tags</Button>
							<Button variant="primary">Create</Button>
						</Link>
					</Stack>
				</Col>
			</Row>

			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="Tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								options={transformSelectData(availableTags)}
								isMulti
								value={transformSelectData(selectedTags)}
								onChange={handleChange}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard note={note} />
					</Col>
				))}
			</Row>
		</>
	)
}

export default Notes
