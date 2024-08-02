# Should flatten alias if spread in the payload with required parameters

## TypeSpec

```tsp
alias Foo = {
  prop1: string;
  prop2: int64;
  prop3: utcDateTime;
  prop4: offsetDateTime;
  prop5: Bar;
};
model Bar {
  prop1: string;
  prop2: int64;
}
op read(@path pathParam: string, @query queryParam: string, ...Foo): OkResponse;
```

## Models

```ts models interface Bar
export interface Bar {
  prop1: string;
  prop2: number;
}
```

```ts models function barSerializer
export function barSerializer(item: Bar): BarRest {
  return {
    prop1: item["prop1"],
    prop2: item["prop2"],
  };
}
```

```ts models:withOptions
```

```ts operations
```