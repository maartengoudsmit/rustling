<script>
	import '$lib/assets/styles.css';
	import '$lib/assets/notes.css';
	export let data;
</script>

<header>
	<nav>
		<div class="nav-links">
			<a href="/">🍂</a>
			<a href="/notes">Notes</a>
			<a href="/favorites">Favorites</a>
		</div>
	</nav>
</header>

<main>
	<div class="intro">
		<h1>🍂 The Rustling of the Leaves</h1>
	</div>

	<div class="timeline">
		{#each data.notes as note}
			<article class="timeline-item note">
				<p class="note-content">{note.content}</p>
				<div class="item-meta">
					<a href="/blog/{note.slug}">{new Date(note.date).toLocaleDateString('en-NL')}</a>
					<div class="tags">
						{#each note.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</main>
