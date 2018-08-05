## Introduction

Currently we have 2 structures to organize our redux store(exactly the reducers),
so of course redux-heaven offer you 2 choices.

## Page (This README)

`fk` represent the toModel has 0, 1 or many items of this model.
E.g. `class Book extends Model { publisher: fk('Publisher', 'books') }` represent one publisher
could have 0, 1 or many books. But one book **just have one publisher**. The `publisher` field in a book data **must** be an object, can't be an array, string, or anything else.

`many` is like `fk` but needs both models of the relationship
has many relation. E.g. `class Book extends Model { authors: many('User', 'books') }` represent one user
could have 0, 1 or many books. And one book **could have 0, 1 or many authors too**. The `authors` field in a book data **must** be an array, can't be an object, string, or anything else.

Think about another situation, when a user enter the homepage of our website, like twitter/medium/facebook/github..., we need to
give some feeds to the user. The `Model` maybe sounds like this:

```
class WebSite/HomePage extends Model {
    static fields = {
        id: attr(),
        feeds: ... // Which relationship we need use here?
    }
}
```

One WebSite/HomePage has **many** feeds to one user. But we can't use `fk` or `many` relation to the `feeds` field,
because `fk` needs the data must be an object(here feeds must be an array), and although `many` allow `feeds` is an array,
but the toModel doesn't have 0, 1 or many webSite/homePage.

So, we introduce one new relationship, tm(type map).
If we use 

```
const typeMap = {
    type1: 'Model1',
    type2: 'Model2',
    type3: 'Model3
}

// note: you need define Model1, Model2, Model1 before
feeds: tm(type => typeMap[type])
```

This represents one webSite/homePage has 0, 1 or many feeds which is an array.
But don't need a key in the toModel(before we need such as `'books'` in `authors: many('User', 'books')`).
And it only accept a function as the argument which return the actual Model of one item in the data by fetching.

## ORM (in the README of root directory)