import matter from 'gray-matter';

type Note = {
	slug: string;
	date: Date;
	content: string;
	tags: string[];
};

const noteFiles = import.meta.glob('/src/lib/notes/*.md', { query: '?raw', eager: true });

export async function load() {
	const notes = Object.entries(noteFiles).map(([filepath, module]) => {
		const raw = (module as { default: string }).default;
		const { data, content } = matter(raw);
		const filename = filepath.split('/').pop()!.replace('.md', '');

		return {
			slug: filename,
			...data,
			content
		} as Note;
	});

	return { notes };
}
