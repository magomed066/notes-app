import { Tag } from '../types/notes'

export default function transformSelectData(data: Tag[]) {
	if (!data.length) {
		return []
	}

	return data.map((tag) => ({
		label: tag.label,
		value: tag.id,
	}))
}
