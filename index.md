---
layout: default
---

{::options parse_block_html="true" parse_span_html="true" /}

# Awesome Documentation

Here's a code sample

<div class="samples">

<div language="java">

## Ceci est un joli bout de code Java

 + avec tout pleins de choix
 + et d'autres encore

    {:path="src/main/java/Main/java"}
    ```java
    class HelloWorld {
        static public void main( String args[] ) {
            System.out.println( "Hello World!" );
        }
    }
    ```

**Et le meme code sans l'identation**

{:path="src/main/java/Main/java"}
```java
class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}
```
</div>

<div language="python">

## Ceci est un bout de code Python long et verbeux

{:path="hello.py"}
```python
print("Hello World")
```

</div>
</div>

<div class="samples">
<div language="java">

## Ceci est un joli bout de code Java

{:path="src/main/java/Main/java"}
```java
class HelloWorld {
    static public void main( String args[] ) {
        System.out.println( "Hello World!" );
    }
}
```

</div>

<div language="python">

## Ceci est un bout de code Python long et verbeux

{:path="hello.py"}
```python
print("Hello World")
```

</div>
</div>

Sources: [github.com/dgageot/test-jekyll](https://github.com/dgageot/test-jekyll)

