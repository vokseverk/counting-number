# &lt;counting-number&gt; element

A [custom element][CUSTOM] to automatically increment a number when the element enters the
viewport.

## Usage

Include the [script file][FILE] in your HTML like this:

```html
<script type="module">
	import registerElement from './path/to/counting-number.js'
	registerElement()
</script>

```

And add the element to your page wherever you need an auto-incrementing number:

```html
<counting-number culture="da" duration="600" delay="2000">900</counting-number>
```



## Properties/attributes

| Name     | Type       | Default value | Description                           |
|---       |---         |---            |---                                    |
| culture  | string     | "en-US"       | Used to format the number accordingly |
| duration | number     | 0             | How long the counting should take     |
| delay    | number     | 0             | How long before the counting starts after the element has entered the viewport |

All numbers are in milliseconds.

[CUSTOM]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
[FILE]: src/counting-number.js
