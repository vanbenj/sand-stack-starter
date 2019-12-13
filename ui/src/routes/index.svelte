<script context="module">
  // Here we import the graphql client
  import client from "../apollo.js";
  import { gql } from "apollo-boost";

  const GET_USERS = gql`
    query getUsers {
      usersxx {
        name
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: GET_USERS
      })
    };
  }
</script>

<script>
  import { query } from "svelte-apollo";

  const users = query(client, { query: GET_USERS });

</script>

<h1>Users</h1>

{#await $users}
<p>Loading...</p>
{:then result}

<ul>
  {#each result.data.usersxx as { name } }
  <li>
    {name}
  </li>
  {/each}
</ul>

{:catch error}
<p>Error: {error}</p>
{/await}
