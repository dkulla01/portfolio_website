---
title: Some of my Favorite Programming/Software Articles
---

# {{ title }}

### [https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing)

CPUs aren't magic. Each CPU core can only really do one thing at a time, and when it's pretendng to do things concurrently, it's really just the operating system juggling between each of its responsibilities through time slicing. More things being juggled leads to the OS and CPU moving things between caches and main memory more frequently. This context switching isn't free, and its cost increases the time it takes to complete each task.

> #### It is a basic Law of Computing that given a single CPU resource, executing A and B sequentially will always be faster than executing A and B "simultaneously" through time-slicing.

Time slicing can still improve performance though. Software often needs to fetch data from disk or over the network, and while this software is waiting on this I/O, we might as well let the CPU work on something else. So because of I/O wait, we'll want more connections in the pool than we have CPU cores, just not that many more.

> #### Axiom: You want a small pool, saturated with threads waiting for connections.

### [https://ariya.io/2011/08/hall-of-api-shame-boolean-trap](https://ariya.io/2011/08/hall-of-api-shame-boolean-trap)

> #### the code is usually written once but read many times.

Boolean arguments make for a cryptic API. When I'm reading through code, I don't want jump into the source of some method because I don't know what the `false` argument being passed into it toggles. I especially don't want to do this during an outage. I try to think about what the code I write would look like to a person reading it for the first time, which is often how it feels to look at code I wrote more than a month or so beforehand.

There are some nice ways to work around this. Enums with clear names are a great option here:

```java
public enum FileOpenMode {
    READ,
    APPEND,
    TRUNCATE_AND_WRITE,
    EXCLUSIVE_WRITE,
    UPDATE,
    //...
}
```

Compare this with the `mode` argument to [Python's `open` method](https://docs.python.org/3/library/functions.html#open):
```python
open(file, mode='r', buffering=- 1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```
| Character | Meaning                                                         |
| --------- | --------------------------------------------------------------- |
| `'r'`     | open for reading (default)                                      |
| `'w'`     | open for writing, truncating the file first                     |
| `'x'`     | open for exclusive creation, failing if the file already exists |
| `'a'`     | open for writing, appending to the end of file if it exists     |
| `'b'`     | binary mode                                                     |
| `'t'`     | text mode (default)                                             |
| `'+'`     | open for updating (reading and writing)                         |

They're not boolean arguments, but the principle still applies here. Every time I need to work with files in Python, I end up needing to look this up.

### [http://mishadoff.com/blog/effective-java/](http://mishadoff.com/blog/effective-java/)

Joshua Block's [_Effective Java_](https://bookshop.org/books/effective-java-9780134685991/9780134685991) is full of good practices for Java developers. And these habits are still valuable even when you aren't working in Java. If you do any amount of work in Java (and maybe even if you don't), you should have this book around as a reference. But in the mean time, the blog post above has some good, digestable summaries of the book's takeaways