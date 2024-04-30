# Counting-number
A [custom component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) to automatically increment a number when the component enters the viewport

```html
<counting-number data-culture="da" data-duration="600" data-delay="2000">900</counting-number>
```

## Installation
Include the following line in your `head` section like this:
```html
<script src="countingnumber.js"></script>
```

## Properties
|Name   	|Type   	|Default value   	|
|---	    |---	    |---	|
|culture  |string   |"en-US"   	|
|duration |number   |0   	|
|delay   	|number   |0   	|

All numbers are in milliseconds
