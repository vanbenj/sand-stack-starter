<script context="module">
  // Here we import the graphql client
  import client from "../../apollo.js";
  import { gql } from "apollo-boost";

  const GET_ALBUMS = gql`
    query getAlbums {
      queryArtists {
        id
        albums {
          id
          name
          image
          tracks {
            id
            name
            preview_url
          }
        }
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: GET_ALBUMS
      })
    };
  }
</script>

<script>
  import { query } from "svelte-apollo";

  const artists = query(client, { query: GET_ALBUMS });

  export let albums;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>albums</title>
</svelte:head>

<h1>Albums</h1>

<!-- we're using the non-standard `rel=prefetch` attribute to
			tell Sapper to load the data for the page as soon as
			the user hovers over the link or taps it, instead of
			waiting for the 'click' event -->
<!-- <ul>
  {#each posts as post}
  <li><a rel="prefetch" href="albums/{post.slug}">{post.title}</a></li>
  {/each}
</ul> -->

{#await $artists}
<p>Loading...</p>
{:then result}

<ul>
  {#each result.data.queryArtists as { albums } } {#each albums as album}
  <li>
    <a rel="prefetch" href="albums/{album.slug}">
      {album.name}
    </a>
  </li>
  {/each} {/each}
</ul>

{:catch error}
<p>Error: {error}</p>
{/await}
