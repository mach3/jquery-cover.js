
# jquery-cover.js

Fix the size of content to the container as large as possible, keeping aspect ratio.

## Usage

```javascript
$("#container-element").cover("#content-element");
// or
$("#content-element").coverTo("#container-element");
```

Be sure to set only one element to each.
If you want to apply to multiple elements, call this in each loop as below.

```javascript
$(".cover-image").each(function(){
	var node = $(this);
	node.coverTo(node.parent()).show();
});
```

## Options

- **listen :Boolean (false)** ... Observe the change of window size, or not
- **transform :Boolean (true)** ... Use css transform if available

```javascript
$("#container-element").cover("#content-element", {
	listen: false,
	transform: true
});
```
