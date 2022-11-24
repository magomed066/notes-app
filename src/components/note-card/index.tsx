import React, { FC } from 'react'
import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Note } from '../../types/notes'
import styles from './index.module.css'

type Props = {
	note: Note
}

const NoteCard: FC<Props> = ({ note }) => {
	return (
		<Card
			as={Link}
			to={`/${note.id}`}
			className={`h-100 text-reset text-decoration-none ${styles['card']}`}
		>
			<Card.Body>
				<Stack
					gap={2}
					className="align-items-center justify-content-center h-100"
				>
					<span className="fs-5">{note.title}</span>

					{note.tags.length > 0 && (
						<Stack
							gap={1}
							direction="horizontal"
							className="justify-content-center flex-wrap"
						>
							{note.tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	)
}

export default NoteCard
