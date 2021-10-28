# stimulus-form-groups

A stimulus controller for toggle of form groups.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-form-groups --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import FormGroupsController from '@kanety/stimulus-form-groups';

const application = Application.start();
application.register('form-groups', FormGroupsController);
```

Import css:

```css
@import '@kanety/stimulus-form-groups';
```

Build html as follows:

```html
<div data-controller="form-groups">
  <!-- you can use select, radio or checkbox as trigger element -->
  <select action="form-groups#toggle">
    <option value="group1">group1</option>
    <option value="group2">group2</option>
  </select>
  <div data-form-group-id="group1">
    <p>group1 content</p>
  </div>
  <div data-form-group-id="group2">
    <p>group2 content</p>
  </div>
</div>
```

You can also toggle multiple groups at once:

```html
<div data-controller="form-groups">
  <select action="form-groups#toggle">
    <option value="group1">group1</option>
    <option value="group2">group2</option>
  </select>
  <div data-form-group-id='["group1", "group2"]'>
    <p>group1 content</p>
  </div>
  <div data-form-group-id="group2">
    <p>group2 content</p>
  </div>
</div>
```

In this example, `group1 content` will be shown whichever options you select.

You can also use multiple input elements by setting combination of name and value as group id:

```html
<div data-controller="form-groups">
  <input type="checkbox" name="cb1" value="true" action="form-groups#toggle">
  <input type="checkbox" name="cb2" value="true" action="form-groups#toggle">
  <div data-form-group-id="cb1:true"><!-- name:value format -->
    <p>group1 content</p>
  </div>
  <div data-form-group-id="cb2:true">
    <p>group2 content</p>
  </div>
</div>
```

### Options

#### mode

You can toggle disabled status for input elements:

```html
<div data-controller="form-groups"
     data-form-groups-mode-value="disabled">
</div>
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
