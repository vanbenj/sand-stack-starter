import sveltePreprocess from 'svelte-preprocess'

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src'],
  },
  postcss: {
    plugins: [require('autoprefixer')],
  },
})

export default preprocess
