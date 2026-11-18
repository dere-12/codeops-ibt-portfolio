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
- DELETE removes a resource.
- PUT is not used because clients do not submit complete resource representations.

## Responses

- Collection responses use `{ items, total, limit, offset }`.
- Individual resource responses return the resource object.
- Successful creation returns `201 Created` and a `Location` header.
- Successful deletion returns `204 No Content`.
- Deleting an already deleted resource also returns `204 No Content`.

## Query controls (reserved)

- `limit`: maximum number of items to return; maximum value is 50.
- `offset`: number of items to skip.
- `sort`: field to sort by; prefix with `-` for descending order.
- `fields`: comma-separated list of fields to return.
- `q`: reserved for free-text search.
- `after`: reserved for cursor pagination.

Comma-separated values can be used for multi-value filters, such as
`?status=PENDING,PREPARING`.

Reserved query parameter names must not be reused as resource field names.

## Status codes

- `200 OK`: successful retrieval or update.
- `201 Created`: successful resource creation.
- `204 No Content`: successful deletion.
- `400 Bad Request`: invalid request or validation failure.
- `401 Unauthorized`: authentication is required.
- `403 Forbidden`: the request is not permitted.
- `404 Not Found`: the requested resource does not exist.
- `409 Conflict`: the request conflicts with the current resource state.
- `422 Unprocessable Entity`: the request is understood but cannot be processed.
- `429 Too Many Requests`: too many requests.
- `500 Internal Server Error`: unexpected server error.
