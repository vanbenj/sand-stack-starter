<script>
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a class='{segment === undefined ? "selected" : ""}' href=".">home</a>
    </li>
		<li><a class:selected='{segment === "about"}' href='about'>about</a></li>

    <!-- for the users link, we're using rel=prefetch so that Sapper prefetches
		     the users data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        class='{segment === "users" ? "selected" : ""}'
        href="users"
      >
        users
      </a>
    </li>

    <!-- for the categories link, we're using rel=prefetch so that Sapper prefetches
		     the categories data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        class='{segment === "categories" ? "selected" : ""}'
        href="categories"
      >
        categories
      </a>
    </li>
  </ul>
</nav>
