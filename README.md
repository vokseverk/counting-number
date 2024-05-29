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
<h2>
	We had almost <counting-number>3500</counting-number> signups last month!
</h2>
```

## Customization

By default, the value will be taken from the text content of element - please note that it MUST
be written without thousands-separators, using a period as the decimal point (if present). If
you need to format the fallback with thousands separators etc., please use the value attribute
for the actual value and format the fallback as you please, e.g.:

```html
<h2>
	We've already averaged <counting-number value="3333.3">3,333.33</counting-number> units sold per year!
</h2>
```

## Formatting

The number will be formatted using the language in scope, i.e. the closest ancestor having a
`lang` attribute - or you can set the language explicitly on the element:

```html
<div lang="en">
	<p>English: <counting-number value="1234.5">1,234.5</counting-number></p>
	<p>Danish: <counting-number value="1234.5" lang="da">1.234,5</counting-number></p>
	<p>Norwegian: <counting-number value="1234.5" lang="no">1 234,5</counting-number></p>
</div>
```





## Properties/attributes

| Name     | Type       | Default value | Description                           |
|---       |---         |---            |---                                    |
| value    | number     | 0             | The number to count up to             |
| lang     | string     | inherited (or "en" if unspecified in the document)    | Used to format the number accordingly |
| duration | number     | 0             | How long the counting should take     |
| delay    | number     | 0             | How long before the counting starts after the element has entered the viewport |

Timing values are in milliseconds.

[CUSTOM]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
[FILE]: src/counting-number.js
