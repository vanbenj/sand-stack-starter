<script context="module">
	export async function preload({ params, query }) {
    console.log("retrieving");
		const res = await this.fetch(`categories.json`);
    console.log("retrieved");

		if (res.status === 200) {
      const categories = await res.json();
      console.log(categories);
			return { categories };
		}

		this.error(500, 'Could not load users');
	}
</script>

<script>
	export let categories;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>categories</title>
</svelte:head>

<h1>Categories</h1>

{#await $categories}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.Category as { name }}
      <li>
        <a rel="prefetch" href="categories/{name}">{name}</a>
      </li>
    {/each}
  </ul>

{:catch error}
  <p>Error: {error}</p>
{/await}
