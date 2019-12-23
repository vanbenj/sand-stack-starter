<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`reviews.json`);

		if (res.status === 200) {
      const users = await res.json();
      return { users };
		}

		this.error(500, 'Could not load users');
	}
</script>

<script>
  import StarRating from "../../components/StarRating.svelte";
	export let users;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>reviews</title>
</svelte:head>

<h1>Reviews</h1>

<ul>
  {#each users.User as { id, name, reviews }}
    <li>
      {name}
      <ul>
        {#each reviews as { date, stars, business, text }}
          <li>
            <StarRating rating={stars} />
            {date.formatted}
            <b>{business.name}</b>
            <br />
            <i>{text}</i>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

