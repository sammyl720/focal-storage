# FocalStorage

FocalStorage enhances the browser's localStorage with features like expiring key-value pairs and automatic JSON serialization/deserialization. This package offers an easy-to-use interface for managing your web application's local storage needs more efficiently.

## Features

- **Automatic JSON Serialization/Deserialization**: Automatically converts stored objects to and from JSON.
- **Expiring Key-Value Pairs**: Allows setting expiration times for storage items, automatically removing them when they expire.
- **Global Accessibility**: Optionally attach a FocalStorage instance to the global window object.

## Installation

Install FocalStorage using npm or yarn:

```sh
npm install focal-store
```

or

```sh
yarn add focal-store
```

## Usage

### Storing and Retrieving Data

To use FocalStorage in your project, first import and instantiate it:

```typescript
import { FocalStorage } from 'focal-store';

const storage = new FocalStorage();
```

You can then store data using `setItem` and retrieve it with `getItem`:

```typescript
// Store data
storage.setItem('user', { name: 'Jane Doe', age: 30 });

// Retrieve data
const user = storage.getItem('user');
console.log(user); // Outputs: { name: 'Jane Doe', age: 30 }
```

### Storing Items with Expiration

FocalStorage allows you to specify an expiration time (in milliseconds) for each item. Once expired, the item will automatically be removed from storage:

```typescript
// Store an item that expires in 1 hour (3600000 milliseconds)
storage.setItem('session', { token: 'abc123' }, 3600000);

// Attempting to retrieve the item after it has expired will return null
setTimeout(() => {
  const session = storage.getItem('session');
  console.log(session); // Outputs: null if called after 1 hour
}, 3600001);
```

### Removing and Clearing Items

Remove a specific item or clear all items from storage:

```typescript
// Remove a specific item
storage.removeItem('user');

// Clear all items from storage
storage.clear();
```

### Making FocalStorage Globally Accessible

Optionally, make FocalStorage globally accessible throughout your application:

```typescript
import { attachFocalStorageToGlobal } from 'focal-store';

attachFocalStorageToGlobal();
// Now you can access FocalStorage globally via `window.focalStorage`
```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).