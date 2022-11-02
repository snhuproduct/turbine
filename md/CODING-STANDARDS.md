# TEAM CODING STANDARDS

## Introduction

This document is intended to provide a set of guidelines for the development of the project, assisting us while creating a scalable and well maintained codebase.

One of our base principles is SOLID, which stands for:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

A more detailed (and fun) explanation can be found [on this article](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898)

## Credits

- [Official TS coding standards](https://github.com/Microsoft/TypeScript-wiki)
- [Anichitiandreea Guidelines](https://gist.githubusercontent.com/anichitiandreea/e1d466022d772ea22db56399a7af576b/raw/fcd09f4daad3dd0133c25f8d4158eb29d2378739/typescript_coding_standards.md)

## Names

### General naming rules

1. Use PascalCase for type names.
2. Use `I` as a prefix for interface names.
3. Use PascalCase for enum values.
4. Use camelCase for function names.
5. Use camelCase for property names and local variables.
6. Do not use `_` as a prefix for private properties.
7. Use whole words in names when possible.

### Some other naming guidelines

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

**Use meaningful variable names.**

Distinguish names in such a way that the reader knows what the differences offer.

Bad:

```typescript
function isBetween(a1: number, a2: number, a3: number): boolean {
  return a2 <= a1 && a1 <= a3;
}
```

Good:

```typescript
function isBetweenValues(value: number, min: number, max: number): boolean {
  return min <= value && value <= max;
}
```

**Use pronounceable variable names**

If you can't pronounce it, you can't discuss it without sounding weird.

Bad:

```typescript
class Subs {
  public ccId: number;
  public billingAddrId: number;
  public shippingAddrId: number;
}
```

Good:

```typescript
class Subscription {
  public creditCardId: number;
  public billingAddressId: number;
  public shippingAddressId: number;
}
```

**Avoid mental mapping**

Explicit is better than implicit.<br />
_Clarity is king._

Bad:

```typescript
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

Good:

```typescript
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**Don't add unneeded context**

If your class/type/object name tells you something, don't repeat that in your variable name.

Bad:

```typescript
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
};

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

Good:

```typescript
type Car = {
  make: string;
  model: string;
  color: string;
};

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

### Naming Booleans

- Don't use negative names for boolean variables.

Bad:

```typescript
const isNotEnabled = true;
```

Good:

```typescript
const isEnabled = false;
```

- A prefix like is, are, or has helps every developer to distinguish a boolean from another variable by just looking at it

Bad:

```typescript
const enabled = false;
```

Good:

```typescript
const isEnabled = false;
```

## Components

1. 1 file per logical component (e.g. parser, scanner, emitter, checker).
2. Organize files within their respective modules.
3. If a service is supposed to be used in multiple modules, please added it to the **shared modules**.
4. Page related components, should reside in the **pages** folder, inside it's parent module (check the example below).

![Module structure example](./img/module-structure.png 'Module structure example')

## Types

1. Do not export types/functions unless you need to share it across multiple components.
2. Do not introduce new types/values to the global namespace.
3. Types should be defined in `types.ts`, and should reside in the same folder as the component that uses it.
4. Within a file, type definitions should come first.

## Comments

> So when you find yourself in a position where you need to write a comment, think it through and see whether there isn't some way to turn the tables and express yourself in code. Every time you express yourself in code, you should pat yourself on the back. Everytime you write a comment, you should grimace and feel the failure of your ability of expression.

1. Avoid the over use of comments. Your code should be clear enough to be self explanatory.
2. On the exceptional cases where it's needed, aim for using JSDoc style comments for functions, interfaces, enums, and classes.

**Mumbling**

Plopping in a comment just because you feel you should or because the process requires it, is a hack. If you decide to write a comment, then spend the time necessary to make sure it is the best comment you can write.

**Noise Comments**

Sometimes you see comments that are nothing but noise. They restate the obvious and provide no new information.

```typescript
// redirect to the Contact Details screen
this.router.navigateByUrl(`/${ROOT}/contact`);
```

```typescript
// self explanatory, parse ...
this.parseProducts(products);
```

**TODO Comments**

In general, TODO comments are a big risk. We may see something that we want to do later so we drop a quick **// TODO: Replace this method** thinking we'll come back to it but never do.

If you're going to write a TODO comment, you should link to your external issue tracker.

There are valid use cases for a TODO comment. Perhaps you're working on a big feature and you want to make a pull request that only fixes part of it. You also want to call out some refactoring that still needs to be done, but that you'll fix in another PR.

```typescript
// TODO: Consolidate both of these classes. PURCHASE-123
```

### Use typescript aliases

This will avoid long relative paths when doing imports.

Bad:

```typescript
import { UserService } from '../../../services/UserService';
```

Good:

```typescript
import { UserService } from '@services/UserService';
```

## Strings

1. Use single quotes for strings.

## Diagnostic Messages

1. Use a period at the end of a sentence.
2. Definite entities should be named (this is for a variable name, type name, etc..).
3. Use the present tense.

## Style

1. Use arrow functions over anonymous function expressions.
2. Use a single declaration per variable statement <br />(i.e. use `var x = 1; var y = 2;` over `var x = 1, y = 2;`).
3. `else` goes on a separate line from the closing curly brace.
4. Use 4 spaces per indentation.
