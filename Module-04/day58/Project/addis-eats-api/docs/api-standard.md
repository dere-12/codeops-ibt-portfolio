# Addis Eats API standard

## Naming

- Use plural resource nouns in lowercase.
- Separate words with hyphens.
- Do not use verbs in resource paths.
- Use IDs to identify individual resources.
- Use nested routes to show resource relationships.
- Limit nesting to two levels.
- Do not use file extensions or trailing slashes.
- Use query parameters for filtering.
- Do not exceed two nesting levels.

## Versioning

- Use URI versioning.
- All API routes use the `/api/v1` prefix.
- The whole API surface uses the same version.

## Methods

- GET retrieves resources.
- POST creates resources.
- PATCH updates part of a resource.
- DELETE removes resources.
- PUT is not used because clients do not submit complete resource representations.

## Responses

- Collection responses use `{ items, total, limit, offset }`.
- Individual resource responses return the resource object.
- Successful creation returns `201 Created` and a `Location` header.
- Successful deletion returns `204 No Content`.
- Deleting an already deleted resource also returns `204 No Content`.

## Error response body

All error responses use the same five-field JSON shape:

```json
{
  "statusCode": 404,
  "message": "Restaurant 99 was not found.",
  "path": "/api/v1/restaurants/99",
  "timestamp": "2026-11-18T06:00:00.000Z",
  "requestId": null
}
```
