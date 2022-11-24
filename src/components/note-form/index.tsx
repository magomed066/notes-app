import React, { FC, FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { MultiValue } from 'react-select'
import { v4 as uuidV4 } from 'uuid'
import CreatableReactSelect from 'react-select/creatable'
import { NoteModel, Tag } from '../../types/notes'
import transformSelectData from '../../utils/transformSelectData'

type Props = {
	onSubmit: (data: NoteModel) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
}

const NoteForm: FC<Props> = ({ onSubmit, availableTags, onAddTag }) => {
	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		onSubmit({
			title: titleRef?.current?.value || '',
			markdown: markdownRef?.current?.value || '',
			tags: selectedTags,
		})

		navigate('..')
	}

	const handleChange = (
		tags: MultiValue<ReturnType<typeof transformSelectData>[0]>,
	) => {
		const mappedTags = tags.map((tag) => ({ label: tag.label, id: tag.value }))

		setSelectedTags(mappedTags)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required ref={titleRef} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label }
									onAddTag(newTag)

									setSelectedTags((prev) => [...prev, newTag])
								}}
								options={transformSelectData(availableTags)}
								isMulti
								value={transformSelectData(selectedTags)}
								onChange={handleChange}
							/>
						</Form.Group>
					</Col>
				</Row>

				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control required as="textarea" rows={15} ref={markdownRef} />
				</Form.Group>

				<Stack direction="horizontal" className="justify-content-end" gap={2}>
					<Link to="..">
						<Button type="button" variant="outline">
							Cancel
						</Button>
					</Link>
					<Button type="submit" variant="primary">
						Save
					</Button>
				</Stack>
			</Stack>
		</Form>
	)
}

export default NoteForm
