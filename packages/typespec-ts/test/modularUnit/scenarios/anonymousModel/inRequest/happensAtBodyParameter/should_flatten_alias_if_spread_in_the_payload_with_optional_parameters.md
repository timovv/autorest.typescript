# only: Should flatten alias if spread in the payload with optional parameters

## TypeSpec

```tsp
alias Foo = {
  prop1: string;
  prop2: int64;
  prop3?: utcDateTime;
  prop4: offsetDateTime;
  prop5?: Bar;
};
model Bar {
  prop1: string;
  prop2: int64;
}
op read(@path pathParam: string, @query queryParam: string, ...Foo): OkResponse;
```

## TypeScript

```ts models interface Bar
```

```ts models function BarSerializer
```

```ts operations
```