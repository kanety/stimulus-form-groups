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
  <!-- you can use select, radio or checkbox for action trigger -->
  <select action="form-groups#toggle">
    <option value="group1">group1</option>
    <option value="group2">group2</option>
  </select>
  <div style="display: none;" data-form-group-id="group1">
    <p>group1 content</p>
  </div>
  <div style="display: none;" data-form-group-id="group2">
    <p>group2 content</p>
  </div>
</div>
```

You can use css class for fade-in animation:

```html
<div class="st-form-groups" data-controller="form-groups">
</div>
```

### Options

#### mode

You can toggle disabled status for input elements:

```html
<div data-controller="form-groups"
     data-form-groups-mode-value="disabled">
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

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
