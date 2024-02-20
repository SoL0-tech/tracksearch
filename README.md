# Track Search (WeR1 Technical Assignment) Solution

A solution was implemented based on the requirements specified in the task document.
Effort was taken to ensure sensible project structure, good typing and adherence to decent coding practices.

## Instructions

### Dependencies

1) Install the project dependencies:

```bash
npm install
```

2) Spin up the backing services (mongodb):

```bash
docker-compose up -d
```

3) Make sure the `.env` file is populated with the required environment variables. An example `.env.example` file is provided for reference.

### Starting the server

```bash
npm run dev
```

This starts the server in development mode, which restarts when source files are changed.

### Notes on Evaluation Criteria

- **Correct implementation of the GraphQL schema and resolvers**: I tried to keep the schema identical to the one specified for Track, naming the queries and mutations sensibly and following conventions when deciding on return types (for instance, for `deleteTrack`, which returns the id of the Track deleted, or an empty string if nothing was deleted)

- **Proper error handling and response status codes**: Try/catch blocks were used where errors could occur, and in most cases the errors are logged before being passed up the stack, as is convention for many graphql applications. Status codes take care of themselves for the most part, but were checked when handling responses from the external API. Promise resolution in certain places was intentionally "awaited" to give us clearer stacktraces in the event of errors.

- **Use of TypeScript for type safety and clear type definitions**: The application was developed in Typescript, using strict type safety and the `noImplicitAny` option. The use of interfaces was preferred over concretions where possible, as this is good practice.

- **Overall code organization, readability, and best practices**: The project is structured in such a way as to group similar components together, and the files were kept as small and isolated as possible.

- **Tests properly written**: Skipped the tests, but hope that what I did show (and my comments) demonstrates some understanding of how they would be implemented.

### Shortcomings and Known Issues

Due to time considerations, there were a couple of things that I didn't address before submission:

- The Apollo Server `startStandaloneServer` bootstrapping function was used, instead of a more flexible but more complicated implementation using `express` directly. I discovered that `startStandaloneServer` doesn't support overriding the path for the server to `/graphql`, as requested in the spec.  Of course, the server could be refactored to enable this, but I evaluated it as a non-critical requirement for the purposes of the assessment.

- A testing scaffold was implemented at the end to demonstrate some basic understanding of testing structure, but mocking mongoose felt like a poor use of time for the sake of two tests, considering it was almost close-of-business Tuesday. I hope this doesn't count against me too much.

### Final comments

Overall enjoyed the assignment.

Thanks all for your consideration, and hope for positive feedback.

