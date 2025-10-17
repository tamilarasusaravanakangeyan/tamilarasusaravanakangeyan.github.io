---
title: "Advanced React Hooks: Building Custom Hooks for Better Code Reusability"
description: "Learn how to create powerful custom React hooks that improve code reusability, maintain clean components, and enhance developer experience."
date: 2024-01-15T10:00:00Z
lastmod: 2024-01-15T10:00:00Z
categories: ["Web Development", "Frontend", "React"]
tags: ["react", "hooks", "javascript", "typescript", "custom-hooks", "reusability"]
series: ["Advanced React Patterns"]
part: 1
featured_image: "/images/posts/react-custom-hooks.jpg"
author: "Tamilarasu Saravanakangeyan"
draft: false
---

React Hooks revolutionized how we write React components, moving away from class-based components to functional components with state and lifecycle capabilities. While built-in hooks like `useState` and `useEffect` are powerful, the real magic happens when you start creating your own custom hooks.

In this comprehensive guide, we'll explore advanced techniques for building custom hooks that will make your code more reusable, testable, and maintainable.

## What Are Custom Hooks?

Custom hooks are JavaScript functions whose names start with "use" and that may call other hooks. They allow you to extract component logic into reusable functions, promoting the DRY (Don't Repeat Yourself) principle.

```javascript
// A simple custom hook example
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}
```

## Advanced Custom Hook Patterns

### 1. Data Fetching Hook with Caching

One of the most common use cases for custom hooks is data fetching. Here's an advanced implementation that includes caching, error handling, and loading states:

```javascript
import { useState, useEffect, useRef, useCallback } from 'react';

// Simple cache implementation
const cache = new Map();

function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const abortControllerRef = useRef();
  const { enableCache = true, refetchInterval } = options;
  
  const fetchData = useCallback(async (force = false) => {
    // Check cache first
    if (enableCache && !force && cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (enableCache) {
        cache.set(url, result);
      }
      
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, enableCache, options]);
  
  useEffect(() => {
    fetchData();
    
    // Set up refetch interval if specified
    let intervalId;
    if (refetchInterval && refetchInterval > 0) {
      intervalId = setInterval(() => fetchData(true), refetchInterval);
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchData, refetchInterval]);
  
  const refetch = useCallback(() => fetchData(true), [fetchData]);
  
  return { data, loading, error, refetch };
}
```

### 2. Local Storage Hook with Type Safety

Managing local storage with React can be tricky. Here's a type-safe implementation that handles JSON serialization and provides a seamless API:

```typescript
import { useState, useEffect, useCallback } from 'react';

function useLocalStorage<T>(
  key: string, 
  initialValue: T,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  } = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  
  const { 
    serialize = JSON.stringify, 
    deserialize = JSON.parse 
  } = options;
  
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Update localStorage when state changes
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, serialize(valueToStore));
      
      // Dispatch storage event for cross-tab communication
      window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue: serialize(valueToStore),
        storageArea: window.localStorage
      }));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, serialize, storedValue]);
  
  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);
  
  // Listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize]);
  
  return [storedValue, setValue, removeValue];
}
```

### 3. Debounced Value Hook

For search inputs or API calls that shouldn't fire on every keystroke:

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage example
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const { data: results, loading } = useApi(
    debouncedSearchTerm ? `/api/search?q=${debouncedSearchTerm}` : null
  );
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Searching...</div>}
      {results && (
        <ul>
          {results.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Testing Custom Hooks

Testing custom hooks requires special consideration since they can't be called directly outside of React components. Use the `@testing-library/react-hooks` library:

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});
```

## Best Practices for Custom Hooks

### 1. Follow the Rules of Hooks

- Always start custom hook names with "use"
- Only call hooks at the top level of your function
- Don't call hooks inside loops, conditions, or nested functions

### 2. Return Objects for Multiple Values

When returning multiple values, use objects instead of arrays for better developer experience:

```javascript
// ✅ Good - named properties
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  return {
    value,
    toggle: () => setValue(v => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false)
  };
}

// ❌ Avoid - array destructuring requires remembering order
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  return [
    value,
    () => setValue(v => !v),
    () => setValue(true),
    () => setValue(false)
  ];
}
```

### 3. Use TypeScript for Better Developer Experience

Type your custom hooks to provide better IntelliSense and catch errors early:

```typescript
interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse };
}
```

## Conclusion

Custom hooks are one of React's most powerful features for creating reusable, testable, and maintainable code. By following the patterns and best practices outlined in this guide, you can build a library of custom hooks that will supercharge your React development.

In the next part of this series, we'll explore advanced component composition patterns and how to combine multiple custom hooks effectively.

---

*What custom hooks have you found most useful in your projects? Share your experiences in the comments below!*