import React, { FC } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Tag } from '../../types/notes'

type Props = {
	availableTags: Tag[]
	show: boolean
	handleClose: () => void
	deleteTag: (id: string) => void
	updateTag: (id: string, label: string) => void
}

const EditTagsModal: FC<Props> = ({
	availableTags,
	handleClose,
	show,
	deleteTag,
	updateTag,
}) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map((item) => (
							<Row key={item.id}>
								<Col>
									<Form.Control
										type="text"
										value={item.label}
										onChange={(e) => updateTag(item.id, e.target.value)}
									/>
								</Col>
								<Col xs={'auto'}>
									<Button
										variant="outline-danger"
										onClick={() => deleteTag(item.id)}
									>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default EditTagsModal
