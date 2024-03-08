# FocalStorage

FocalStorage enhances the native browser's localStorage with features like expiring key-value pairs and automatic JSON serialization/deserialization. This package offers an easy-to-use interface for managing your web application's local storage needs more effectively.

## Features

- **Automatic JSON Serialization/Deserialization**: Automatically handles conversion of stored objects to and from JSON format.
- **Expiring Key-Value Pairs**: Set expiration times for your storage items, automatically removing them when they expire.
- **Global Accessibility**: Optionally attach FocalStorage instance to the global `window` object for easy access across your application.

## Installation

To install FocalStorage, use npm or yarn:

```sh
npm install focal-storage
```

or

```sh
yarn add focal-storage
```

## Usage

### Basic Usage

First, import `FocalStorage` into your module:

```typescript
import { FocalStorage } from 'focal-storage';
```

Create an instance of `FocalStorage`:

```typescript
const storage = new FocalStorage();
```

Now you can use the `storage` instance to get, set, remove, and manage your local storage data:

```typescript
// Set an item in local storage
storage.setItem('myKey', { data: 'myData' });

// Get an item from local storage
const item = storage.getItem('myKey');
console.log(item); // Outputs: { data: 'myData' }

// Remove an item from local storage
storage.removeItem('myKey');

// Clear all items from local storage
storage.clear();
```

### Using with Expiration

FocalStorage allows you to set an expiration time (in milliseconds) for your storage items:

```typescript
// Set an item that expires in 1 hour (3600000 milliseconds)
storage.setItem('temporaryKey', { data: 'temporaryData' }, 3600000);
```

### Attaching to Global Window Object

Optionally, you can make `FocalStorage` globally accessible through the `window` object by importing `attachFocalStorageToGlobal` from the package. This step is particularly useful if you prefer not to import `FocalStorage` in every module where you need access to local storage.

In your main application file or an entry point script, import and call `attachFocalStorageToGlobal`:

```typescript
import { attachFocalStorageToGlobal } from 'focal-storage';

// Attach FocalStorage instance to the global window object
attachFocalStorageToGlobal();

// Now you can access FocalStorage anywhere using `window.focalStorage`
```


## License

This project is licensed under the [MIT License](./LICENSE).