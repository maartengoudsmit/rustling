import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Note = {
	slug: string;
	date: Date;
	content: string;
	tags: string[];
};

export async function load() {
	const notesDir = path.join(process.cwd(), 'src/lib/notes');
	const files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'));

	const notes = files.map((filename) => {
		const filePath = path.join(notesDir, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(fileContents);

		return {
			slug: filename.replace('.md', ''),
			...data,
			content
		} as Note;
	});

	return { notes };
}
