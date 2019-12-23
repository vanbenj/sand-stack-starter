<script context="module">
	export async function preload({ params, query }) {
    console.log("retrieving");
		const res = await this.fetch(`reviews.txt`);
    console.log("retrieved");

		if (res.status === 200) {
      const data = await res.text();
      console.log(data);
      const json = (0,eval)(data);
      console.log(json);
      const users = { data:{User:[]}};
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

{#await $users}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.User as { id, name, reviews }}
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

{:catch error}
  <p>Error: {error}</p>
{/await}
