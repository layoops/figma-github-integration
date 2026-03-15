## Usage

To perform a query search, use the following query syntax:

```
repo:<repository> type:<issue_type> state:<issue_state> sort:<sort_order>
```

### Usefull search parameters:

- `repo`: The repository name, e.g., "layoops/figma-github-integration".
- `type`: The type of issue ("issue") or pull request ("pr").
- `state`: The state of the issue/PR ("open", "closed", etc.).
- `sort`: Sorting order for results ("created-asc", "created-desc", "updated-asc", "updated-desc", etc.).

## Example queries

1. Search for open issues in the "octocat/Hello-World" repository:
   ```
   repo:octocat/Hello-World type:issue state:open
   ```

2. Search for closed pull requests in the "octocat/Hello-World" repository, sorted by creation date in ascending order:
   ```
   repo:octocat/Hello-World type:pr state:closed sort:created-asc
   ```

## Important Notes

- Search parameters can be combined for precise queries.
- Ensure the correct spelling of parameters to avoid errors.
- Results will be displayed in the order specified by the sort parameter.

These examples cover basic use cases for the search feature. You can adapt them according to your specific needs.
