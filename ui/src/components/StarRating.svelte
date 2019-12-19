<script>
  export let rating;
  $: ratingPercent = Math.round(((rating / 5) * 100) / 5) * 5 + "%";
</script>

<style>
  h1 {
    --ratingPercent: 50%;
    display: inline-block;
    margin: 0;
    line-height: 1em;
    font-family: helvetica, arial, sans-serif;
    font-weight: bold;
    font-size: 15px;
    background: linear-gradient(
      to right,
      gold var(--ratingPercent),
      lightgrey var(--ratingPercent)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>

<h1 style="--ratingPercent:{ratingPercent}">★★★★★</h1>
