import { FC } from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate } from 'react-router-dom'
import useNote from '../../hooks/useNote'

type Props = {
	deleteNote: (id: string) => void
}

const Note: FC<Props> = ({ deleteNote }) => {
	const note = useNote()
	const navigate = useNavigate()

	return (
		<>
			<Row className="align-items-center mb-4 pb-2 border-bottom">
				<Col className="mb-3 mb-sm-0">
					<h2>{note.title}</h2>

					{note.tags.length > 0 && (
						<Stack gap={1} direction="horizontal" className=" flex-wrap">
							{note.tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to={`/${note.id}/edit`}>
							<Button variant="primary">Edit</Button>
						</Link>
						<Button
							variant="outline-danger"
							onClick={() => {
								deleteNote(note.id)
								navigate('/')
							}}
						>
							Delete
						</Button>
						<Link to="..">
							<Button variant="outline-dark">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	)
}

export default Note
