<script context="module">
	export async function preload({ params, query }) {
    let category = req.params.name;

		const res = await this.fetch(`blog/${category}.json`);

		if (res.status === 200) {
			const businesses = await res.json();
			return { category, businesses };
		}

		this.error(404, 'Not found');
	}
</script>

<script>
  import StarRating from "../../components/StarRating.svelte";
	export let category;
	export let businesses;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  a {
    text-decoration: none !important;
    color: grey;
  }
</style>

<svelte:head>
  <title>{category}</title>
</svelte:head>

<h1>
  <a rel="prefetch" href="../categories">Categories</a>
  > {category}
</h1>

{#await $businesses}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.Business as { name, address, avgStars }}
      <li>
        <StarRating rating={avgStars} />
        <b>{name}</b>
        {address}
      </li>
    {/each}
  </ul>

{:catch error}
  <p>Error: {error}</p>
{/await}
